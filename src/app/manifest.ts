import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SubTracking - Privacy-First Subscription Tracker',
        short_name: 'SubTracking',
        description: 'Track subscriptions without bank logins. Find unused subscriptions and save money. Privacy-first expense tracker with Ghost Cost calculator.',
        start_url: '/dashboard',
        display: 'standalone',
        background_color: '#0F172A',
        theme_color: '#4F46E5',
        orientation: 'portrait',
        scope: '/',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon.png?v=final',
                sizes: 'any',
                type: 'image/png',
            },
        ],
        categories: ['finance', 'productivity', 'utilities'],
        shortcuts: [
            {
                name: 'Dashboard',
                short_name: 'Dashboard',
                description: 'View your subscription dashboard',
                url: '/dashboard',
            }
        ],
    }
}
