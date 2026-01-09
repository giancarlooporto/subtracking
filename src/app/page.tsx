'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, CreditCard, Wallet, AlertCircle, Calendar, X, Tag, Check, Undo2, Zap, Settings, PieChart, ArrowUpDown, DollarSign, Type } from 'lucide-react';
import { Subscription, DEFAULT_CATEGORIES } from '../types';
import { getDaysRemaining, getNextOccurrence, getCategoryColorHex, getCategoryIcon, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { SubscriptionCard } from '../components/SubscriptionCard';
import { StatsOverview } from '../components/StatsOverview';
import { SubscriptionModal } from '../components/SubscriptionModal';
import { SettingsModal } from '../components/SettingsModal';
import { SubTrackingWizard } from '../components/SubTrackingWizard';
import { GhostMeter } from '../components/GhostMeter';
import { BillingPulse } from '../components/BillingPulse';
import { ToastProvider, useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';
import { WelcomeModal } from '../components/WelcomeModal';
import { Footer } from '../components/Footer';

function HomeContent() {
  const { showToast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [userCategories, setUserCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  // Modals & UI State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFactoryResetConfirm, setShowFactoryResetConfirm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Filtering & Sorting
  const [sortBy, setSortBy] = useState('price-desc');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Stats
  const [cancelledSavings, setCancelledSavings] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [showUrgentBanner, setShowUrgentBanner] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('subtracking-data') || localStorage.getItem('digital-declutter-data');
    const savedCats = localStorage.getItem('subtracking-categories') || localStorage.getItem('digital-declutter-categories');
    const savedSavings = localStorage.getItem('subtracking-savings') || localStorage.getItem('digital-declutter-savings');

    if (savedData) {
      try {
        setSubscriptions(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse subscriptions', e);
      }
    }

    if (savedCats) {
      try {
        let loadedCats = JSON.parse(savedCats);
        // Migration: Force update to new SubTracking categories if on the old 7-item list
        const oldDefaults = ['Streaming', 'Software & Apps', 'Gaming', 'Health & Wellness', 'Meal Kits', 'Content & News', 'Other'];
        const isOldList = loadedCats.length === 7 && loadedCats.every((c: string, i: number) => c === oldDefaults[i]);

        if (isOldList || loadedCats.includes('Household Utilities')) {
          loadedCats = DEFAULT_CATEGORIES;
        }
        setUserCategories(loadedCats);
      } catch (e) {
        console.error('Failed to parse categories', e);
      }
    }

    if (savedSavings) setCancelledSavings(parseFloat(savedSavings));

    setIsLoaded(true);

    // Check if first-time user
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('subtracking-data', JSON.stringify(subscriptions));
      localStorage.setItem('subtracking-categories', JSON.stringify(userCategories));
      localStorage.setItem('subtracking-savings', cancelledSavings.toString());
    }
  }, [subscriptions, userCategories, cancelledSavings, isLoaded]);

  const monthlyTotal = useMemo(() => {
    return subscriptions.reduce((sum, sub) => {
      let monthlyPrice = sub.price;
      if (sub.billingCycle === 'weekly') monthlyPrice = sub.price * 4.33;
      else if (sub.billingCycle === 'biweekly') monthlyPrice = sub.price * 2.16;
      else if (sub.billingCycle === 'quarterly') monthlyPrice = sub.price / 3;
      else if (sub.billingCycle === 'yearly') monthlyPrice = sub.price / 12;
      return sum + monthlyPrice;
    }, 0);
  }, [subscriptions]);

  const sortedSubscriptions = useMemo(() => {
    let result = [...subscriptions];
    if (filterCategory !== 'All') {
      result = result.filter(sub => sub.category === filterCategory);
    }
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'price-desc': return b.price - a.price;
        case 'price-asc': return a.price - b.price;
        case 'renewal-asc':
          const nextA = getNextOccurrence(a.renewalDate, a.billingCycle);
          const nextB = getNextOccurrence(b.renewalDate, b.billingCycle);
          return new Date(nextA).getTime() - new Date(nextB).getTime();
        case 'name-asc': return a.name.localeCompare(b.name);
        default: return b.price - a.price;
      }
    });
  }, [subscriptions, sortBy, filterCategory]);

  const categorySpending = useMemo(() => {
    const spending: Record<string, number> = {};
    subscriptions.forEach(sub => {
      let monthlyPrice = sub.price;
      if (sub.billingCycle === 'weekly') monthlyPrice = sub.price * 4.33;
      else if (sub.billingCycle === 'biweekly') monthlyPrice = sub.price * 2.16;
      else if (sub.billingCycle === 'quarterly') monthlyPrice = sub.price / 3;
      else if (sub.billingCycle === 'yearly') monthlyPrice = sub.price / 12;

      spending[sub.category] = (spending[sub.category] || 0) + monthlyPrice;
    });
    return Object.entries(spending)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [subscriptions]);

  const isPaidThisCycle = (sub: Subscription) => {
    if (!sub.lastPaidDate) return false;
    const todayStr = new Date().toISOString().split('T')[0];
    return sub.lastPaidDate === todayStr;
  };

  const urgentSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const nextRenewal = getNextOccurrence(sub.renewalDate, sub.billingCycle);
      const days = getDaysRemaining(nextRenewal);
      return days <= 2;
    }).sort((a, b) => new Date(getNextOccurrence(a.renewalDate, a.billingCycle)).getTime() - new Date(getNextOccurrence(b.renewalDate, b.billingCycle)).getTime());
  }, [subscriptions]);

  const upcomingBills = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return [...subscriptions]
      .filter(sub => {
        // Use raw renewalDate. If it's in the past and not paid, it stays as 'Past Due'
        const days = getDaysRemaining(sub.renewalDate);
        const isPaid = isPaidThisCycle(sub);

        // Keep items if:
        // 1. They are due in the next 7 days
        // 2. They are past due (negative days)
        // 3. They were just paid today (persistence)
        // Note: isPaid is only true if sub.lastPaidDate === today
        return (days <= 7) || isPaid;
      })
      .sort((a, b) => {
        // Sort by raw renewal date so overdue items appear at the very top
        return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime();
      });
  }, [subscriptions]);

  const markAsPaid = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id !== id) return sub;
      const [year, month, day] = sub.renewalDate.split('-').map(Number);
      let nextDate = new Date(year, month - 1, day);
      nextDate.setHours(0, 0, 0, 0);

      if (sub.billingCycle === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
      else if (sub.billingCycle === 'biweekly') nextDate.setDate(nextDate.getDate() + 14);
      else if (sub.billingCycle === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);
      else if (sub.billingCycle === 'quarterly') nextDate.setMonth(nextDate.getMonth() + 3);
      else if (sub.billingCycle === 'yearly') nextDate.setFullYear(nextDate.getFullYear() + 1);

      return {
        ...sub,
        renewalDate: nextDate.toISOString().split('T')[0],
        lastPaidDate: today,
        hasEverBeenPaid: true
      };
    }));
  };

  const unmarkAsPaid = (id: string) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id !== id) return sub;

      // Revert date logic
      const [year, month, day] = sub.renewalDate.split('-').map(Number);
      let prevDate = new Date(year, month - 1, day);
      prevDate.setHours(0, 0, 0, 0);

      if (sub.billingCycle === 'weekly') prevDate.setDate(prevDate.getDate() - 7);
      else if (sub.billingCycle === 'biweekly') prevDate.setDate(prevDate.getDate() - 14);
      else if (sub.billingCycle === 'monthly') prevDate.setMonth(prevDate.getMonth() - 1);
      else if (sub.billingCycle === 'quarterly') prevDate.setMonth(prevDate.getMonth() - 3);
      else if (sub.billingCycle === 'yearly') prevDate.setFullYear(prevDate.getFullYear() - 1);

      // If the reverted date is in the past, use getNextOccurrence to find the next valid date
      const revertedDateStr = prevDate.toISOString().split('T')[0];
      const nextValidDate = getNextOccurrence(revertedDateStr, sub.billingCycle);

      return {
        ...sub,
        renewalDate: nextValidDate,
        lastPaidDate: undefined
      };
    }));
  };


  const handleSaveSubscription = (data: Omit<Subscription, 'id' | 'lastPaidDate' | 'hasEverBeenPaid'>) => {
    // Add custom category if needed
    if (!userCategories.includes(data.category)) {
      setUserCategories(prev => [...prev, data.category]);
    }

    if (editingId) {
      setSubscriptions(subscriptions.map(sub =>
        sub.id === editingId
          ? { ...sub, ...data }
          : sub
      ));
      setEditingId(null);
    } else {
      const newSub: Subscription = {
        id: crypto.randomUUID(),
        ...data
      };
      setSubscriptions([...subscriptions, newSub]);
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      const subToDelete = subscriptions.find(s => s.id === deleteId);
      if (subToDelete && subToDelete.hasEverBeenPaid) {
        // Celebration logic simplified for now
        let monthlyEquivalent = subToDelete.price;
        if (subToDelete.billingCycle === 'weekly') monthlyEquivalent = (subToDelete.price * 52) / 12;
        else if (subToDelete.billingCycle === 'biweekly') monthlyEquivalent = (subToDelete.price * 26) / 12;
        else if (subToDelete.billingCycle === 'quarterly') monthlyEquivalent = subToDelete.price / 3;
        else if (subToDelete.billingCycle === 'yearly') monthlyEquivalent = subToDelete.price / 12;
        setCancelledSavings(prev => prev + monthlyEquivalent);
      }
      setSubscriptions(subscriptions.filter(s => s.id !== deleteId));
      setDeleteId(null);
    }
  };



  const factoryReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const deleteCategory = (catName: string) => {
    setCategoryToDelete(catName);
  };

  const confirmCategoryDelete = () => {
    if (categoryToDelete) {
      setSubscriptions(subscriptions.map(sub =>
        sub.category === categoryToDelete ? { ...sub, category: 'Other' } : sub
      ));
      setUserCategories(userCategories.filter(cat => cat !== categoryToDelete));
      setCategoryToDelete(null);
    }
  };

  const exportData = () => {
    const data = {
      subscriptions,
      userCategories,
      cancelledSavings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const fileName = "subtracking_backup.json";
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Feedback
    showToast(`Vault exported successfully! Check Downloads for "${fileName}"`, 'success');
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);

        if (!data.subscriptions || !Array.isArray(data.subscriptions)) {
          throw new Error('Invalid data format');
        }

        if (confirm('Importing this vault will replace all your current data. This cannot be undone. Proceed?')) {
          setSubscriptions(data.subscriptions);
          if (data.userCategories) setUserCategories(data.userCategories);
          if (data.cancelledSavings) setCancelledSavings(data.cancelledSavings);
          showToast('Vault restored successfully!', 'success');
        }
      } catch (err) {
        showToast('Error importing vault. Please check the file format.', 'error');
        console.error(err);
      }
    };
    reader.readAsText(file);
    // Reset input so the same file can be uploaded again if needed
    e.target.value = '';
  };

  const handleAuditFinish = (idsToDelete: string[]) => {
    setShowWizard(false);

    // Calculate total savings for toast/celebration (logic could be enhanced)
    let totalSavings = 0;
    const newSubs = subscriptions.filter(sub => {
      if (idsToDelete.includes(sub.id)) {
        let monthly = sub.price;
        if (sub.billingCycle === 'weekly') monthly = sub.price * 4.33;
        else if (sub.billingCycle === 'biweekly') monthly = sub.price * 2.16;
        else if (sub.billingCycle === 'quarterly') monthly = sub.price / 3;
        else if (sub.billingCycle === 'yearly') monthly = sub.price / 12;
        totalSavings += monthly;
        return false; // Remove
      }
      return true; // Keep
    });

    setSubscriptions(newSubs);
    if (totalSavings > 0) {
      setCancelledSavings(prev => prev + totalSavings);
      showToast(`Audit complete! You're saving $${totalSavings.toFixed(2)}/month`, 'success');
    }
  };

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-aurora text-slate-100 font-[family-name:var(--font-geist-sans)] relative overflow-x-hidden">

      {/* 1. Urgent Renovals Banner */}
      {urgentSubscriptions.length > 0 && showUrgentBanner && (
        <div className="bg-red-500/10 border-b border-red-500/20 animate-in slide-in-from-top duration-500 backdrop-blur-md relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
              <p className="text-sm font-medium text-red-200">
                <span className="font-bold text-white">{urgentSubscriptions.length} services</span> renewing within 48 hours.
              </p>
            </div>
            <button onClick={() => setShowUrgentBanner(false)} className="text-red-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8 relative z-10">

        {/* HERO SECTION */}
        <StatsOverview
          monthlyTotal={monthlyTotal}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenSettings={() => setShowSettingsModal(true)}
          onStartAudit={() => setShowWizard(true)}
        />

        {/* HOUSEHOLD PULSE (Timeline) */}
        {subscriptions.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <BillingPulse subscriptions={subscriptions} />
          </div>
        )}

        {/* ACTION DECK (3-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">

          {/* 1. Upcoming Bills Card */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col h-[380px] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 z-10">
              <div className="flex items-center space-x-2 text-indigo-400">
                <Calendar className="w-5 h-5" />
                <h3 className="font-bold text-white">Upcoming (7 Days)</h3>
              </div>
              <span className="bg-indigo-500/10 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/20">
                {upcomingBills.length} Due
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar z-10">
              {upcomingBills.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-50">
                  <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium">All caught up!</span>
                </div>
              ) : (
                upcomingBills.map((sub) => {
                  const days = getDaysRemaining(sub.renewalDate);
                  const isPaid = isPaidThisCycle(sub);
                  const isOverdue = days < 0 && !isPaid;

                  return (
                    <div key={sub.id} className={cn("flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-700/30 transition-all group", isPaid ? "opacity-50 grayscale hover:opacity-75" : "hover:bg-slate-800/60", isOverdue && "border-red-500/30 bg-red-500/5")}>
                      <div className="flex items-center space-x-3">
                        {isPaid ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Check className="w-4 h-4 text-emerald-500" />
                          </div>
                        ) : (
                          <div className={cn("w-1.5 h-8 rounded-full transition-colors", isOverdue || days <= 2 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" : "bg-indigo-500")} />
                        )}
                        <div>
                          <div className={cn("font-bold text-sm transition-colors", isPaid ? "text-slate-500 line-through decoration-slate-600" : isOverdue ? "text-red-400" : "text-slate-200 group-hover:text-white")}>
                            {sub.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {isPaid ? (
                              <span className="text-emerald-500 font-medium">Payment Complete</span>
                            ) : isOverdue ? (
                              <span className="text-red-500 font-bold uppercase tracking-wider">Past Due ({Math.abs(days)}d)</span>
                            ) : days === 0 ? (
                              <span className="text-red-400 font-bold animate-pulse">Due Today</span>
                            ) : (
                              `Due in ${days} days`
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn("font-bold text-sm", isPaid ? "text-slate-600 line-through" : "text-slate-300")}>
                          ${sub.price.toFixed(0)}
                        </span>
                        {!isPaid && (
                          <button
                            onClick={(e) => { e.stopPropagation(); markAsPaid(sub.id); }}
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30 shadow-lg"
                            aria-label={`Mark ${sub.name} as paid`}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {isPaid && (
                          <button
                            onClick={(e) => { e.stopPropagation(); unmarkAsPaid(sub.id); }}
                            className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-600 rounded-lg transition-colors z-20"
                            aria-label={`Undo payment for ${sub.name}`}
                          >
                            <Undo2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* 2. Category Split Card */}
          <div className="glass-panel rounded-2xl p-6 h-[380px] flex flex-col relative overflow-hidden">
            <div className="flex items-center space-x-2 text-indigo-400 mb-2 z-10">
              <PieChart className="w-5 h-5" />
              <h3 className="font-bold text-white">Spend by Category</h3>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center z-10 w-full">
              {categorySpending.length > 0 ? (
                <>
                  <div className="flex-1 w-full flex items-center justify-center relative min-h-[180px]">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 h-full max-h-[200px]">
                      {categorySpending.reduce((acc: any[], cat, i) => {
                        const total = categorySpending.reduce((s, c) => s + c.value, 0);
                        const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
                        const angle = (cat.value / total) * 360;
                        const endAngle = startAngle + angle;
                        const x1 = 50 + 42 * Math.cos(Math.PI * startAngle / 180);
                        const y1 = 50 + 42 * Math.sin(Math.PI * startAngle / 180);
                        const x2 = 50 + 42 * Math.cos(Math.PI * endAngle / 180);
                        const y2 = 50 + 42 * Math.sin(Math.PI * endAngle / 180);
                        const largeArc = angle > 180 ? 1 : 0;
                        const pathData = `M 50 50 L ${x1} ${y1} A 42 42 0 ${largeArc} 1 ${x2} ${y2} Z`;
                        acc.push({ pathData, color: getCategoryColorHex(cat.name), endAngle });
                        return acc;
                      }, []).map((slice: any, i) => (
                        <path key={i} d={slice.pathData} fill={slice.color} className="opacity-80 hover:opacity-100 transition-opacity cursor-help" />
                      ))}
                      <circle cx="50" cy="50" r="32" fill="transparent" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Top Spend</span>
                      <span className="text-sm font-bold text-white max-w-[80px] truncate text-center">{categorySpending[0]?.name}</span>
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2 mt-4">
                    {categorySpending.slice(0, 4).map(cat => (
                      <div key={cat.name} className="flex items-center text-[10px] text-slate-400 bg-slate-800/30 px-2 py-1.5 rounded-lg border border-slate-700/30">
                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0" style={{ backgroundColor: getCategoryColorHex(cat.name) }}></span>
                        <span className="truncate flex-1">{cat.name}</span>
                        <span className="font-mono ml-1 text-slate-300">${cat.value.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>

                  {categorySpending.length > 0 && (
                    <div className="mt-4 w-full p-2 bg-indigo-500/5 rounded-lg border border-indigo-500/10 text-[9px] text-indigo-300 italic text-center">
                      Tip: Consider a "One-at-a-time" rule for {categorySpending[0]?.name}.
                    </div>
                  )}
                </>
              ) : (
                <div className="text-slate-500 text-sm">Add subscriptions to see stats</div>
              )}
            </div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <GhostMeter
            subscriptions={subscriptions}
          />

        </div>

        {/* FULL LIST SECTION */}
        <section id="subscriptions-list" className="py-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1 shrink-0">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Wallet className="w-8 h-8 text-indigo-400" />
                All Subscriptions
                <span className="bg-indigo-500/10 text-indigo-400 text-xs font-black px-2.5 py-1 rounded-full border border-indigo-500/20 ml-2">
                  {subscriptions.length}
                </span>
              </h2>
              <p className="text-slate-500 text-sm ml-11 font-medium">Manage and optimize your digital life</p>
            </div>

            {/* Filter/Sort Controls Overlay */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center min-w-0">
              {/* Category Filter Pills */}
              <div className="flex-1 min-w-0 flex gap-1.5 p-1.5 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-x-auto custom-scrollbar">
                <button
                  onClick={() => setFilterCategory('All')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                    filterCategory === 'All'
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                  aria-label="Show all subscriptions"
                >
                  All
                </button>
                {userCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                      filterCategory === cat
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                    aria-label={`Filter by ${cat}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Pill with Dropdown */}
              <div className="relative w-fit shrink-0">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 h-11 rounded-2xl border transition-all text-sm font-bold whitespace-nowrap",
                    isSortOpen
                      ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-900/40 border-slate-800/50 text-slate-300 hover:border-indigo-500/30 hover:text-white"
                  )}
                  aria-label="Sort subscriptions"
                  aria-expanded={isSortOpen}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span className="opacity-80">Sort:</span>
                  <span>
                    {sortBy === 'price-desc' && "Highest Price"}
                    {sortBy === 'price-asc' && "Lowest Price"}
                    {sortBy === 'renewal-asc' && "Next Renewal"}
                    {sortBy === 'name-asc' && "Name (A-Z)"}
                  </span>
                </button>

                {/* Sort Menu Dropdown */}
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                    <div
                      className="absolute left-0 top-full mt-2 w-64 bg-slate-900/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300"
                    >
                      <div className="p-2.5">
                        <div className="px-3 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Sort list by</div>
                        <div className="space-y-1">
                          {[
                            { label: 'Highest Price', value: 'price-desc', icon: <DollarSign className="w-4 h-4" /> },
                            { label: 'Lowest Price', value: 'price-asc', icon: <DollarSign className="w-4 h-4 opacity-50" /> },
                            { label: 'Next Renewal', value: 'renewal-asc', icon: <Calendar className="w-4 h-4" /> },
                            { label: 'Name (A-Z)', value: 'name-asc', icon: <Type className="w-4 h-4" /> }
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                              className={cn(
                                "w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all text-sm font-semibold",
                                sortBy === opt.value
                                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                              )}
                            >
                              <span className={cn(
                                "p-2 rounded-lg flex items-center justify-center shrink-0",
                                sortBy === opt.value ? "bg-white/20" : "bg-slate-800 border border-slate-700/50"
                              )}>
                                {opt.icon}
                              </span>
                              <span className="flex-1">{opt.label}</span>
                              {sortBy === opt.value && <Check className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>



          {/* The List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {sortedSubscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  viewMode={viewMode}
                  onEdit={(s) => { setEditingId(s.id); setShowAddModal(true); }}
                  onDelete={(id) => setDeleteId(id)}
                  onMarkPaid={markAsPaid}
                />
              ))}
            </AnimatePresence>

            {/* Mobile Add Card (visible in list if empty?) No, standard empty state covers it. */}
            {sortedSubscriptions.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-600 space-y-4 border-2 border-dashed border-slate-800 rounded-3xl">
                <CreditCard className="w-12 h-12 opacity-20" />
                <p>No subscriptions found.</p>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Modals */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => {
          setShowWelcome(false);
          localStorage.setItem('hasSeenWelcome', 'true');
        }}
      />

      <SubscriptionModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setEditingId(null); }}
        onSave={handleSaveSubscription}
        initialData={editingId ? subscriptions.find(s => s.id === editingId) : null}
        userCategories={userCategories}
      />


      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onFactoryReset={() => setShowFactoryResetConfirm(true)}
        onExport={exportData}
        onImport={importData}
      />

      <SubTrackingWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        subscriptions={subscriptions}
        onFinish={handleAuditFinish}
      />

      {/* Confirmations - Kept inline for now or extract later if needed. 
           Actually, let's keep Category Delete Modal inline as it depends on local state `categoryToDelete` which is manageable.
       */}
      {
        categoryToDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-red-500/20 p-4 rounded-2xl">
                  <Tag className="w-8 h-8 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Delete Category?</h2>
                  <div className="text-slate-400 text-sm space-y-2">
                    <p>Are you sure you want to delete <span className="text-white font-semibold">"{categoryToDelete}"</span>?</p>
                    <p className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 text-[11px] leading-relaxed">
                      <span className="text-red-400 font-bold uppercase block mb-1">Impact</span>
                      All subscriptions using this category will be moved to <span className="text-white font-bold">"Other"</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={confirmCategoryDelete}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
                >
                  Delete Category
                </button>
                <button
                  onClick={() => setCategoryToDelete(null)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        deleteId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-red-500/20 p-4 rounded-2xl">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Delete Service?</h2>
                  <p className="text-slate-400 text-sm">
                    Are you sure you want to remove <span className="text-white font-semibold">"{subscriptions.find(s => s.id === deleteId)?.name}"</span>?
                    <br />
                    {subscriptions.find(s => s.id === deleteId)?.hasEverBeenPaid && <span className="text-emerald-400 font-bold block mt-1">Found savings! 💰</span>}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={confirmDelete}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl active:scale-[0.98] transition-all"
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        showFactoryResetConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl transform scale-110">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-red-500/20 p-4 rounded-2xl animate-pulse">
                  <Zap className="w-8 h-8 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Factory Reset?</h2>
                  <p className="text-red-400/80 text-sm font-medium">
                    CAUTION: This will permanently delete ALL your subscriptions, categories, and settings. This cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={factoryReset}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-[0.98] transition-all"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowFactoryResetConfirm(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl active:scale-[0.98] transition-all"
                >
                  Go Back Safety
                </button>
              </div>
            </div>
          </div>
        )
      }


      {/* Floating Action Button for Add Subscription */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] z-40 group border border-white/20"
        aria-label="Add new subscription"
      >
        <Plus className="w-8 h-8 text-white transition-transform group-hover:rotate-90 duration-300" />

        {/* Pulse Effect - only when modal is closed */}
        {!showAddModal && (
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping pointer-events-none" />
        )}
      </motion.button>

      <ToastContainer />

      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
