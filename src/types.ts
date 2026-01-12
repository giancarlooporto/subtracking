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
    logo?: string;
}

export const DEFAULT_CATEGORIES = [
    'Streaming',
    'Software & Apps',
    'Shopping & Retail',
    'Food & Dining',
    'Transport & Uber',
    'Finance & Insurance',
    'Health & Wellness',
    'Gaming & Social',
    'News & Education',
    'Other'
];
