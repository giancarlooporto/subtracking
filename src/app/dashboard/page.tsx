'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Trash2, CreditCard, Wallet, AlertCircle, Calendar, X, Tag, Check, Undo2, Zap, Settings, PieChart, ArrowUpDown, DollarSign, Type, Ghost, ChevronDown, ChevronUp } from 'lucide-react';
import { Subscription, DEFAULT_CATEGORIES } from '../../types';
import { getDaysRemaining, getNextOccurrence, getCategoryColorHex, getCategoryIcon, calculateMonthlyPrice, cn, formatLocalDate } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import dynamic from 'next/dynamic';

// Components
import { SubscriptionCard } from '../../components/SubscriptionCard';
import { StatsOverview } from '../../components/StatsOverview';
import { CalendarView } from '../../components/CalendarView';
import { BillingPulse } from '../../components/BillingPulse';
import { ToastProvider, useToast } from '../../hooks/useToast';
import ToastContainer from '../../components/ToastContainer';
import { Footer } from '../../components/Footer';
import { InstallBanner } from '../../components/InstallBanner';
import { generateICSFile, generateBulkICSFile } from '../../lib/calendar';

import { PaymentModal } from '../../components/PaymentModal';

const SubscriptionModal = dynamic(() => import('../../components/SubscriptionModal').then(mod => mod.SubscriptionModal), { ssr: false });
const SettingsModal = dynamic(() => import('../../components/SettingsModal').then(mod => mod.SettingsModal), { ssr: false });
const SubTrackingWizard = dynamic(() => import('../../components/SubTrackingWizard').then(mod => mod.SubTrackingWizard), { ssr: false });
const GhostMeter = dynamic(() => import('../../components/GhostMeter').then(mod => mod.GhostMeter), { ssr: false });
const WelcomeModal = dynamic(() => import('../../components/WelcomeModal').then(mod => mod.WelcomeModal), { ssr: false });
const LicenseModal = dynamic(() => import('../../components/LicenseModal').then(mod => mod.LicenseModal), { ssr: false });
const UserGuideModal = dynamic(() => import('../../components/UserGuideModal').then(mod => mod.UserGuideModal), { ssr: false });

function HomeContent() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [userCategories, setUserCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [financeViewMode, setFinanceViewMode] = useState<'focus' | 'total'>('focus'); // 'focus' = Discretionary, 'total' = Everything
  const [isPro, setIsPro] = useState(false);

  // Modals & UI State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showFactoryResetConfirm, setShowFactoryResetConfirm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activePaymentSub, setActivePaymentSub] = useState<Subscription | null>(null);

  // Filtering & Sorting
  const [sortBy, setSortBy] = useState('price-desc');
  const [filterCategory, setFilterCategory] = useState<string[]>(['All']);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Stats
  const [cancelledSavings, setCancelledSavings] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [showUrgentBanner, setShowUrgentBanner] = useState(true);
  const [dashboardView, setDashboardView] = useState<'list' | 'calendar'>('list');
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const stickyHeaderRef = React.useRef<HTMLDivElement>(null);
  const lastScrollY = React.useRef(0);
  const isHeaderSticky = React.useRef(false);

  // Scroll-based header collapse for mobile
  useEffect(() => {
    const header = stickyHeaderRef.current;
    if (!header) return;

    // Check if we're on mobile (viewport width < 640px which is Tailwind's sm breakpoint)
    const checkMobile = () => window.innerWidth < 640;

    const handleScroll = () => {
      if (!checkMobile()) {
        // On desktop, always show full header
        setIsHeaderCompact(false);
        return;
      }

      const currentScrollY = window.scrollY;
      const headerRect = header.getBoundingClientRect();

      // Header is considered "sticky" when its top is at 0 (or very close)
      const headerIsAtTop = headerRect.top <= 1;
      isHeaderSticky.current = headerIsAtTop;

      if (headerIsAtTop) {
        // Scrolling down = collapse, scrolling up = expand
        const scrollingDown = currentScrollY > lastScrollY.current;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

        // Only trigger if scroll delta is significant (reduces jitter)
        if (scrollDelta > 5) {
          if (scrollingDown) {
            setIsHeaderCompact(true);
          } else {
            setIsHeaderCompact(false);
          }
        }
      } else {
        // Header not sticky yet, ensure it's expanded
        setIsHeaderCompact(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Also handle resize to reset state when switching to desktop
    const handleResize = () => {
      if (!checkMobile()) {
        setIsHeaderCompact(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        } else {
          // Auto-migrate: Add "Utility Bills", "Housing & Rent", "Auto & Transport" if missing
          const ensureCategory = (cat: string) => {
            if (!loadedCats.includes(cat)) {
              // Try to insert before "Other"
              const otherIndex = loadedCats.indexOf('Other');
              if (otherIndex !== -1) loadedCats.splice(otherIndex, 0, cat);
              else loadedCats.push(cat);
            }
          };

          ensureCategory('Utility Bills');
          ensureCategory('Housing & Rent');

          // Migration: Split Auto & Transport into Auto Loan / Transportation
          // Also rename "Automotive" -> "Auto Loan" if it exists from previous step

          // 1. Ensure new categories exist
          ensureCategory('Auto Loan');
          ensureCategory('Transportation');

          // 2. Remove old "Auto & Transport" or "Transport & Uber" from list
          const oldAutoIndex = loadedCats.indexOf('Auto & Transport');
          if (oldAutoIndex !== -1) loadedCats.splice(oldAutoIndex, 1);

          const oldTransportIndex = loadedCats.indexOf('Transport & Uber');
          if (oldTransportIndex !== -1) loadedCats.splice(oldTransportIndex, 1);

          // 3. Rename "Automotive" -> "Auto Loan" if present
          const automotiveIndex = loadedCats.indexOf('Automotive');
          if (automotiveIndex !== -1) {
            loadedCats[automotiveIndex] = 'Auto Loan';
          }

          // 4. Deduplicate (fix for potential "Auto Loan" double entry)
          loadedCats = Array.from(new Set(loadedCats));

          // 5. Force Re-order to match new defaults
          // This ensures the "common" categories appear first as requested
          loadedCats.sort((a: string, b: string) => {
            const indexA = DEFAULT_CATEGORIES.indexOf(a);
            const indexB = DEFAULT_CATEGORIES.indexOf(b);

            // If both are defaults, sort by default order
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;

            // If one is default and other is custom, default comes first
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            // If both are custom, sort alphabetically
            return a.localeCompare(b);
          });
        }
        setUserCategories(loadedCats);
      } catch (e) {
        console.error('Failed to parse categories', e);
      }
    }

    if (savedSavings) setCancelledSavings(parseFloat(savedSavings));

    // Check Pro Status
    const savedPro = localStorage.getItem('subtracking-pro');
    if (savedPro === 'true') setIsPro(true);

    setIsLoaded(true);

    // Check if first-time user
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
    // Check for upgrade intent from landing page
    const upgrade = searchParams.get('upgrade');
    if (upgrade === 'true') {
      setShowLicenseModal(true);
      // Clean up URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams]);

  // Migration Effect: Smartly Split 'Auto & Transport' -> 'Automotive' vs 'Transportation'
  useEffect(() => {
    if (!isLoaded || subscriptions.length === 0) return;

    // Subscription Migration: "Auto & Transport" or "Transport & Uber" -> "Auto Loan" / "Transportation"
    // Also rename any existing "Automotive" subs -> "Auto Loan"
    let subsChanged = false;
    const newSubs = subscriptions.map((sub: Subscription) => {
      if (sub.category === 'Automotive') {
        subsChanged = true;
        return { ...sub, category: 'Auto Loan', isEssential: true };
      }
      if (sub.category === 'Auto & Transport' || sub.category === 'Transport & Uber') {
        subsChanged = true;
        const name = sub.name.toLowerCase();
        // Essential keywords: loan, lease, insurance, finance, car payment, toyota, honda, ford, etc...
        // It's safer to check for explicit "Transportation" keywords (uber, lyft, train, bus)
        // But let's stick to the user's request:
        // "Automotive" (now Auto Loan) for fixed stuff.

        const isFixedAuto = name.includes('insurance') || name.includes('loan') || name.includes('lease') || name.includes('payment') || name.includes('car');

        if (isFixedAuto) {
          return { ...sub, category: 'Auto Loan', isEssential: true };
        } else {
          return { ...sub, category: 'Transportation', isEssential: false };
        }
      }
      return sub;
    });

    if (subsChanged) {
      setSubscriptions(newSubs);
      showToast('Split "Auto" into "Auto Loan" & "Transportation"', 'success');
    }
  }, [isLoaded, subscriptions.length]);

  // Save to localStorage (Debounced for performance)
  useEffect(() => {
    if (!isLoaded) return;

    const timeout = setTimeout(() => {
      localStorage.setItem('subtracking-data', JSON.stringify(subscriptions));
      localStorage.setItem('subtracking-categories', JSON.stringify(userCategories));
      localStorage.setItem('subtracking-savings', cancelledSavings.toString());
    }, 500);

    return () => clearTimeout(timeout);
  }, [subscriptions, userCategories, cancelledSavings, isLoaded]);

  const monthlyTotal = useMemo(() => {
    return subscriptions.reduce((sum, sub) => {
      // Finance View Mode Logic:
      // If in 'focus' mode, skip 'Essential' items (Rent, Loans, etc.)
      if (financeViewMode === 'focus' && sub.isEssential) return sum;

      // Check if trial expired
      const isTrialExpired = sub.isTrial && sub.trialEndDate
        ? getDaysRemaining(sub.trialEndDate) < 0
        : false;

      // Use regular price if trial expired, otherwise use current price
      const currentPrice = isTrialExpired
        ? (sub.regularPrice || sub.price)
        : sub.price;

      // If it's a one-time trial payment and trial is active, don't add to recurring monthly total
      if (sub.isTrial && sub.isOneTimePayment && !isTrialExpired) {
        return sum;
      }

      return sum + calculateMonthlyPrice(currentPrice, sub.billingCycle);
    }, 0);
  }, [subscriptions, financeViewMode]);

  const variableTotal = useMemo(() => {
    return subscriptions.reduce((sum, sub) => {
      if (!sub.isVariable) return sum;

      // Finance View Mode Logic
      if (financeViewMode === 'focus' && sub.isEssential) return sum;

      // Check if trial expired
      const isTrialExpired = sub.isTrial && sub.trialEndDate
        ? getDaysRemaining(sub.trialEndDate) < 0
        : false;

      // Use regular price if trial expired, otherwise use current price
      const currentPrice = isTrialExpired
        ? (sub.regularPrice || sub.price)
        : sub.price;

      // If it's a one-time trial payment and trial is active, don't add to recurring monthly total
      if (sub.isTrial && sub.isOneTimePayment && !isTrialExpired) {
        return sum;
      }

      return sum + calculateMonthlyPrice(currentPrice, sub.billingCycle);
    }, 0);
  }, [subscriptions, financeViewMode]);

  const sortedSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    // Multi-Select Filter Logic
    if (!filterCategory.includes('All')) {
      result = result.filter(sub => filterCategory.includes(sub.category));
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

  // Calculate total for the filtered list
  const filteredListTotal = useMemo(() => {
    return sortedSubscriptions.reduce((sum, sub) => {
      // Logic for list total should simpler, or match the View Mode? 
      // User said "spend by category... also sync it with subs only and total life" earlier.
      // But for this specific "selected categories total", let's assume monthly normalized cost.
      return sum + calculateMonthlyPrice(sub.price, sub.billingCycle);
    }, 0);
  }, [sortedSubscriptions]);

  const categorySpending = useMemo(() => {
    const spending: Record<string, number> = {};
    subscriptions.forEach(sub => {
      // Finance View Mode Logic:
      // If in 'focus' mode, skip 'Essential' items (Rent, Loans, etc.)
      if (financeViewMode === 'focus' && sub.isEssential) return;

      // Check if trial expired and handle price accordingly (matching monthlyTotal logic)
      const isTrialExpired = sub.isTrial && sub.trialEndDate
        ? getDaysRemaining(sub.trialEndDate) < 0
        : false;

      // If it's a one-time trial payment and trial is active, don't include
      if (sub.isTrial && sub.isOneTimePayment && !isTrialExpired) {
        return;
      }

      const currentPrice = isTrialExpired
        ? (sub.regularPrice || sub.price)
        : sub.price;

      // Use split price if applicable
      const actualPrice = sub.isSplit && sub.splitWith
        ? currentPrice / sub.splitWith
        : currentPrice;

      let price = calculateMonthlyPrice(actualPrice, sub.billingCycle);

      // Adjust for View Mode
      if (viewMode === 'yearly') {
        price *= 12;
      }

      spending[sub.category] = (spending[sub.category] || 0) + price;
    });
    return Object.entries(spending)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [subscriptions, financeViewMode, viewMode]);

  const isPaidThisCycle = (sub: Subscription) => {
    if (!sub.lastPaidDate) return false;
    const todayStr = formatLocalDate(new Date());
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
    const today = formatLocalDate(new Date());
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

  const markAsPaid = (id: string, amount?: number, date?: Date) => {
    const today = formatLocalDate(date || new Date());
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id !== id) return sub;
      const [year, month, day] = sub.renewalDate.split('-').map(Number);
      let nextDate = new Date(year, month - 1, day);
      nextDate.setHours(12, 0, 0, 0); // Use noon to avoid TZ issues

      if (sub.billingCycle === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
      else if (sub.billingCycle === 'biweekly') nextDate.setDate(nextDate.getDate() + 14);
      else if (sub.billingCycle === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);
      else if (sub.billingCycle === 'quarterly') nextDate.setMonth(nextDate.getMonth() + 3);
      else if (sub.billingCycle === 'yearly') nextDate.setFullYear(nextDate.getFullYear() + 1);

      // Create new payment record if amount is provided
      const newPaymentHistory = amount ? [
        ...(sub.paymentHistory || []),
        { date: today, amount }
      ] : sub.paymentHistory;

      const updatedSub = {
        ...sub,
        renewalDate: formatLocalDate(nextDate),
        lastPaidDate: today,
        hasEverBeenPaid: true,
        paymentHistory: newPaymentHistory
      };

      // Smart Update: Auto-adjust estimated price for variable bills based on last 3 payments
      if (sub.isVariable && amount && newPaymentHistory) {
        // Since history is append-only, just take the last 3 entries
        const recentAmounts = newPaymentHistory.slice(-3).map(p => p.amount);

        if (recentAmounts.length > 0) {
          const avg = recentAmounts.reduce((sum, val) => sum + val, 0) / recentAmounts.length;
          updatedSub.price = parseFloat(avg.toFixed(2)); // Round to 2 decimals
        }
      }

      return updatedSub;
    }));
  };

  const handlePaymentConfirm = (amount: number, date: Date) => {
    if (activePaymentSub) {
      markAsPaid(activePaymentSub.id, amount, date);
      setShowPaymentModal(false);
      setActivePaymentSub(null);
      showToast(`Payment of $${amount.toFixed(2)} recorded!`, 'success');
    }
  };

  const unmarkAsPaid = (id: string) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id !== id) return sub;

      // Revert date logic
      const [year, month, day] = sub.renewalDate.split('-').map(Number);
      let prevDate = new Date(year, month - 1, day);
      prevDate.setHours(12, 0, 0, 0); // Use noon to avoid TZ issues

      if (sub.billingCycle === 'weekly') prevDate.setDate(prevDate.getDate() - 7);
      else if (sub.billingCycle === 'biweekly') prevDate.setDate(prevDate.getDate() - 14);
      else if (sub.billingCycle === 'monthly') prevDate.setMonth(prevDate.getMonth() - 1);
      else if (sub.billingCycle === 'quarterly') prevDate.setMonth(prevDate.getMonth() - 3);
      else if (sub.billingCycle === 'yearly') prevDate.setFullYear(prevDate.getFullYear() - 1);

      // If the reverted date is in the past, use getNextOccurrence to find the next valid date
      const revertedDateStr = formatLocalDate(prevDate);
      const nextValidDate = getNextOccurrence(revertedDateStr, sub.billingCycle);

      return {
        ...sub,
        renewalDate: nextValidDate,
        lastPaidDate: undefined
      };
    }));
  };


  const handleSaveSubscription = (data: Omit<Subscription, 'id' | 'lastPaidDate' | 'hasEverBeenPaid'>) => {


    // Add custom category if needed (PRO ONLY FEATURE)
    if (isPro && !userCategories.includes(data.category)) {
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

      // Calendar Bridge: Trigger alert download for new trials
      if (data.isTrial && data.trialEndDate) {
        generateICSFile({ ...data, id: 'temp' } as Subscription, 'trial');
        showToast('Trial Shield Active: Calendar Alert Generated! 🗓️', 'success');
      }
    }
  };

  const handleProSuccess = () => {
    setIsPro(true);
    localStorage.setItem('subtracking-pro', 'true');
    setShowLicenseModal(false);
    showToast('Pro features unlocked! Welcome to the club 🚀', 'success');
  };

  const confirmDelete = () => {
    if (deleteId) {
      const subToDelete = subscriptions.find(s => s.id === deleteId);
      if (subToDelete && subToDelete.hasEverBeenPaid) {
        // Celebration logic simplified for now
        const monthlyEquivalent = calculateMonthlyPrice(subToDelete.price, subToDelete.billingCycle);
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

  const exportCSV = () => {
    const headers = [
      'Name',
      'Price ($)',           // Regular/main price (or regularPrice if trial)
      'Trial Price ($)',     // Current discounted trial price (if applicable)
      'Monthly Equivalent ($)',
      'Billing Cycle',
      'Category',
      'Next Renewal',
      'Status',
      'Trial End Date',
      'Is Essential',
      'Is Variable',
      'Is Split',
      'Split With (People)',
      'One-Time Payment',
      'Last Paid Date'
    ];

    const rows = subscriptions.map(sub => {
      // For trials: Price = regularPrice, Trial Price = current price
      // For regular: Price = price, Trial Price = N/A
      const mainPrice = sub.isTrial && sub.regularPrice ? sub.regularPrice : sub.price;
      const trialPrice = sub.isTrial ? sub.price : null;
      const monthlyEquivalent = calculateMonthlyPrice(mainPrice, sub.billingCycle);

      return [
        sub.name,
        mainPrice.toFixed(2),
        trialPrice !== null ? trialPrice.toFixed(2) : 'N/A',
        monthlyEquivalent.toFixed(2),
        sub.billingCycle,
        sub.category,
        sub.renewalDate,
        sub.isTrial ? 'Trial' : 'Regular',
        sub.trialEndDate || 'N/A',
        sub.isEssential ? 'Yes' : 'No',
        sub.isVariable ? 'Yes' : 'No',
        sub.isSplit ? 'Yes' : 'No',
        sub.isSplit && sub.splitWith ? sub.splitWith.toString() : 'N/A',
        sub.isOneTimePayment ? 'Yes' : 'No',
        sub.lastPaidDate || 'N/A'
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const fileName = `subtracking_audit_${new Date().toISOString().split('T')[0]}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showToast('Audit report exported! Open in Excel or Sheets.', 'success');
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
        const monthly = calculateMonthlyPrice(sub.price, sub.billingCycle);
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
    <main className="min-h-screen bg-aurora text-slate-100 font-[family-name:var(--font-geist-sans)] relative" style={{ overflowX: 'clip' }}>
      <InstallBanner />

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
          variableTotal={variableTotal}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          financeViewMode={financeViewMode}
          onFinanceViewModeChange={setFinanceViewMode}
          onOpenSettings={() => setShowSettingsModal(true)}
          onStartAudit={() => setShowWizard(true)}
        />

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePaymentConfirm}
          subscriptionName={activePaymentSub?.name || ''}
          estimatedAmount={activePaymentSub?.price}
        />

        {/* HOUSEHOLD PULSE (Timeline) */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 relative group">
          <BillingPulse subscriptions={subscriptions} />
        </div>

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
                            onClick={(e) => {
                              e.stopPropagation();
                              if (sub.isVariable) {
                                setActivePaymentSub(sub);
                                setShowPaymentModal(true);
                              } else {
                                markAsPaid(sub.id);
                              }
                            }}
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
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 h-full max-h-[220px]">
                      {categorySpending.reduce((acc: any[], cat, i) => {
                        const total = categorySpending.reduce((s, c) => s + c.value, 0);
                        const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
                        const angle = (cat.value / total) * 360;
                        const endAngle = startAngle + angle;

                        // Don't render tiny slices that break the math (less than 1 degree)
                        if (angle < 1) return acc;

                        const largeArc = angle > 180 ? 1 : 0;

                        // Coordinates for outer radius (45)
                        const x1 = 50 + 45 * Math.cos(Math.PI * startAngle / 180);
                        const y1 = 50 + 45 * Math.sin(Math.PI * startAngle / 180);
                        const x2 = 50 + 45 * Math.cos(Math.PI * endAngle / 180);
                        const y2 = 50 + 45 * Math.sin(Math.PI * endAngle / 180);

                        // Coordinates for inner radius (35) - creating the doughnut hole
                        const x3 = 50 + 35 * Math.cos(Math.PI * endAngle / 180);
                        const y3 = 50 + 35 * Math.sin(Math.PI * endAngle / 180);
                        const x4 = 50 + 35 * Math.cos(Math.PI * startAngle / 180);
                        const y4 = 50 + 35 * Math.sin(Math.PI * startAngle / 180);

                        const pathData = [
                          `M ${x1} ${y1}`, // Move to outer start
                          `A 45 45 0 ${largeArc} 1 ${x2} ${y2}`, // Arc to outer end
                          `L ${x3} ${y3}`, // Line to inner end
                          `A 35 35 0 ${largeArc} 0 ${x4} ${y4}`, // Arc to inner start (reverse direction)
                          `Z` // Close path
                        ].join(' ');

                        acc.push({ pathData, color: getCategoryColorHex(cat.name), endAngle, name: cat.name, value: cat.value, percent: (cat.value / total) * 100 });
                        return acc;
                      }, []).map((slice: any, i) => (
                        <path
                          key={i}
                          d={slice.pathData}
                          fill={slice.color}
                          className="opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer stroke-slate-900 stroke-[0.5]"
                        >
                          <title>{slice.name}: ${slice.value.toFixed(2)} ({slice.percent.toFixed(1)}%)</title>
                        </path>
                      ))}
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Total</span>
                      <span className="text-xl font-bold text-white">
                        ${categorySpending.reduce((s, c) => s + c.value, 0).toFixed(0)}
                      </span>
                      <span className="text-[9px] text-slate-600">
                        {viewMode === 'monthly' ? '/mo' : '/yr'}
                      </span>
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2 mt-4 max-h-[100px] overflow-y-auto pr-1 custom-scrollbar">
                    {categorySpending.map(cat => (
                      <div key={cat.name} className="flex items-center text-[10px] text-slate-400 bg-slate-800/30 px-2 py-1.5 rounded-lg border border-slate-700/30">
                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0" style={{ backgroundColor: getCategoryColorHex(cat.name) }}></span>
                        <span className="truncate flex-1">{cat.name}</span>
                        <span className="font-mono ml-1 text-slate-300">${cat.value.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>


                </>
              ) : (
                <div className="text-slate-500 text-sm">Add subscriptions to see stats</div>
              )}
            </div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="relative group">
            <GhostMeter
              subscriptions={financeViewMode === 'focus' ? subscriptions.filter(s => !s.isEssential) : subscriptions}
            />
            {!isPro && (
              <div className="absolute inset-0 top-12 backdrop-blur-[6px] bg-slate-900/20 z-20 flex items-center justify-center rounded-b-2xl">
                <button
                  onClick={() => setShowLicenseModal(true)}
                  className="bg-slate-900 border border-purple-500/30 px-5 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Ghost className="w-4 h-4 text-purple-400 fill-purple-400" />
                  <span className="text-white font-bold text-sm">Unlock Ghost Meter</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* FULL LIST SECTION */}
        <section id="subscriptions-list" className="py-12 space-y-8">
          {/* Sticky Header Container */}
          <div
            ref={stickyHeaderRef}
            className={cn(
              "sticky top-0 z-30 rounded-2xl border border-white/5 mb-6 transition-all duration-300",
              isHeaderCompact ? "p-3 sm:p-6" : "p-4 sm:p-6"
            )}
            style={{
              background: 'rgba(15, 23, 42, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Compact Header (Mobile when scrolled) */}
            {isHeaderCompact ? (
              <div className="sm:hidden">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Wallet className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span className="text-white font-bold text-sm truncate">
                      {!filterCategory.includes('All') ? 'Selected' : 'All'} Subs
                    </span>
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-black px-2 py-0.5 rounded-full border border-indigo-500/20 shrink-0">
                      {sortedSubscriptions.length}
                    </span>
                    <span className="text-emerald-400 font-bold text-sm truncate">
                      ${filteredListTotal.toFixed(2)}/mo
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Sort Button (Compact) */}
                    <div className="relative">
                      <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className={cn(
                          "p-2 rounded-xl border transition-all",
                          isSortOpen
                            ? "bg-indigo-500 border-indigo-500 text-white"
                            : "bg-slate-900/40 border-slate-800/50 text-slate-300"
                        )}
                        aria-label="Sort"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                      {/* Sort Menu Dropdown (Compact) */}
                      {isSortOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                          <div
                            className="absolute right-0 top-full mt-2 w-48 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                          >
                            <div className="p-2">
                              <div className="px-3 py-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Sort by</div>
                              <div className="space-y-1">
                                {[
                                  { label: 'Price ↓', value: 'price-desc' },
                                  { label: 'Price ↑', value: 'price-asc' },
                                  { label: 'Next Due', value: 'renewal-asc' },
                                  { label: 'A-Z', value: 'name-asc' }
                                ].map((opt) => (
                                  <button
                                    key={opt.value}
                                    onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                                    className={cn(
                                      "w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                                      sortBy === opt.value
                                        ? "bg-indigo-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                                    )}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {/* Expand Button */}
                    <button
                      onClick={() => setIsHeaderCompact(false)}
                      className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                      aria-label="Expand header"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Filters Row (Compact) */}
                <div className="w-full flex gap-1.5 overflow-x-auto custom-scrollbar">
                  <button
                    onClick={() => setFilterCategory(['All'])}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap shrink-0",
                      filterCategory.includes('All')
                        ? "bg-white text-black"
                        : "bg-slate-900/40 border border-slate-800/50 text-slate-400"
                    )}
                  >
                    All
                  </button>
                  {userCategories.slice(0, 6).map(cat => {
                    const isSelected = filterCategory.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          if (filterCategory.includes('All')) {
                            setFilterCategory([cat]);
                          } else {
                            if (isSelected) {
                              const newFilters = filterCategory.filter(c => c !== cat);
                              setFilterCategory(newFilters.length === 0 ? ['All'] : newFilters);
                            } else {
                              setFilterCategory([...filterCategory, cat]);
                            }
                          }
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap shrink-0 border",
                          isSelected
                            ? "bg-indigo-500 border-indigo-400 text-white"
                            : "bg-slate-900/40 border-slate-800/50 text-slate-400"
                        )}
                      >
                        {cat.length > 10 ? cat.slice(0, 10) + '...' : cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Full Header (Desktop always, Mobile when not compact) */}
            <div className={cn(isHeaderCompact ? "hidden sm:block" : "block")}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1 shrink-0">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                      <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                      <span className="truncate">
                        {!filterCategory.includes('All') ? 'Selected' : 'All'} Subs
                      </span>
                      <span className="bg-indigo-500/10 text-indigo-400 text-xs font-black px-2 py-0.5 rounded-full border border-indigo-500/20">
                        {sortedSubscriptions.length}
                      </span>
                    </h2>
                    {/* Collapse Button (Mobile only) */}
                    <button
                      onClick={() => setIsHeaderCompact(true)}
                      className="sm:hidden p-1.5 rounded-lg bg-slate-800/50 text-slate-400"
                      aria-label="Collapse header"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 ml-8 sm:ml-11">
                    <span className="text-sm font-medium text-slate-400">Total:</span>
                    <span className="text-lg sm:text-xl font-bold text-emerald-400">
                      ${filteredListTotal.toFixed(2)}<span className="text-xs text-emerald-500/70 font-normal ml-0.5">/mo</span>
                    </span>
                  </div>
                  <p className="hidden sm:block text-slate-500 text-sm ml-11 font-medium">Manage and optimize your digital life</p>
                </div>

                {/* Filter/Sort Controls Overlay */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center min-w-0">
                  {/* Action Bar (Sort & View) */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Sort Pill with Dropdown */}
                    <div className="relative flex-1 sm:flex-none">
                      <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className={cn(
                          "flex items-center justify-center gap-2 px-3 sm:px-4 h-10 sm:h-11 w-full sm:w-auto rounded-2xl border transition-all text-sm font-bold whitespace-nowrap",
                          isSortOpen
                            ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                            : "bg-slate-900/40 border-slate-800/50 text-slate-300 hover:border-indigo-500/30 hover:text-white"
                        )}
                        aria-label="Sort subscriptions"
                        aria-expanded={isSortOpen}
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        <span>
                          {sortBy === 'price-desc' && "Price ↓"}
                          {sortBy === 'price-asc' && "Price ↑"}
                          {sortBy === 'renewal-asc' && "Next"}
                          {sortBy === 'name-asc' && "A-Z"}
                        </span>
                      </button>

                      {/* Sort Menu Dropdown */}
                      {isSortOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                          <div
                            className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300"
                          >
                            <div className="p-2">
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
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                        : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                                    )}
                                  >
                                    <span className={cn(
                                      "p-1.5 rounded-lg flex items-center justify-center shrink-0",
                                      sortBy === opt.value ? "bg-white/20" : "bg-slate-800 border border-slate-700/50"
                                    )}>
                                      {opt.icon}
                                    </span>
                                    <span className="flex-1 text-xs">{opt.label}</span>
                                    {sortBy === opt.value && <Check className="w-3 h-3" />}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* View Switcher */}
                    <div className="flex bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-1 rounded-2xl h-10 sm:h-11 shrink-0">
                      <button
                        onClick={() => setDashboardView('list')}
                        className={cn(
                          "px-3 sm:px-4 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                          dashboardView === 'list' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:text-white"
                        )}
                        aria-label="List View"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="hidden sm:inline">List</span>
                      </button>
                      <button
                        onClick={() => setDashboardView('calendar')}
                        className={cn(
                          "px-3 sm:px-4 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative",
                          dashboardView === 'calendar' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:text-white"
                        )}
                        aria-label="Calendar View"
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="hidden sm:inline">Calendar</span>
                        {!isPro && <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400 ml-0.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Full Width Filters */}
              <div className="w-full mt-4">
                <div className="w-full flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  <button
                    onClick={() => setFilterCategory(['All'])}
                    className={cn(
                      "px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0",
                      filterCategory.includes('All')
                        ? "bg-white text-black shadow-lg shadow-white/10"
                        : "bg-slate-900/40 border border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                    aria-label="Show all subscriptions"
                  >
                    All
                  </button>
                  {userCategories.map(cat => {
                    const isSelected = filterCategory.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          if (filterCategory.includes('All')) {
                            setFilterCategory([cat]);
                          } else {
                            if (isSelected) {
                              const newFilters = filterCategory.filter(c => c !== cat);
                              setFilterCategory(newFilters.length === 0 ? ['All'] : newFilters);
                            } else {
                              setFilterCategory([...filterCategory, cat]);
                            }
                          }
                        }}
                        className={cn(
                          "px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border",
                          isSelected
                            ? "bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                            : "bg-slate-900/40 border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800/50"
                        )}
                        aria-label={`Filter by ${cat}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>



          {/* The Content (List or Calendar) */}
          <div className="min-h-[400px]">
            {dashboardView === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence>
                  {sortedSubscriptions.map((sub) => (
                    <div key={sub.id} className={cn(
                      "transition-all duration-300",
                      sub.isEssential && financeViewMode === 'focus' ? "opacity-40 grayscale hover:opacity-100 hover:grayscale-0" : "opacity-100"
                    )}>
                      <SubscriptionCard
                        subscription={sub}
                        viewMode={viewMode}
                        onEdit={(s) => { setEditingId(s.id); setShowAddModal(true); }}
                        onDelete={(id) => setDeleteId(id)}
                        onMarkPaid={markAsPaid}
                        onOpenPaymentModal={(sub) => {
                          setActivePaymentSub(sub);
                          setShowPaymentModal(true);
                        }}
                        isMenuOpen={activeMenuId === sub.id}
                        onToggleMenu={() => setActiveMenuId(activeMenuId === sub.id ? null : sub.id)}
                      />
                    </div>
                  ))}
                </AnimatePresence>

                {sortedSubscriptions.length === 0 && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-600 space-y-4 border-2 border-dashed border-slate-800 rounded-3xl">
                    <CreditCard className="w-12 h-12 opacity-20" />
                    <p>No subscriptions found.</p>
                  </div>
                )}
              </div>
            ) : (
              <CalendarView
                subscriptions={subscriptions}
                isPro={isPro}
                onUnlockPro={() => setShowLicenseModal(true)}
                onEdit={(s) => { setEditingId(s.id); setShowAddModal(true); }}
                onDelete={(id) => setDeleteId(id)}
                onMarkPaid={markAsPaid}
              />
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
        isPro={isPro}
        onDeleteCategory={(cat) => {
          // Instant Delete: No confirmation pop-up
          setUserCategories(prev => prev.filter(c => c !== cat));
          // Auto-update any subscription using this deleted category to 'Other'
          setSubscriptions(prev => prev.map(s => s.category === cat ? { ...s, category: 'Other' } : s));
          showToast(`Category "${cat}" deleted`, 'success');
        }}
      />

      <LicenseModal
        isOpen={showLicenseModal}
        onClose={() => setShowLicenseModal(false)}
        onSuccess={handleProSuccess}
      />

      <UserGuideModal
        isOpen={showUserGuide}
        onClose={() => setShowUserGuide(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onFactoryReset={() => setShowFactoryResetConfirm(true)}
        onExport={exportData}
        onExportCSV={exportCSV}
        onExportICS={() => generateBulkICSFile(subscriptions)}
        onImport={importData}
        isPro={isPro}
        onActivatePro={() => setShowLicenseModal(true)}
        onOpenGuide={() => setShowUserGuide(true)}
      />

      <SubTrackingWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        subscriptions={subscriptions.filter(s => !s.isEssential && s.category !== 'Utility Bills')}
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
                    <p>Are you sure you want to delete <span className="text-white font-semibold">&quot;{categoryToDelete}&quot;</span>?</p>
                    <p className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 text-[11px] leading-relaxed">
                      <span className="text-red-400 font-bold uppercase block mb-1">Impact</span>
                      All subscriptions using this category will be moved to <span className="text-white font-bold">&quot;Other&quot;</span>.
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
                    Are you sure you want to remove <span className="text-white font-semibold">&quot;{subscriptions.find(s => s.id === deleteId)?.name}&quot;</span>?
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

      <Footer
        isPro={isPro}
        onUnlockPro={() => setShowLicenseModal(true)}
      />
    </main >
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <Suspense fallback={<div className="min-h-screen bg-aurora flex items-center justify-center text-white">Loading Dashboard...</div>}>
        <HomeContent />
      </Suspense>
    </ToastProvider>
  );
}
