import { memo } from 'react';
import { Settings, Sparkles, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../siteConfig';
import { getCurrencySymbol } from '../types';

interface StatsOverviewProps {
    averageMonthly: number;
    variableTotal: number;
    viewMode: 'monthly' | 'yearly';
    onViewModeChange: (mode: 'monthly' | 'yearly') => void;
    financeViewMode: 'focus' | 'total';
    onFinanceViewModeChange: (mode: 'focus' | 'total') => void;
    onOpenSettings: () => void;
    onStartAudit: () => void;
    currency?: string;
}

export const StatsOverview = memo(({
    averageMonthly,
    variableTotal,
    viewMode,
    onViewModeChange,
    financeViewMode,
    onFinanceViewModeChange,
    onOpenSettings,
    onStartAudit,
    currency = 'USD'
}: StatsOverviewProps) => {
    const symbol = getCurrencySymbol(currency);
    const displayAmount = viewMode === 'monthly' ? averageMonthly : averageMonthly * 12;
    const displayVariable = viewMode === 'monthly' ? variableTotal : variableTotal * 12;
    const hasVariable = displayVariable > 0;

    return (
        <section className="relative w-full max-w-4xl mx-auto mb-12 text-center">
            {/* Ambient Background Glow for Hero */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center space-y-6">


                {/* Big Number Removed - Handled by dashboard/page.tsx sticky animation */}
                <div className="h-0" /> {/* Spacer removed to close gap */}

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8 max-w-full px-4">
                    {/* Toggle */}
                    <button
                        onClick={() => onViewModeChange(viewMode === 'monthly' ? 'yearly' : 'monthly')}
                        className="flex items-center gap-1.5 px-1.5 py-1.5 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-full cursor-pointer hover:bg-slate-800/50 transition-all"
                    >
                        <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${viewMode === 'monthly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white'}`}>
                            Monthly
                        </span>
                        <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${viewMode === 'yearly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white'}`}>
                            Yearly
                        </span>
                    </button>

                    {/* Finance Mode Toggle */}
                    <button
                        onClick={() => onFinanceViewModeChange(financeViewMode === 'focus' ? 'total' : 'focus')}
                        className="flex items-center gap-1.5 px-1.5 py-1.5 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-full cursor-pointer hover:bg-slate-800/50 transition-all"
                    >
                        <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${financeViewMode === 'focus' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:text-white'}`}>
                            Subs Only
                        </span>
                        <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${financeViewMode === 'total' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:text-white'}`}>
                            Total Life
                        </span>
                    </button>

                    {/* Actions Group - Wrapped together to keep them side-by-side */}
                    <div className="flex items-center gap-3 pl-1 sm:pl-3 sm:border-l border-slate-800/50">
                        <button
                            onClick={onStartAudit}
                            className="p-2.5 sm:p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full transition-all"
                            title="Start SubTracking Wizard!"
                        >
                            <Sparkles className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onOpenSettings}
                            className="p-2.5 sm:p-3 bg-slate-800/50 hover:bg-slate-700 text-slate-400 border border-slate-700/50 rounded-full transition-all"
                            title="Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
});

StatsOverview.displayName = 'StatsOverview';
