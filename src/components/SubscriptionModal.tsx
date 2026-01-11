import { useState, useEffect } from 'react';
import { X, Plus, Calendar, DollarSign, Tag, RotateCcw, ShieldAlert, Sparkles, Bell, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Subscription, DEFAULT_CATEGORIES } from '../types';
import { cn } from '../lib/utils';
import { siteConfig } from '../../siteConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Subscription, 'id' | 'lastPaidDate' | 'hasEverBeenPaid'>) => void;
    initialData?: Subscription | null;
    userCategories?: string[];
    isPro?: boolean;
}

export function SubscriptionModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    userCategories = DEFAULT_CATEGORIES,
    isPro = false
}: SubscriptionModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Other');
    const [customCategory, setCustomCategory] = useState('');
    const [isAddingCustom, setIsAddingCustom] = useState(false);
    const [renewalDate, setRenewalDate] = useState(new Date());
    const [billingCycle, setBillingCycle] = useState<Subscription['billingCycle']>('monthly');

    // Trial / Intro Logic
    const [isTrial, setIsTrial] = useState(false);
    const [trialPrice, setTrialPrice] = useState('');

    // Validation errors
    const [errors, setErrors] = useState<{
        name?: string;
        price?: string;
        renewalDate?: string;
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
            setCategory(initialData.category);
            setRenewalDate(new Date(initialData.renewalDate));
            setBillingCycle(initialData.billingCycle);
            setIsTrial(initialData.isTrial || false);
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
            renewalDate: renewalDate.toISOString().split('T')[0],
            billingCycle,
            isTrial,
            regularPrice: savedRegularPrice,
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
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (errors.name) setErrors({ ...errors, name: undefined });
                                        }}
                                        className={cn(
                                            "w-full bg-slate-950 border rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none transition-all",
                                            errors.name
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                                : "border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        )}
                                        placeholder="e.g. Netflix"
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.name}
                                        </p>
                                    )}
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
                                        </div>
                                        {errors.price && (
                                            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                                <span>⚠</span> {errors.price}
                                            </p>
                                        )}
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
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => { setCategory(cat); setIsAddingCustom(false); }}
                                                className={cn(
                                                    "px-3 py-2 rounded-lg text-xs font-bold border transition-all text-left",
                                                    category === cat && !isAddingCustom
                                                        ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                                                        : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600"
                                                )}
                                            >
                                                {cat}
                                            </button>
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
                                <div className="space-y-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 relative overflow-hidden group">
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
                                            onClick={() => setIsTrial(!isTrial)}
                                            className={cn(
                                                "w-10 h-6 rounded-full relative transition-colors duration-200",
                                                isTrial ? "bg-indigo-600" : "bg-slate-800"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 shadow-sm",
                                                isTrial ? "left-5" : "left-1"
                                            )} />
                                        </button>
                                    </div>

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
                                                    This price applies until the renewal date. Set to 0 for free trials.
                                                </p>
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
            )}
        </AnimatePresence>
    );
}
