import { useState, useEffect } from 'react';
import { History, RotateCcw, X, Zap, Lock, ShieldCheck, Calendar, DollarSign, Layers, CheckCircle2, AlertTriangle, ArrowRight, Undo2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRollingSnapshots, restoreVaultSnapshot, restorePreRestoreBackup, VaultSnapshot, formatSnapshotDateTime } from '../lib/snapshotManager';
import { getCurrencySymbol } from '../types';

interface TimeMachineModalProps {
    isOpen: boolean;
    onClose: () => void;
    isPro: boolean;
    onActivatePro: () => void;
    onRestored: () => void;
}

export function TimeMachineModal({
    isOpen,
    onClose,
    isPro,
    onActivatePro,
    onRestored
}: TimeMachineModalProps) {
    const [snapshots, setSnapshots] = useState<VaultSnapshot[]>([]);
    const [selectedSnapshot, setSelectedSnapshot] = useState<VaultSnapshot | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [hasUndoBackup, setHasUndoBackup] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const list = getRollingSnapshots();
            setSnapshots(list);
            setIsConfirming(false);
            setStatusMessage(null);
            
            // Check if undo backup exists in localStorage
            if (typeof window !== 'undefined') {
                const preRestore = localStorage.getItem('subtracking_pre_restore_backup');
                setHasUndoBackup(!!preRestore);
            }
        }
    }, [isOpen]);

    const handleRestoreClick = (snap: VaultSnapshot) => {
        if (!isPro) {
            onActivatePro();
            return;
        }
        setSelectedSnapshot(snap);
        setIsConfirming(true);
    };

    const handleConfirmRestore = () => {
        if (!selectedSnapshot) return;

        const result = restoreVaultSnapshot(selectedSnapshot);
        if (result.success) {
            setStatusMessage({
                type: 'success',
                text: `Successfully restored vault snapshot from ${selectedSnapshot.label} (${selectedSnapshot.formattedDate}).`
            });
            setIsConfirming(false);
            setHasUndoBackup(true);
            setTimeout(() => {
                onRestored();
                onClose();
            }, 1200);
        } else {
            setStatusMessage({
                type: 'error',
                text: result.error || 'Failed to restore snapshot.'
            });
        }
    };

    const handleUndo = () => {
        if (confirm('Undo the last restore and revert back to your previous vault state?')) {
            const undone = restorePreRestoreBackup();
            if (undone) {
                setStatusMessage({
                    type: 'success',
                    text: 'Reverted back to pre-restore vault state!'
                });
                setTimeout(() => {
                    onRestored();
                    onClose();
                }, 1000);
            } else {
                setStatusMessage({
                    type: 'error',
                    text: 'No pre-restore backup available.'
                });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-900 flex items-center justify-between shrink-0 bg-slate-900/40">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                <History className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold text-white tracking-tight">Time-Machine Snapshots</h2>
                                    <span className="text-[10px] uppercase tracking-wider bg-gradient-to-r from-amber-500 to-indigo-500 text-white font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                                        PRO
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Roll your entire vault back to automatic rolling milestones
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-300 transition-colors p-2 hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-xl cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 overflow-y-auto flex-1 space-y-5 scrollbar-thin">
                        
                        {/* Status Message */}
                        {statusMessage && (
                            <motion.div 
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-2xl border flex items-center gap-3 text-sm ${
                                    statusMessage.type === 'success'
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                        : 'bg-red-500/10 border-red-500/30 text-red-300'
                                }`}
                            >
                                {statusMessage.type === 'success' ? (
                                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                                ) : (
                                    <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
                                )}
                                <span className="font-medium">{statusMessage.text}</span>
                            </motion.div>
                        )}

                        {/* Pro Upsell Banner if not Pro */}
                        {!isPro && (
                            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-300 font-bold text-sm">
                                        <Zap className="w-4 h-4 fill-amber-300" />
                                        <span>Pro Feature</span>
                                    </div>
                                    <p className="text-xs text-slate-300 max-w-md">
                                        SubTracking continuously preserves rolling 30-day vault checkpoints so you never lose accidental deletions or edits.
                                    </p>
                                </div>
                                <button
                                    onClick={onActivatePro}
                                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 shrink-0 cursor-pointer flex items-center gap-1.5"
                                >
                                    <span>Upgrade to Pro</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}

                        {/* Undo Restore Banner if available */}
                        {hasUndoBackup && (
                            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                                    <span>An emergency pre-restore safety copy is saved in memory.</span>
                                </div>
                                <button
                                    onClick={handleUndo}
                                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                    <Undo2 className="w-3.5 h-3.5" />
                                    <span>Undo Restore</span>
                                </button>
                            </div>
                        )}

                        {/* Confirm Modal Confirmation Card */}
                        {isConfirming && selectedSnapshot && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 space-y-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0 mt-0.5">
                                        <RotateCcw className="w-5 h-5 animate-spin" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-white">
                                            Restore Vault to {selectedSnapshot.label}?
                                        </h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            This will set your active profiles and subscriptions to the state saved on <strong className="text-white">{selectedSnapshot.formattedDate}</strong> ({selectedSnapshot.relativeTimeStr}).
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-950/60 p-3 rounded-xl border border-indigo-500/20 grid grid-cols-3 gap-2 text-center text-xs">
                                    <div>
                                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Subscriptions</span>
                                        <span className="text-white font-bold">{selectedSnapshot.totalSubscriptions}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Monthly Total</span>
                                        <span className="text-emerald-400 font-bold">
                                            {getCurrencySymbol(selectedSnapshot.currency)}{selectedSnapshot.totalMonthlySpend.toFixed(2)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Profiles</span>
                                        <span className="text-white font-bold">{selectedSnapshot.profileCount}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-1">
                                    <button
                                        onClick={() => setIsConfirming(false)}
                                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmRestore}
                                        className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Confirm & Restore</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Snapshots 5-Card List */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-bold uppercase tracking-wider">
                                <span>5 Rolling Snapshot Points</span>
                                <span className="text-[10px] text-slate-500 font-normal">Continuous 30-Day Window</span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {snapshots.map((snap) => {
                                    const symbol = getCurrencySymbol(snap.currency);

                                    return (
                                        <div
                                            key={snap.id}
                                            className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/70 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                                        >
                                            <div className="flex items-start sm:items-center gap-3.5">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center justify-center text-indigo-400 shrink-0 group-hover:border-indigo-500/40 transition-colors">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-white">
                                                            {snap.label}
                                                        </span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                                                            {snap.relativeTimeStr}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-slate-400 flex items-center gap-3">
                                                        <span>{snap.formattedDate}</span>
                                                        <span>•</span>
                                                        <span className="text-slate-300 font-medium">
                                                            {snap.totalSubscriptions} {snap.totalSubscriptions === 1 ? 'sub' : 'subs'}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="text-emerald-400 font-semibold">
                                                            {symbol}{snap.totalMonthlySpend.toFixed(2)}/mo
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full sm:w-auto flex items-center justify-end">
                                                <button
                                                    onClick={() => handleRestoreClick(snap)}
                                                    className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                                        isPro
                                                            ? 'bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700 hover:border-indigo-500 shadow-sm'
                                                            : 'bg-slate-900 text-slate-400 hover:text-amber-300 border border-slate-800 hover:border-amber-500/30'
                                                    }`}
                                                >
                                                    {isPro ? (
                                                        <>
                                                            <RotateCcw className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white transition-colors" />
                                                            <span>Restore</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Lock className="w-3.5 h-3.5 text-amber-400" />
                                                            <span>Unlock (Pro)</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Informational Footer note */}
                        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-900 text-center">
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                💡 Snapshots are kept rolling locally on your device. Every day, the system updates the 30-day timeline automatically so older snapshots roll over cleanly without filling up disk space.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-900 bg-slate-900/30 flex justify-end shrink-0">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl border border-slate-800 transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
