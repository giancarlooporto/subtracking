import { Settings, X, Zap, Download, Upload, ShieldCheck, Lock, Key } from 'lucide-react';
import { useRef, ChangeEvent } from 'react';
import { cn } from '../lib/utils';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFactoryReset: () => void;
    onExport: () => void;
    onImport: (e: ChangeEvent<HTMLInputElement>) => void;
    isPro: boolean;
    onActivatePro: () => void;
}

export function SettingsModal({ isOpen, onClose, onFactoryReset, onExport, onImport, isPro, onActivatePro }: SettingsModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full space-y-8 animate-in zoom-in-95 duration-300 shadow-2xl">
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
                    {/* Pro Status Section */}
                    {!isPro && (
                        <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Free Plan</span>
                                <span className="text-[10px] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full">Limited</span>
                            </div>
                            <p className="text-sm text-slate-300">Unlock Data Vault, Ghost Meter, and unlimited tracking.</p>
                            <button
                                onClick={() => {
                                    onClose();
                                    onActivatePro();
                                }}
                                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Key className="w-3 h-3" />
                                Enter License Key
                            </button>
                        </div>
                    )}

                    {/* Data Vault Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-indigo-400">
                                <ShieldCheck className="w-4 h-4" />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Data Vault</h3>
                            </div>
                            {!isPro && <Lock className="w-3 h-3 text-slate-600" />}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={isPro ? onExport : onActivatePro}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl transition-all group relative overflow-hidden",
                                    isPro ? "hover:bg-slate-800" : "opacity-60 hover:opacity-100 hover:bg-slate-800/60"
                                )}
                            >
                                {!isPro && <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10"><Lock className="w-4 h-4 text-slate-400" /></div>}
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
                                {!isPro && <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10"><Lock className="w-4 h-4 text-slate-400" /></div>}
                                <Upload className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-white">Import Vault</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={onImport}
                                className="hidden"
                                accept=".json"
                            />
                        </div>
                        <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                            {isPro ? "Backup your data to a secure file. SubTracking doesn't store your data." : "Upgrade to Pro to backup and transfer your data."}
                        </p>
                    </div>

                    <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preferences</h3>
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
        </div>
    );
}
