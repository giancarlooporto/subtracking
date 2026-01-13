import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (amount: number, date: Date) => void;
    subscriptionName: string;
    currentDate?: Date;
    estimatedAmount?: number;
}

export const PaymentModal = ({ isOpen, onClose, onConfirm, subscriptionName, currentDate = new Date(), estimatedAmount }: PaymentModalProps) => {
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<Date>(currentDate);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (!isNaN(numAmount) && numAmount > 0) {
            onConfirm(numAmount, date);
            onClose();
            setAmount(''); // Reset after submit
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                Record Payment
                            </h2>
                            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="text-center">
                                <p className="text-slate-400 text-sm mb-1">Marking as paid:</p>
                                <h3 className="text-xl font-bold text-white">{subscriptionName}</h3>
                            </div>

                            <div className="space-y-4">
                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                                        Amount Paid
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-400 font-bold">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder={estimatedAmount ? `Est: ${estimatedAmount.toFixed(2)}` : "0.00"}
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-8 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all font-mono text-lg"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Date Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                                        Payment Date
                                    </label>
                                    <div className="relative">
                                        <ReactDatePicker
                                            selected={date}
                                            onChange={(date: Date | null) => date && setDate(date)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all cursor-pointer"
                                            dateFormat="MMM d, yyyy"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!amount || parseFloat(amount) <= 0}
                                className={cn(
                                    "w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                                    amount && parseFloat(amount) > 0
                                        ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                Confirm Payment
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
