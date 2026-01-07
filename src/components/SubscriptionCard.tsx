import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, MoreVertical, Edit3, Trash2, Check, ExternalLink } from 'lucide-react';
import { Subscription } from '../types';
import { cn, getCategoryColorHex, getCategoryIcon, getDaysRemaining, getNextOccurrence } from '../lib/utils';

interface SubscriptionCardProps {
    subscription: Subscription;
    viewMode?: 'monthly' | 'yearly';
    onEdit: (sub: Subscription) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
    onMarkPaid?: (id: string) => void;
}

export function SubscriptionCard({ subscription, viewMode = 'monthly', onEdit, onDelete, onMarkPaid }: SubscriptionCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const nextRenewal = getNextOccurrence(subscription.renewalDate, subscription.billingCycle);
    const days = getDaysRemaining(nextRenewal);

    const isUrgent = days <= 2;
    const isDueSoon = days <= 7 && days > 2;
    const isExpired = days < 0;

    // Calculate display price based on viewMode
    let monthlyPrice = subscription.price;
    if (subscription.billingCycle === 'weekly') monthlyPrice = subscription.price * 4.33;
    else if (subscription.billingCycle === 'biweekly') monthlyPrice = subscription.price * 2.16;
    else if (subscription.billingCycle === 'quarterly') monthlyPrice = subscription.price / 3;
    else if (subscription.billingCycle === 'yearly') monthlyPrice = subscription.price / 12;

    const displayPrice = viewMode === 'monthly' ? monthlyPrice : monthlyPrice * 12;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4, scale: 1.01, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            className={cn(
                "glass-card relative rounded-2xl transition-all duration-300 group mb-4", // Removed overflow-hidden
                isMenuOpen ? "z-30 shadow-2xl" : "z-10", // Elevated state
                isUrgent ? "shadow-red-500/10 border-red-500/20" : "hover:border-white/10 hover:shadow-indigo-500/10"
            )}
        >
            {/* Clipped Decorative Background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div
                    className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors duration-500"
                />
                {/* Progress/Usage Bar Placeholder (Visual Only for now) */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 w-0 group-hover:w-full transition-all duration-700 ease-out opacity-50" />
            </div>

            <div className="relative p-5 flex items-center justify-between z-10">
                <div className="flex items-center space-x-4">
                    {/* Icon Box */}
                    <div
                        className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110",
                            "border border-white/5" // Added minimal border for glass feel
                        )}
                        style={{
                            backgroundColor: `${getCategoryColorHex(subscription.category)}20`,
                            color: getCategoryColorHex(subscription.category)
                        }}
                    >
                        {getCategoryIcon(subscription.category)}
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-lg leading-tight group-hover:text-indigo-200 transition-colors">
                            {subscription.name}
                        </h3>

                        <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 mt-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/50 backdrop-blur-sm">
                                {subscription.category}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="capitalize">{subscription.billingCycle} billing</span>

                            {(isUrgent || isDueSoon || isExpired) && (
                                <>
                                    <span className="text-slate-600">•</span>
                                    <span className={cn(
                                        "flex items-center font-bold px-1.5 py-0.5 rounded-md",
                                        isUrgent || isExpired ? "bg-red-500/10 text-red-400 animate-pulse" : "bg-amber-500/10 text-amber-400"
                                    )}>
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        {days === 0 ? 'Today' : isExpired ? 'Overdue' : `${days} days`}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <div className="text-xl font-black text-white tracking-tight flex items-baseline justify-end gap-0.5">
                            <span className="text-base text-slate-500 font-medium">$</span>
                            {displayPrice.toFixed(2)}
                        </div>
                        <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest leading-none mt-1 opacity-80">
                            {viewMode === 'monthly' ? '/ mo' : '/ yr'}
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
                            className={cn(
                                "p-2 rounded-lg transition-colors outline-none",
                                isMenuOpen ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-800 hover:text-white"
                            )}
                            aria-label="Options"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                                >
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                onEdit(subscription);
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-800 transition-colors text-slate-300 hover:text-indigo-300 text-sm"
                                            aria-label={`Edit ${subscription.name}`}
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            <span>Edit Details</span>
                                        </button>

                                        {onMarkPaid && (
                                            <button
                                                onClick={() => {
                                                    onMarkPaid(subscription.id);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-800 transition-colors text-slate-300 hover:text-emerald-300 text-sm"
                                                aria-label={`Mark ${subscription.name} as paid`}
                                            >
                                                <Check className="w-4 h-4" />
                                                <span>Mark Paid</span>
                                            </button>
                                        )}

                                        <div className="h-px bg-slate-800 my-1" />

                                        <button
                                            onClick={(e) => {
                                                onDelete(subscription.id, e);
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300 text-sm"
                                            aria-label={`Delete ${subscription.name}`}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete Subscription</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

        </motion.div>
    );
}
