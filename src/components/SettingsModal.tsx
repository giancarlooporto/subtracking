
import { Settings, X, Zap, Download, Upload, ShieldCheck, Lock, Key, FileDown, Calendar, BookOpen, User, Users } from 'lucide-react';
import { useRef, ChangeEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';
import { signOut, downloadVault } from '../lib/supabaseClient';
import { saveProfiles, setActiveProfileId, getProfiles } from '../lib/profileManager';
import { cn } from '../lib/utils';

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
}

export function SettingsModal({ isOpen, onClose, onFactoryReset, onExport, onExportCSV, onExportICS, onImport, isPro, onActivatePro, onOpenGuide, onManageProfiles, profileCount }: SettingsModalProps) {
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

            // data is { profiles: [...], version: 1, ... }
            if (data.profiles) {
                // Save to local storage
                saveProfiles(data.profiles);
                // Set first profile as active just in case
                if (data.profiles.length > 0) {
                    setActiveProfileId(data.profiles[0].id);
                }

                // Track the cloud timestamp locally to prevent immediate re-sync
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
            // safe error message extraction
            let msg = err.message || err.error_description || (typeof err === 'object' ? JSON.stringify(err) : String(err));

            // Handle specific Supabase "Not Found" error roughly
            if (msg === '{}' || msg.includes('Object not found') || msg.includes('404')) {
                msg = "No backup found in cloud. (Did you wait for auto-sync?)";
            }

            alert('❌ Restore Failed: ' + msg);
        } finally {
            setIsRestoring(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-300 shadow-2xl max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-slate-800 text-slate-400">
                            <Settings className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Settings</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-300 transition-colors p-2 hover:bg-slate-800 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6">


                    {/* Data Vault Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-indigo-400">
                                <ShieldCheck className="w-4 h-4" />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Data Vault</h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => {
                                    onClose();
                                    onExport();
                                }}
                                className="flex flex-col items-center justify-center p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl transition-all group hover:bg-slate-800"
                            >
                                <Download className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-white">Export Vault</span>
                            </button>
                            <button
                                onClick={() => isPro ? fileInputRef.current?.click() : onActivatePro()}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl transition-all group relative overflow-hidden",
                                    isPro ? "hover:bg-slate-800" : "opacity-60 hover:opacity-100 hover:bg-slate-800/60"
                                )}
                            >
                                {!isPro && (
                                    <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10 transition-opacity group-hover:opacity-0 pointer-events-none">
                                        <Lock className="w-4 h-4 text-slate-400" />
                                    </div>
                                )}
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
                            {isPro
                                ? "Full secure backup & restore active. Transfer your data anywhere."
                                : "Export your data for free anytime. Upgrade to PRO to Import/Restore your vault."}
                        </p>
                    </div>

                    {/* CLOUD SYNC SECTION */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Cloud Sync (Beta)
                        </h3>

                        <div className="bg-slate-800/30 rounded-xl p-4 border border-indigo-500/10">
                            {!user ? (
                                <div className="text-center space-y-4">
                                    <p className="text-sm text-slate-400">
                                        Sign in to sync your encrypted vault across devices.
                                    </p>
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                                    >
                                        Sign In / Create Account
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                                <User className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white max-w-[150px] truncate">{user.email}</div>
                                                {!isPro ? (
                                                    <button
                                                        onClick={onActivatePro}
                                                        className="text-xs text-amber-400 flex items-center gap-1 font-bold hover:underline"
                                                    >
                                                        <Zap className="w-3 h-3 fill-amber-400 shrink-0" />
                                                        Upgrade to Sync
                                                    </button>
                                                ) : (
                                                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                                        Online & Ready
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Sign Out"
                                        >
                                            <Lock className="w-4 h-4" />
                                        </button>
                                    </div>
 
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            disabled
                                            className="bg-slate-800/50 text-slate-500 border border-slate-700/50 p-3 rounded-xl text-xs font-bold cursor-not-allowed flex flex-col items-center gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            <span>{!isPro ? 'Sync Disabled' : 'Auto-Sync On'}</span>
                                        </button>
                                        <button
                                            onClick={() => isPro ? handleRestoreCloud() : onActivatePro()}
                                            disabled={isPro ? isRestoring : false}
                                            className={cn(
                                                "border p-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-2 relative overflow-hidden",
                                                isPro
                                                    ? "bg-slate-800 hover:bg-indigo-600/20 border-slate-700 hover:border-indigo-500/50 text-white disabled:opacity-50 disabled:cursor-wait"
                                                    : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white"
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
                    <div className="space-y-3 pt-4 border-t border-slate-800">
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
                                "w-full flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl transition-all group relative overflow-hidden mb-2",
                                isPro ? "hover:bg-slate-800" : "opacity-60 hover:opacity-100"
                            )}
                        >
                            {!isPro && (
                                <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10 font-bold pointer-events-none">
                                    <div className="flex items-center gap-2 bg-slate-900 border border-indigo-500/30 px-3 py-1 rounded-full shadow-lg">
                                        <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">PRO</span>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
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
                                "w-full flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl transition-all group relative overflow-hidden",
                                isPro ? "hover:bg-slate-800" : "opacity-60 hover:opacity-100"
                            )}
                        >
                            {!isPro && (
                                <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10 font-bold pointer-events-none">
                                    <div className="flex items-center gap-2 bg-slate-900 border border-indigo-500/30 px-3 py-1 rounded-full shadow-lg">
                                        <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">PRO</span>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
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

                    <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preferences</h3>

                        <button
                            onClick={() => {
                                onClose();
                                onOpenGuide();
                            }}
                            className="flex items-center justify-between w-full p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="text-sm font-bold text-white block">User Manual</span>
                                    <span className="text-[10px] text-slate-500 font-medium">Learn how to use features</span>
                                </div>
                            </div>
                        </button>

                        {/* Category Manager (Pro only) */}
                        <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between opacity-50 grayscale cursor-not-allowed">
                            <span className="text-sm font-medium text-slate-400 italic">Theme: Dark (Default)</span>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                        <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">Danger Zone</h3>
                        <button
                            onClick={() => {
                                onClose();
                                onFactoryReset();
                            }}
                            className="flex justify-between items-center w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all group"
                        >
                            <div className="flex flex-col items-start text-left">
                                <span className="text-sm font-bold text-red-400 group-hover:text-red-300">Factory Reset</span>
                                <span className="text-xs text-red-500/60 font-medium leading-tight italic">Wipe all data and start from scratch</span>
                            </div>
                            <Zap className="w-4 h-4 text-red-500 group-hover:animate-pulse" />
                        </button>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-all"
                >
                    Done
                </button>
            </div>
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </div>
    );
}

