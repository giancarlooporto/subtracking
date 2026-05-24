import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Cloud, GlobeLock, Check, Loader2 } from 'lucide-react';
import { useRevenueCat } from '../hooks/useRevenueCat';
import { useState } from 'react';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchaseSuccess?: () => void;
}

export function PaywallModal({ isOpen, onClose, onPurchaseSuccess }: PaywallModalProps) {
    const { packages, isConfigured, isLoading, purchasePackage, restorePurchases } = useRevenueCat();
    const [isProcessing, setIsProcessing] = useState(false);
    const [actionError, setActionError] = useState('');

    const handlePurchase = async (pkg: any) => {
        setIsProcessing(true);
        setActionError('');

        if (!isConfigured) {
            // Web Mock Demo
            setTimeout(() => {
                if (onPurchaseSuccess) onPurchaseSuccess();
                setIsProcessing(false);
            }, 1000);
            return;
        }

        const res = await purchasePackage(pkg);
        if (res.success) {
            if (onPurchaseSuccess) onPurchaseSuccess();
        } else {
            setActionError(res.error || 'Purchase failed.');
        }
        setIsProcessing(false);
    };

    const handleRestore = async () => {
        setIsProcessing(true);
        setActionError('');

        if (!isConfigured) {
            // Web Mock Demo
            setTimeout(() => {
                setActionError('Mock Restore: No active subscription found.');
                setIsProcessing(false);
            }, 1000);
            return;
        }

        const res = await restorePurchases();
        if (res.success) {
            if (onPurchaseSuccess) onPurchaseSuccess();
            onClose();
        } else {
            setActionError(res.error || 'Restore failed.');
        }
        setIsProcessing(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-[5%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-[5%] sm:-translate-y-1/2 w-[90%] sm:w-[500px] z-[101] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-slate-800 sm:p-8 bg-slate-900/50 backdrop-blur-md">
                            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                                Unlock <span className="text-indigo-400">Cloud Sync</span>
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                            <div className="text-center space-y-4 pt-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                                    <GlobeLock className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Keep Your Data Safe Everywhere</h3>
                                <p className="text-sm text-slate-400">
                                    Upgrade to PRO and securely sync your financial data across all your devices, create multiple profiles, and unlock Data Vault exports.
                                </p>
                            </div>

                            <div className="pt-4 space-y-4">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                                        <p className="text-slate-500 text-sm font-medium">Loading subscription options...</p>
                                    </div>
                                ) : (
                                    <>
                                        {(packages.length > 0 ? packages : [
                                            {
                                                identifier: '$rc_annual',
                                                packageType: 'ANNUAL',
                                                product: { identifier: 'subtracking_pro_annual', title: 'SubTracking PRO (Annual)', description: 'Full access for 1 year', priceString: '$14.99' }
                                            },
                                            {
                                                identifier: '$rc_monthly',
                                                packageType: 'MONTHLY',
                                                product: { identifier: 'subtracking_pro_monthly', title: 'SubTracking PRO (Monthly)', description: 'Full access for 1 month', priceString: '$1.99' }
                                            },
                                            {
                                                identifier: '$rc_lifetime',
                                                packageType: 'LIFETIME',
                                                product: { identifier: 'subtracking_pro_lifetime', title: 'SubTracking PRO (Lifetime)', description: 'One-time unlock', priceString: '$49.99' }
                                            }
                                        ]).map((pkg: any) => (
                                            <button
                                                key={pkg.identifier}
                                                onClick={() => handlePurchase(pkg)}
                                                disabled={isProcessing}
                                                className="w-full text-left bg-slate-950/50 hover:bg-slate-800 border-2 border-slate-800 hover:border-indigo-500 rounded-2xl p-5 transition-all group relative overflow-hidden"
                                            >
                                                {pkg.packageType === 'ANNUAL' && (
                                                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                                                        Best Value
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h4 className="font-bold text-white text-lg">
                                                            {pkg.packageType === 'ANNUAL' ? 'Yearly Access' :
                                                                pkg.packageType === 'MONTHLY' ? 'Monthly Access' :
                                                                    pkg.packageType === 'LIFETIME' ? 'Lifetime Access' : 'PRO Access'}
                                                        </h4>
                                                        <p className="text-sm text-slate-400 mt-1">{pkg.product.description}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xl font-black text-indigo-400">{pkg.product.priceString}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}

                                        {actionError && (
                                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center">
                                                {actionError}
                                            </div>
                                        )}

                                        <div className="pt-2 text-center text-[10px] text-slate-500 space-y-2">
                                            <div className="flex items-center justify-center gap-4 mb-4">
                                                <button onClick={handleRestore} disabled={isProcessing} className="hover:text-white underline transition-colors">Restore Purchases</button>
                                                <a href="/terms" target="_blank" className="hover:text-white underline transition-colors">Terms of Use</a>
                                                <a href="/privacy" target="_blank" className="hover:text-white underline transition-colors">Privacy Policy</a>
                                            </div>
                                            <p className="max-w-xs mx-auto text-center leading-relaxed opacity-60">
                                                Payment will be charged to your Apple ID account at the confirmation of purchase. Subscription automatically renews unless it is canceled at least 24 hours before the end of the current period.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
