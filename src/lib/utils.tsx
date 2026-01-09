import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tv, Laptop, Gamepad2, Heart, Utensils, Newspaper, Tag, ShoppingBag, Car, Landmark, BookOpen } from 'lucide-react';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parse YYYY-MM-DD as local time
    const [year, month, day] = dateString.split('-').map(Number);
    const renewal = new Date(year, month - 1, day);
    renewal.setHours(0, 0, 0, 0);

    const diffTime = renewal.getTime() - today.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getNextOccurrence = (startDate: string, cycle: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly') => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = startDate.split('-').map(Number);
    let nextDate = new Date(year, month - 1, day);
    nextDate.setHours(0, 0, 0, 0);

    while (nextDate < today) {
        if (cycle === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
        else if (cycle === 'biweekly') nextDate.setDate(nextDate.getDate() + 14);
        else if (cycle === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);
        else if (cycle === 'quarterly') nextDate.setMonth(nextDate.getMonth() + 3);
        else if (cycle === 'yearly') nextDate.setFullYear(nextDate.getFullYear() + 1);
    }

    const y = nextDate.getFullYear();
    const m = String(nextDate.getMonth() + 1).padStart(2, '0');
    const d = String(nextDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export const getCategoryColorHex = (category: string) => {
    const map: Record<string, string> = {
        'Streaming': '#a855f7', // purple-500
        'Software & Apps': '#3b82f6', // blue-500
        'Shopping & Retail': '#8b5cf6', // violet-500
        'Food & Dining': '#f59e0b', // amber-500
        'Transport & Uber': '#10b981', // emerald-500
        'Finance & Insurance': '#06b6d4', // cyan-500
        'Health & Wellness': '#f43f5e', // rose-500
        'Gaming & Social': '#ec4899', // pink-500
        'News & Education': '#14b8a6', // teal-500
        'Other': '#64748b', // slate-500
    };
    return map[category] || '#6366f1'; // Default indigo
};

export const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Streaming': return <Tv className="w-4 h-4" />;
        case 'Software & Apps': return <Laptop className="w-4 h-4" />;
        case 'Shopping & Retail': return <ShoppingBag className="w-4 h-4" />;
        case 'Food & Dining': return <Utensils className="w-4 h-4" />;
        case 'Transport & Uber': return <Car className="w-4 h-4" />;
        case 'Finance & Insurance': return <Landmark className="w-4 h-4" />;
        case 'Health & Wellness': return <Heart className="w-4 h-4" />;
        case 'Gaming & Social': return <Gamepad2 className="w-4 h-4" />;
        case 'News & Education': return <BookOpen className="w-4 h-4" />;
        default: return <Tag className="w-4 h-4" />;
    }
};

