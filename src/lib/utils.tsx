import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tv, Laptop, Gamepad2, Heart, Utensils, Newspaper, Tag } from 'lucide-react';
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
        'Gaming': '#ec4899', // pink-500
        'Health & Wellness': '#10b981', // emerald-500
        'Meal Kits': '#f97316', // orange-500
        'Content & News': '#14b8a6', // teal-500
        'Other': '#64748b', // slate-500
    };
    return map[category] || '#6366f1'; // Default indigo
};

export const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Streaming': return <Tv className="w-4 h-4" />;
        case 'Software & Apps': return <Laptop className="w-4 h-4" />;
        case 'Gaming': return <Gamepad2 className="w-4 h-4" />;
        case 'Health & Wellness': return <Heart className="w-4 h-4" />;
        case 'Meal Kits': return <Utensils className="w-4 h-4" />;
        case 'Content & News': return <Newspaper className="w-4 h-4" />;
        default: return <Tag className="w-4 h-4" />;
    }
};

