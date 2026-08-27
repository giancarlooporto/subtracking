'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
    {
        category: "🔒 Privacy & Security",
        questions: [
            {
                q: "Where is my data actually stored?",
                a: "SubTracking is a \"Local-First\" app. If you use the Free tier, your data is stored directly in your device's private storage. It never touches our servers. If you upgrade to PRO for Cloud Sync, your data is securely encrypted and synced via our private servers, but we never sell your data or run ads."
            },
            {
                q: "Why don't you offer automatic bank syncing (like Rocket Money)?",
                a: "Security through exclusion. Bank syncing requires you to hand over your primary financial credentials to third-party aggregators. Most \"free\" services then sell your \"anonymized\" data to advertisers. SubTracking gives you 100% privacy and promotes \"intentional spending\"—by manually adding a service, you are forced to acknowledge its value before you pay for it."
            },
            {
                q: "What happens if I get a new phone?",
                a: "If you are on the Free tier, your data lives on your device. You can easily export a Data Vault Backup file and move it to your new phone. If you upgrade to PRO, your data automatically syncs across all your devices seamlessly in the cloud."
            }
        ]
    },
    {
        category: "💰 Pricing & Cloud Sync",
        questions: [
            {
                q: "Is SubTracking really free?",
                a: "Yes, 100%. The core SubTracking app is completely free, private, and unlimited forever. You get unlimited subscriptions, custom categories, trial alerts, split bills, multi-profiles, and local Data Vault exports without paying a cent."
            },
            {
                q: "Why do you charge for Cloud Sync?",
                a: "Running private, encrypted cloud database servers costs money. If you want the convenience of automatic, real-time synchronization between your phone and laptop, you can subscribe to Cloud Sync for just $8.99/year (less than $1/month) or $0.99/month. Otherwise, you can use the free local Vault backup to transfer data manually at zero cost."
            },
            {
                q: "Does Cloud Sync work on all my devices?",
                a: "Yes. Once you activate Cloud Sync, your account securely bridges your encrypted subscription data between your phone, tablet, and desktop browsers seamlessly in real time."
            }
        ]
    },
    {
        category: "🚀 Usage & Features",
        questions: [
            {
                q: "What exactly is a \"Ghost Cost\"?",
                a: "A Ghost Cost is the invisible wealth you lose over long periods from small, unused subscriptions. A $15/month streaming service seems small, but over 10 years, that’s $1,800 + lost investment growth. The Ghost Meter visualizes this \"Lost Wealth\" to help you decide if a service is truly worth its long-term burn."
            },
            {
                q: "How does the \"Audit Wizard\" help me save money?",
                a: "It's a \"Keep or Toss\" game for your finances. It shows you your subscriptions one by one, asking you to make a cold-hearted decision while showing you the 5-year cost of that service. It turns a boring chore into a 30-second logic check that often saves users $300-$600 per year instantly."
            },
            {
                q: "Does SubTracking work offline?",
                a: "Perfectly. Because the app is Local-First, you can manage your subscriptions on a plane, in the subway, or anywhere without an internet connection."
            }
        ]
    },
    {
        category: "📱 Technical & Installation",
        questions: [
            {
                q: "What is the \"Billing Pulse\" timeline?",
                a: "The Pulse is a high-level visualization of your current month. It shows exactly where \"Today\" sits in relation to your upcoming renewals, helping you visualize the cash-flow \"heartbeat\" of your finances at a glance."
            }
        ]
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    return (
        <section id="faq" className="py-32 px-6">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">Got questions? <br /><span className="text-indigo-500">We've got answers.</span></h2>
                    <p className="text-slate-500 font-medium">Everything you need to know about SubTracking.</p>
                </div>

                <div className="space-y-12">
                    {faqs.map((group, groupIdx) => (
                        <div key={groupIdx} className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 border-l-2 border-indigo-500 pl-4">
                                {group.category}
                            </h3>
                            <div className="space-y-3">
                                {group.questions.map((faq, faqIdx) => {
                                    const index = `${groupIdx}-${faqIdx}`;
                                    const isOpen = openIndex === index;

                                    return (
                                        <div
                                            key={faqIdx}
                                            className={cn(
                                                "rounded-2xl border transition-all duration-300",
                                                isOpen
                                                    ? "bg-indigo-500/5 border-indigo-500/30"
                                                    : "bg-white/5 border-white/5 hover:border-white/10"
                                            )}
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                                className="w-full text-left p-6 flex items-center justify-between gap-4"
                                            >
                                                <span className={cn(
                                                    "font-bold text-lg transition-colors",
                                                    isOpen ? "text-white" : "text-slate-300"
                                                )}>
                                                    {faq.q}
                                                </span>
                                                <ChevronDown className={cn(
                                                    "w-5 h-5 text-slate-500 transition-transform duration-300",
                                                    isOpen && "rotate-180 text-indigo-400"
                                                )} />
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 text-slate-400 leading-relaxed font-medium">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
