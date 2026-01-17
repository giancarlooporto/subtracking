// Timezone utilities for profile management

// Get user's current timezone from browser
export function detectUserTimezone(): string {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
        return 'America/New_York'; // Fallback
    }
}

// Get country code from timezone
export function getCountryFromTimezone(timezone: string): string {
    // Map common timezones to countries
    const timezoneToCountry: Record<string, string> = {
        // North America
        'America/New_York': 'US',
        'America/Chicago': 'US',
        'America/Los_Angeles': 'US',
        'America/Denver': 'US',
        'America/Phoenix': 'US',
        'America/Toronto': 'CA',
        'America/Vancouver': 'CA',
        'America/Montreal': 'CA',
        'America/Edmonton': 'CA',
        'America/Mexico_City': 'MX',

        // Europe
        'Europe/London': 'GB',
        'Europe/Paris': 'FR',
        'Europe/Berlin': 'DE',
        'Europe/Madrid': 'ES',
        'Europe/Rome': 'IT',
        'Europe/Amsterdam': 'NL',
        'Europe/Brussels': 'BE',
        'Europe/Vienna': 'AT',
        'Europe/Zurich': 'CH',

        // Asia
        'Asia/Tokyo': 'JP',
        'Asia/Shanghai': 'CN',
        'Asia/Hong_Kong': 'HK',
        'Asia/Singapore': 'SG',
        'Asia/Seoul': 'KR',
        'Asia/Dubai': 'AE',
        'Asia/Kolkata': 'IN',
        'Asia/Bangkok': 'TH',

        // Oceania
        'Australia/Sydney': 'AU',
        'Australia/Melbourne': 'AU',
        'Australia/Brisbane': 'AU',
        'Australia/Perth': 'AU',
        'Pacific/Auckland': 'NZ',

        // South America
        'America/Sao_Paulo': 'BR',
        'America/Buenos_Aires': 'AR',
        'America/Santiago': 'CL',
    };

    return timezoneToCountry[timezone] || 'US';
}

// Get default currency for a country
export function getCurrencyForCountry(countryCode: string): string {
    const countryCurrencies: Record<string, string> = {
        'US': 'USD',
        'CA': 'CAD',
        'GB': 'GBP',
        'EU': 'EUR',
        'FR': 'EUR',
        'DE': 'EUR',
        'ES': 'EUR',
        'IT': 'EUR',
        'NL': 'EUR',
        'BE': 'EUR',
        'AT': 'EUR',
        'CH': 'CHF',
        'JP': 'JPY',
        'CN': 'CNY',
        'HK': 'HKD',
        'SG': 'SGD',
        'KR': 'KRW',
        'AE': 'AED',
        'IN': 'INR',
        'TH': 'THB',
        'AU': 'AUD',
        'NZ': 'NZD',
        'BR': 'BRL',
        'AR': 'ARS',
        'CL': 'CLP',
        'MX': 'MXN',
    };

    return countryCurrencies[countryCode] || 'USD';
}

// Suggest currency based on detected timezone
export function suggestCurrencyFromTimezone(timezone: string): string {
    const country = getCountryFromTimezone(timezone);
    return getCurrencyForCountry(country);
}

// Get friendly timezone display name
export function getTimezoneDisplayName(timezone: string): string {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'short'
        });
        const parts = formatter.formatToParts(now);
        const tzPart = parts.find(part => part.type === 'timeZoneName');
        return tzPart ? `${timezone} (${tzPart.value})` : timezone;
    } catch {
        return timezone;
    }
}
