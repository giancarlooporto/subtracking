export interface Subscription {
    id: string;
    name: string;
    price: number;
    category: string;
    renewalDate: string;
    billingCycle: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
    lastPaidDate?: string;
    hasEverBeenPaid?: boolean;
    isTrial?: boolean;
    trialEndDate?: string;
    regularPrice?: number;
    isOneTimePayment?: boolean;

    isSplit?: boolean;
    splitWith?: number;
    isVariable?: boolean;
    isEssential?: boolean;
    paymentHistory?: PaymentRecord[];
}

export interface PaymentRecord {
    date: string;
    amount: number;
}

export interface Profile {
    id: string;
    name: string;
    city: string;
    timezone: string;
    currency: string;
    subscriptions: Subscription[];
    categories?: string[]; // Optional custom categories per profile
}

export const DEFAULT_CATEGORIES = [
    'Streaming',
    'Utility Bills',
    'Software & Apps',
    'Housing & Rent',
    'Gaming & Social',
    'Auto Loan',
    'Shopping & Retail',
    'Transportation',
    'Finance & Insurance',
    'Health & Wellness',
    'News & Education',
    'Food & Dining',
    'Other'
];

// Supported currencies
export const SUPPORTED_CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
    { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
    { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
    { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
] as const;

export function getCurrencySymbol(currencyCode: string): string {
    const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
    return currency?.symbol || '$';
}
