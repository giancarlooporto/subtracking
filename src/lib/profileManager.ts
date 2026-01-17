import { Profile, Subscription } from '../types';
import { detectTimezone } from './timezones';

const PROFILES_STORAGE_KEY = 'subtracking_profiles';
const ACTIVE_PROFILE_KEY = 'subtracking_active_profile';
const LEGACY_SUBSCRIPTIONS_KEY = 'subscriptions';

// Generate unique ID
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get all profiles from localStorage
export function getProfiles(): Profile[] {
    try {
        const stored = localStorage.getItem(PROFILES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// Save profiles to localStorage
export function saveProfiles(profiles: Profile[]): void {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
}

// Get active profile ID
export function getActiveProfileId(): string | null {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

// Set active profile ID
export function setActiveProfileId(profileId: string): void {
    localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
}

// Get active profile
export function getActiveProfile(): Profile | null {
    const profiles = getProfiles();
    const activeId = getActiveProfileId();

    if (activeId) {
        const profile = profiles.find(p => p.id === activeId);
        if (profile) return profile;
    }

    // If no active profile or not found, return first profile
    return profiles[0] || null;
}

// Create a new profile
export function createProfile(name: string, city: string, timezone: string, currency: string): Profile {
    const newProfile: Profile = {
        id: generateId(),
        name,
        city,
        timezone,
        currency,
        subscriptions: [],
        categories: undefined // Will use DEFAULT_CATEGORIES
    };

    const profiles = getProfiles();
    profiles.push(newProfile);
    saveProfiles(profiles);

    // If this is the first profile, make it active
    if (profiles.length === 1) {
        setActiveProfileId(newProfile.id);
    }

    return newProfile;
}

// Update a profile
export function updateProfile(profileId: string, updates: Partial<Omit<Profile, 'id'>>): void {
    const profiles = getProfiles();
    const index = profiles.findIndex(p => p.id === profileId);

    if (index !== -1) {
        profiles[index] = { ...profiles[index], ...updates };
        saveProfiles(profiles);
    }
}

// Delete a profile
export function deleteProfile(profileId: string): void {
    const profiles = getProfiles();
    const filtered = profiles.filter(p => p.id !== profileId);
    saveProfiles(filtered);

    // If deleted profile was active, switch to first remaining profile
    if (getActiveProfileId() === profileId && filtered.length > 0) {
        setActiveProfileId(filtered[0].id);
    }
}

// Switch active profile
export function switchProfile(profileId: string): void {
    const profiles = getProfiles();
    if (profiles.some(p => p.id === profileId)) {
        setActiveProfileId(profileId);
    }
}

// Add subscription to active profile
export function addSubscriptionToProfile(subscription: Subscription): void {
    const profile = getActiveProfile();
    if (!profile) return;

    profile.subscriptions.push(subscription);
    updateProfile(profile.id, { subscriptions: profile.subscriptions });
}

// Update subscription in active profile
export function updateSubscriptionInProfile(subscriptionId: string, updates: Partial<Subscription>): void {
    const profile = getActiveProfile();
    if (!profile) return;

    const index = profile.subscriptions.findIndex(s => s.id === subscriptionId);
    if (index !== -1) {
        profile.subscriptions[index] = { ...profile.subscriptions[index], ...updates };
        updateProfile(profile.id, { subscriptions: profile.subscriptions });
    }
}

// Delete subscription from active profile
export function deleteSubscriptionFromProfile(subscriptionId: string): void {
    const profile = getActiveProfile();
    if (!profile) return;

    profile.subscriptions = profile.subscriptions.filter(s => s.id !== subscriptionId);
    updateProfile(profile.id, { subscriptions: profile.subscriptions });
}

// Initialize profiles (migration from legacy data)
export function initializeProfiles(): void {
    const profiles = getProfiles();

    // If profiles already exist, we're done
    if (profiles.length > 0) return;

    // Check for legacy subscriptions
    const legacyData = localStorage.getItem(LEGACY_SUBSCRIPTIONS_KEY);
    const legacySubscriptions: Subscription[] = legacyData ? JSON.parse(legacyData) : [];

    // Detect user's timezone
    const detectedTimezone = detectTimezone();

    // Create default profile with detected timezone
    // User can edit city name and currency later
    const defaultProfile = createProfile(
        'Main Profile',
        'My City', // Placeholder - user will edit
        detectedTimezone,
        'USD' // Default currency
    );

    // Migrate legacy subscriptions if they exist
    if (legacySubscriptions.length > 0) {
        updateProfile(defaultProfile.id, { subscriptions: legacySubscriptions });

        // Optionally: Keep legacy data for rollback safety
        // Or delete it: localStorage.removeItem(LEGACY_SUBSCRIPTIONS_KEY);
    }
}
