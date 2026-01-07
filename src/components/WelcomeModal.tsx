import { useState } from 'react';
import { X, Sparkles, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const steps = [
    {
        title: 'Welcome to Digital Declutter',
        subtitle: 'Your journey to financial clarity starts here',
        icon: Sparkles,
        content: 'Track all your subscriptions in one beautiful dashboard. Get insights, reduce wasteful spending, and take control of your digital life.',
        color: 'from-indigo-500 to-purple-600'
    },
    {
        title: 'Track & Manage',
        subtitle: 'Stay on top of every payment',
        icon: CheckCircle,
        content: 'Add subscriptions with a single click. Mark bills as paid when you pay them. See upcoming renewals and past due items at a glance.',
        color: 'from-emerald-500 to-teal-600'
    },
    {
        title: 'Gain Insights',
        subtitle: 'Understand your spending patterns',
        icon: TrendingUp,
        content: 'Visualize your spending with the Household Pulse, track subscription \"ghosts\" with the Ghost Meter, and see category breakdowns instantly.',
        color: 'from-pink-500 to-rose-600'
    }
];

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final step - close and mark as seen
            onClose();
        }
    };

    const handleSkip = () => {
        onClose();
    };

    const currentStepData = steps[currentStep];
    const Icon = currentStepData.icon;
    const isLastStep = currentStep === steps.length - 1;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Gradient */}
                        <div className={cn(
                            "absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-br",
                            currentStepData.color
                        )} />

                        {/* Close Button */}
                        <button
                            onClick={handleSkip}
                            className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-xl transition-colors z-10"
                            aria-label="Close welcome tour"
                        >
                            <X className="w-5 h-5 text-slate-400 hover:text-white" />
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className={cn(
                                "w-20 h-20 rounded-2xl bg-gradient-to-tr flex items-center justify-center shadow-lg",
                                currentStepData.color
                            )}>
                                <Icon className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
                            <p className="text-sm text-indigo-400 font-medium">{currentStepData.subtitle}</p>
                            <p className="text-slate-400 leading-relaxed">
                                {currentStepData.content}
                            </p>
                        </div>

                        {/* Step Indicators */}
                        <div className="flex justify-center gap-2">
                            {steps.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentStep(idx)}
                                    className={cn(
                                        "h-2 rounded-full transition-all",
                                        idx === currentStep
                                            ? "w-8 bg-indigo-500"
                                            : "w-2 bg-slate-700 hover:bg-slate-600"
                                    )}
                                    aria-label={`Go to step ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleSkip}
                                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all active:scale-[0.98]"
                            >
                                Skip Tour
                            </button>
                            <button
                                onClick={handleNext}
                                className={cn(
                                    "flex-1 px-6 py-3 font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r text-white",
                                    currentStepData.color
                                )}
                            >
                                {isLastStep ? 'Get Started' : 'Next'}
                                {!isLastStep && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
