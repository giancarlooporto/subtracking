'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
    const [isStandalone, setIsStandalone] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isMacSafari, setIsMacSafari] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // 1. Detect if running as installed standalone app (Home Screen or Dock)
        const checkStandalone = () => {
            const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
            const isIOSStandalone = (window.navigator as any).standalone === true;
            return isDisplayStandalone || isIOSStandalone;
        };

        setIsStandalone(checkStandalone());

        // Listen for display mode changes
        const mediaQuery = window.matchMedia('(display-mode: standalone)');
        const handleChange = (e: MediaQueryListEvent) => {
            setIsStandalone(e.matches);
        };
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        }

        // 2. Device / Browser detection
        const ua = navigator.userAgent;
        const isIOSDevice = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|mercury|EdgiOS/.test(ua) && !/Chrome|Chromium/.test(ua);
        const isMac = /Macintosh|Mac OS X/.test(ua) && !isIOSDevice;
        const isAndroidDevice = /Android/.test(ua);

        setIsIOS(isIOSDevice);
        setIsMacSafari(isMac && isSafari);
        setIsAndroid(isAndroidDevice);

        // 3. Listen for Chromium 1-click install prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            }
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const promptNativeInstall = async () => {
        if (!deferredPrompt) return false;
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
            setIsStandalone(true);
            setDeferredPrompt(null);
            return true;
        }
        return false;
    };

    return {
        isStandalone,
        isIOS,
        isMacSafari,
        isAndroid,
        canPromptNativeInstall: !!deferredPrompt,
        promptNativeInstall,
    };
}
