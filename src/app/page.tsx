'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import SplashScreen from '@/components/SplashScreen';
import WelcomeScreen from '@/components/WelcomeScreen';
import AIChatWindow from '@/components/AIChatWindow';
import BottomNavbar from '@/components/BottomNavbar';
import InsideBlockModal from '@/components/InsideBlockModal';
import AdminPortalModal from '@/components/AdminPortalModal';
import EventsModal from '@/components/EventsModal';
import Image from 'next/image';
import { Sparkles, MapPin, ChevronRight, ChevronLeft, Bot } from 'lucide-react';
import { DirectionsState, CampusLocation } from '@/lib/campusData';

// Dynamic import for Leaflet Campus Map (Client-side rendering only)
const CampusMap = dynamic(() => import('@/components/CampusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] glass-panel rounded-3xl flex flex-col items-center justify-center text-cyan-400 gap-3 border border-white/10">
      <Sparkles className="w-8 h-8 animate-spin" />
      <span className="text-sm font-mono tracking-wider">Loading OpenStreetMap Engine...</span>
    </div>
  ),
});

export default function AppHome() {
  // Navigation Flow State: 'splash' -> 'welcome' -> 'home'
  const [stage, setStage] = useState<'splash' | 'welcome' | 'home'>('splash');
  const [activeTab, setActiveTab] = useState('map');
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [directions, setDirections] = useState<DirectionsState>({
    isActive: false,
    from: null,
    to: null,
    steps: [],
    routePath: [],
    totalDistance: 0,
    currentStepIndex: 0,
    milestones: [],
  });

  const [pickingFor, setPickingFor] = useState<'from' | 'to' | null>(null);
  const [mapPickedLocation, setMapPickedLocation] = useState<CampusLocation | null>(null);
  const [isInsideBlockOpen, setIsInsideBlockOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* Stage 1: Animated DISHAA Logo Splash Screen */}
        {stage === 'splash' && (
          <SplashScreen
            key="splash-screen"
            onComplete={() => setStage('welcome')}
            durationMs={2500}
          />
        )}

        {/* Stage 2: College Background Photo & Get Started Button */}
        {stage === 'welcome' && (
          <WelcomeScreen
            key="welcome-screen"
            onGetStarted={() => setStage('home')}
          />
        )}

        {/* Stage 3: Home Interface (Fixed Bottom Navbar & Middle Edge Toggle Button) */}
        {stage === 'home' && (
          <motion.div
            key="home-portal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex flex-col p-3 sm:p-4 overflow-hidden relative bg-slate-950"
          >
            {/* Top Sub-Header (Hidden on mobile < md for zero clutter, visible on PC/laptop >= md) */}
            <div className="hidden md:flex items-center justify-between px-2 py-1 mb-2 shrink-0">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/disha-logo.png"
                  alt="DISHAA"
                  width={36}
                  height={40}
                  className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                />
                <div>
                  <h2 className="text-base font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                    DISHAA
                  </h2>
                  <p className="text-[9px] text-cyan-400 font-mono tracking-wider uppercase">
                    Virtual Campus Map & AI Guide
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 glass-card px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-medium hidden sm:inline">G.H. Raisoni College Campus</span>
              </div>
            </div>

            {/* Responsive Workspace (Vertical Scroll Column on Mobile | Side-by-Side Split on Desktop) */}
            <main className="flex-1 w-full relative min-h-0 overflow-y-auto lg:overflow-hidden pr-0 lg:pr-1">
              <div className="w-full h-auto lg:h-full flex flex-col lg:flex-row items-stretch relative gap-4 lg:gap-0 pb-4 lg:pb-0">
                
                {/* Map Container Partition */}
                <div
                  className={`w-full shrink-0 min-h-[400px] h-[55vh] lg:h-full transition-all duration-500 ease-in-out ${
                    isChatCollapsed ? 'lg:w-full' : 'lg:w-1/2 lg:pr-2'
                  }`}
                >
                  <CampusMap
                    isChatCollapsed={isChatCollapsed}
                    directions={directions}
                    pickingFor={pickingFor}
                    onSelectLocation={(loc) => {
                      setMapPickedLocation(loc);
                      setPickingFor(null);
                    }}
                    onDirectionsChange={(state) => setDirections(state)}
                  />
                </div>

                {/* Vertical Middle Handle Toggle Button (Desktop Only) */}
                <button
                  onClick={() => setIsChatCollapsed(!isChatCollapsed)}
                  className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-30 py-3 px-2 rounded-l-2xl glass-panel border border-white/20 bg-slate-900/90 text-cyan-300 hover:text-white shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all duration-500 cursor-pointer flex-col items-center gap-1.5 border-r-0 ${
                    isChatCollapsed ? 'right-0 rounded-2xl border-r' : 'right-0 lg:right-1/2'
                  }`}
                  title={isChatCollapsed ? 'Expand AI Chat' : 'Collapse AI Chat'}
                >
                  <Bot className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  {isChatCollapsed ? (
                    <ChevronLeft className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white" />
                  )}
                  <span className="text-[9px] font-mono [writing-mode:vertical-lr] text-slate-300 tracking-wider py-1">
                    {isChatCollapsed ? 'AI CHAT' : 'HIDE'}
                  </span>
                </button>

                {/* AI Chat & Directions Window Partition (Below Map on Mobile | Right Column on Desktop) */}
                <div
                  id="ai-chat-section"
                  className={`w-full min-h-[480px] lg:h-full transition-all duration-500 ease-in-out ${
                    isChatCollapsed ? 'hidden lg:block lg:w-0 lg:opacity-0 lg:pointer-events-none' : 'block lg:w-1/2 lg:opacity-100 lg:pl-2'
                  }`}
                >
                  <AIChatWindow
                    onToggleCollapse={() => setIsChatCollapsed(true)}
                    onDirectionsChange={(state) => setDirections(state)}
                    onPickOnMap={(mode) => setPickingFor(mode)}
                    mapPickedLocation={mapPickedLocation}
                    directionsState={directions}
                  />
                </div>

              </div>
            </main>

            {/* Inside Block Modal */}
            <InsideBlockModal
              isOpen={isInsideBlockOpen}
              onClose={() => setIsInsideBlockOpen(false)}
            />

            {/* Admin Portal Modal */}
            <AdminPortalModal
              isOpen={isAdminPortalOpen}
              onClose={() => setIsAdminPortalOpen(false)}
            />

            {/* Events Modal */}
            <EventsModal
              isOpen={isEventsOpen}
              onClose={() => setIsEventsOpen(false)}
            />

            {/* Fixed Bottom Navbar (Anchored cleanly at bottom edge) */}
            <BottomNavbar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                if (tab === 'inside-block') setIsInsideBlockOpen(true);
                if (tab === 'admin') setIsAdminPortalOpen(true);
                if (tab === 'events') setIsEventsOpen(true);
                if (tab === 'ai') {
                  setIsChatCollapsed(false);
                  setTimeout(() => {
                    document.getElementById('ai-chat-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              onGoWelcome={() => setStage('welcome')}
            />

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
