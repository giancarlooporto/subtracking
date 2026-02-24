import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check, Calendar, DollarSign } from 'lucide-react';
import { Subscription } from '../types';

interface CancellationReviewModalProps {
    subscriptions: Subscription[];
    onConfirm: (selectedIds: string[]) => void;
    onCancel: () => void;
    currency?: string;
}

export default function CancellationReviewModal({
    subscriptions,
    onConfirm,
    onCancel,
    currency = 'USD'
}: CancellationReviewModalProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>(subscriptions.map(s => s.id));

    const getCurrencySymbol = (curr: string) => {
        const symbols: { [key: string]: string } = {
            USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$', INR: '₹'
        };
        return symbols[curr] || '$';
    };

    const toggleSubscription = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        setSelectedIds(prev =>
            prev.length === subscriptions.length ? [] : subscriptions.map(s => s.id)
        );
    };

    const downloadCancellationList = () => {
        const selectedSubs = subscriptions.filter(s => selectedIds.includes(s.id));

        // Create CSV content
        const headers = ['Name', 'Price', 'Billing Cycle', 'Category', 'Renewal Date'];
        const rows = selectedSubs.map(sub => [
            sub.name,
            `${getCurrencySymbol(currency)}${sub.price.toFixed(2)}`,
            sub.billingCycle,
            sub.category,
            sub.renewalDate || 'N/A'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Create download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cancellations_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const totalSavings = subscriptions
        .filter(s => selectedIds.includes(s.id))
        .reduce((sum, sub) => {
            // Convert all billing cycles to monthly
            let monthlyCost = sub.price;
            if (sub.billingCycle === 'yearly') monthlyCost = sub.price / 12;
            else if (sub.billingCycle === 'quarterly') monthlyCost = sub.price / 3;
            else if (sub.billingCycle === 'biweekly') monthlyCost = sub.price * 2;
            else if (sub.billingCycle === 'weekly') monthlyCost = sub.price * 4;
            return sum + monthlyCost;
        }, 0);

    const annualSavings = totalSavings * 12;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 rounded-2xl shadow-2xl border border-white/10 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 bg-gradient-to-r from-red-500/10 to-orange-500/10">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Review Cancellations</h2>
                                <p className="text-slate-300 text-sm">
                                    Select which subscriptions you want to cancel. Uncheck any you'd like to keep.
                                </p>
                            </div>
                            <button
                                onClick={onCancel}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Savings Summary */}
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
                                <p className="text-xs text-slate-400 mb-1">Monthly Savings</p>
                                <p className="text-2xl font-bold text-emerald-400">
                                    {getCurrencySymbol(currency)}{totalSavings.toFixed(2)}
                                </p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
                                <p className="text-xs text-slate-400 mb-1">Annual Savings</p>
                                <p className="text-2xl font-bold text-emerald-400">
                                    {getCurrencySymbol(currency)}{annualSavings.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Subscription List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-3">
                        {/* Select All */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                            <button
                                onClick={toggleAll}
                                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                {selectedIds.length === subscriptions.length ? 'Deselect All' : 'Select All'}
                            </button>
                            <span className="text-sm text-slate-400">
                                {selectedIds.length} of {subscriptions.length} selected
                            </span>
                        </div>

                        {subscriptions.map((sub) => {
                            const isSelected = selectedIds.includes(sub.id);
                            // Convert to monthly cost
                            let monthlyCost = sub.price;
                            if (sub.billingCycle === 'yearly') monthlyCost = sub.price / 12;
                            else if (sub.billingCycle === 'quarterly') monthlyCost = sub.price / 3;
                            else if (sub.billingCycle === 'biweekly') monthlyCost = sub.price * 2;
                            else if (sub.billingCycle === 'weekly') monthlyCost = sub.price * 4;

                            return (
                                <div
                                    key={sub.id}
                                    onClick={() => toggleSubscription(sub.id)}
                                    className={`
                    relative p-4 rounded-xl border transition-all cursor-pointer
                    ${isSelected
                                            ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/15'
                                            : 'bg-slate-800/50 border-white/5 hover:bg-slate-800/70'
                                        }
                  `}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Checkbox */}
                                        <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                      ${isSelected ? 'bg-red-500 border-red-500' : 'border-slate-600'}
                    `}>
                                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-white">
                                                        {getCurrencySymbol(currency)}{sub.price.toFixed(2)}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        per {sub.billingCycle === 'yearly' ? 'year' : sub.billingCycle === 'quarterly' ? 'quarter' : sub.billingCycle === 'biweekly' ? '2 weeks' : sub.billingCycle === 'weekly' ? 'week' : 'month'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                                                {sub.renewalDate && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-4 h-4 text-slate-500" />
                                                        <span>Renews {sub.renewalDate}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-emerald-400">
                                                        Save {getCurrencySymbol(currency)}{monthlyCost.toFixed(2)}/mo
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                                                    {sub.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-slate-800/30">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={downloadCancellationList}
                                disabled={selectedIds.length === 0}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-4 h-4" />
                                Download List ({selectedIds.length})
                            </button>
                            <div className="flex gap-3 flex-1">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-all"
                                >
                                    Go Back
                                </button>
                                <button
                                    onClick={() => onConfirm(selectedIds)}
                                    disabled={selectedIds.length === 0}
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    Process {selectedIds.length} Cancellation{selectedIds.length !== 1 ? 's' : ''}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
