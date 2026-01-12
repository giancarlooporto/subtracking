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
                a: "We use a \"Local-First\" architecture. Your subscription data is stored directly in your browser's private database (localStorage). It never touches our servers—in fact, we don't even have a database of your finances. We literally cannot see what you are tracking."
            },
            {
                q: "Why don't you offer automatic bank syncing (like Rocket Money)?",
                a: "Security through exclusion. Bank syncing requires you to hand over your primary financial credentials to third-party aggregators. Most \"free\" services then sell your \"anonymized\" data to advertisers. SubTracking gives you 100% privacy and promotes \"intentional spending\"—by manually adding a service, you are forced to acknowledge its value before you pay for it."
            },
            {
                q: "What happens if I clear my browser cache?",
                a: "Since data is stored locally, clearing your browsing data can wipe your dashboard. This is why we built the Vault feature. We recommend exporting a \"Vault Backup\" (a small JSON file) once a month or after major changes. It’s like a manual backup for your financial peace of mind."
            },
            {
                q: "Is my data encrypted?",
                a: "Your data is protected by your device's native security. Since it never leaves your machine or phone, it is as secure as the device you are holding. We don't use tracking cookies or third-party analytics that could leak your usage habits."
            }
        ]
    },
    {
        category: "💰 Pricing & PRO Features",
        questions: [
            {
                q: "Is SubTracking PRO another subscription I have to manage?",
                a: "Not at all. We find it ironic to charge a monthly fee for a tool that helps you cancel them. SubTracking PRO is a one-time Lifetime License. You pay once, and you own the advanced features forever. No recurring \"Ghost Costs\" here."
            },
            {
                q: "Why should I pay $19 for PRO when I could use a spreadsheet?",
                a: "A spreadsheet is a list; SubTracking is a system. You're paying for the Ghost Meter (10-year projections), the Audit Wizard (psychological auditing), and Calendar Bridge integration. Most users find that SubTracking pays for itself in the first 5 minutes by identifying one forgotten \"leak\" that a spreadsheet would have missed."
            },
            {
                q: "Can I use my PRO license on multiple devices?",
                a: "Yes. Your license key allows for activation on up to 20 devices. Whether you're auditing on your Mac at home or checking a trial on your iPhone on the go, one license covers your entire personal ecosystem."
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
                q: "How does the \"Trial Shield\" work?",
                a: "When you sign up for a free trial, add it to SubTracking. We generate a custom Calendar Alert (.ics file) that you save to your phone's native calendar. You get a real, system-level notification before the trial expires, ensuring you never get hit by a \"surprise\" $99 annual charge."
            },
            {
                q: "How do I move my data from my phone to my laptop?",
                a: "Since we don't have accounts (for your privacy), you use the Vault bridge. Simply tap \"Export Vault\" on your phone and \"Import Vault\" on your laptop. It takes 5 seconds and ensures your financial data never travels through a cloud server where it could be intercepted."
            },
            {
                q: "Does SubTracking work offline?",
                a: "Perfectly. Because the app and your data are hosted locally on your device, you can manage your subscriptions on a plane, in the subway, or anywhere without an internet connection."
            },
            {
                q: "Can I track more than just Netflix and Spotify?",
                a: "Yes. You can track anything with a recurring cost: gym memberships, car insurance, rent, software licenses, or even that \"introductory\" internet bill that you know will jump up in price in 6 months."
            }
        ]
    },
    {
        category: "📱 Technical & Installation",
        questions: [
            {
                q: "Is there an iOS or Android app?",
                a: "SubTracking is a Progressive Web App (PWA). You don't need an App Store. Simply open the site in Safari or Chrome, tap \"Add to Home Screen,\" and it will live on your phone with its own icon and a full-screen, high-performance experience."
            },
            {
                q: "What is the \"Billing Pulse\" timeline?",
                a: "The Pulse is a high-level visualization of your current month. It shows exactly where \"Today\" sits in relation to your upcoming renewals, helping you visualize the cash-flow \"heartbeat\" of your finances at a glance."
            },
            {
                q: "How does the \"Audit Wizard\" help me save money?",
                a: "It's a \"Keep or Toss\" game for your finances. It shows you your subscriptions one by one, asking you to make a cold-hearted decision while showing you the 5-year cost of that service. It turns a boring chore into a 30-second logic check that often saves users $300-$600 per year instantly."
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
