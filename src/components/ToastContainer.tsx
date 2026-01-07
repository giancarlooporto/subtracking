import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast, Toast as ToastType } from '../hooks/useToast';
import { cn } from '../lib/utils';

const ToastContainer = () => {
    const { toasts, dismissToast } = useToast();

    const getToastIcon = (type: ToastType['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-emerald-400" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-400" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-amber-400" />;
            case 'info':
            default:
                return <Info className="w-5 h-5 text-indigo-400" />;
        }
    };

    const getToastStyles = (type: ToastType['type']) => {
        switch (type) {
            case 'success':
                return 'border-emerald-500/30 bg-emerald-500/10';
            case 'error':
                return 'border-red-500/30 bg-red-500/10';
            case 'warning':
                return 'border-amber-500/30 bg-amber-500/10';
            case 'info':
            default:
                return 'border-indigo-500/30 bg-indigo-500/10';
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        className={cn(
                            "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[300px] max-w-md",
                            getToastStyles(toast.type)
                        )}
                    >
                        <div className="shrink-0">{getToastIcon(toast.type)}</div>
                        <p className="flex-1 text-sm font-medium text-white">{toast.message}</p>
                        <button
                            onClick={() => dismissToast(toast.id)}
                            className="shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Dismiss notification"
                        >
                            <X className="w-4 h-4 text-slate-400 hover:text-white" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
