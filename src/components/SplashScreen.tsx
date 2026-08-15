'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export default function SplashScreen({ onComplete, durationMs = 2500 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Guaranteed progress calculation using performance timestamp (unaffected by mobile throttling)
  useEffect(() => {
    const startTime = performance.now();
    let animFrameId: number;

    const updateProgress = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));

      setProgress(pct);

      if (pct >= 100) {
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current();
        }
      } else {
        animFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animFrameId = requestAnimationFrame(updateProgress);

    // Fallback hard timer safety net for mobile devices
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        setProgress(100);
        onCompleteRef.current();
      }
    }, durationMs + 200);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(fallbackTimer);
    };
  }, [durationMs]);

  const handleManualSkip = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      setProgress(100);
      onCompleteRef.current();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 overflow-hidden select-none"
      onClick={handleManualSkip}
      onTouchStart={handleManualSkip}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.02,
        transition: { duration: 0.4, ease: 'easeInOut' }
      }}
    >
      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        
        {/* Pure PNG Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 cursor-pointer flex justify-center"
        >
          <Image
            src="/disha-logo.png"
            alt="DISHAA Logo"
            width={180}
            height={200}
            className="h-36 sm:h-44 w-auto object-contain"
            priority
          />
        </motion.div>

        {/* Brand Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-1.5"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            DISHAA
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 font-medium text-sm tracking-wide">
            Virtual Campus Guide & Spatial Assistant
          </p>
        </motion.div>

        {/* Quiet Progress Bar */}
        <div className="w-56 h-2 bg-slate-200 dark:bg-zinc-800 rounded-full mt-8 overflow-hidden relative">
          <div
            className="h-full bg-blue-600 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-slate-400 dark:text-zinc-500 mt-3 font-mono">
          Loading campus map... {progress}%
        </p>

        {/* Skip Notice */}
        <div className="mt-6 text-xs text-slate-400 dark:text-zinc-500 flex items-center gap-1">
          <span>Tap anywhere to skip</span>
          <ArrowRight className="w-3 h-3" />
        </div>

      </div>
    </motion.div>
  );
}
