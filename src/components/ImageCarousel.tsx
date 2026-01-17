'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMAGES = [
    '/screenshots/Screenshot-1.jpeg',
    '/screenshots/Screenshot-2.jpeg',
    '/screenshots/Screenshot-3.jpeg',
    '/screenshots/Screenshot-4.jpeg',
    '/screenshots/Screenshot-5.jpeg',
];

export function ImageCarousel() {
    const [index, setIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        }, 5000); // 5 seconds
        return () => clearInterval(timer);
    }, []);

    const navigate = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        } else {
            setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
        }
    };

    return (
        <div className="relative w-full h-full bg-slate-900 overflow-hidden group">
            {/* Images */}
            <AnimatePresence mode='wait'>
                <motion.img
                    key={index}
                    src={IMAGES[index]}
                    alt={`Dashboard Screenshot ${index + 1}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
            </AnimatePresence>

            {/* Gradient Overlay for Fade Effect at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />

            {/* Controls (Visible on Hover) */}
            <button
                onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Next image"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300 shadow-lg",
                            i === index
                                ? "bg-white w-6"
                                : "bg-white/40 hover:bg-white/60"
                        )}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
