import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Ghost, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { Subscription } from '../types';
import { cn } from '../lib/utils';

interface GhostMeterProps {
    subscriptions: Subscription[];
}

export function GhostMeter({ subscriptions }: GhostMeterProps) {
    const metrics = useMemo(() => {
        const monthlyTotal = subscriptions.reduce((sum, sub) => {
            let monthlyPrice = sub.price;
            if (sub.billingCycle === 'weekly') monthlyPrice = sub.price * 4.33;
            else if (sub.billingCycle === 'biweekly') monthlyPrice = sub.price * 2.16;
            else if (sub.billingCycle === 'quarterly') monthlyPrice = sub.price / 3;
            else if (sub.billingCycle === 'yearly') monthlyPrice = sub.price / 12;
            return sum + monthlyPrice;
        }, 0);

        return {
            monthly: monthlyTotal,
            fiveYear: monthlyTotal * 12 * 5,
            tenYear: monthlyTotal * 12 * 10,
            hasSubs: subscriptions.length > 0
        };
    }, [subscriptions]);

    if (!metrics.hasSubs) {
        return (
            <div className="glass-panel rounded-2xl p-6 h-[380px] flex flex-col items-center justify-center text-slate-500 space-y-4 text-center">
                <Ghost className="w-12 h-12 opacity-20" />
                <p className="text-xs font-medium max-w-[150px]">Add subscriptions to see your future "Ghost Costs"</p>
            </div>
        );
    }

    return (
        <div className="glass-panel rounded-2xl p-6 h-[380px] flex flex-col relative overflow-hidden group">
            <div className="flex items-center space-x-2 text-purple-400 mb-2 z-10">
                <Ghost className="w-5 h-5 transition-transform group-hover:scale-110" />
                <h3 className="font-bold text-white">Ghost Meter</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6 z-10">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3" />
                        10-Year Projection
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white tracking-tighter">
                            ${metrics.tenYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                        <span className="text-purple-400/80 text-xs font-bold">Lost Wealth</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30 space-y-1">
                        <div className="text-[9px] font-bold text-slate-500 uppercase">5-Year Burn</div>
                        <div className="text-lg font-bold text-slate-200">
                            ${metrics.fiveYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>
                    <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30 space-y-1">
                        <div className="text-[9px] font-bold text-slate-500 uppercase">Monthly Tap</div>
                        <div className="text-lg font-bold text-slate-200">
                            ${metrics.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-500/5 rounded-xl border border-purple-500/10">
                    <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                        The "Ghost of Future Spending" reminds us that small leaks sink great ships.
                    </p>
                </div>
            </div>

            {/* Ghost Animation */}
            <motion.div
                className="absolute -bottom-4 -right-4 text-purple-500/5 pointer-events-none group-hover:text-purple-500/10 transition-colors"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Ghost className="w-48 h-48" />
            </motion.div>

            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/10 transition-all duration-700" />
        </div>
    );
}
