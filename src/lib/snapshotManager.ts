import { Profile, Subscription, getCurrencySymbol } from '../types';
import { calculateMonthlyPrice } from './utils';
import { saveProfiles, setActiveProfileId, getProfiles, getActiveProfileId } from './profileManager';

export type SnapshotSlotKey = '1d' | '3d' | '1w' | '2w' | '1m';

export interface VaultSnapshot {
  id: string;
  slotKey: SnapshotSlotKey;
  label: string;
  targetDaysAgo: number;
  actualTimestamp: number;
  formattedDate: string;
  relativeTimeStr: string;
  profiles: Profile[];
  activeProfileId: string;
  totalMonthlySpend: number;
  totalSubscriptions: number;
  profileCount: number;
  currency: string;
  isAvailable: boolean;
}

interface HistoricalRecord {
  timestamp: number;
  profiles: Profile[];
  activeProfileId: string;
}

const SNAPSHOT_JOURNAL_KEY = 'subtracking_vault_snapshots_journal';
const PRE_RESTORE_BACKUP_KEY = 'subtracking_pre_restore_backup';
const MAX_HISTORY_DAYS = 35; // Retain up to 35 days of rolling daily journal entries

// Helper to format date cleanly: "Sep 22, 2026, 1:30 PM"
export function formatSnapshotDateTime(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

// Helper to calculate total monthly spend across a profile set
function calculateProfilesTotalMonthly(profiles: Profile[], activeId: string): { total: number; count: number; currency: string } {
  const active = profiles.find(p => p.id === activeId) || profiles[0];
  if (!active) return { total: 0, count: 0, currency: 'USD' };

  const total = active.subscriptions.reduce((sum, sub) => {
    return sum + calculateMonthlyPrice(sub.price, sub.billingCycle);
  }, 0);

  return {
    total,
    count: active.subscriptions.length,
    currency: active.currency || 'USD'
  };
}

// Get raw historical journal entries
function getJournal(): HistoricalRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SNAPSHOT_JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save journal entries with automatic pruning beyond 35 days
function saveJournal(journal: HistoricalRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    const cutoff = Date.now() - (MAX_HISTORY_DAYS * 24 * 60 * 60 * 1000);
    // Keep only records within 35 days, sorted oldest to newest
    const pruned = journal
      .filter(entry => entry.timestamp >= cutoff)
      .sort((a, b) => a.timestamp - b.timestamp);

    localStorage.setItem(SNAPSHOT_JOURNAL_KEY, JSON.stringify(pruned));
  } catch (err) {
    console.warn('Failed to save snapshot journal to localStorage:', err);
  }
}

/**
 * Automatically records the current vault state into the rolling historical journal.
 * Throttled to at most once per 6-12 hours unless it is the first record or data changed.
 */
export function recordVaultSnapshot(profiles: Profile[], activeProfileId: string): void {
  if (typeof window === 'undefined' || !profiles || profiles.length === 0) return;

  try {
    const now = Date.now();
    const journal = getJournal();
    const lastEntry = journal[journal.length - 1];

    const currentHash = JSON.stringify({ profiles, activeProfileId });
    const lastHash = lastEntry ? JSON.stringify({ profiles: lastEntry.profiles, activeProfileId: lastEntry.activeProfileId }) : '';

    // If there is no previous entry, record immediately
    if (!lastEntry) {
      journal.push({
        timestamp: now,
        profiles: JSON.parse(JSON.stringify(profiles)),
        activeProfileId: activeProfileId || profiles[0]?.id || 'default'
      });
      saveJournal(journal);
      return;
    }

    // Check time since last record
    const hoursSinceLast = (now - lastEntry.timestamp) / (1000 * 60 * 60);

    // If data changed AND at least 2 hours elapsed, or if >= 12 hours elapsed, record a new point
    if ((currentHash !== lastHash && hoursSinceLast >= 2) || hoursSinceLast >= 12) {
      journal.push({
        timestamp: now,
        profiles: JSON.parse(JSON.stringify(profiles)),
        activeProfileId: activeProfileId || profiles[0]?.id || 'default'
      });
      saveJournal(journal);
    }
  } catch (err) {
    console.error('Error recording vault snapshot:', err);
  }
}

/**
 * Returns the exact 5 rolling snapshots for the UI:
 * 1 Day Ago, 3 Days Ago, 1 Week Ago, 2 Weeks Ago, 1 Month Ago.
 */
export function getRollingSnapshots(): VaultSnapshot[] {
  if (typeof window === 'undefined') return [];

  const journal = getJournal();
  const now = Date.now();
  const currentProfiles = getProfiles();
  const currentActiveId = getActiveProfileId() || (currentProfiles[0]?.id ?? 'default');

  const SLOTS: Array<{ key: SnapshotSlotKey; label: string; daysAgo: number }> = [
    { key: '1d', label: '1 Day Ago', daysAgo: 1 },
    { key: '3d', label: '3 Days Ago', daysAgo: 3 },
    { key: '1w', label: '1 Week Ago', daysAgo: 7 },
    { key: '2w', label: '2 Weeks Ago', daysAgo: 14 },
    { key: '1m', label: '1 Month Ago', daysAgo: 30 }
  ];

  return SLOTS.map(slot => {
    const targetTimestamp = now - (slot.daysAgo * 24 * 60 * 60 * 1000);

    // Find the closest historical entry in the journal to targetTimestamp
    let bestRecord: HistoricalRecord | null = null;
    let smallestDiff = Infinity;

    for (const entry of journal) {
      const diff = Math.abs(entry.timestamp - targetTimestamp);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        bestRecord = entry;
      }
    }

    // If no journal record exists yet, generate baseline fallback from current state
    const record = bestRecord || {
      timestamp: targetTimestamp,
      profiles: currentProfiles,
      activeProfileId: currentActiveId
    };

    const hasExactHistory = !!bestRecord;
    const actualAgeDays = Math.max(0, Math.round((now - record.timestamp) / (1000 * 60 * 60 * 24)));
    const { total, count, currency } = calculateProfilesTotalMonthly(record.profiles, record.activeProfileId);

    return {
      id: `snapshot_${slot.key}`,
      slotKey: slot.key,
      label: slot.label,
      targetDaysAgo: slot.daysAgo,
      actualTimestamp: record.timestamp,
      formattedDate: formatSnapshotDateTime(record.timestamp),
      relativeTimeStr: actualAgeDays === 0 ? 'Earlier today' : actualAgeDays === 1 ? 'Yesterday' : `${actualAgeDays} days ago`,
      profiles: record.profiles,
      activeProfileId: record.activeProfileId,
      totalMonthlySpend: total,
      totalSubscriptions: count,
      profileCount: record.profiles.length,
      currency,
      isAvailable: currentProfiles.length > 0 || hasExactHistory
    };
  });
}

/**
 * Restores a snapshot into the active vault.
 * Automatically saves an emergency "Pre-Restore" backup so the user can undo if desired.
 */
export function restoreVaultSnapshot(snapshot: VaultSnapshot): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'Window not available' };

  try {
    // 1. Emergency safety backup of current state
    const currentProfiles = getProfiles();
    const currentActiveId = getActiveProfileId();
    if (currentProfiles.length > 0) {
      localStorage.setItem(PRE_RESTORE_BACKUP_KEY, JSON.stringify({
        timestamp: Date.now(),
        profiles: currentProfiles,
        activeProfileId: currentActiveId
      }));
    }

    // 2. Overwrite active profiles with snapshot profiles
    saveProfiles(snapshot.profiles);
    if (snapshot.activeProfileId) {
      setActiveProfileId(snapshot.activeProfileId);
    }

    // 3. Mark update timestamp
    localStorage.setItem('subtracking-last-sync', new Date().toISOString());

    return { success: true };
  } catch (err: any) {
    console.error('Failed to restore snapshot:', err);
    return { success: false, error: err.message || 'Failed to restore snapshot' };
  }
}

/**
 * Allows undoing the most recent restore operation
 */
export function restorePreRestoreBackup(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(PRE_RESTORE_BACKUP_KEY);
    if (!raw) return false;
    const backup: HistoricalRecord = JSON.parse(raw);
    if (backup.profiles && backup.profiles.length > 0) {
      saveProfiles(backup.profiles);
      if (backup.activeProfileId) {
        setActiveProfileId(backup.activeProfileId);
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Downloads a snapshot as a standalone .json backup file.
 * The exported JSON is 100% compatible with SubTracking's standard vault import tool.
 */
export function downloadSnapshotJSON(snapshot: VaultSnapshot): void {
  if (typeof window === 'undefined') return;

  const exportPayload = {
    version: 1,
    snapshotSlot: snapshot.slotKey,
    snapshotLabel: snapshot.label,
    snapshotDate: snapshot.formattedDate,
    snapshotTimestamp: snapshot.actualTimestamp,
    profiles: snapshot.profiles,
    activeProfileId: snapshot.activeProfileId,
    exportedAt: new Date().toISOString()
  };

  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Format date for filename: YYYY-MM-DD
  const dateStr = new Date(snapshot.actualTimestamp).toISOString().split('T')[0];
  const filename = `subtracking-snapshot-${snapshot.slotKey}-${dateStr}.json`;

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
