'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin, Compass, ShieldCheck, Layers, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
        <Image
          src="/college-bg.jpg"
          alt="G H Raisoni College Campus"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80" />
      </div>

      {/* Top Header Navbar Branding */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/disha-logo.png"
            alt="DISHAA Logo"
            width={40}
            height={44}
            className="h-10 w-auto object-contain"
          />
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              DISHAA
            </span>
            <span className="block text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
              Campus Guide
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>G.H. Raisoni College Campus</span>
          </div>

          <button
            onClick={toggleTheme}
            className="px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Toggle Light / Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            <span>{theme === 'dark' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}</span>
          </button>
        </div>
      </header>

      {/* Hero Welcome Card */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 my-auto text-center flex flex-col items-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold mb-6 shadow-xs"
        >
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Campus Map & Pathfinding System</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
        >
          Navigate Your Campus <br />
          <span className="text-blue-600 dark:text-blue-500">
            Effortlessly & Smartly
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-slate-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed font-normal"
        >
          Find blocks, classrooms, faculty cabins, amenities, and multi-floor indoor paths in real-time. Designed for students, faculty, and visitors.
        </motion.p>

        {/* Action Button: Get Started */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white rounded-xl bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
          >
            <span>Explore Campus Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl"
        >
          {[
            { icon: MapPin, text: 'Interactive Map' },
            { icon: Layers, text: 'Multi-Floor Routing' },
            { icon: ShieldCheck, text: 'Faculty Finder' },
            { icon: Compass, text: 'Campus Events' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 shadow-xs"
            >
              <item.icon className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-semibold">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-400 dark:text-zinc-500 font-mono">
        DISHAA Campus Map System &bull; Major Project Edition
      </footer>
    </motion.div>
  );
}
