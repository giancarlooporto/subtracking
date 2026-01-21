'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Ghost, Calendar, Check, Zap, ArrowRight, Wallet, Lock, MousePointer2, X, Play, Globe, HardDrive, ShieldAlert, Menu, Layers, Users, Download, FileSpreadsheet, CalendarRange, Home, Smartphone, Car } from 'lucide-react';
import { cn } from '../lib/utils';

import { VideoModal } from '../components/VideoModal';
import { FAQSection } from '../components/FAQSection';
import { ImageCarousel } from '../components/ImageCarousel';
import { ShareButton } from '../components/ShareButton';
import { Footer } from '../components/Footer';

export default function LandingPage() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Smart Redirect: If user has data, go straight to app
        const savedSubs = localStorage.getItem('subtracking-subs');
        if (savedSubs) {
            try {
                const subs = JSON.parse(savedSubs);
                if (Array.isArray(subs) && subs.length > 0) {
                    router.push('/dashboard');
                }
            } catch (e) {
                // Ignore errors
            }
        }
    }, [router]);
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/30 overflow-x-hidden">
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoSrc="/assets/Use.mov"
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="SubTracking Logo"
                            className="w-8 h-8 rounded-lg shadow-lg shadow-indigo-500/20"
                        />
                        <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            SubTracking
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="hidden sm:block bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5"
                        >
                            Launch App
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
                        >
                            <div className="px-6 py-8 flex flex-col gap-6">
                                <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-300 hover:text-white">Features</a>
                                <a href="#privacy" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-300 hover:text-white">Privacy</a>
                                <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-300 hover:text-white">Pricing</a>
                                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-300 hover:text-white">FAQ</a>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-center shadow-xl shadow-indigo-600/20"
                                >
                                    Launch App
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                        The privacy-first vault for every recurring cost in your life. From Netflix and Spotify to Rent, Utilities, and Car Insurance. See your true monthly "burn rate" in seconds.
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

                        {/* Early Bird Discount Nudge */}
                        <div className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <span className="text-amber-400 font-black text-sm">🔥 First 100 Users:</span>
                                <span className="text-white font-bold text-sm">60% OFF with code</span>
                                <code className="text-xs font-mono font-black bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded border border-amber-500/40">
                                    TUVCUUX
                                </code>
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* WHAT ARE YOU TRACKING? TICKER */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="max-w-5xl mx-auto mt-16 px-6"
                >
                    <div className="flex flex-col items-center gap-6">
                        <span className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">What are you tracking?</span>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                            {[
                                { icon: Home, label: "Rent/Housing", color: "text-indigo-400" },
                                { icon: Smartphone, label: "Phone Bill", color: "text-sky-400" },
                                { icon: Shield, label: "Insurance", color: "text-emerald-400" },
                                { icon: Zap, label: "Electricity", color: "text-amber-400" },
                                { icon: Globe, label: "Internet", color: "text-blue-400" },
                                { icon: Car, label: "Auto Loan", color: "text-purple-400" },
                                { icon: Sparkles, label: "Streaming", color: "text-pink-400" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 group cursor-default">
                                    <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", item.color)} />
                                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Hero App Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-6xl mx-auto mt-20 relative group"
                >
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] -z-10 group-hover:bg-indigo-500/30 transition-all duration-700" />
                    <div className="rounded-3xl border border-white/10 p-2 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
                        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
                            <ImageCarousel />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* METHODOLOGY SECTION (New) */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">The Methodology</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                            Not just for subscriptions.<br />
                            For your <span className="text-indigo-500">entire recurring life.</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Most trackers fail because they treat your Rent the same as your Netflix.
                            SubTracking uses a <b>Two-Bucket System</b> to separate your wants from your needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* WANTS BUCKET */}
                        <div className="glass-panel p-10 rounded-[32px] border border-red-500/20 bg-red-500/[0.02] relative overflow-hidden group hover:border-red-500/40 transition-all">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:scale-110 duration-500">
                                <Sparkles className="w-32 h-32 text-red-500" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                    <Sparkles className="w-7 h-7 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">The "Audit" Bucket</h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                                        Variable • Wants
                                    </div>
                                    <p className="text-slate-400 leading-relaxed font-medium">
                                        Netflix, Spotify, Gym, Dropbox. These are lifestyle choices.
                                        The app aggressively monitors these for "Ghost Costs" and unused leaks.
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-red-500/10">
                                    <p className="text-white font-bold text-sm">Goal: <span className="text-red-400">Reduce & Cancel</span></p>
                                </div>
                            </div>
                        </div>

                        {/* NEEDS BUCKET */}
                        <div className="glass-panel p-10 rounded-[32px] border border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:scale-110 duration-500">
                                <Shield className="w-32 h-32 text-emerald-500" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                    <Shield className="w-7 h-7 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">The "Essential" Bucket</h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                                        Fixed • Needs
                                    </div>
                                    <p className="text-slate-400 leading-relaxed font-medium">
                                        Rent, Insurance, Car Payments. These are non-negotiable.
                                        Mark as "Essential" to safeguard them. We track due dates but ignore them for audits.
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-emerald-500/10">
                                    <p className="text-white font-bold text-sm">Goal: <span className="text-emerald-400">Track & Protect</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION STORY SECTION */}
            <section className="py-24 px-6 relative overflow-hidden bg-indigo-500/[0.02]">
                <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-indigo-500 to-purple-500 p-1 shrink-0 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl mx-auto md:mx-0">
                            <div className="w-full h-full rounded-[38px] bg-slate-900 flex items-center justify-center overflow-hidden">
                                <Shield className="w-20 h-20 text-indigo-400 opacity-50" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-white">The Mission for Financial Privacy.</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                SubTracking was built out of a simple frustration: why does every subscription tracker want full, persistent access to your bank account?
                            </p>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                We believe that your digital life should be private. You shouldn't have to invite a data broker into your wallet just to see if you're overpaying for streaming services or a gym membership.
                            </p>
                            <div className="flex items-center gap-4 pt-4 justify-center md:justify-start">
                                <span className="font-black text-white italic">The SubTracking Team</span>
                                <div className="h-px w-12 bg-indigo-500/50" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center space-y-2 group hover:border-indigo-500/30 transition-all">
                            <div className="text-indigo-400 font-black text-xs tracking-widest uppercase">The Promise</div>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold">Privacy is the feature. We will never build a "bank sync" that harvests your data.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center space-y-2 group hover:border-indigo-500/30 transition-all">
                            <div className="text-indigo-400 font-black text-xs tracking-widest uppercase">The Cost</div>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold">Simple one-time payment. No recurring fees to track your fees. Simple.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center space-y-2 group hover:border-indigo-500/30 transition-all">
                            <div className="text-indigo-400 font-black text-xs tracking-widest uppercase">The Data</div>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold">Stored in your browser. We literally cannot see your subscriptions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-20 border-y border-white/5 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-white">$450+</div>
                        <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Potential Yearly Savings</div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 - Ghost Meter */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-indigo-500/20 transition-all group">
                            <div className="bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Ghost className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">The Ghost Meter</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Visualize "Lost Wealth" over 10 years. See how small monthly leaks can compound into massive losses.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 - Calendar Command Center (New) */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-sky-500/20 transition-all group">
                            <div className="bg-sky-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CalendarRange className="w-6 h-6 text-sky-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Calendar Command</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    A visual timeline of your payments. See exactly when renewals hit so you're never caught off guard.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 - Split Details (New) */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-pink-500/20 transition-all group">
                            <div className="bg-pink-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-pink-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Smart Splits</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Share Netflix with a roommate? Track only your portion of the bill with built-in split logic.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 - Export & Sync (New) */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-teal-500/20 transition-all group">
                            <div className="bg-teal-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Download className="w-6 h-6 text-teal-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Export & Sync</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Your data is yours. Export to CSV for Excel/Numbers or sync renewals directly to your Calendar.
                                </p>
                            </div>
                        </div>

                        {/* Feature 5 - Privacy */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-emerald-500/20 transition-all group">
                            <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Privacy-First Audit</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    No Plaid. No bank connections. Your financial data stays 100% local on your device.
                                </p>
                            </div>
                        </div>

                        {/* Feature 6 - Wizard */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-purple-500/20 transition-all group">
                            <div className="bg-purple-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <MousePointer2 className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Keep or Toss</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    A fast, Tinder-style interface to quickly audit your services. Flick through and save in seconds.
                                </p>
                            </div>
                        </div>

                        {/* Feature 7 - Trial Shield */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-amber-500/20 transition-all group">
                            <div className="bg-amber-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform relative">
                                <ShieldAlert className="w-6 h-6 text-amber-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Trial Shield</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Set alerts for "Free Trials" or "Intro Pricing." Never get caught by a surprise auto-renewal again.
                                </p>
                            </div>
                        </div>

                        {/* Feature 8 - Multi-Profile Vaults (New) */}
                        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/5 hover:border-indigo-500/20 transition-all group">
                            <div className="bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform relative">
                                <Layers className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Multi-Profile Vaults</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Separate "Personal", "Business", and "Family" expenses. Switch contexts instantly with one click.
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
                                    <h4 className="font-bold text-white mb-1">Vault Backups</h4>
                                    <p className="text-sm text-slate-500">Export your fully encrypted vault (JSON) and restore anywhere.</p>
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
                                        "1 Active Profile",
                                        "Unlimited Subscriptions",
                                        "Billing Pulse Timeline",
                                        "Encrypted Data Export",
                                        "Renewal Alerts"
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

                                {/* Early Bird Discount Banner */}
                                <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/40 relative overflow-hidden group/discount">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse" />
                                    <div className="relative z-10 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">🎉 First 100 Users</span>
                                            <span className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">60% OFF</span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-white">$7.60</span>
                                            <span className="text-lg font-bold text-slate-400 line-through">$19</span>
                                        </div>
                                        <div className="flex items-center gap-2 pt-1">
                                            <code className="text-xs font-mono font-bold bg-slate-900/60 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30">
                                                TUVCUUX
                                            </code>
                                            <span className="text-[10px] text-amber-200/60 font-medium">← Use at checkout</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-slate-500/40 line-through">$19</span>
                                    <span className="text-slate-500 font-medium tracking-tight">/one-time</span>
                                </div>
                                <p className="text-indigo-200/60 text-sm pt-2">For the optimization masters.</p>

                                <ul className="space-y-4 pt-10">
                                    {[
                                        "Unlimited Multi-Profiles (Business/Family)",
                                        "Ghost Meter Pro (10Y Projections)",
                                        "Calendar Command Center",
                                        "Trial Shield (Calendar Alerts)",
                                        "Full Vault Backups & Restore",
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

            <FAQSection />

            {/* CALL TO ACTION */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-b from-indigo-600 to-indigo-700 p-12 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl shadow-indigo-500/40">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,1),rgba(255,255,255,0))]" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            Ready to stop the leaks?
                        </h2>
                        <p className="text-indigo-100/80 text-lg max-w-xl mx-auto font-medium">
                            Start decluttering your digital life and saving real money every month.
                        </p>
                        <div className="pt-10">
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 hover:bg-indigo-500 transition-all active:scale-95 shadow-2xl shadow-indigo-500/40 group"
                            >
                                Get Started Free
                                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <div className="mt-6 flex justify-center">
                                <ShareButton variant="cta" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(12px);
                }
            `}</style>
        </div>
    );
}
