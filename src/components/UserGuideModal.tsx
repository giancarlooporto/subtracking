import { useState } from 'react';
import { X, BookOpen, Ghost, Calendar, Zap, Shield, HelpCircle, ChevronRight, Menu } from 'lucide-react';
import { cn } from '../lib/utils'; // Assuming cn utility exists

interface UserGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const guides = [
    {
        id: 'start',
        title: 'Quick Start',
        icon: Zap,
        color: 'text-amber-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">Welcome to your new financial command center. Here is how to get value in the first 60 seconds:</p>
                <div className="space-y-3">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <h4 className="font-bold text-white mb-1">1. Add Your "Big 3"</h4>
                        <p className="text-sm text-slate-400">Don't try to add everything at once. Start with your 3 biggest recurring costs (e.g., Rent, Car Payment, Internet). This immediately gives you a baseline "Burn Rate".</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <h4 className="font-bold text-white mb-1">2. Set the Category</h4>
                        <p className="text-sm text-slate-400">Proper categorization powers the insights. Mark critical items like Rent using the "Essential" toggle to separate them from discretionary spending.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'ghost',
        title: 'The Ghost Meter',
        icon: Ghost,
        color: 'text-indigo-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">The Ghost Meter is your "reality check". It projects the long-term cost of your current habits.</p>
                <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                    <h4 className="font-bold text-indigo-300 mb-1">Why 10 Years?</h4>
                    <p className="text-sm text-indigo-200/70">A $15 subscription seems cheap. But over 10 years, it's $1,800. If you invested that instead, it could be $3,000+. The Ghost Meter shows you this "Lost Wealth" to help you decide if a service is truly worth keeping.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Metrics</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> <span>Top Number: The total opportunity cost over 10 years.</span></li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> <span>Monthly Tap: The exact amount leaving your account every 30 days.</span></li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 'calendar',
        title: 'Calendar & Alerts',
        icon: Calendar,
        color: 'text-sky-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">Never get hit with a surprise renewal again. We use a powerful "Calendar Bridge" system.</p>

                <div className="grid grid-cols-1 gap-3">
                    <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20">
                        <h4 className="font-bold text-sky-300 mb-1">Trial Shield</h4>
                        <p className="text-sm text-sky-200/70">When you add a free trial, click "Sync to Calendar". We generate a special event scheduled for <b>1 Day Before</b> the trial expires titled "🚨 Trial Ends TOMORROW". This guarantees you see it in time to cancel.</p>
                    </div>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                    <h4 className="font-bold text-white mb-2">How to Sync</h4>
                    <ol className="list-decimal list-inside text-sm text-slate-400 space-y-1">
                        <li>Click the <span className="text-white font-bold">...</span> menu on any subscription card.</li>
                        <li>Select <span className="text-white font-bold">Sync to Calendar</span>.</li>
                        <li>It downloads an <code className="bg-slate-950 px-1 py-0.5 rounded text-xs">.ics</code> file.</li>
                        <li>Open the file to add the alert to Apple Calendar, Google Calendar, or Outlook.</li>
                    </ol>
                </div>
            </div>
        )
    },
    {
        id: 'wizard',
        title: 'Audit Wizard',
        icon: Shield,
        color: 'text-emerald-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">The "Keep or Toss" Wizard is the fastest way to declutter. It isolates your discretionary spending for a rapid-fire audit.</p>
                <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-bold text-emerald-300">Smart Filtering</h4>
                    </div>
                    <p className="text-sm text-emerald-200/70">The Wizard automatically excludes "Essential" items (like Rent) and "Utility Bills". It only shows you things you can actually cancel, so you don't waste time reviewing your electric bill.</p>
                </div>
                <p className="text-sm text-slate-400 italic">Pro Tip: Try running the Wizard once a month to catch "Subscription Creep".</p>
            </div>
        )
    },
    {
        id: 'vault',
        title: 'Data Vault',
        icon: BookOpen, // Using placeholder, could use Database icon or similar
        color: 'text-pink-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">Your data lives on your device, not our servers. The Vault is how you move or backup that data.</p>
                <div className="space-y-3">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col gap-2">
                        <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Exporting</span>
                        <p className="text-sm text-slate-400">Go to Settings &gt; Data Vault &gt; <b>Export Vault</b>. This saves a JSON file with all your subscriptions and categories.</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col gap-2">
                        <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Importing</span>
                        <p className="text-sm text-slate-400">On a new device, click <b>Import Vault</b> and select that file. Your dashboard will be instantly restored.</p>
                    </div>
                </div>
            </div>
        )
    }
];

export function UserGuideModal({ isOpen, onClose }: UserGuideModalProps) {
    const [activeTab, setActiveTab] = useState(guides[0].id);

    if (!isOpen) return null;

    const activeGuide = guides.find(g => g.id === activeTab) || guides[0];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl h-[80vh] flex overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">

                {/* Sidebar (Desktop) */}
                <div className="hidden md:flex flex-col w-64 bg-slate-950/50 border-r border-slate-800 p-6 space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-indigo-500 rounded-lg p-1.5">
                            <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="font-bold text-white text-lg">User Manual</h2>
                    </div>
                    <div className="space-y-1">
                        {guides.map(guide => (
                            <button
                                key={guide.id}
                                onClick={() => setActiveTab(guide.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                                    activeTab === guide.id
                                        ? "bg-indigo-500/10 text-white shadow-sm ring-1 ring-indigo-500/20"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                )}
                            >
                                <guide.icon className={cn("w-4 h-4", activeTab === guide.id ? guide.color : "text-slate-600")} />
                                {guide.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 bg-slate-900/50">
                    {/* Header (Mobile-ish) */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
                        <div className="md:hidden flex items-center gap-2">
                            <h2 className="font-bold text-white">Manual</h2>
                            <span className="text-slate-600">/</span>
                            <span className="text-indigo-400 font-medium">{activeGuide.title}</span>
                        </div>
                        <div className="hidden md:block">
                            <h3 className="tex-xl font-bold text-white flex items-center gap-2">
                                <activeGuide.icon className={cn("w-6 h-6", activeGuide.color)} />
                                {activeGuide.title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Tabs (Horizontal Scroll) */}
                    <div className="md:hidden flex overflow-x-auto p-4 gap-2 border-b border-slate-800 bg-slate-950/30 hide-scrollbar">
                        {guides.map(guide => (
                            <button
                                key={guide.id}
                                onClick={() => setActiveTab(guide.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold transition-all border",
                                    activeTab === guide.id
                                        ? "bg-indigo-500 text-white border-indigo-500"
                                        : "bg-slate-800 text-slate-400 border-slate-700"
                                )}
                            >
                                {guide.title}
                            </button>
                        ))}
                    </div>

                    {/* Content Scroll Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10">
                        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300 key={activeTab}">
                            {activeGuide.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
