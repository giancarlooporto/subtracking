import { useState, useEffect } from 'react';
import { Purchases, LOG_LEVEL, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

export function useRevenueCat() {
    const [isPro, setIsPro] = useState(false);
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [isConfigured, setIsConfigured] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initRevenueCat = async () => {
            try {
                // Determine if we're on iOS Native or Web
                if (Capacitor.isNativePlatform()) {
                    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });

                    const apiKey = process.env.NEXT_PUBLIC_REVENUECAT_APPLE_KEY || '';
                    if (!apiKey) {
                        console.warn('RevenueCat API key is missing. Paywall will be disabled.');
                        setIsLoading(false);
                        return;
                    }

                    await Purchases.configure({ apiKey });
                    setIsConfigured(true);

                    const { customerInfo } = await Purchases.getCustomerInfo();

                    // Assuming your entitlement identifier in RevenueCat is 'pro'
                    if (typeof customerInfo.entitlements.active['pro'] !== 'undefined') {
                        setIsPro(true);
                    }

                    // Fetch Offerings (Products)
                    const offerings = await Purchases.getOfferings();
                    if (offerings.current && offerings.current.availablePackages.length !== 0) {
                        setPackages(offerings.current.availablePackages);
                    }
                } else {
                    // Web Fallback: For now, RevenueCat isn't officially supported in Capacitor Web for purchases natively
                    // You might hook this up to Stripe or keep it disabled
                    console.warn('RevenueCat Capacitor is only supported on iOS/Android natively. Web fallback disabled.');
                }
            } catch (e: unknown) {
                console.error('Error initializing RevenueCat', e);
            } finally {
                setIsLoading(false);
            }
        };

        initRevenueCat();
    }, []);

    const purchasePackage = async (rcPackage: PurchasesPackage) => {
        try {
            if (!Capacitor.isNativePlatform()) {
                throw new Error('Purchases are only supported in the native iOS app.');
            }

            setIsLoading(true);
            const { customerInfo } = await Purchases.purchasePackage({ aPackage: rcPackage });

            if (typeof customerInfo.entitlements.active['pro'] !== 'undefined') {
                setIsPro(true);
                return { success: true };
            }
            return { success: false, error: 'Purchase did not unlock pro.' };
        } catch (e: unknown) {
            console.error('Purchase failed', e);
            const err = e as Error;
            return { success: false, error: err.message || 'Purchase failed.' };
        } finally {
            setIsLoading(false);
        }
    };

    const restorePurchases = async () => {
        try {
            if (!Capacitor.isNativePlatform()) {
                throw new Error('Purchases are only supported in the native iOS app.');
            }

            const { customerInfo } = await Purchases.restorePurchases();

            if (typeof customerInfo.entitlements.active['pro'] !== 'undefined') {
                setIsPro(true);
                return { success: true };
            }
            return { success: false, error: 'No active pro subscription found to restore.' };
        } catch (e: unknown) {
            console.error('Restore failed', e);
            const err = e as Error;
            return { success: false, error: err.message || 'Restore failed.' };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isPro,
        packages,
        isConfigured,
        isLoading,
        purchasePackage,
        restorePurchases
    };
}
