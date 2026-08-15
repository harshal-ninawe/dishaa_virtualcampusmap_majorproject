'use client';

import React, { useState } from 'react';
import { Layers, Bot, Users, Calendar, Shield, Home, Sun, Moon, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

interface BottomNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGoWelcome: () => void;
  isChatOpen?: boolean;
  onToggleChat?: () => void;
}

export default function BottomNavbar({
  activeTab,
  setActiveTab,
  onGoWelcome,
  isChatOpen = true,
  onToggleChat,
}: BottomNavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'ai', label: 'AI Assistant', icon: Bot },
    { id: 'inside-block', label: 'Inside Block', icon: Layers },
    { id: 'faculty', label: 'Faculty Finder', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'admin', label: 'Admin Portal', icon: Shield },
  ];

  // If chat is open, we display compact icon-only rail; if chat is hidden, we show full nav with labels
  const isCompact = isChatOpen;

  return (
    <>
      {/* ── DESKTOP UNIFIED LEFT NAVIGATION SIDEBAR ─────────────────────────────── */}
      <aside
        className={`hidden md:flex flex-col justify-between h-full bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 transition-all duration-300 z-30 shrink-0 select-none ${
          isCompact ? 'w-16 p-2' : 'w-56 p-3'
        }`}
      >
        {/* Top Header & Brand Logo */}
        <div>
          <div className="flex items-center justify-between px-1 py-2 mb-3">
            <div
              className="flex items-center gap-2.5 overflow-hidden cursor-pointer"
              onClick={onGoWelcome}
              title="DISHAA Campus Guide"
            >
              <Image
                src="/disha-logo.png"
                alt="DISHAA Logo"
                width={32}
                height={36}
                className="h-8 w-auto object-contain shrink-0"
              />
              {!isCompact && (
                <div className="truncate">
                  <h1 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                    DISHAA
                  </h1>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
                    Campus Guide
                  </span>
                </div>
              )}
            </div>

            {/* Toggle Chat / Expand Rail Button */}
            {onToggleChat && (
              <button
                onClick={onToggleChat}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title={isChatOpen ? 'Hide Chat (Expand Nav)' : 'Open Chat (Compact Nav)'}
              >
                {isCompact ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Navigation Items Rail */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  title={item.label}
                  className={`w-full flex items-center gap-3 py-2.5 rounded-xl transition-all text-xs font-semibold cursor-pointer ${
                    isCompact ? 'justify-center px-0' : 'px-3'
                  } ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : ''}`} />
                  {!isCompact && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Welcome & Theme Toggle */}
        <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-zinc-800">
          <button
            onClick={onGoWelcome}
            title="Welcome Screen"
            className={`w-full flex items-center gap-3 py-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-medium cursor-pointer ${
              isCompact ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            {!isCompact && <span className="truncate">Welcome</span>}
          </button>

          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className={`w-full flex items-center gap-3 py-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-medium cursor-pointer ${
              isCompact ? 'justify-center px-0' : 'px-3'
            }`}
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4 shrink-0 text-slate-600" />
                {!isCompact && <span className="truncate">Dark Mode</span>}
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 shrink-0 text-amber-400" />
                {!isCompact && <span className="truncate">Light Mode</span>}
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ── MOBILE PORTRAIT FIXED BOTTOM NAVIGATION BAR ─────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-slate-200 dark:border-zinc-800 flex items-center justify-around px-2 py-1.5 shadow-lg select-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                // Smooth scroll to feature panel below map on mobile portrait
                const panel = document.getElementById('mobile-feature-panel');
                if (panel) {
                  panel.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-50 dark:bg-blue-950/50' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-slate-500 dark:text-zinc-400 cursor-pointer"
          title="Toggle Theme"
        >
          <div className="p-1">
            {theme === 'light' ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </div>
          <span className="text-[10px] tracking-tight">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </>
  );
}

