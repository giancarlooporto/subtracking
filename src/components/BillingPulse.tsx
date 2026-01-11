import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Subscription } from '../types';
import { getNextOccurrence, getCategoryColorHex } from '../lib/utils';
import { Activity } from 'lucide-react';

const PulseDot = memo(({
    day,
    today,
    hasSubs,
    pulseOffset,
    dotColor,
    subs,
    totalOnDay,
    tooltipPositionClass,
    baselineY
}: {
    day: number,
    today: number,
    hasSubs: boolean,
    pulseOffset: number,
    dotColor: string,
    subs: Subscription[],
    totalOnDay: number,
    tooltipPositionClass: string,
    baselineY: number
}) => {
    return (
        <div
            className="relative group/day flex flex-col items-center"
            style={{
                width: '3%',
                height: '100%'
            }}
        >
            {/* The Dot */}
            <motion.div
                initial={false}
                animate={{
                    y: hasSubs ? -pulseOffset : 0,
                    scale: hasSubs ? 1 : 0.6,
                    backgroundColor: dotColor,
                    opacity: hasSubs ? 1 : (day === today ? 0.8 : 0.3)
                }}
                transition={{ duration: 0.2 }}
                className={`absolute rounded-full cursor-pointer transition-shadow
                    ${hasSubs
                        ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 shadow-lg hover:shadow-xl'
                        : 'w-1.5 h-1.5'
                    }
                    ${day === today && !hasSubs ? 'ring-2 ring-indigo-500/50' : ''}
                `}
                style={{
                    top: `${baselineY}%`,
                    transform: `translateY(-50%)`,
                    boxShadow: hasSubs ? `0 0 12px ${dotColor}40` : 'none'
                }}
            />

            {/* Pulse Line */}
            {hasSubs && pulseOffset > 2 && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: pulseOffset }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-0.5 rounded-full opacity-40"
                    style={{
                        top: `calc(${baselineY}% - ${pulseOffset}px)`,
                        backgroundColor: dotColor,
                        height: `${pulseOffset}px`
                    }}
                />
            )}

            {/* Tooltip on Hover */}
            {hasSubs && (
                <div className={`absolute ${tooltipPositionClass} w-auto min-w-[10rem] max-w-[200px] sm:max-w-none bg-slate-900/95 backdrop-blur-sm border border-slate-700 p-3 rounded-xl shadow-2xl opacity-0 scale-95 group-hover/day:opacity-100 group-hover/day:scale-100 transition-all pointer-events-none z-50`}
                    style={{ bottom: `calc(50% + ${pulseOffset + 16}px)` }}
                >
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1 whitespace-nowrap text-center">
                        Day {day} • ${totalOnDay.toFixed(0)}
                    </div>
                    <div className="space-y-1.5">
                        {subs.map(sub => (
                            <div key={sub.id} className="flex items-center justify-between text-xs text-slate-200 gap-3">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: getCategoryColorHex(sub.category) }}></div>
                                    <span className="truncate font-medium">{sub.name}</span>
                                </div>
                                <span className="font-mono opacity-80 whitespace-nowrap">${sub.price.toFixed(0)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Day Number Labels */}
            {(day === 1 || day === 10 || day === 20 || day === 30) && (
                <div className="absolute text-[9px] text-slate-600 font-medium" style={{ top: `calc(${baselineY}% + 16px)` }}>
                    {day}
                </div>
            )}
        </div>
    );
});

PulseDot.displayName = 'PulseDot';

interface BillingPulseProps {
    subscriptions: Subscription[];
}

export function BillingPulse({ subscriptions }: BillingPulseProps) {
    const now = new Date();
    const today = now.getDate();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Get the actual number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Calculate fractional day progress (0.0 = midnight, 0.5 = noon, 1.0 = end of day)
    const hoursProgress = (now.getHours() + now.getMinutes() / 60) / 24;
    const todayWithProgress = today - 1 + hoursProgress;

    // Map subscriptions to days of the current month only
    const pulseData = useMemo(() => {
        const map: Record<number, Subscription[]> = {};

        // Define the current month's boundaries
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0); // Last day of current month

        subscriptions.forEach(sub => {
            // Get the first occurrence on or after today
            let nextDateStr = getNextOccurrence(sub.renewalDate, sub.billingCycle);
            let [year, month, day] = nextDateStr.split('-').map(Number);
            let nextDate = new Date(year, month - 1, day);

            // For weekly/biweekly, we need to find all occurrences in the current month
            if (sub.billingCycle === 'weekly' || sub.billingCycle === 'biweekly') {
                // First, rewind to find the first occurrence in or before the current month
                const incrementDays = sub.billingCycle === 'weekly' ? 7 : 14;

                // Go back to find the very first occurrence in this month
                let checkDate = new Date(nextDate);
                while (checkDate > monthStart) {
                    const prevDate = new Date(checkDate);
                    prevDate.setDate(prevDate.getDate() - incrementDays);
                    if (prevDate < monthStart) break;
                    checkDate = prevDate;
                }

                // Now iterate forward and add all occurrences within this month
                while (checkDate <= monthEnd) {
                    if (checkDate >= monthStart && checkDate <= monthEnd) {
                        const dayOfMonth = checkDate.getDate();
                        if (!map[dayOfMonth]) map[dayOfMonth] = [];
                        // Avoid duplicates
                        if (!map[dayOfMonth].some(s => s.id === sub.id)) {
                            map[dayOfMonth].push(sub);
                        }
                    }
                    checkDate.setDate(checkDate.getDate() + incrementDays);
                }
            } else {
                // For monthly, quarterly, yearly - only show if renewal is in the current month
                if (nextDate.getFullYear() === currentYear && nextDate.getMonth() === currentMonth) {
                    if (!map[day]) map[day] = [];
                    map[day].push(sub);
                }
            }
        });

        return map;
    }, [subscriptions, currentYear, currentMonth]);

    // Calculate max spend to normalize pulse heights
    const { maxSpend, dayTotals } = useMemo(() => {
        const totals: Record<number, number> = {};
        let max = 0;

        for (let day = 1; day <= 31; day++) {
            const subs = pulseData[day] || [];
            const total = subs.reduce((sum, s) => sum + s.price, 0);
            totals[day] = total;
            if (total > max) max = total;
        }

        return { maxSpend: max, dayTotals: totals };
    }, [pulseData]);

    // Generate days array 1..31
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Pulse height config
    const maxPulseHeight = 36; // pixels - how high expensive days spike
    const baselineY = 50; // percentage from top where baseline sits

    return (
        <div className="glass-panel rounded-2xl p-6 relative group z-20">
            <div className="flex items-center space-x-2 mb-4 relative z-10">
                <Activity className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Household Pulse</h3>
                {maxSpend > 0 && (
                    <span className="text-[10px] text-slate-500 ml-auto">Peak: ${maxSpend.toFixed(0)}</span>
                )}
            </div>

            {/* Timeline Track */}
            <div className="relative mt-2 px-2 pb-10" style={{ height: '100px' }}>
                {/* The Baseline */}
                <div
                    className="absolute left-0 right-0 h-0.5 bg-slate-800/50 rounded-full"
                    style={{ top: `${baselineY}%` }}
                />

                {/* Today Indicator (Line) - positioned with time-of-day progress */}
                <div
                    className="absolute w-0.5 bg-indigo-500/40 z-0 rounded-full"
                    style={{
                        left: `calc(${(todayWithProgress / 30) * 97}% + 1.5%)`,
                        top: '10%',
                        height: '70%'
                    }}
                >
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-400 uppercase whitespace-nowrap">
                        Today
                    </div>
                </div>

                {/* Days with Pulse Effect */}
                <div className="relative flex justify-between items-center h-full z-10">
                    {days.map((day) => {
                        const subs = pulseData[day] || [];
                        const hasSubs = subs.length > 0;
                        const isToday = day === today;
                        const totalOnDay = dayTotals[day] || 0;
                        const pulseOffset = maxSpend > 0 ? (totalOnDay / maxSpend) * maxPulseHeight : 0;
                        const intensity = maxSpend > 0 ? totalOnDay / maxSpend : 0;

                        const dotColor = hasSubs
                            ? intensity > 0.7
                                ? '#ef4444'
                                : intensity > 0.4
                                    ? '#f97316'
                                    : '#22c55e'
                            : (isToday ? '#6366f1' : '#334155');

                        let tooltipPositionClass = "left-1/2 -translate-x-1/2 origin-bottom";
                        if (day <= 10) tooltipPositionClass = "left-0 origin-bottom-left";
                        if (day >= 22) tooltipPositionClass = "right-0 origin-bottom-right";

                        return (
                            <PulseDot
                                key={day}
                                day={day}
                                today={today}
                                hasSubs={hasSubs}
                                pulseOffset={pulseOffset}
                                dotColor={dotColor}
                                subs={subs}
                                totalOnDay={totalOnDay}
                                tooltipPositionClass={tooltipPositionClass}
                                baselineY={baselineY}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
