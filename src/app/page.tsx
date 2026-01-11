'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Ghost, Calendar, Check, Zap, ArrowRight, Wallet, Lock, MousePointer2, X, Play, Globe, HardDrive } from 'lucide-react';
import { cn } from '../lib/utils';

import { VideoModal } from '../components/VideoModal';

export default function LandingPage() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/30 overflow-x-hidden">
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoSrc="/assets/demo.webp"
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            SubTracking
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>

                    <Link
                        href="/dashboard"
                        className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5"
                    >
                        Launch App
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-black uppercase tracking-widest"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        The Future of Subscription Management
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1]"
                    >
                        Track Smarter.<br />
                        <span className="text-slate-500">Spend Less.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium"
                    >
                        The privacy-first audit tool that helps you find unused subscriptions and stop the "Ghost Cost" of future spending. No bank logins required.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link
                            href="/dashboard"
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group transition-all shadow-2xl shadow-indigo-600/20"
                        >
                            Start Auditing Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={() => setIsVideoOpen(true)}
                            className="w-full sm:w-auto border border-slate-800 hover:bg-white/5 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group transition-all"
                        >
                            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                            Watch Demo
                        </button>
                    </motion.div>
                </div>

                {/* Hero App Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-6xl mx-auto mt-20 relative group"
                >
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] -z-10 group-hover:bg-indigo-500/30 transition-all duration-700" />
                    <div className="rounded-3xl border border-white/10 p-2 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
                        <img
                            src="/og-image.png"
                            alt="SubTracking Dashboard"
                            className="rounded-2xl w-full h-auto shadow-2xl"
                        />
                    </div>
                </motion.div>
            </section>

            {/* STATS SECTION */}
            <section className="py-20 border-y border-white/5 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-white">$450+</div>
                        <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Avg. Yearly Savings</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-white">100%</div>
                        <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Privacy (Local Data)</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-white">0</div>
                        <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Bank Logins Required</div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">Everything you need to <br /><span className="text-indigo-500">take back control.</span></h2>
                        <p className="text-slate-500 font-medium">Built for speed, privacy, and results.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="glass-panel p-8 rounded-3xl space-y-6 border border-white/5 hover:border-indigo-500/20 transition-all group">
                            <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Ghost className="w-7 h-7 text-indigo-400" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold">The Ghost Meter</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Visualize the "Lost Wealth" over 10 years. Small monthly leaks add up to life-changing money.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass-panel p-8 rounded-3xl space-y-6 border border-white/5 hover:border-emerald-500/20 transition-all group">
                            <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7 text-emerald-400" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold">Privacy-First Audit</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    No Plaid. No Yodlee. No bank connections. Your data stays in your browser's local storage.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass-panel p-8 rounded-3xl space-y-6 border border-white/5 hover:border-purple-500/20 transition-all group">
                            <div className="bg-purple-500/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <MousePointer2 className="w-7 h-7 text-purple-400" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold">Keep or Toss Wizard</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    A Tinder-style interface to quickly audit your services. Flick through and save hundreds in seconds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRIVACY SECTION */}
            <section id="privacy" className="py-32 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-black uppercase tracking-widest">
                            <Lock className="w-3.5 h-3.5" />
                            Privacy First Architecture
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Your finance stays <br />
                            <span className="text-emerald-500">on your device.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Unlike other trackers, SubTracking never asks for your bank login. We don't have servers that store your financial history. Everything is stored in your browser's local storage.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="mt-1 bg-emerald-500/20 p-2 rounded-lg h-fit">
                                    <Globe className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">No Cloud Sync</h4>
                                    <p className="text-sm text-slate-500">Your data never touches the cloud or our servers.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-emerald-500/20 p-2 rounded-lg h-fit">
                                    <HardDrive className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Local Export</h4>
                                    <p className="text-sm text-slate-500">Backup and restore your data manually via JSON files.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors">
                                Read our Full Privacy Policy <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="glass-panel p-8 rounded-[40px] border border-white/5 space-y-8 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <span className="font-bold text-sm">Security Layers</span>
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 px-2 py-1 bg-emerald-500/10 rounded-full">ACTIVE</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    "Zero Tracking Cookies",
                                    "No Third Party Data Sales",
                                    "Client-Side Encryption",
                                    "GDPR & PIPEDA Compliant"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <Check className="w-5 h-5 text-emerald-500" />
                                        <span className="text-sm font-medium text-slate-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section id="pricing" className="py-32 px-6 bg-slate-900/20">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">Simple, transparent <br /><span className="text-indigo-500">pricing.</span></h2>
                        <p className="text-slate-500 font-medium">One-time payment. Lifetime access.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Tier */}
                        <div className="glass-panel p-10 rounded-[40px] border border-white/5 flex flex-col hover:border-slate-700 transition-all">
                            <div className="space-y-2 flex-1">
                                <h3 className="text-2xl font-bold">Standard</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black">$0</span>
                                    <span className="text-slate-500 font-medium">/forever</span>
                                </div>
                                <p className="text-slate-500 text-sm pt-4">For the curious financial tracker.</p>

                                <ul className="space-y-4 pt-10">
                                    {[
                                        "Up to 5 Subscriptions",
                                        "Manual Tracking",
                                        "Renewal Alerts",
                                        "Standard Categories",
                                        "Audit Wizard (Basic)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                                            <Check className="w-4 h-4 text-slate-600 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href="/dashboard" className="mt-10 w-full py-4 rounded-2xl border border-slate-800 font-bold text-center hover:bg-white/5 transition-colors">
                                Get Started Free
                            </Link>
                        </div>

                        {/* Pro Tier */}
                        <div className="glass-panel p-10 rounded-[40px] border-2 border-indigo-500/30 bg-indigo-500/[0.02] flex flex-col relative overflow-hidden group">
                            <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                                Best Value
                            </div>

                            <div className="space-y-2 flex-1">
                                <h3 className="text-2xl font-bold flex items-center gap-2">
                                    PRO
                                    <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400" />
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black">$39</span>
                                    <span className="text-slate-500 font-medium tracking-tight">/one-time</span>
                                </div>
                                <p className="text-indigo-200/60 text-sm pt-4">For the optimization masters.</p>

                                <ul className="space-y-4 pt-10">
                                    {[
                                        "Unlimited Subscriptions",
                                        "Ghost Meter Pro (10Y Projections)",
                                        "Billing Pulse (Timeline View)",
                                        "Advanced Custom Categories",
                                        "Data Export/Import (Vault)",
                                        "Priority Support"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                                            <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href="/dashboard?upgrade=true" className="mt-10 w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-center hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 group-hover:scale-105 transition-all active:scale-95">
                                Go Pro Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-b from-indigo-600 to-indigo-700 p-12 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl shadow-indigo-500/40">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,1),rgba(255,255,255,0))]" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            Ready to stop the leaks?
                        </h2>
                        <p className="text-indigo-100/80 text-lg max-w-xl mx-auto font-medium">
                            Join thousands who are decluttering their digital lives and saving real money every month.
                        </p>
                        <div className="pt-10">
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 hover:bg-indigo-500 transition-all active:scale-95 shadow-2xl shadow-indigo-500/40 group"
                            >
                                Get Started Free
                                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 border-t border-white/5 text-center px-6">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-200">SubTracking</span>
                    </div>
                    <p className="text-slate-500 text-xs">
                        Built for those who value privacy and financial freedom.<br />
                        &copy; 2026 SubTracking. No rights reserved. Go build something great.
                    </p>
                </div>
            </footer>

            <style jsx>{`
                .glass-panel {
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(12px);
                }
            `}</style>
        </div>
    );
}
