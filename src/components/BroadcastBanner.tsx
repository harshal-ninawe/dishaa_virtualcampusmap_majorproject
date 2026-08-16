'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bell, Megaphone, Info, X, ShieldAlert } from 'lucide-react';

export interface BroadcastAlert {
  _id?: string;
  title: string;
  message: string;
  severity: 'emergency' | 'warning' | 'announcement' | 'info';
  createdBy?: string;
  createdAt?: string;
}

export default function BroadcastBanner() {
  const [broadcasts, setBroadcasts] = useState<BroadcastAlert[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchActiveBroadcasts();
    // Poll for emergency updates every 30 seconds
    const interval = setInterval(fetchActiveBroadcasts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchActiveBroadcasts = async () => {
    try {
      const res = await fetch('/api/broadcasts');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setBroadcasts(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch emergency broadcasts:', err);
    }
  };

  const activeAlerts = broadcasts.filter((b) => !b._id || !dismissedIds.includes(b._id));

  if (activeAlerts.length === 0) return null;

  const currentAlert = activeAlerts[currentIndex % activeAlerts.length];

  const handleDismiss = (id?: string) => {
    if (id) {
      setDismissedIds((prev) => [...prev, id]);
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return {
          bg: 'bg-red-600 text-white border-red-700 shadow-lg shadow-red-600/20',
          badge: 'bg-red-900/60 text-red-100 border-red-400/40',
          icon: AlertTriangle,
          label: 'EMERGENCY ALERT 🚨',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500 text-slate-950 border-amber-600 shadow-md shadow-amber-500/20',
          badge: 'bg-amber-950/40 text-slate-950 border-amber-700/50 font-extrabold',
          icon: ShieldAlert,
          label: 'CAMPUS NOTICE ⚠️',
        };
      case 'announcement':
        return {
          bg: 'bg-blue-600 text-white border-blue-700 shadow-md',
          badge: 'bg-blue-900/60 text-blue-100 border-blue-400/40',
          icon: Megaphone,
          label: 'ANNOUNCEMENT 📢',
        };
      default:
        return {
          bg: 'bg-indigo-600 text-white border-indigo-700 shadow-md',
          badge: 'bg-indigo-900/60 text-indigo-100 border-indigo-400/40',
          icon: Info,
          label: 'CAMPUS INFO ℹ️',
        };
    }
  };

  const style = getSeverityStyles(currentAlert.severity);
  const Icon = style.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -10 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -10 }}
        className={`w-full ${style.bg} border-b px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 shrink-0 z-30 transition-all select-none`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Animated Severity Pulse Badge */}
          <div className="relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
            <div className="relative p-1.5 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Icon className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border shrink-0 ${style.badge}`}>
              {style.label}
            </span>
            <div className="flex items-center gap-1.5 truncate">
              <strong className="font-bold text-xs truncate">{currentAlert.title}:</strong>
              <span className="text-xs opacity-95 truncate font-normal">{currentAlert.message}</span>
            </div>
          </div>
        </div>

        {/* Carousel & Dismiss Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {activeAlerts.length > 1 && (
            <span className="text-[10px] font-mono opacity-80 hidden sm:inline">
              {currentIndex + 1} of {activeAlerts.length}
            </span>
          )}

          <button
            onClick={() => handleDismiss(currentAlert._id)}
            className="p-1 rounded-lg hover:bg-black/15 text-white/90 hover:text-white transition-colors cursor-pointer"
            title="Dismiss Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
