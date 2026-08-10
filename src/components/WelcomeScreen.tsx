'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin, Compass, ShieldCheck, Layers } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 text-white"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/college-bg.jpg"
          alt="G H Raisoni College Campus"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-10000 hover:scale-100"
          priority
        />
        {/* Gradients & Dark Blur vignette for high-end readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60" />
        <div className="absolute inset-0 bg-blue-950/30 backdrop-brightness-75" />
      </div>

      {/* Top Header Navbar Branding */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/disha-logo.png"
            alt="DISHAA Logo"
            width={44}
            height={50}
            className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
          />
          <div>
            <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              DISHAA
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Virtual Campus Map
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>G.H. Raisoni College Campus</span>
        </div>
      </header>

      {/* Hero Welcome Card */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 my-auto text-center flex flex-col items-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-cyan-300 text-xs sm:text-sm font-medium shadow-xl mb-6 border border-cyan-500/30"
        >
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Next-Gen Full-Stack Campus Spatial Guide</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight"
        >
          Navigate Your Campus <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
            Effortlessly & Smartly
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-6 text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed font-normal"
        >
          Find blocks, classrooms, faculty cabins, amenities, and multi-floor indoor paths in real-time. Designed for students, faculty, and visitors.
        </motion.p>

        {/* Action Button: Get Started */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-cyan-400/40"
          >
            <span className="relative z-10 tracking-wide">Get Started</span>
            <div className="relative z-10 p-1.5 rounded-xl bg-white/20 group-hover:translate-x-1.5 transition-transform duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            
            {/* Animated shimmer layer */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl"
        >
          {[
            { icon: MapPin, text: 'Interactive 2D/3D Map' },
            { icon: Layers, text: 'Multi-Floor Routing' },
            { icon: ShieldCheck, text: 'Faculty Directory' },
            { icon: Compass, text: 'Live Event Overlay' },
          ].map((item, index) => (
            <div
              key={index}
              className="glass-card px-4 py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center text-slate-300 border border-white/10 hover:border-cyan-400/40 transition-colors"
            >
              <item.icon className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-medium text-slate-200">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-500 font-mono">
        DISHAA Virtual Campus Map System &bull; Major Project Edition
      </footer>
    </motion.div>
  );
}
