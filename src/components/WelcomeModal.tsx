'use client';

import { useState } from 'react';
import { X, Sparkles, Check, Plus, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrencySymbol } from '../types';

export interface PopularPresetItem {
  name: string;
  price: number;
  category: string;
  cycle: 'monthly';
  icon?: string;
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
  onAddPresets: (presets: PopularPresetItem[]) => void;
  onLoadDemoData: () => void;
  onOpenAddModal: () => void;
  currency?: string;
}

export const WelcomeModal = ({
  isOpen,
  onClose,
  onAddPresets,
  onLoadDemoData,
  onOpenAddModal,
  currency = 'USD'
}: WelcomeModalProps) => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const symbol = getCurrencySymbol(currency);

  const togglePreset = (name: string) => {
    setSelectedNames(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleAddSelected = () => {
    const chosen = POPULAR_WELCOME_PRESETS.filter(p => selectedNames.includes(p.name));
    if (chosen.length > 0) {
      onAddPresets(chosen);
    }
    onClose();
  };

  const handleDemoClick = () => {
    onLoadDemoData();
    onClose();
  };

  const handleCustomAdd = () => {
    onClose();
    onOpenAddModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-br from-indigo-500 to-purple-600" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none bg-gradient-to-tr from-emerald-500 to-cyan-600" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors z-10 cursor-pointer"
              aria-label="Skip setup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-2.5 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center p-2 shadow-lg shadow-indigo-500/10">
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
                  Select your current subscriptions for instant tracking, or explore sample data to see the dashboard in action.
                </p>
              </div>
            </div>

            {/* 1-Click Multi-Select Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold px-1">
                <span className="text-slate-300 uppercase tracking-wider text-[11px]">
                  Select Popular Subscriptions:
                </span>
                {selectedNames.length > 0 && (
                  <span className="text-indigo-400 font-semibold text-[11px]">
                    {selectedNames.length} selected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
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
                  onClick={handleAddSelected}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Add {selectedNames.length} Subscription{selectedNames.length !== 1 ? 's' : ''} & Open Dashboard</span>
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
                  <span>100% Local & Encrypted. No bank sync required.</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-200 underline font-medium cursor-pointer"
                >
                  Skip & Start Blank
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
