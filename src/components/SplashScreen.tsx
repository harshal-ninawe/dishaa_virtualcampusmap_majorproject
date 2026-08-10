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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none"
      onClick={handleManualSkip}
      onTouchStart={handleManualSkip}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: 'easeInOut' }
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        
        {/* Pure PNG Logo without box bounds */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 cursor-pointer flex justify-center"
        >
          <Image
            src="/disha-logo.png"
            alt="DISHAA Logo"
            width={220}
            height={250}
            className="h-48 sm:h-56 w-auto object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]"
            priority
          />
        </motion.div>

        {/* Brand Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
              DISHAA
            </h1>
            <Sparkles className="w-5 h-5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <p className="text-slate-400 font-medium text-base sm:text-lg tracking-wide">
            A Virtual Campus Map & Spatial Guide
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-2.5 bg-slate-800 rounded-full mt-8 overflow-hidden relative border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_#38bdf8]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-slate-300 mt-3 font-mono">
          Loading spatial engines... {progress}%
        </p>

        {/* Skip Notice */}
        <div className="mt-6 text-xs text-cyan-400/80 flex items-center gap-1">
          <span>Tap screen to continue</span>
          <ArrowRight className="w-3 h-3" />
        </div>

      </div>
    </motion.div>
  );
}
