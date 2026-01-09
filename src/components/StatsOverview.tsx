import { Settings, Sparkles, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../siteConfig';

interface StatsOverviewProps {
    monthlyTotal: number;
    viewMode: 'monthly' | 'yearly';
    onViewModeChange: (mode: 'monthly' | 'yearly') => void;
    onOpenSettings: () => void;
    onStartAudit: () => void;
}

export function StatsOverview({
    monthlyTotal,
    viewMode,
    onViewModeChange,
    onOpenSettings,
    onStartAudit
}: StatsOverviewProps) {
    const displayAmount = viewMode === 'monthly' ? monthlyTotal : monthlyTotal * 12;

    return (
        <section className="relative w-full max-w-4xl mx-auto mb-12 text-center">
            {/* Ambient Background Glow for Hero */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center space-y-6">

                {/* Title / Brand */}
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="SubTracking Logo" className="w-8 h-8 rounded-lg shadow-lg" />
                    <h1 className="text-2xl font-medium tracking-tight text-slate-200">
                        {siteConfig.heroTitle}
                    </h1>
                </div>

                {/* The Big Number */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={viewMode}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-baseline justify-center gap-2"
                            >
                                <span className="text-7xl sm:text-9xl font-extralight text-white tracking-tighter">
                                    ${Math.floor(displayAmount).toLocaleString()}
                                </span>
                                <span className="text-3xl sm:text-4xl font-light text-slate-500">
                                    .{displayAmount.toFixed(2).split('.')[1]}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                        <div className="mt-2 text-sm font-medium text-indigo-300/80 uppercase tracking-[0.2em]">
                            Total {viewMode === 'monthly' ? 'Monthly' : 'Annual'} Spend
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mt-8">
                    {/* Toggle */}
                    <button
                        onClick={() => onViewModeChange(viewMode === 'monthly' ? 'yearly' : 'monthly')}
                        className="flex items-center gap-3 px-1.5 py-1.5 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-full cursor-pointer hover:bg-slate-800/50 transition-all"
                    >
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${viewMode === 'monthly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white'}`}>
                            Monthly
                        </span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${viewMode === 'yearly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white'}`}>
                            Yearly
                        </span>
                    </button>

                    {/* Actions */}
                    <div className="h-6 w-px bg-slate-800"></div>

                    <button
                        onClick={onStartAudit}
                        className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full transition-all"
                        title="Start SubTracking Wizard!"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onOpenSettings}
                        className="p-3 bg-slate-800/50 hover:bg-slate-700 text-slate-400 border border-slate-700/50 rounded-full transition-all"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </section>
    );
}
