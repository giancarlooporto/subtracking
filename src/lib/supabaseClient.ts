
import { createClient } from '@supabase/supabase-js';

// NOTE: These environment variables must be set in your .env.local / Vercel env settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create a single supabase client for interacting with your database
// Placeholder values are used as a fallback during SSR/build time only — they don't grant any access
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function loginWithEmail(email: string) {
    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

    // For localhost, we redirect to localhost. For prod, we redirect to production URL.
    const redirectTo = isLocalhost
        ? 'http://localhost:3000'
        : 'https://www.subtracking.app';

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: redirectTo,
        }
    });

    return { error };
}

export async function verifyOtp(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email' // Use 'email' for 6-digit OTP codes
    });

    return { data, error };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

/**
 * Uploads the encrypted JSON vault to the user's private storage bucket.
 * Bucket Structure: user-data / [user_id] / vault.json
 */
export async function uploadVault(userId: string, encryptedData: any) {
    const filePath = `${userId}/vault.json`;

    // Convert JSON to Blob
    const blob = new Blob([JSON.stringify(encryptedData)], { type: 'application/json' });

    const { data, error } = await supabase.storage
        .from('user-data')
        .upload(filePath, blob, {
            contentType: 'application/json',
            upsert: true
        });

    return { data, error };
}

/**
 * Downloads the encrypted JSON vault from the user's private storage bucket.
 */
export async function downloadVault(userId: string) {
    const filePath = `${userId}/vault.json`;

    try {
        // 1. Try Signed URL first (Most robust method)
        // Works for private & public buckets, handles special chars, bypasses some caches
        const { data, error } = await supabase.storage
            .from('user-data')
            .createSignedUrl(filePath, 60);

        if (error || !data || !data.signedUrl) {
            console.warn('Signed URL failed, falling back to standard download');
            throw error || new Error('No signed URL returned');
        }

        // 2. Fetch with Cache Busting
        const url = `${data.signedUrl}&t=${new Date().getTime()}`;
        const response = await fetch(url, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
        });

        if (!response.ok) {
            if (response.status === 404) return { data: null, error: null };
            throw new Error(`Fetch failed: ${response.statusText}`);
        }

        const json = await response.json();
        return { data: json, error: null };

    } catch (error) {
        // Fallback: Use standard SDK download
        // This handles auth headers automatically but might be cached by OS
        console.log('Falling back to standard download method...');

        const { data, error: downloadError } = await supabase.storage
            .from('user-data')
            .download(filePath);

        if (downloadError) return { data: null, error: downloadError };

        const text = await data.text();
        const json = JSON.parse(text);
        return { data: json, error: null };
    }
}
