import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SubTracking',
        short_name: 'SubTracking',
        description: 'Track smarter. Spend less.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0F172A',
        theme_color: '#4F46E5',
        icons: [
            {
                src: '/icon.png?v=2',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
