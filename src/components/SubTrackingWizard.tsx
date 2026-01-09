import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Trash2, RotateCcw, PartyPopper } from 'lucide-react';
import { Subscription } from '../types';
import { cn, getCategoryColorHex, getCategoryIcon } from '../lib/utils';
import { siteConfig } from '../../siteConfig';

interface SubTrackingWizardProps {
    isOpen: boolean;
    onClose: () => void;
    subscriptions: Subscription[];
    onFinish: (idsToDelete: string[]) => void;
}

export function SubTrackingWizard({ isOpen, onClose, subscriptions, onFinish }: SubTrackingWizardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [toDeleteIds, setToDeleteIds] = useState<string[]>([]);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    if (!isOpen) return null;

    const currentSub = subscriptions[currentIndex];

    const handleSwipe = (dir: 'left' | 'right') => {
        setDirection(dir);

        // Allow animation to play
        setTimeout(() => {
            if (dir === 'left') {
                // Toss / Cancel
                setToDeleteIds([...toDeleteIds, currentSub.id]);
            }

            if (currentIndex < subscriptions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setDirection(null);
            } else {
                setIsCompleted(true);
            }
        }, 200);
    };

    const calculatePotentialSavings = () => {
        return subscriptions
            .filter(s => toDeleteIds.includes(s.id))
            .reduce((acc, sub) => {
                let monthly = sub.price;
                if (sub.billingCycle === 'weekly') monthly = sub.price * 4.33;
                else if (sub.billingCycle === 'yearly') monthly = sub.price / 12;
                return acc + monthly;
            }, 0);
    };

    return (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <div className="w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {!isCompleted ? (
                    <div className="relative h-[500px] flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-black text-white mb-8 text-center">
                            Keep or Toss?
                            <span className="block text-sm font-medium text-slate-500 mt-2 font-normal">
                                {currentIndex + 1} of {subscriptions.length}
                            </span>
                        </h2>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSub.id}
                                initial={{ scale: 0.9, opacity: 0, x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0 }}
                                animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                                exit={{
                                    x: direction === 'left' ? -200 : 200,
                                    opacity: 0,
                                    rotate: direction === 'left' ? -20 : 20
                                }}
                                transition={{ duration: 0.2 }}
                                className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center space-y-6 relative overflow-hidden"
                            >
                                {/* Card Content */}
                                <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg mb-4"
                                    style={{ backgroundColor: `${getCategoryColorHex(currentSub.category)}20`, color: getCategoryColorHex(currentSub.category) }}>
                                    {getCategoryIcon(currentSub.category)}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-white">{currentSub.name}</h3>
                                    <p className="text-slate-400 text-lg">${currentSub.price.toFixed(2)} / {currentSub.billingCycle}</p>
                                </div>

                                <div className="pt-8 w-full grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => handleSwipe('left')}
                                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 group"
                                    >
                                        <Trash2 className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-xs uppercase tracking-widest">Toss</span>
                                    </button>

                                    <button
                                        onClick={() => handleSwipe('right')}
                                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 group"
                                    >
                                        <Check className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-xs uppercase tracking-widest">Keep</span>
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
                        <div className="bg-indigo-500/20 p-6 rounded-full inline-block mb-2">
                            <PartyPopper className="w-10 h-10 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white">All Done!</h2>
                            <p className="text-slate-400 mt-2">
                                You identified <strong className="text-white">{toDeleteIds.length}</strong> items to remove.
                            </p>
                        </div>

                        {toDeleteIds.length > 0 && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                                <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest mb-1">Potential Savings</p>
                                <p className="text-3xl font-black text-white">${calculatePotentialSavings().toFixed(2)}<span className="text-sm text-slate-400 font-medium">/mo</span></p>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                onFinish(toDeleteIds);
                                onClose();
                            }}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
                            style={{ backgroundColor: siteConfig.primaryColor }}
                        >
                            {toDeleteIds.length > 0 ? 'Process Cancellations' : 'Great Job!'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
