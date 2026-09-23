'use client';

import { useState, useMemo } from 'react';
import { X, Sparkles, Check, Plus, Zap, ArrowRight, ArrowLeft, ShieldCheck, Trash2, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCurrencySymbol } from '../types';

export interface PopularPresetItem {
  name: string;
  price: number;
  category: string;
  cycle: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
}

export interface CustomizedPresetItem {
  name: string;
  price: number;
  category: string;
  billingCycle: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  renewalDate: string;
}

export const POPULAR_WELCOME_PRESETS: PopularPresetItem[] = [
  { name: 'Netflix', price: 15.99, category: 'Streaming', cycle: 'monthly' },
  { name: 'Spotify', price: 11.99, category: 'Streaming', cycle: 'monthly' },
  { name: 'Gym Membership', price: 35.00, category: 'Health & Wellness', cycle: 'monthly' },
  { name: 'iCloud Storage', price: 2.99, category: 'Software & Apps', cycle: 'monthly' },
  { name: 'Amazon Prime', price: 14.99, category: 'Shopping & Retail', cycle: 'monthly' },
  { name: 'Mobile Phone Bill', price: 65.00, category: 'Utility Bills', cycle: 'monthly' },
  { name: 'Disney+', price: 13.99, category: 'Streaming', cycle: 'monthly' },
  { name: 'YouTube Premium', price: 13.99, category: 'Streaming', cycle: 'monthly' },
  { name: 'Home Internet', price: 70.00, category: 'Utility Bills', cycle: 'monthly' },
  { name: 'ChatGPT Plus', price: 20.00, category: 'Software & Apps', cycle: 'monthly' },
];

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomizedPresets: (presets: CustomizedPresetItem[]) => void;
  onLoadDemoData: () => void;
  onOpenAddModal: () => void;
  currency?: string;
}

export const WelcomeModal = ({
  isOpen,
  onClose,
  onAddCustomizedPresets,
  onLoadDemoData,
  onOpenAddModal,
  currency = 'USD'
}: WelcomeModalProps) => {
  const [step, setStep] = useState<'select' | 'customize'>('select');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [customizedItems, setCustomizedItems] = useState<CustomizedPresetItem[]>([]);
  const symbol = getCurrencySymbol(currency);

  const togglePreset = (name: string) => {
    setSelectedNames(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleProceedToCustomize = () => {
    const today = new Date();
    const items: CustomizedPresetItem[] = POPULAR_WELCOME_PRESETS
      .filter(p => selectedNames.includes(p.name))
      .map((preset, index) => {
        const d = new Date(today);
        d.setDate(d.getDate() + ((index * 5) % 25) + 3);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');

        return {
          name: preset.name,
          price: preset.price,
          category: preset.category,
          billingCycle: preset.cycle,
          renewalDate: `${yyyy}-${mm}-${dd}`
        };
      });

    setCustomizedItems(items);
    setStep('customize');
  };

  const updateItem = (index: number, changes: Partial<CustomizedPresetItem>) => {
    setCustomizedItems(prev => prev.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  };

  const removeItem = (index: number) => {
    const itemToRemove = customizedItems[index];
    setCustomizedItems(prev => prev.filter((_, i) => i !== index));
    if (itemToRemove) {
      setSelectedNames(prev => prev.filter(n => n !== itemToRemove.name));
    }
  };

  const handleFinish = () => {
    if (customizedItems.length > 0) {
      onAddCustomizedPresets(customizedItems);
    }
    onClose();
  };

  const totalMonthlySpend = useMemo(() => {
    return customizedItems.reduce((sum, item) => {
      let multiplier = 1;
      if (item.billingCycle === 'yearly') multiplier = 1 / 12;
      else if (item.billingCycle === 'weekly') multiplier = 4.33;
      else if (item.billingCycle === 'biweekly') multiplier = 2.16;
      else if (item.billingCycle === 'quarterly') multiplier = 1 / 3;
      return sum + (item.price * multiplier);
    }, 0);
  }, [customizedItems]);

  const handleDemoClick = () => {
    onLoadDemoData();
    onClose();
  };

  const handleCustomAdd = () => {
    onClose();
    onOpenAddModal();
  };

  const handleCloseModal = () => {
    setStep('select');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-7 max-w-xl w-full space-y-6 shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-br from-indigo-500 to-purple-600" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none bg-gradient-to-tr from-emerald-500 to-cyan-600" />

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ================= STEP 1: PICK SERVICES ================= */}
            {step === 'select' && (
              <div className="space-y-6 overflow-y-auto pr-1 custom-scrollbar">
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-2 pt-1">
                  <div className="w-13 h-13 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center p-2 shadow-lg shadow-indigo-500/10">
                    <img src="/logo.png" alt="SubTracking Logo" className="w-full h-full rounded-xl object-cover" />
                  </div>

                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>Welcome to SubTracking</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Quick-Start Your Vault
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                      Select what you currently pay for. You can tune your exact prices and renewal dates in the next step!
                    </p>
                  </div>
                </div>

                {/* 1-Click Multi-Select Presets */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold px-1">
                    <span className="text-slate-300 uppercase tracking-wider text-[11px]">
                      Step 1: Select Popular Subscriptions
                    </span>
                    {selectedNames.length > 0 && (
                      <span className="text-indigo-400 font-semibold text-[11px]">
                        {selectedNames.length} selected
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {POPULAR_WELCOME_PRESETS.map((preset) => {
                      const isSelected = selectedNames.includes(preset.name);
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => togglePreset(preset.name)}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'bg-indigo-600/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/15'
                              : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-1">
                            <div
                              className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-xs transition-colors ${
                                isSelected
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-slate-700/60 text-transparent border border-slate-600'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold truncate">{preset.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                            {symbol}{preset.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-1">
                  {selectedNames.length > 0 ? (
                    <button
                      type="button"
                      onClick={handleProceedToCustomize}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>Continue & Customize ({selectedNames.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleDemoClick}
                        className="py-3 px-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-purple-500/40 text-purple-200 hover:text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      >
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span>Explore Demo Data</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCustomAdd}
                        className="py-3 px-3.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 hover:text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-indigo-400" />
                        <span>Add Custom Sub</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 px-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1 text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% Local & Encrypted</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="text-slate-400 hover:text-slate-200 underline font-medium cursor-pointer"
                    >
                      Skip & Start Blank
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: QUICK-TUNE DETAILS ================= */}
            {step === 'customize' && (
              <div className="flex flex-col flex-1 min-h-0 space-y-4">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to selection</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Est. Total:</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">
                      {symbol}{totalMonthlySpend.toFixed(2)}/mo
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Quick-Tune Details
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adjust your plan prices and next renewal dates (or keep defaults):
                  </p>
                </div>

                {/* Subscriptions List to Customize */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar max-h-[46vh]">
                  {customizedItems.map((item, index) => (
                    <div
                      key={item.name}
                      className="p-3.5 bg-slate-800/40 border border-slate-700/60 rounded-2xl space-y-2.5 transition-all hover:border-slate-600 group"
                    >
                      {/* Item Top Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{item.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 font-medium">
                            {item.category}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Inputs Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {/* Price Input */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Price ({symbol})
                          </label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-slate-400 font-bold text-xs pointer-events-none">
                              {symbol}
                            </span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.price}
                              onChange={(e) => updateItem(index, { price: parseFloat(e.target.value) || 0 })}
                              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-xl py-1.5 pl-7 pr-2.5 text-xs font-bold text-white outline-none font-mono"
                            />
                          </div>
                        </div>

                        {/* Renewal Date Picker */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Next Renewal
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none z-10" />
                            <DatePicker
                              selected={item.renewalDate ? new Date(item.renewalDate + 'T00:00:00') : new Date()}
                              onChange={(date: Date | null) => {
                                if (date) {
                                  const yyyy = date.getFullYear();
                                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                                  const dd = String(date.getDate()).padStart(2, '0');
                                  updateItem(index, { renewalDate: `${yyyy}-${mm}-${dd}` });
                                }
                              }}
                              dateFormat="MM/dd/yyyy"
                              popperPlacement="bottom-start"
                              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-xl py-1.5 pl-8 pr-2.5 text-xs font-semibold text-white outline-none cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Cycle Selector */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Billing Cycle
                          </label>
                          <select
                            value={item.billingCycle}
                            onChange={(e) => updateItem(index, { billingCycle: e.target.value as any })}
                            className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-xl py-1.5 px-2 text-xs font-semibold text-white outline-none cursor-pointer"
                          >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Bi-weekly</option>
                            <option value="quarterly">Quarterly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {customizedItems.length === 0 && (
                    <div className="py-8 text-center space-y-2 text-slate-500">
                      <p className="text-xs font-semibold">No subscriptions in list.</p>
                      <button
                        type="button"
                        onClick={() => setStep('select')}
                        className="text-xs font-bold text-indigo-400 hover:underline"
                      >
                        ← Back to select subscriptions
                      </button>
                    </div>
                  )}
                </div>

                {/* Finish CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={customizedItems.length === 0}
                    onClick={handleFinish}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span>Complete Setup & Enter Dashboard ({customizedItems.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
