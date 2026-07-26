import { Settings, X, Zap, Download, Upload, ShieldCheck, Lock, Key, FileDown, Calendar, BookOpen, User, Users } from 'lucide-react';
import { useRef, ChangeEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';
import { signOut, downloadVault } from '../lib/supabaseClient';
import { saveProfiles, setActiveProfileId, getProfiles } from '../lib/profileManager';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFactoryReset: () => void;
    onExport: () => void;
    onExportCSV: () => void;
    onExportICS: () => void;
    onImport: (e: ChangeEvent<HTMLInputElement>) => void;
    isPro: boolean;
    onActivatePro: () => void;
    onOpenGuide: () => void;
    onManageProfiles: () => void;
    profileCount: number;
    activeProfileName: string;
}

export function SettingsModal({
    isOpen,
    onClose,
    onFactoryReset,
    onExport,
    onExportCSV,
    onExportICS,
    onImport,
    isPro,
    onActivatePro,
    onOpenGuide,
    onManageProfiles,
    profileCount,
    activeProfileName
}: SettingsModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user, isLoading: isAuthLoading } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);

    const handleSignOut = async () => {
        if (confirm('Are you sure you want to sign out? Your pro features will remain active on this device.')) {
            await signOut();
            window.location.reload();
        }
    };

    const handleRestoreCloud = async () => {
        if (!user) return;
        if (!confirm('WARNING: This will OVERWRITE your local data with the cloud backup. Are you sure?')) return;

        setIsRestoring(true);
        try {
            const { data, error } = await downloadVault(user.id);
            if (error) throw error;
            if (!data) throw new Error('No cloud backup found.');

            if (data.profiles) {
                saveProfiles(data.profiles);
                if (data.profiles.length > 0) {
                    setActiveProfileId(data.profiles[0].id);
                }
                if (data.lastUpdated) {
                    localStorage.setItem('subtracking-last-sync', data.lastUpdated);
                }
                alert('✅ Cloud Restore Successful! The app will now reload.');
                window.location.reload();
            } else {
                throw new Error('Invalid vault format');
            }
        } catch (err: any) {
            console.error('Full Restore Error:', err);
            let msg = err.message || err.error_description || (typeof err === 'object' ? JSON.stringify(err) : String(err));
            if (msg === '{}' || msg.includes('Object not found') || msg.includes('404')) {
                msg = "No backup found in cloud. (Did you wait for auto-sync?)";
            }
            alert('❌ Restore Failed: ' + msg);
        } finally {
            setIsRestoring(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-end"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-950 border-l border-slate-900 h-full w-full max-w-md p-6 sm:p-8 shadow-2xl flex flex-col z-[100]"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between pb-6 border-b border-slate-900 shrink-0">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-xl bg-slate-900 text-indigo-400 border border-slate-800">
                                    <Settings className="w-5 h-5 animate-[spin_8s_linear_infinite]" />
                                </div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Menu</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-slate-500 hover:text-slate-300 transition-colors p-2 hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-xl"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Settings Panel */}
                        <div className="flex-1 overflow-y-auto pr-1 py-6 space-y-6 sm:space-y-8 scrollbar-thin">
                            
                            {/* Profile Selector Section */}
                            <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-slate-400">
                                        <Users className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Active Profile</span>
                                    </div>
                                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-bold">
                                        {profileCount} {profileCount === 1 ? 'Profile' : 'Profiles'}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/10 shrink-0">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-left truncate max-w-[150px]">
                                            <span className="text-sm font-bold text-white block truncate">{activeProfileName}</span>
                                            <span className="text-[10px] text-slate-500 font-medium">Currently Active</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            onClose();
                                            onManageProfiles();
                                        }}
                                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>

                            {/* Data Vault Section */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2 text-indigo-400">
                                    <ShieldCheck className="w-4 h-4" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Data Vault</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => {
                                            onClose();
                                            onExport();
                                        }}
                                        className="flex flex-col items-center justify-center p-4 bg-slate-900/40 border border-slate-900 rounded-2xl transition-all group hover:bg-slate-900 cursor-pointer"
                                    >
                                        <Download className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-white">Export Vault</span>
                                    </button>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex flex-col items-center justify-center p-4 bg-slate-900/40 border border-slate-900 rounded-2xl transition-all group hover:bg-slate-900 cursor-pointer"
                                    >
                                        <Upload className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold text-white">Import Vault</span>
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            onClose();
                                            onImport(e);
                                        }}
                                        className="hidden"
                                        accept=".json"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                                    Export or import your vault files for free at any time. Keep your data locally.
                                </p>
                            </div>

                            {/* Cloud Sync Section */}
                            <div className="space-y-4 pt-4 border-t border-slate-900">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Cloud Sync (Beta)
                                </h3>

                                <div className="bg-slate-900/40 rounded-2xl p-4 border border-indigo-500/10">
                                    {!user ? (
                                        <div className="text-center space-y-4">
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                Sign in to sync your encrypted vault across devices.
                                            </p>
                                            <button
                                                onClick={() => setShowLoginModal(true)}
                                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer text-xs"
                                            >
                                                Sign In / Create Account
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
                                                        <User className="w-5 h-5 text-indigo-400" />
                                                    </div>
                                                    <div className="truncate max-w-[160px]">
                                                        <div className="text-sm font-bold text-white truncate">{user.email}</div>
                                                        {!isPro ? (
                                                            <button
                                                                onClick={onActivatePro}
                                                                className="text-xs text-amber-400 flex items-center gap-1 font-bold hover:underline cursor-pointer"
                                                            >
                                                                <Zap className="w-3 h-3 fill-amber-400 shrink-0" />
                                                                Upgrade to Sync
                                                            </button>
                                                        ) : (
                                                            <div className="text-xs text-emerald-400 flex items-center gap-1 font-bold">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                                                Online & Ready
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                                                    title="Sign Out"
                                                >
                                                    <Lock className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    disabled
                                                    className="bg-slate-900/50 text-slate-500 border border-slate-800/80 p-3 rounded-xl text-xs font-bold cursor-not-allowed flex flex-col items-center gap-2"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    <span>{!isPro ? 'Sync Disabled' : 'Auto-Sync On'}</span>
                                                </button>
                                                <button
                                                    onClick={() => isPro ? handleRestoreCloud() : onActivatePro()}
                                                    disabled={isPro ? isRestoring : false}
                                                    className={cn(
                                                        "border p-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-2 relative overflow-hidden cursor-pointer",
                                                        isPro
                                                            ? "bg-slate-900 hover:bg-indigo-600/20 border-slate-800 hover:border-indigo-500/50 text-white disabled:opacity-50 disabled:cursor-wait"
                                                            : "bg-slate-900/40 border-slate-800/50 text-slate-400 hover:text-white"
                                                    )}
                                                >
                                                    {!isPro && (
                                                        <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10 pointer-events-none">
                                                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                                                        </div>
                                                    )}
                                                    <Download className={cn("w-4 h-4", isRestoring && "animate-bounce")} />
                                                    <span>{isRestoring ? 'Restoring...' : 'Restore Cloud'}</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Reports Section */}
                            <div className="space-y-3 pt-4 border-t border-slate-900">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-emerald-400">
                                        <FileDown className="w-4 h-4" />
                                        <h3 className="text-xs font-bold uppercase tracking-widest">Reports</h3>
                                    </div>
                                    {!isPro && <Lock className="w-3 h-3 text-slate-600" />}
                                </div>
                                <button
                                    onClick={isPro ? onExportCSV : onActivatePro}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 bg-slate-900/40 border border-slate-900 rounded-2xl transition-all group relative overflow-hidden mb-2 cursor-pointer",
                                        isPro ? "hover:bg-slate-900" : "opacity-60 hover:opacity-100"
                                    )}
                                >
                                    {!isPro && (
                                        <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10 font-bold pointer-events-none">
                                            <div className="flex items-center gap-2 bg-slate-950 border border-indigo-500/30 px-3 py-1 rounded-full shadow-lg">
                                                <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                                <span className="text-[10px] font-bold text-white tracking-widest uppercase">PRO</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                                            <FileDown className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <span className="text-sm font-bold text-white block">Audit Report (CSV)</span>
                                            <span className="text-[10px] text-slate-500 font-medium">For Excel, Sheets, Numbers</span>
                                        </div>
                                    </div>
                                    <Zap className={cn("w-4 h-4", isPro ? "text-emerald-500" : "text-slate-600")} />
                                </button>

                                <button
                                    onClick={isPro ? onExportICS : onActivatePro}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 bg-slate-900/40 border border-slate-900 rounded-2xl transition-all group relative overflow-hidden cursor-pointer",
                                        isPro ? "hover:bg-slate-900" : "opacity-60 hover:opacity-100"
                                    )}
                                >
                                    {!isPro && (
                                        <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10 font-bold pointer-events-none">
                                            <div className="flex items-center gap-2 bg-slate-950 border border-indigo-500/30 px-3 py-1 rounded-full shadow-lg">
                                                <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                                <span className="text-[10px] font-bold text-white tracking-widest uppercase">PRO</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <span className="text-sm font-bold text-white block">All Bills (Calendar)</span>
                                            <span className="text-[10px] text-slate-500 font-medium">Sync everything to your app</span>
                                        </div>
                                    </div>
                                    <Zap className={cn("w-4 h-4", isPro ? "text-indigo-500" : "text-slate-600")} />
                                </button>
                            </div>

                            {/* Preferences Section */}
                            <div className="flex flex-col space-y-2 pt-4 border-t border-slate-900">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preferences</h3>

                                <button
                                    onClick={() => {
                                        onClose();
                                        onOpenGuide();
                                    }}
                                    className="flex items-center justify-between w-full p-4 bg-slate-900/40 border border-slate-900 rounded-xl hover:bg-slate-900 transition-all group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <span className="text-sm font-bold text-white block">User Manual</span>
                                            <span className="text-[10px] text-slate-500 font-medium">Learn how to use features</span>
                                        </div>
                                    </div>
                                </button>

                                <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl flex items-center justify-between opacity-50 grayscale cursor-not-allowed">
                                    <span className="text-sm font-medium text-slate-400 italic">Theme: Dark (Default)</span>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="flex flex-col space-y-2 pt-4 border-t border-slate-900">
                                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">Danger Zone</h3>
                                <button
                                    onClick={() => {
                                        onClose();
                                        onFactoryReset();
                                    }}
                                    className="flex justify-between items-center w-full p-4 bg-red-500/5 border border-red-500/20 rounded-xl hover:bg-red-500/10 transition-all group cursor-pointer"
                                >
                                    <div className="flex flex-col items-start text-left">
                                        <span className="text-sm font-bold text-red-400 group-hover:text-red-300">Factory Reset</span>
                                        <span className="text-xs text-red-500/60 font-medium leading-tight italic">Wipe all data and start from scratch</span>
                                    </div>
                                    <Zap className="w-4 h-4 text-red-500 group-hover:animate-pulse" />
                                </button>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="pt-4 border-t border-slate-900 shrink-0">
                            <button
                                onClick={onClose}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-all border border-slate-800 hover:border-slate-700 shadow-md cursor-pointer text-sm"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </AnimatePresence>
    );
}
