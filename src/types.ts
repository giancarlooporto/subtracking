export interface Subscription {
    id: string;
    name: string;
    price: number;
    category: string;
    renewalDate: string;
    billingCycle: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
    lastPaidDate?: string;
    hasEverBeenPaid?: boolean;
}

export const DEFAULT_CATEGORIES = [
    'Streaming',
    'Software & Apps',
    'Gaming',
    'Health & Wellness',
    'Meal Kits',
    'Content & News',
    'Other'
];
