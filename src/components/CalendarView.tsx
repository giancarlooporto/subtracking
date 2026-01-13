import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, AlertCircle } from 'lucide-react';
import { Subscription } from '../types';
import { cn, getNextOccurrence, getCategoryColorHex, getCategoryIcon } from '../lib/utils';
import { SubscriptionCard } from './SubscriptionCard';

interface CalendarViewProps {
    subscriptions: Subscription[];
    isPro: boolean;
    onUnlockPro: () => void;
    onEdit: (sub: Subscription) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
    onMarkPaid: (id: string) => void;
}

export function CalendarView({ subscriptions, isPro, onUnlockPro, onEdit, onDelete, onMarkPaid }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


    // Calendar logic
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const totalDays = daysInMonth(year, month);
    const offset = firstDayOfMonth(year, month);

    // Get subscriptions for a specific day
    const getSubsForDay = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return subscriptions.filter(sub => {
            const occurrence = getNextOccurrence(sub.renewalDate, sub.billingCycle);
            // Simple match for the current view month/day. 
            // In a real app, we'd calculate all occurrences in the month, 
            // but for a minimalist view, showing the next occurrence is often enough.
            return occurrence === dateStr;
        });
    };

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const blanks = Array.from({ length: offset }, (_, i) => i);

    const selectedDaySubs = selectedDate ? getSubsForDay(selectedDate.getDate()) : [];

    return (
        <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[32px] border border-white/5 relative group">
                {!isPro && (
                    <div className="absolute inset-0 z-50 backdrop-blur-md bg-slate-900/60 rounded-[32px] flex items-center justify-center p-8 text-center">
                        <div className="space-y-4 max-w-xs">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto">
                                <Zap className="w-6 h-6 text-indigo-400 fill-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Billing Command Center</h3>
                            <p className="text-sm text-slate-400">
                                Unlock the Calendar View to see exactly when every dollar leaves your account.
                            </p>
                            <button
                                onClick={onUnlockPro}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                            >
                                Unlock Pro Access
                            </button>
                        </div>
                    </div>
                )}

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {currentDate.toLocaleString('default', { month: 'long' })}
                        <span className="text-slate-500 font-medium">{year}</span>
                    </h3>
                    <div className="flex items-center gap-2">
                        <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-y-4 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <span key={day} className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">{day}</span>
                    ))}

                    {blanks.map(i => <div key={`blank-${i}`} />)}

                    {days.map(day => {
                        const daySubs = getSubsForDay(day);
                        const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
                        const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

                        return (
                            <button
                                key={day}
                                onClick={() => setSelectedDate(new Date(year, month, day))}
                                className="relative flex flex-col items-center justify-center h-12 group/day"
                            >
                                {isSelected && (
                                    <motion.div
                                        layoutId="selectedDay"
                                        className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl pointer-events-none"
                                    />
                                )}

                                <span className={cn(
                                    "text-sm font-bold relative z-10 transition-colors",
                                    isSelected ? "text-indigo-400" : isToday ? "text-white" : "text-slate-500 group-hover/day:text-slate-300"
                                )}>
                                    {day}
                                    {isToday && <div className="absolute -top-1 -right-1 w-1 h-1 bg-indigo-500 rounded-full" />}
                                </span>

                                {/* Dots Container */}
                                <div className="flex gap-1 mt-1 justify-center relative z-10 min-h-[4px]">
                                    {daySubs.slice(0, 3).map((sub, idx) => (
                                        <div
                                            key={sub.id}
                                            className={cn(
                                                "w-1 h-1 rounded-full",
                                                sub.isTrial ? "bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.5)]" : "bg-indigo-400"
                                            )}
                                            style={!sub.isTrial ? { backgroundColor: getCategoryColorHex(sub.category) } : {}}
                                        />
                                    ))}
                                    {daySubs.length > 3 && (
                                        <div className="w-1 h-1 bg-slate-600 rounded-full" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Day Detail Peek */}
            <AnimatePresence mode="wait">
                {selectedDate && (
                    <motion.div
                        key={selectedDate.toISOString()}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between px-2">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                                Due on {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                            </h4>
                            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">
                                {selectedDaySubs.length} Items
                            </span>
                        </div>

                        <div className="space-y-2">
                            {selectedDaySubs.length > 0 ? (
                                selectedDaySubs.map(sub => (
                                    <SubscriptionCard
                                        key={sub.id}
                                        subscription={sub}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onMarkPaid={onMarkPaid}
                                    />
                                ))
                            ) : (
                                <div className="p-8 text-center bg-slate-900/40 border border-dashed border-white/5 rounded-2xl">
                                    <p className="text-sm text-slate-600 font-medium italic">No payments scheduled for this day.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
