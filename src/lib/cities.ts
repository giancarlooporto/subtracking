// City database with timezone and default currency mappings
export interface CityData {
    name: string;
    country: string;
    timezone: string;
    defaultCurrency: string;
    flag: string;
}

export const CITIES: CityData[] = [
    // United States
    { name: "New York", country: "USA", timezone: "America/New_York", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Chicago", country: "USA", timezone: "America/Chicago", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Houston", country: "USA", timezone: "America/Chicago", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Phoenix", country: "USA", timezone: "America/Phoenix", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Philadelphia", country: "USA", timezone: "America/New_York", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "San Antonio", country: "USA", timezone: "America/Chicago", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "San Diego", country: "USA", timezone: "America/Los_Angeles", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Dallas", country: "USA", timezone: "America/Chicago", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "San Jose", country: "USA", timezone: "America/Los_Angeles", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Austin", country: "USA", timezone: "America/Chicago", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Jacksonville", country: "USA", timezone: "America/New_York", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "San Francisco", country: "USA", timezone: "America/Los_Angeles", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Columbus", country: "USA", timezone: "America/New_York", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Indianapolis", country: "USA", timezone: "America/Indiana/Indianapolis", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Seattle", country: "USA", timezone: "America/Los_Angeles", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Denver", country: "USA", timezone: "America/Denver", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Boston", country: "USA", timezone: "America/New_York", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Miami", country: "USA", timezone: "America/New_York", defaultCurrency: "USD", flag: "🇺🇸" },
    { name: "Atlanta", country: "USA", timezone: "America/New_York", defaultCurrency: "USD", flag: "🇺🇸" },

    // Canada
    { name: "Toronto", country: "Canada", timezone: "America/Toronto", defaultCurrency: "CAD", flag: "🇨🇦" },
    { name: "Montreal", country: "Canada", timezone: "America/Montreal", defaultCurrency: "CAD", flag: "🇨🇦" },
    { name: "Vancouver", country: "Canada", timezone: "America/Vancouver", defaultCurrency: "CAD", flag: "🇨🇦" },
    { name: "Calgary", country: "Canada", timezone: "America/Edmonton", defaultCurrency: "CAD", flag: "🇨🇦" },
    { name: "Edmonton", country: "Canada", timezone: "America/Edmonton", defaultCurrency: "CAD", flag: "🇨🇦" },
    { name: "Ottawa", country: "Canada", timezone: "America/Toronto", defaultCurrency: "CAD", flag: "🇨🇦" },
    { name: "Winnipeg", country: "Canada", timezone: "America/Winnipeg", defaultCurrency: "CAD", flag: "🇨🇦" },
    { name: "Quebec City", country: "Canada", timezone: "America/Montreal", defaultCurrency: "CAD", flag: "🇨🇦" },

    // United Kingdom
    { name: "London", country: "UK", timezone: "Europe/London", defaultCurrency: "GBP", flag: "🇬🇧" },
    { name: "Manchester", country: "UK", timezone: "Europe/London", defaultCurrency: "GBP", flag: "🇬🇧" },
    { name: "Birmingham", country: "UK", timezone: "Europe/London", defaultCurrency: "GBP", flag: "🇬🇧" },
    { name: "Edinburgh", country: "UK", timezone: "Europe/London", defaultCurrency: "GBP", flag: "🇬🇧" },
    { name: "Glasgow", country: "UK", timezone: "Europe/London", defaultCurrency: "GBP", flag: "🇬🇧" },

    // Europe (EUR)
    { name: "Paris", country: "France", timezone: "Europe/Paris", defaultCurrency: "EUR", flag: "🇫🇷" },
    { name: "Berlin", country: "Germany", timezone: "Europe/Berlin", defaultCurrency: "EUR", flag: "🇩🇪" },
    { name: "Madrid", country: "Spain", timezone: "Europe/Madrid", defaultCurrency: "EUR", flag: "🇪🇸" },
    { name: "Rome", country: "Italy", timezone: "Europe/Rome", defaultCurrency: "EUR", flag: "🇮🇹" },
    { name: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam", defaultCurrency: "EUR", flag: "🇳🇱" },
    { name: "Brussels", country: "Belgium", timezone: "Europe/Brussels", defaultCurrency: "EUR", flag: "🇧🇪" },
    { name: "Vienna", country: "Austria", timezone: "Europe/Vienna", defaultCurrency: "EUR", flag: "🇦🇹" },
    { name: "Munich", country: "Germany", timezone: "Europe/Berlin", defaultCurrency: "EUR", flag: "🇩🇪" },
    { name: "Milan", country: "Italy", timezone: "Europe/Rome", defaultCurrency: "EUR", flag: "🇮🇹" },
    { name: "Barcelona", country: "Spain", timezone: "Europe/Madrid", defaultCurrency: "EUR", flag: "🇪🇸" },

    // Australia
    { name: "Sydney", country: "Australia", timezone: "Australia/Sydney", defaultCurrency: "AUD", flag: "🇦🇺" },
    { name: "Melbourne", country: "Australia", timezone: "Australia/Melbourne", defaultCurrency: "AUD", flag: "🇦🇺" },
    { name: "Brisbane", country: "Australia", timezone: "Australia/Brisbane", defaultCurrency: "AUD", flag: "🇦🇺" },
    { name: "Perth", country: "Australia", timezone: "Australia/Perth", defaultCurrency: "AUD", flag: "🇦🇺" },

    // Asia
    { name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", defaultCurrency: "JPY", flag: "🇯🇵" },
    { name: "Singapore", country: "Singapore", timezone: "Asia/Singapore", defaultCurrency: "SGD", flag: "🇸🇬" },
    { name: "Hong Kong", country: "Hong Kong", timezone: "Asia/Hong_Kong", defaultCurrency: "HKD", flag: "🇭🇰" },
    { name: "Seoul", country: "South Korea", timezone: "Asia/Seoul", defaultCurrency: "KRW", flag: "🇰🇷" },
    { name: "Shanghai", country: "China", timezone: "Asia/Shanghai", defaultCurrency: "CNY", flag: "🇨🇳" },
    { name: "Beijing", country: "China", timezone: "Asia/Shanghai", defaultCurrency: "CNY", flag: "🇨🇳" },
    { name: "Mumbai", country: "India", timezone: "Asia/Kolkata", defaultCurrency: "INR", flag: "🇮🇳" },
    { name: "Delhi", country: "India", timezone: "Asia/Kolkata", defaultCurrency: "INR", flag: "🇮🇳" },
    { name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", defaultCurrency: "THB", flag: "🇹🇭" },

    // Mexico
    { name: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", defaultCurrency: "MXN", flag: "🇲🇽" },
    { name: "Guadalajara", country: "Mexico", timezone: "America/Mexico_City", defaultCurrency: "MXN", flag: "🇲🇽" },
    { name: "Monterrey", country: "Mexico", timezone: "America/Monterrey", defaultCurrency: "MXN", flag: "🇲🇽" },

    // South America
    { name: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo", defaultCurrency: "BRL", flag: "🇧🇷" },
    { name: "Rio de Janeiro", country: "Brazil", timezone: "America/Sao_Paulo", defaultCurrency: "BRL", flag: "🇧🇷" },
    { name: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires", defaultCurrency: "ARS", flag: "🇦🇷" },

    // Middle East
    { name: "Dubai", country: "UAE", timezone: "Asia/Dubai", defaultCurrency: "AED", flag: "🇦🇪" },
    { name: "Tel Aviv", country: "Israel", timezone: "Asia/Jerusalem", defaultCurrency: "ILS", flag: "🇮🇱" },

    // New Zealand
    { name: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland", defaultCurrency: "NZD", flag: "🇳🇿" },
    { name: "Wellington", country: "New Zealand", timezone: "Pacific/Auckland", defaultCurrency: "NZD", flag: "🇳🇿" },
];

// Search cities by name
export function searchCities(query: string): CityData[] {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    return CITIES.filter(city =>
        city.name.toLowerCase().includes(lowerQuery) ||
        city.country.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Return top 10 matches
}

// Get city data by name
export function getCityByName(cityName: string): CityData | undefined {
    return CITIES.find(city => city.name === cityName);
}

// Detect user's timezone and suggest a city
export function detectUserCity(): CityData | null {
    try {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const matchingCity = CITIES.find(city => city.timezone === userTimezone);
        return matchingCity || CITIES[0]; // Default to New York if no match
    } catch {
        return CITIES[0]; // Default to New York
    }
}
