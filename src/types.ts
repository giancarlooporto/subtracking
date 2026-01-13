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

export const DEFAULT_CATEGORIES = [
    'Streaming',
    'Software & Apps',
    'Shopping & Retail',
    'Food & Dining',
    'Auto Loan',
    'Transportation',
    'Finance & Insurance',
    'Health & Wellness',
    'Gaming & Social',
    'News & Education',
    'Housing & Rent',
    'Utility Bills',
    'Other'
];
