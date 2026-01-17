
import { useState, useEffect } from 'react';
import { X, Plus, Calendar, DollarSign, Tag, RotateCcw, ShieldAlert, Sparkles, Bell, Zap, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Subscription, DEFAULT_CATEGORIES } from '../types';
import { cn, formatLocalDate } from '../lib/utils';
import { siteConfig } from '../../siteConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker.css';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Subscription, 'id' | 'lastPaidDate' | 'hasEverBeenPaid'>) => void;
    initialData?: Subscription | null;
    userCategories?: string[];
    isPro?: boolean;
    onDeleteCategory?: (category: string) => void;
}

export function SubscriptionModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    userCategories = DEFAULT_CATEGORIES,
    isPro = false,
    onDeleteCategory
}: SubscriptionModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [category, setCategory] = useState(initialData?.category || userCategories[0]);
    const [customCategory, setCustomCategory] = useState('');
    const [isAddingCustom, setIsAddingCustom] = useState(false);
    const [renewalDate, setRenewalDate] = useState(new Date());
    const [billingCycle, setBillingCycle] = useState<Subscription['billingCycle']>('monthly');

    // Trial / Intro Logic
    const [isTrial, setIsTrial] = useState(false);
    const [trialPrice, setTrialPrice] = useState('');
    const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
    const [isOneTimePayment, setIsOneTimePayment] = useState(false);


    // Split Billing Logic
    const [isSplit, setIsSplit] = useState(false);
    const [splitWith, setSplitWith] = useState(2);
    const [splitInput, setSplitInput] = useState('2');

    // Variable / Utility Logic
    const [isVariable, setIsVariable] = useState(false);

    // Essential / Fixed Bill Logic
    const [isEssential, setIsEssential] = useState(false);

    // Validation errors
    const [errors, setErrors] = useState<{
        name?: string;
        price?: string;
        renewalDate?: string;
        trialEndDate?: string;
    }>({});

    const [showProPrompt, setShowProPrompt] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            // Inverted Logic: If trial, initialData.price is the trial price, initialData.regularPrice is the main price
            if (initialData.isTrial) {
                setPrice(initialData.regularPrice?.toString() || '');
                setTrialPrice(initialData.price.toString());
            } else {
                setPrice(initialData.price.toString());
                setTrialPrice('');
            }
            // cast string to Currency type safely

            setCategory(initialData.category);
            // Fix: Parse YYYY-MM-DD manually to avoid UTC conversion shift
            const [rYear, rMonth, rDay] = initialData.renewalDate.split('-').map(Number);
            setRenewalDate(new Date(rYear, rMonth - 1, rDay, 12, 0, 0)); // Set to Noon

            setBillingCycle(initialData.billingCycle);
            setIsTrial(initialData.isTrial || false);

            if (initialData.trialEndDate) {
                const [tYear, tMonth, tDay] = initialData.trialEndDate.split('-').map(Number);
                setTrialEndDate(new Date(tYear, tMonth - 1, tDay, 12, 0, 0));
            } else {
                setTrialEndDate(null);
            }
            setIsOneTimePayment(initialData.isOneTimePayment || false);

            setIsSplit(initialData.isSplit || false);
            setSplitWith(initialData.splitWith || 2);
            setSplitInput(initialData.splitWith?.toString() || '2');
            setIsVariable(initialData.isVariable || false);
            setIsEssential(initialData.isEssential || false);
            setIsAddingCustom(false);
        } else {
            // Reset defaults
            setName('');
            setPrice('');

            setCategory('Other');
            setRenewalDate(new Date());
            setBillingCycle('monthly');
            setIsTrial(false);
            setTrialPrice('');
            setTrialEndDate(null);
            setIsOneTimePayment(false);
            setIsSplit(false);
            setSplitWith(2);
            setSplitInput('2');
            setSplitWith(2);
            setSplitInput('2');
            setIsVariable(false);
            setIsEssential(false);
            setIsAddingCustom(false);

            setErrors({});
            setShowProPrompt(false);
        }
    }, [initialData, isOpen]);



    // Validation function
    const validateForm = () => {
        const newErrors: typeof errors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = 'Service name is required';
        } else if (name.length > 50) {
            newErrors.name = 'Name must be 50 characters or less';
        }

        // Price validation
        if (!price) {
            newErrors.price = 'Price is required';
        } else if (parseFloat(price) <= 0) {
            newErrors.price = 'Price must be greater than 0';
        } else if (parseFloat(price) > 999999) {
            newErrors.price = 'Price cannot exceed $999,999';
        }

        // Date validation
        if (!renewalDate) {
            newErrors.renewalDate = 'Renewal date is required';
        } else if (!(renewalDate instanceof Date) || isNaN(renewalDate.getTime())) {
            newErrors.renewalDate = 'Invalid date format';
        }

        // Trial date validation
        if (isTrial && trialEndDate) {
            if (!(trialEndDate instanceof Date) || isNaN(trialEndDate.getTime())) {
                newErrors.trialEndDate = 'Invalid trial end date';
            } else if (trialEndDate > renewalDate) {
                newErrors.trialEndDate = 'Trial must end before or on renewal date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const finalCategory = (isAddingCustom && customCategory.trim()) ? customCategory.trim() : category;

        // Inverted Logic for Saving
        const savedPrice = isTrial ? (parseFloat(trialPrice) || 0) : parseFloat(price);
        const savedRegularPrice = isTrial ? parseFloat(price) : undefined;

        onSave({
            name,
            price: savedPrice,

            category: finalCategory,
            renewalDate: formatLocalDate(renewalDate),
            billingCycle,
            isTrial,
            regularPrice: savedRegularPrice,
            trialEndDate: trialEndDate ? formatLocalDate(trialEndDate) : undefined,
            isOneTimePayment: isTrial ? isOneTimePayment : undefined,

            isSplit: isSplit || undefined,
            splitWith: isSplit ? splitWith : undefined,
            isVariable: isVariable || undefined,
            isEssential
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-all"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none p-4 overflow-y-auto"
                    >
                        <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl pointer-events-auto my-8 max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">
                                    {initialData ? 'Edit Subscription' : 'Add New Subscription'}
                                </h2>
                                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service Name</label>
                                    <div className="relative group/name">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                if (errors.name) setErrors({ ...errors, name: undefined });
                                            }}
                                            className={cn(
                                                "w-full bg-slate-950 border rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none transition-all",
                                                "pl-4",
                                                errors.name
                                                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                    : "border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                            )}
                                            placeholder="e.g. Netflix"
                                            autoFocus
                                        />

                                    </div>
                                    {errors.name && (
                                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Essential / Fixed Bill Toggle */}
                                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-white">Mark as Essential / Fixed Bill</span>
                                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">New</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 max-w-[200px] leading-tight">
                                            Exclude from "Focus Mode" totals (e.g. Rent, Car Loan). Great for fixed obligations.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsEssential(!isEssential)}
                                        className={cn(
                                            "w-10 h-6 rounded-full relative transition-colors duration-200",
                                            isEssential ? "bg-emerald-500" : "bg-slate-700"
                                        )}
                                    >
                                        <motion.div
                                            initial={false}
                                            animate={{ x: isEssential ? 18 : 2 }}
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </div>

                                {/* Price & Cycle */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regular Price</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={price}
                                                onChange={(e) => {
                                                    setPrice(e.target.value);
                                                    if (errors.price) setErrors({ ...errors, price: undefined });
                                                }}
                                                className={cn(
                                                    "w-full bg-slate-950 border rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none transition-all",
                                                    errors.price
                                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                        : "border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                                )}
                                                placeholder="e.g. 14.99"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">

                                            </div>
                                        </div>
                                        {errors.price && (
                                            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                                <span>⚠</span> {errors.price}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            <input
                                                type="checkbox"
                                                id="isVariable"
                                                checked={isVariable}
                                                onChange={(e) => setIsVariable(e.target.checked)}
                                                className="w-3.5 h-3.5 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 bg-slate-800"
                                            />
                                            <label htmlFor="isVariable" className="text-[10px] text-slate-400 select-none cursor-pointer">
                                                Variable / Utility Amount?
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Billing Cycle</label>
                                        <div className="relative">
                                            <RotateCcw className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <select
                                                value={billingCycle}
                                                onChange={(e) => setBillingCycle(e.target.value as Subscription['billingCycle'])}
                                                autoComplete="off"
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-all"
                                            >
                                                <option value="weekly">Weekly</option>
                                                <option value="biweekly">Bi-weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="quarterly">Quarterly</option>
                                                <option value="yearly">Yearly</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto custom-scrollbar pr-1">
                                        {userCategories.map((cat) => (
                                            <div key={cat} className="group/cat relative">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCategory(cat);
                                                        setIsAddingCustom(false);

                                                        // Smart Feature: Auto-mark specific categories as Essential
                                                        const ESSENTIAL_CATEGORIES = [
                                                            'Housing & Rent',
                                                            'Utility Bills',
                                                            'Auto Loan', // Fixed bills (Loans, Insurance)
                                                            'Finance & Insurance',
                                                            'Loans & Debt'
                                                        ];

                                                        if (ESSENTIAL_CATEGORIES.includes(cat)) {
                                                            setIsEssential(true);
                                                        } else {
                                                            setIsEssential(false);
                                                        }
                                                    }}
                                                    className={cn(
                                                        "w-full px-3 py-2 rounded-lg text-xs font-bold border transition-all text-left",
                                                        category === cat && !isAddingCustom
                                                            ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                                                            : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600"
                                                    )}
                                                >
                                                    {cat}
                                                </button>
                                                {/* Allow deleting ONLY custom categories (not defaults) */}
                                                {!DEFAULT_CATEGORIES.includes(cat) && onDeleteCategory && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDeleteCategory(cat);
                                                            if (category === cat) setCategory('Other');
                                                        }}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-red-400 bg-slate-900/80 rounded-full transition-all z-10"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (isPro) {
                                                    setIsAddingCustom(true);
                                                } else {
                                                    setShowProPrompt(true);
                                                }
                                            }}
                                            className={cn(
                                                "px-3 py-2 rounded-lg text-xs font-bold border transition-all text-left flex items-center justify-between gap-1",
                                                isAddingCustom
                                                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                                                    : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600"
                                            )}
                                        >
                                            <span className="flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> Custom...
                                            </span>
                                            {!isPro && <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />}
                                        </button>
                                    </div>

                                    {showProPrompt && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 flex items-center justify-between gap-3 mt-2"
                                        >
                                            <p className="text-[10px] font-bold text-indigo-300 leading-tight">
                                                Custom categories are a PRO feature. Unlock to personalize your spending.
                                            </p>
                                            <Zap className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
                                        </motion.div>
                                    )}

                                    {isAddingCustom && isPro && (
                                        <motion.input
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            type="text"
                                            value={customCategory}
                                            onChange={(e) => setCustomCategory(e.target.value)}
                                            placeholder="Enter new category name..."
                                            className="w-full bg-slate-800 border-2 border-indigo-500/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none mt-2"
                                            autoFocus
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Renewal</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                                        <DatePicker
                                            selected={renewalDate}
                                            onChange={(date: Date | null) => {
                                                if (date) {
                                                    setRenewalDate(date);
                                                    if (errors.renewalDate) setErrors({ ...errors, renewalDate: undefined });
                                                }
                                            }}
                                            dateFormat="MM/dd/yyyy"
                                            popperPlacement="top"
                                            className={cn(
                                                "w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none transition-all",
                                                errors.renewalDate
                                                    ? "border-red-500 focus:border-red-500"
                                                    : "border-slate-800 focus:border-indigo-500"
                                            )}
                                            calendarClassName="custom-datepicker"
                                        />
                                    </div>
                                    {errors.renewalDate && (
                                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.renewalDate}
                                        </p>
                                    )}
                                </div>

                                {/* Trial Shield Section */}
                                <div className="space-y-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 relative group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                                                <ShieldAlert className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                                                    Trial Shield
                                                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full uppercase tracking-wider">New</span>
                                                </p>
                                                <p className="text-[11px] text-slate-500">Track free trials & intro offers</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (isPro) {
                                                    setIsTrial(!isTrial);
                                                } else {
                                                    setShowProPrompt(true);
                                                }
                                            }}
                                            className={cn(
                                                "w-10 h-6 rounded-full relative transition-colors duration-200",
                                                isTrial ? "bg-indigo-600" : "bg-slate-800",
                                                !isPro && "opacity-80"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 shadow-sm flex items-center justify-center",
                                                isTrial ? "left-5" : "left-1"
                                            )}>
                                                {!isPro && !isTrial && <Zap className="w-2.5 h-2.5 text-indigo-500 fill-indigo-500" />}
                                            </div>
                                        </button>
                                    </div>

                                    {!isPro && showProPrompt && !isAddingCustom && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mt-2"
                                        >
                                            <p className="text-[11px] text-indigo-300 font-medium">
                                                <Zap className="w-3 h-3 inline mr-1 fill-indigo-400" />
                                                Trial Shield is a Pro feature. Track free trials and get alerts before you're charged.
                                            </p>
                                        </motion.div>
                                    )}

                                    {isTrial && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-4 pt-2"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                                    Intro / Trial Price
                                                </label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={trialPrice}
                                                        onChange={(e) => setTrialPrice(e.target.value)}
                                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
                                                        placeholder="0.00 (Free Trial)"
                                                    />
                                                </div>
                                                <p className="text-[10px] text-slate-500 italic">
                                                    This price applies until the trial ends. Set to 0 for free trials.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                                <input
                                                    type="checkbox"
                                                    id="oneTimePayment"
                                                    checked={isOneTimePayment}
                                                    onChange={(e) => setIsOneTimePayment(e.target.checked)}
                                                    className="w-4 h-4 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 bg-slate-800"
                                                />
                                                <label htmlFor="oneTimePayment" className="text-xs text-slate-300 select-none cursor-pointer">
                                                    Results inside a one-time payment for full duration
                                                </label>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                                    Trial End Date
                                                </label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                                                    <DatePicker
                                                        selected={trialEndDate}
                                                        onChange={(date: Date | null) => {
                                                            setTrialEndDate(date);
                                                            if (errors.trialEndDate) setErrors({ ...errors, trialEndDate: undefined });
                                                        }}
                                                        dateFormat="MM/dd/yyyy"
                                                        popperPlacement="bottom-start"
                                                        className={cn(
                                                            "w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none transition-all text-sm",
                                                            errors.trialEndDate
                                                                ? "border-red-500 focus:border-red-500"
                                                                : "border-slate-800 focus:border-indigo-500"
                                                        )}
                                                        placeholderText="When does trial expire?"
                                                        calendarClassName="custom-datepicker"
                                                    />
                                                </div>
                                                {errors.trialEndDate ? (
                                                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                                        <span>⚠</span> {errors.trialEndDate}
                                                    </p>
                                                ) : (
                                                    <p className="text-[10px] text-slate-500 italic">
                                                        Calendar alert will trigger 1 day before this date.
                                                    </p>
                                                )}
                                            </div>

                                            <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 rounded-xl p-3 flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-bold text-indigo-300">Calendar Bridge Included</p>
                                                    <p className="text-[10px] text-slate-400">Save to get an alert 1 day before the trial ends.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Shared Subscription Section */}
                                <div className="space-y-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 relative group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                                                    Shared Subscription
                                                </p>
                                                <p className="text-[11px] text-slate-500">Split with roommates or family</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (isPro) {
                                                    setIsSplit(!isSplit);
                                                } else {
                                                    setShowProPrompt(true);
                                                }
                                            }}
                                            className={cn(
                                                "w-10 h-6 rounded-full relative transition-colors duration-200",
                                                isSplit ? "bg-emerald-600" : "bg-slate-800",
                                                !isPro && "opacity-80"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 shadow-sm flex items-center justify-center",
                                                isSplit ? "left-5" : "left-1"
                                            )}>
                                                {!isPro && !isSplit && <Zap className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500" />}
                                            </div>
                                        </button>
                                    </div>

                                    {!isPro && showProPrompt && !isAddingCustom && !isTrial && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mt-2"
                                        >
                                            <p className="text-[11px] text-emerald-300 font-medium">
                                                <Zap className="w-3 h-3 inline mr-1 fill-emerald-400" />
                                                Split Billing is a Pro feature. Track shared subscriptions and see your actual cost.
                                            </p>
                                        </motion.div>
                                    )}

                                    {isSplit && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-4 pt-2"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    Split between how many people?
                                                </label>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    value={splitInput}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        setSplitInput(val);

                                                        const num = parseInt(val);
                                                        if (num >= 2 && num <= 10) {
                                                            setSplitWith(num);
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        const num = parseInt(splitInput);
                                                        if (!num || num < 2 || num > 10) {
                                                            setSplitInput(splitWith.toString());
                                                        }
                                                    }}
                                                    placeholder="2"
                                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all text-sm text-center font-bold text-xl"
                                                />
                                                <p className="text-[10px] text-slate-500 italic">
                                                    Total people sharing (including you). Min: 2, Max: 10
                                                </p>
                                            </div>

                                            {price && parseFloat(price) > 0 && (
                                                <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-xl p-3">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Full Price</p>
                                                            <p className="text-lg font-black text-slate-400">${parseFloat(price).toFixed(2)}</p>
                                                        </div>
                                                        <div className="text-slate-600 text-2xl">→</div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">Your Share</p>
                                                            <p className="text-2xl font-black text-emerald-400">
                                                                ${(parseFloat(price) / splitWith).toFixed(2)}
                                                            </p>
                                                            <p className="text-[9px] text-slate-500 mt-0.5">Split {splitWith} ways</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={Object.keys(errors).length > 0 && (errors.name || errors.price || errors.renewalDate) !== undefined}
                                    className={cn(
                                        "w-full font-bold py-4 rounded-xl shadow-lg transform transition-all",
                                        Object.keys(errors).length > 0 && (errors.name || errors.price || errors.renewalDate)
                                            ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]"
                                    )}
                                >
                                    {initialData ? 'Save Changes' : 'Add Subscription'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
}
