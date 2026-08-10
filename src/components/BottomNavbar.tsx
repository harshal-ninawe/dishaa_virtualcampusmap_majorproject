'use client';

import React, { useState } from 'react';
import { Layers, Bot, Users, Calendar, Shield, Home, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGoWelcome: () => void;
}

export default function BottomNavbar({ activeTab, setActiveTab, onGoWelcome }: BottomNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inside-block', label: 'Inside Block', icon: Layers, color: 'text-cyan-400' },
    { id: 'ai', label: 'AI Assistant', icon: Bot, color: 'text-blue-400' },
    { id: 'faculty', label: 'Faculty Finder', icon: Users, color: 'text-indigo-400' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'text-emerald-400' },
    { id: 'admin', label: 'Admin Portal', icon: Shield, color: 'text-amber-400' },
  ];

  return (
    <>
      {/* ── DESKTOP NAVBAR (Visible on >= md screens) ───────────────────────── */}
      <nav className="hidden md:block relative z-40 w-full shrink-0 glass-panel border border-white/15 bg-slate-900/90 backdrop-blur-2xl px-4 py-2 shadow-xl rounded-2xl mt-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Welcome Home Icon */}
          <button
            onClick={onGoWelcome}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            title="View Welcome Screen"
          >
            <Home className="w-5 h-5 text-slate-300" />
            <span className="text-xs font-semibold hidden md:inline">Welcome</span>
          </button>

          <div className="h-6 w-px bg-white/15 shrink-0" />

          {/* Nav Tabs */}
          <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto py-0.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)] font-bold scale-102'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/10 font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : item.color}`} />
                  <span className="text-xs sm:text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </nav>

      {/* ── MOBILE FLOATING HAMBURGER MENU (Visible on < md screens) ──────────── */}
      <div className="md:hidden">
        
        {/* Floating Bottom-Right Hamburger Trigger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-5 right-5 z-50 p-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.8)] border border-white/30 cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          title="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Mobile Animated Menu Drawer Popup */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 flex flex-col justify-end p-4 bg-slate-950/80 backdrop-blur-md">
              
              {/* Backdrop Click to Close */}
              <div className="absolute inset-0" onClick={() => setIsMobileMenuOpen(false)} />

              {/* Menu Card Sheet */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-sm mx-auto glass-panel rounded-3xl border border-white/20 bg-slate-900/95 p-4 space-y-2 shadow-[0_0_50px_rgba(56,189,248,0.4)] overflow-hidden"
              >
                <div className="px-2 py-1 border-b border-white/10 flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Navigation Menu</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">DISHAA Portal</span>
                </div>

                {/* Welcome Screen Option */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onGoWelcome();
                  }}
                  className="w-full py-3 px-4 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/40 text-slate-200 font-bold text-xs flex items-center gap-3 transition-all cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                    <Home className="w-4 h-4" />
                  </div>
                  <span>Welcome Screen</span>
                </button>

                {/* Nav Items List */}
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setActiveTab(item.id);
                      }}
                      className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-between border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                          : 'glass-card border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-slate-900/80 ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      {isActive && <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full">ACTIVE</span>}
                    </button>
                  );
                })}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
