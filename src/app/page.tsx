'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import SplashScreen from '@/components/SplashScreen';
import { LandingPage } from '@/components/landing/LandingPage';
import { FacultyPortal } from '@/components/landing/FacultyPortal';
import AIChatWindow from '@/components/AIChatWindow';
import BroadcastBanner from '@/components/BroadcastBanner';
import BottomNavbar from '@/components/BottomNavbar';
import InsideBlockModal from '@/components/InsideBlockModal';
import AdminPortalModal from '@/components/AdminPortalModal';
import EventsModal from '@/components/EventsModal';
import FacultyFinderPanel from '@/components/FacultyFinderPanel';
import { MapPin, Bot, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { DirectionsState, CampusLocation, syncCloudinaryImages } from '@/lib/campusData';

// Dynamic import for Leaflet Campus Map (Client-side rendering only)
const CampusMap = dynamic(() => import('@/components/CampusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] bg-slate-100 dark:bg-zinc-900 rounded-2xl flex flex-col items-center justify-center text-slate-500 dark:text-zinc-400 gap-3 border border-slate-200 dark:border-zinc-800">
      <Sparkles className="w-6 h-6 animate-spin text-blue-600" />
      <span className="text-xs font-mono tracking-wide">Loading Campus Spatial Engine...</span>
    </div>
  ),
});

export default function AppHome() {
  // Sync Cloudinary Image links from MongoDB images collection on load
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.images)) {
          syncCloudinaryImages(data.images);
        }
      })
      .catch((err) => console.error('Failed to sync Cloudinary images:', err));
  }, []);

  // Navigation Flow State: 'splash' -> 'welcome' -> 'home'
  const [stage, setStage] = useState<'splash' | 'welcome' | 'faculty-preview' | 'home'>('splash');
  const [activeTab, setActiveTab] = useState('ai');
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);

  // Directions & Map Selection State
  const [directions, setDirections] = useState<DirectionsState>({ isActive: false } as DirectionsState);
  const [pickingFor, setPickingFor] = useState<'from' | 'to' | null>(null);
  const [mapPickedLocation, setMapPickedLocation] = useState<CampusLocation | null>(null);

  // Indoor Target Floor Map State (from AI Chat triggers)
  const [indoorTargetBlock, setIndoorTargetBlock] = useState<'BLOCK A' | 'BLOCK B' | 'BLOCK C'>('BLOCK B');
  const [indoorTargetFloor, setIndoorTargetFloor] = useState<number>(4);

  // Draggable Left Panel Width (Desktop/Landscape boundary slider)
  const [panelWidth, setPanelWidth] = useState(440); // default 440px width
  const isDraggingHRef = useRef(false);

  const { theme, toggleTheme } = useTheme();

  // Handle Horizontal Resize (Desktop Left Panel boundary)
  const handleHMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingHRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleHMouseMove);
    document.addEventListener('mouseup', handleHMouseUp);
  };

  const handleHMouseMove = (e: MouseEvent) => {
    if (!isDraggingHRef.current) return;
    const newWidth = e.clientX - 64; // Navbar is 64px wide
    const minW = 320;
    const maxW = Math.min(800, window.innerWidth - 350);
    const clamped = Math.max(minW, Math.min(maxW, newWidth));
    setPanelWidth(clamped);
    window.dispatchEvent(new Event('resize'));
  };

  const handleHMouseUp = () => {
    isDraggingHRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleHMouseMove);
    document.removeEventListener('mouseup', handleHMouseUp);
  };

  const handleHTouchStart = () => {
    isDraggingHRef.current = true;
    document.addEventListener('touchmove', handleHTouchMove);
    document.addEventListener('touchend', handleHTouchEnd);
  };

  const handleHTouchMove = (e: TouchEvent) => {
    if (!isDraggingHRef.current || !e.touches[0]) return;
    const newWidth = e.touches[0].clientX - 64;
    const minW = 300;
    const maxW = Math.min(800, window.innerWidth - 300);
    const clamped = Math.max(minW, Math.min(maxW, newWidth));
    setPanelWidth(clamped);
    window.dispatchEvent(new Event('resize'));
  };

  const handleHTouchEnd = () => {
    isDraggingHRef.current = false;
    document.removeEventListener('touchmove', handleHTouchMove);
    document.removeEventListener('touchend', handleHTouchEnd);
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-100">
      <AnimatePresence mode="wait">
        {/* Stage 1: Splash Screen Loading */}
        {stage === 'splash' && (
          <SplashScreen key="splash-screen" onComplete={() => setStage('welcome')} />
        )}

        {/* Stage 2: Welcome / Intro Onboarding Landing Page */}
        {stage === 'welcome' && (
          <motion.div
            key="welcome-landing-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen overflow-y-auto"
          >
            <LandingPage
              onLaunchMap={() => {
                setStage('home');
                setActiveTab('ai');
                setIsChatCollapsed(false);
              }}
              onFacultyPortal={() => {
                setStage('home');
                setActiveTab('admin');
                setIsChatCollapsed(false);
              }}
            />
          </motion.div>
        )}

        {/* Stage 3: Home Interface with Unified Left Navigation & Feature Panel */}
        {stage === 'home' && (
          <motion.div
            key="app-workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-screen flex flex-col md:flex-row overflow-y-auto md:overflow-hidden bg-slate-50 dark:bg-zinc-950 pb-16 md:pb-0"
          >
            {/* Unified Navigation Rail (Sidebar on Desktop/Landscape, Fixed Bottom Bar on Mobile Portrait) */}
            <BottomNavbar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                if (tab !== activeTab && directions.isActive) {
                  setDirections({ isActive: false } as DirectionsState);
                }
                setActiveTab(tab);
                setIsChatCollapsed(false); // Open Left Feature Panel for selected option
              }}
              onGoWelcome={() => {
                if (directions.isActive) {
                  setDirections({ isActive: false } as DirectionsState);
                }
                setStage('welcome');
              }}
              isChatOpen={!isChatCollapsed}
              onToggleChat={() => setIsChatCollapsed(!isChatCollapsed)}
            />

            {/* Resizable Left Route Planner & Feature Panel */}
            <div
              id="mobile-feature-panel"
              style={!isChatCollapsed ? { width: `${panelWidth}px` } : undefined}
              className={`order-2 md:order-1 transition-all duration-75 ease-out shrink-0 border-t md:border-t-0 border-slate-200 dark:border-zinc-800 p-2 sm:p-2.5 ${
                isChatCollapsed
                  ? 'hidden md:hidden'
                  : 'w-full block h-auto md:h-full min-h-[460px] md:min-h-0'
              }`}
            >
              {activeTab === 'ai' && (
                <AIChatWindow
                  onToggleCollapse={() => setIsChatCollapsed(true)}
                  onDirectionsChange={(state) => setDirections(state)}
                  onPickOnMap={(mode) => setPickingFor(mode)}
                  mapPickedLocation={mapPickedLocation}
                  directionsState={directions}
                  onSwitchTab={(tab) => {
                    setActiveTab(tab);
                    setIsChatCollapsed(false);
                  }}
                  onOpenIndoorViewer={(block, floor) => {
                    if (block) setIndoorTargetBlock(block as any);
                    if (floor !== undefined) setIndoorTargetFloor(floor);
                    setActiveTab('inside-block');
                    setIsChatCollapsed(false);
                  }}
                  onOpenBroadcasts={() => {
                    setActiveTab('events');
                    setIsChatCollapsed(false);
                  }}
                />
              )}

              {activeTab === 'inside-block' && (
                <InsideBlockModal
                  isOpen={true}
                  isInline={true}
                  initialBlock={indoorTargetBlock}
                  initialFloor={indoorTargetFloor}
                  onClose={() => setIsChatCollapsed(true)}
                />
              )}

              {activeTab === 'faculty' && (
                <FacultyFinderPanel
                  onClose={() => setIsChatCollapsed(true)}
                />
              )}

              {activeTab === 'events' && (
                <EventsModal
                  isOpen={true}
                  isInline={true}
                  onClose={() => setIsChatCollapsed(true)}
                />
              )}

              {activeTab === 'admin' && (
                <AdminPortalModal
                  isOpen={true}
                  isInline={true}
                  onClose={() => setIsChatCollapsed(true)}
                />
              )}
            </div>

            {/* Draggable Vertical Resizer Bar (Between Left Panel and Map workspace on PC/Landscape) */}
            {!isChatCollapsed && (
              <div
                onMouseDown={handleHMouseDown}
                onTouchStart={handleHTouchStart}
                className="hidden md:flex order-1.5 w-3 h-full bg-slate-200/80 dark:bg-zinc-800/80 hover:bg-blue-600 dark:hover:bg-blue-600 cursor-col-resize items-center justify-center transition-colors shrink-0 group z-30 select-none border-x border-slate-300/60 dark:border-zinc-700/60 shadow-xs"
                title="Drag left or right to resize Route Planner & Feature Panel boundary"
              >
                <div className="flex flex-col gap-1 items-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="w-1 h-1 rounded-full bg-slate-600 dark:bg-zinc-400 group-hover:bg-white" />
                  <span className="w-1 h-1 rounded-full bg-slate-600 dark:bg-zinc-400 group-hover:bg-white" />
                  <span className="w-1 h-1 rounded-full bg-slate-600 dark:bg-zinc-400 group-hover:bg-white" />
                </div>
              </div>
            )}

            {/* Main Campus Map Workspace (Top on Mobile Portrait, Right on PC/Landscape) */}
            <div className="order-1 md:order-2 flex flex-col h-[52vh] md:h-full w-full flex-1 min-w-0 overflow-hidden shrink-0 md:shrink">
              
              {/* Minimalist Top Sub-Header */}
              <header className="h-11 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 px-3 sm:px-4 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 font-medium truncate">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="truncate">G.H. Raisoni College Campus &bull; Map</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsChatCollapsed(!isChatCollapsed)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer border border-slate-200 dark:border-zinc-800"
                    title={isChatCollapsed ? 'Show Feature Panel' : 'Hide Feature Panel'}
                  >
                    <Bot className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">{isChatCollapsed ? 'Show Panel' : 'Hide Panel'}</span>
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Toggle Theme"
                  >
                    {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
                  </button>
                </div>
              </header>

              {/* Live Admin Emergency Broadcast Banner */}
              <BroadcastBanner />

              {/* Campus Map View */}
              <main className="flex-1 min-h-0 overflow-hidden p-1.5 sm:p-2.5 relative">
                <div className="w-full h-full rounded-2xl overflow-hidden glass-panel relative">
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
              </main>

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
