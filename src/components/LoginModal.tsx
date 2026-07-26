'use client';

import { useState } from 'react';
import { X, Mail, CheckCircle, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginWithEmail, verifyOtp } from '../lib/supabaseClient';
import { cn } from '../lib/utils';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [phase, setPhase] = useState<'email' | 'otp'>('email');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'verifying'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        if (!email.includes('@')) {
            setStatus('error');
            setErrorMessage('Please enter a valid email.');
            return;
        }

        const { error } = await loginWithEmail(email);

        if (error) {
            setStatus('error');
            setErrorMessage(error.message);
        } else {
            setStatus('idle');
            setPhase('otp');
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('verifying');
        setErrorMessage('');

        const { error } = await verifyOtp(email, otp);

        if (error) {
            setStatus('error');
            setErrorMessage(error.message);
        } else {
            onClose();
        }
    };



    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-slate-900 border border-white/5 rounded-[32px] shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-8 pb-4">
                        <h2 className="text-2xl font-black text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                <Smartphone className="w-5 h-5 text-indigo-400" />
                            </div>
                            {phase === 'email' ? 'Welcome Back' : 'Verify Code'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-8 pt-4">
                        {phase === 'otp' ? (
                            <form onSubmit={handleVerify} className="space-y-8 py-4">
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-white mb-2">Check your email!</h3>
                                        <p className="text-slate-400 text-sm font-medium">
                                            Enter the 6-digit code sent to<br />
                                            <span className="text-white font-bold">{email}</span>
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-center">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={6}
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                placeholder="000000"
                                                className="w-full bg-slate-950/50 border border-slate-800 focus:border-indigo-500 rounded-2xl py-5 text-center text-4xl font-black tracking-[0.3em] text-white placeholder:text-slate-800 transition-all outline-none"
                                                autoFocus
                                            />
                                        </div>
                                        <p className="text-[10px] text-center font-black uppercase tracking-[0.2em] text-slate-500">
                                            The code is valid for 5 minutes
                                        </p>
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center"
                                    >
                                        ⚠️ {errorMessage}
                                    </motion.div>
                                )}

                                <div className="space-y-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'verifying' || otp.length < 6}
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                    >
                                        {status === 'verifying' ? (
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Verify & Sign In</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setPhase('email'); setStatus('idle'); }}
                                        className="w-full py-2 text-slate-500 hover:text-white text-xs font-bold transition-colors"
                                    >
                                        Use a different email address
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-8 py-4">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@company.com"
                                                className="w-full bg-slate-950/50 border border-slate-800 group-focus-within:border-indigo-500 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none transition-all font-medium"
                                                autoFocus
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-500 ml-1 font-bold">
                                            Encryption key will be linked to this email.
                                        </p>
                                    </div>

                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center"
                                        >
                                            ⚠️ {errorMessage}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-white hover:bg-slate-100 disabled:opacity-50 text-black font-black py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-6 h-6 border-3 border-black/10 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Send Login Code</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>


                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
