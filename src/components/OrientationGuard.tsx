'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Smartphone, Maximize2 } from 'lucide-react';
import Image from 'next/image';

export default function OrientationGuard({ children }: { children: React.ReactNode }) {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Detect if device is portrait mobile/tablet screen
      const isMobileDevice = window.innerWidth <= 1024 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      const isPortrait = window.innerHeight > window.innerWidth;
      
      if (isMobileDevice && isPortrait) {
        setIsPortraitMobile(true);
        // Try automatic orientation lock if supported
        tryAutoLockLandscape();
      } else {
        setIsPortraitMobile(false);
      }
    };

    const tryAutoLockLandscape = async () => {
      try {
        // @ts-ignore - Screen Orientation API
        if (screen.orientation && screen.orientation.lock) {
          // @ts-ignore
          await screen.orientation.lock('landscape').catch(() => {
            // Browsers usually require user interaction or fullscreen mode to lock
          });
        }
      } catch (err) {
        // Ignore lock errors
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleRequestFullscreenLandscape = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      // @ts-ignore
      if (screen.orientation && screen.orientation.lock) {
        // @ts-ignore
        await screen.orientation.lock('landscape');
      }
    } catch (err) {
      console.log('Orientation lock requested:', err);
    }
  };

  return (
    <>
      {children}

      <AnimatePresence>
        {isPortraitMobile && !hasDismissed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-2xl px-6 text-center text-white"
          >
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-sm flex flex-col items-center glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-2xl">
              
              {/* Rotating Phone Animation */}
              <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, -90, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_30px_rgba(56,189,248,0.5)] border border-white/20"
                >
                  <Smartphone className="w-12 h-12 text-white" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <RotateCw className="w-24 h-24 text-cyan-400/40 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white mb-2">
                Rotate Your Phone
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                For the best virtual campus mapping & indoor navigation experience, please turn your device to <strong className="text-cyan-400">Landscape Mode</strong>.
              </p>

              <div className="w-full space-y-3">
                <button
                  onClick={handleRequestFullscreenLandscape}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:scale-102 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/40"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Lock to Landscape</span>
                </button>

                <button
                  onClick={() => setHasDismissed(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Continue Anyway (Portrait)
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
