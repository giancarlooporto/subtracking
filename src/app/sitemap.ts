import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://subtracking.app'

    const routes = [
        '',
        '/dashboard',
        '/privacy-subscription-tracker',
        '/no-bank-login',
        '/manual-vs-automated',
        '/blog/find-unused-subscriptions',
        '/guides/how-to-cancel-adobe',
        '/guides/how-to-cancel-netflix',
        '/guides/how-to-cancel-planet-fitness',
        '/compare/rocket-money',
        '/compare/copilot',
        '/compare/monarch-money',
        '/privacy',
        '/terms',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route.includes('/blog') ? ('weekly' as const) : ('monthly' as const),
        priority: route === '' ? 1 : route === '/dashboard' ? 0.9 : 0.8,
    }));
}
