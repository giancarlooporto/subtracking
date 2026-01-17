// All IANA timezones grouped by region
export const TIMEZONES = [
    // Americas
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Phoenix',
    'America/Toronto',
    'America/Vancouver',
    'America/Montreal',
    'America/Edmonton',
    'America/Halifax',
    'America/Winnipeg',
    'America/Mexico_City',
    'America/Cancun',
    'America/Monterrey',
    'America/Sao_Paulo',
    'America/Buenos_Aires',
    'America/Santiago',
    'America/Lima',
    'America/Bogota',
    'America/Caracas',

    // Europe
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Amsterdam',
    'Europe/Brussels',
    'Europe/Vienna',
    'Europe/Zurich',
    'Europe/Stockholm',
    'Europe/Copenhagen',
    'Europe/Oslo',
    'Europe/Helsinki',
    'Europe/Warsaw',
    'Europe/Prague',
    'Europe/Budapest',
    'Europe/Athens',
    'Europe/Istanbul',
    'Europe/Moscow',
    'Europe/Dublin',
    'Europe/Lisbon',

    // Asia
    'Asia/Tokyo',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Hong_Kong',
    'Asia/Singapore',
    'Asia/Bangkok',
    'Asia/Jakarta',
    'Asia/Manila',
    'Asia/Taipei',
    'Asia/Kuala_Lumpur',
    'Asia/Dubai',
    'Asia/Riyadh',
    'Asia/Tel_Aviv',
    'Asia/Jerusalem',
    'Asia/Kolkata',
    'Asia/Karachi',
    'Asia/Dhaka',
    'Asia/Kathmandu',

    // Oceania
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Brisbane',
    'Australia/Perth',
    'Australia/Adelaide',
    'Pacific/Auckland',
    'Pacific/Fiji',
    'Pacific/Honolulu',

    // Africa
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'Africa/Nairobi',
    'Africa/Casablanca',
    'Africa/Algiers',

    // Atlantic
    'Atlantic/Reykjavik',
    'Atlantic/Azores',
] as const;

// Get user's detected timezone
export function detectTimezone(): string {
    try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Verify it's in our list, otherwise return default
        return TIMEZONES.includes(detected as any) ? detected : 'America/New_York';
    } catch {
        return 'America/New_York';
    }
}

// Format timezone for display (e.g., "America/New_York" → "New York (EST)")
export function formatTimezone(timezone: string): string {
    try {
        const city = timezone.split('/')[1]?.replace(/_/g, ' ') || timezone;
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'short'
        });
        const parts = formatter.formatToParts(now);
        const tzAbbr = parts.find(part => part.type === 'timeZoneName')?.value;
        return tzAbbr ? `${city} (${tzAbbr})` : city;
    } catch {
        return timezone;
    }
}
