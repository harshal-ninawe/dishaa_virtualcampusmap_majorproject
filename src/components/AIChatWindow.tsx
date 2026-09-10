'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot, Send, Mic, Sparkles, User, PanelRightClose,
  Navigation2, MapPin, X, CheckCircle2, ArrowRight,
  Building, Coffee, Trophy, Crosshair,
} from 'lucide-react';
import { campusLocations, DirectionsState, CampusLocation, StepMilestone, RouteOption } from '@/lib/campusData';
import { findRoute, findMultipleRoutes, generateStepsFromRoute, generateMilestonesFromRoute } from '@/lib/pathfinding';
import { ChatAction } from '@/lib/campusKnowledge';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actions?: ChatAction[];
}

interface AIChatWindowProps {
  onToggleCollapse?: () => void;
  onDirectionsChange?: (state: DirectionsState) => void;
  onPickOnMap?: (picking: 'from' | 'to' | null) => void;
  mapPickedLocation?: CampusLocation | null;
  directionsState?: DirectionsState;
  onSwitchTab?: (tab: string) => void;
  onOpenIndoorViewer?: (block?: string, floor?: number) => void;
  onOpenBroadcasts?: () => void;
}

// ── Location autocomplete hook ─────────────────────────────────────────────
function useLocationAutocomplete(query: string) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return campusLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.categoryLabel.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q)
  );
}

// ── Autocomplete input with dropdown ──────────────────────────────────────
function LocationInput({
  value,
  onChange,
  onSelect,
  placeholder,
  dotColor,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (loc: CampusLocation) => void;
  placeholder: string;
  dotColor: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const suggestions = useLocationAutocomplete(value);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <span className={`absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${dotColor} z-10`} />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => { if (value.trim()) setOpen(true); }}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full pl-8 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
      />
      {value && (
        <button
          onClick={() => { onChange(''); setOpen(false); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden max-h-44 overflow-y-auto">
          <div className="px-3 py-1 text-[9px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800">
            {suggestions.length} campus location{suggestions.length !== 1 ? 's' : ''} found
          </div>
          {suggestions.map((loc) => {
            const Icon = loc.type === 'amenity' ? Coffee : loc.type === 'sports' ? Trophy : Building;
            return (
              <button
                key={loc.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(loc);
                  setOpen(false);
                }}
                className="w-full px-3 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2.5 text-left border-b border-slate-100 dark:border-zinc-800/50 last:border-0 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-zinc-100 truncate">{loc.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">{loc.categoryLabel}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function AIChatWindow({
  onToggleCollapse,
  onDirectionsChange,
  onPickOnMap,
  mapPickedLocation,
  directionsState,
  onSwitchTab,
  onOpenIndoorViewer,
  onOpenBroadcasts,
}: AIChatWindowProps) {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "👋 Hi! I am DISHAA AI, your campus assistant. Ask me about building blocks, faculty cabins, canteens, or multi-floor routes!",
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Direction state
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [fromLoc, setFromLoc] = useState<CampusLocation | null>(null);
  const [toLoc, setToLoc] = useState<CampusLocation | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [routeActive, setRouteActive] = useState(false);
  const [pickingFor, setPickingFor] = useState<'from' | 'to' | null>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Vertical Resizer for Steps Panel
  const [stepsHeight, setStepsHeight] = useState(300);
  const isDraggingVRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(300);

  const handleVMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingVRef.current = true;
    startYRef.current = e.clientY;
    startHeightRef.current = stepsHeight;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleVMouseMove);
    document.addEventListener('mouseup', handleVMouseUp);
  };

  const handleVMouseMove = (e: MouseEvent) => {
    if (!isDraggingVRef.current) return;
    const deltaY = startYRef.current - e.clientY;
    const newHeight = Math.max(120, Math.min(650, startHeightRef.current + deltaY));
    setStepsHeight(newHeight);
  };

  const handleVMouseUp = () => {
    isDraggingVRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleVMouseMove);
    document.removeEventListener('mouseup', handleVMouseUp);
  };

  const handleVTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      isDraggingVRef.current = true;
      startYRef.current = e.touches[0].clientY;
      startHeightRef.current = stepsHeight;
      document.addEventListener('touchmove', handleVTouchMove, { passive: false });
      document.addEventListener('touchend', handleVTouchEnd);
    }
  };

  const handleVTouchMove = (e: TouchEvent) => {
    if (!isDraggingVRef.current || !e.touches[0]) return;
    const deltaY = startYRef.current - e.touches[0].clientY;
    const newHeight = Math.max(120, Math.min(650, startHeightRef.current + deltaY));
    setStepsHeight(newHeight);
  };

  const handleVTouchEnd = () => {
    isDraggingVRef.current = false;
    document.removeEventListener('touchmove', handleVTouchMove);
    document.removeEventListener('touchend', handleVTouchEnd);
  };

  // Handle map-picked location from parent
  useEffect(() => {
    if (mapPickedLocation && pickingFor) {
      if (pickingFor === 'from') {
        setFromLoc(mapPickedLocation);
        setFromQuery(mapPickedLocation.name);
      } else {
        setToLoc(mapPickedLocation);
        setToQuery(mapPickedLocation.name);
      }
      setPickingFor(null);
      onPickOnMap?.(null);
    }
  }, [mapPickedLocation]);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const handleExecuteAction = (action: ChatAction) => {
    if (action.type === 'set_route') {
      const from = action.payload.fromLoc || campusLocations.find(l => l.id === 'blk-b') || campusLocations[0];
      const to = action.payload.toLoc || campusLocations.find(l => l.id === 'boys-hostel') || campusLocations[1];
      setFromLoc(from);
      setFromQuery(from.name);
      setToLoc(to);
      setToQuery(to.name);
      setDirectionsOpen(true);

      const routes = findMultipleRoutes(from, to);
      if (routes.length > 0) {
        const activeRoute = routes[0];
        setSteps(activeRoute.steps);
        setRouteActive(true);

        onDirectionsChange?.({
          isActive: true,
          from,
          to,
          routes,
          activeRouteIndex: 0,
          steps: activeRoute.steps,
          routePath: activeRoute.path,
          totalDistance: activeRoute.distance,
          currentStepIndex: 0,
          milestones: activeRoute.milestones,
        });
      }
    } else if (action.type === 'open_block') {
      if (onDirectionsChange && directionsState?.isActive) {
        onDirectionsChange({ ...directionsState, isActive: false });
      }
      onSwitchTab?.('inside-block');
      onOpenIndoorViewer?.(action.payload.block, action.payload.floor);
    } else if (action.type === 'search_faculty') {
      if (onDirectionsChange && directionsState?.isActive) {
        onDirectionsChange({ ...directionsState, isActive: false });
      }
      onSwitchTab?.('faculty');
    } else if (action.type === 'open_broadcasts') {
      if (onDirectionsChange && directionsState?.isActive) {
        onDirectionsChange({ ...directionsState, isActive: false });
      }
      onOpenBroadcasts?.();
    } else if (action.type === 'switch_tab') {
      if (onDirectionsChange && directionsState?.isActive) {
        onDirectionsChange({ ...directionsState, isActive: false });
      }
      if (action.payload.tab) {
        onSwitchTab?.(action.payload.tab);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      const replyText = data.reply || "I am DISHAA AI Assistant. Ask me how to navigate between campus locations, view indoor floor maps, or check faculty sitting info!";
      const actions = data.actions || [];

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actions,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error sending message to DISHAA AI API:', err);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I am DISHAA AI Assistant. Ask me how to navigate between campus locations, view 3D floor maps, or check faculty sitting info!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGetDirections = () => {
    if (!fromLoc || !toLoc) return;

    // Run A* pathfinding to generate up to 3 candidate routes
    const routes = findMultipleRoutes(fromLoc, toLoc);

    if (routes.length > 0) {
      const activeRoute = routes[0]; // Shortest route active by default
      setSteps(activeRoute.steps);
      setRouteActive(true);

      onDirectionsChange?.({
        isActive: true,
        from: fromLoc,
        to: toLoc,
        routes,
        activeRouteIndex: 0,
        steps: activeRoute.steps,
        routePath: activeRoute.path,
        totalDistance: activeRoute.distance,
        currentStepIndex: 0,
        milestones: activeRoute.milestones,
      });
    } else {
      const fallbackPath: [number, number][] = [fromLoc.coords, toLoc.coords];
      const milestones: StepMilestone[] = [
        {
          stepNumber: 1,
          title: `Step 1: Start at ${fromLoc.name}`,
          instruction: `Head towards ${toLoc.name}`,
          coords: fromLoc.coords,
          image: fromLoc.image || '/college-front.jpg',
        },
        {
          stepNumber: 2,
          title: `Step 2: Arrived at ${toLoc.name}`,
          instruction: `You have reached ${toLoc.name}!`,
          coords: toLoc.coords,
          image: toLoc.image || '/college-front.jpg',
        },
      ];
      const generatedSteps = milestones.map((m) => `📍 ${m.title}: ${m.instruction}`);
      setSteps(generatedSteps);
      setRouteActive(true);

      onDirectionsChange?.({
        isActive: true,
        from: fromLoc,
        to: toLoc,
        steps: generatedSteps,
        routePath: fallbackPath,
        totalDistance: 0,
        currentStepIndex: 0,
        milestones,
      });
    }

    setTimeout(() => stepsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleClearDirections = () => {
    setRouteActive(false);
    setFromQuery('');
    setToQuery('');
    setFromLoc(null);
    setToLoc(null);
    setSteps([]);
    onDirectionsChange?.({
      isActive: false,
      from: null,
      to: null,
      steps: [],
      routePath: [],
      totalDistance: 0,
      currentStepIndex: 0,
      milestones: [],
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col relative">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="p-3.5 px-4 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">Campus AI Guide</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">Interactive Spatial & Route Guide</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 px-2.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Hide AI Assistant"
            >
              <PanelRightClose className="w-4 h-4" />
              <span className="hidden sm:inline">Hide</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Show Directions Toggle Button ──────────────────────── */}
      <div className="px-4 py-2.5 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 shrink-0">
        <button
          onClick={() => {
            setDirectionsOpen(!directionsOpen);
            if (directionsOpen) handleClearDirections();
          }}
          className={`w-full py-2 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
            directionsOpen
              ? 'bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-300 dark:hover:bg-zinc-700'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
          }`}
        >
          <Navigation2 className={`w-3.5 h-3.5 ${directionsOpen ? 'rotate-45' : ''}`} />
          <span>{directionsOpen ? 'Close Route Planner' : 'Get Directions & Route Planner'}</span>
        </button>
      </div>

      {/* ── DIRECTIONS MODE (replaces chat) ────────────────────── */}
      {directionsOpen ? (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">

          {/* Upper Section — From / To inputs */}
          <div className="shrink-0 px-4 py-3 bg-slate-50/50 dark:bg-zinc-900/50 space-y-3">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
              📍 Route Planner — Campus Navigation
            </p>

            {/* From Input */}
            <div className="space-y-1">
              <label htmlFor="from-input" className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                Start Point
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <LocationInput
                    id="from-input"
                    value={fromQuery}
                    onChange={(v) => { setFromQuery(v); if (!v) setFromLoc(null); }}
                    onSelect={(loc) => { setFromLoc(loc); setFromQuery(loc.name); }}
                    placeholder="From: e.g. Main Gate, Block A…"
                    dotColor="bg-emerald-500"
                  />
                </div>
                <button
                  onClick={() => {
                    const next = pickingFor === 'from' ? null : 'from' as const;
                    setPickingFor(next);
                    onPickOnMap?.(next);
                  }}
                  className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    pickingFor === 'from'
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                      : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-400 hover:text-emerald-600'
                  }`}
                  title="Pick on Map"
                >
                  <Crosshair className="w-4 h-4" />
                </button>
              </div>
              {pickingFor === 'from' && (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 pl-2 font-mono">Tap a location on the map...</p>
              )}
              {fromLoc && !pickingFor && (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 pl-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {fromLoc.categoryLabel}
                </p>
              )}
            </div>

            {/* Swap arrow */}
            <div className="flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
            </div>

            {/* To Input */}
            <div className="space-y-1">
              <label htmlFor="to-input" className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase tracking-wider font-semibold">
                Destination
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <LocationInput
                    id="to-input"
                    value={toQuery}
                    onChange={(v) => { setToQuery(v); if (!v) setToLoc(null); }}
                    onSelect={(loc) => { setToLoc(loc); setToQuery(loc.name); }}
                    placeholder="To: e.g. Block C, Canteen, Hostel…"
                    dotColor="bg-rose-500"
                  />
                </div>
                <button
                  onClick={() => {
                    const next = pickingFor === 'to' ? null : 'to' as const;
                    setPickingFor(next);
                    onPickOnMap?.(next);
                  }}
                  className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    pickingFor === 'to'
                      ? 'bg-rose-600 border-rose-500 text-white shadow-sm'
                      : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-400 hover:text-rose-600'
                  }`}
                  title="Pick on Map"
                >
                  <Crosshair className="w-4 h-4" />
                </button>
              </div>
              {pickingFor === 'to' && (
                <p className="text-[10px] text-rose-600 dark:text-rose-400 pl-2 font-mono">Tap a location on the map...</p>
              )}
              {toLoc && !pickingFor && (
                <p className="text-[10px] text-rose-600 dark:text-rose-400 pl-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {toLoc.categoryLabel}
                </p>
              )}
            </div>

            {/* Get Directions Button */}
            <button
              onClick={handleGetDirections}
              disabled={!fromLoc || !toLoc || fromLoc.id === toLoc.id}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                fromLoc && toLoc && fromLoc.id !== toLoc.id
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Navigation2 className="w-3.5 h-3.5" />
              <span>Calculate Route</span>
            </button>

            {routeActive && (
              <button
                onClick={handleClearDirections}
                className="w-full py-1.5 rounded-xl text-[11px] font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
              >
                ✕ Clear Route
              </button>
            )}
          </div>

          {/* Vertically Adjustable Step-by-Step Directions Container (Visible ONLY when route is active) */}
          {routeActive && directionsState?.milestones && directionsState.milestones.length > 0 && (
            <div className="flex flex-col shrink-0 border-t-2 border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md">
              {/* Draggable Vertical Handle Bar */}
              <div
                onMouseDown={handleVMouseDown}
                onTouchStart={handleVTouchStart}
                className="w-full py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-blue-500/20 dark:hover:bg-blue-600/30 cursor-row-resize flex items-center justify-center transition-colors shrink-0 group select-none border-b border-slate-200 dark:border-zinc-700/80"
                title="Drag up or down to vertically resize Route Steps height"
              >
                <div className="w-12 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500 group-hover:bg-blue-600 transition-colors" />
              </div>

              {/* Steps Scroll Area with Dynamic Adjustable Height */}
              <div
                ref={stepsRef}
                style={{ height: `${stepsHeight}px` }}
                className="overflow-y-auto px-4 py-3 space-y-3 shrink-0 touch-pan-y"
              >
                {/* Multi-Route Options Selector (Up to 3 routes: Shortest vs Alternative) */}
                {directionsState?.routes && directionsState.routes.length > 1 && (
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/40 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-zinc-300">
                      <span>Multiple Routes Found ({directionsState.routes.length})</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                        Shortest active
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {directionsState.routes.map((rt, idx) => {
                        const isActive = (directionsState.activeRouteIndex || 0) === idx;
                        return (
                          <button
                            key={rt.id || idx}
                            onClick={() => {
                              if (onDirectionsChange && directionsState) {
                                onDirectionsChange({
                                  ...directionsState,
                                  activeRouteIndex: idx,
                                  routePath: rt.path,
                                  steps: rt.steps,
                                  milestones: rt.milestones,
                                  totalDistance: rt.distance,
                                  currentStepIndex: 0,
                                });
                              }
                            }}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isActive
                                ? 'bg-white dark:bg-zinc-800 border-blue-600 dark:border-blue-500 shadow-xs ring-1 ring-blue-500'
                                : 'bg-white/60 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: rt.color || '#2563eb' }}
                              />
                              {rt.isShortest && (
                                <span className="text-[8px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-1 py-0.5 rounded uppercase">
                                  FASTEST
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-slate-900 dark:text-zinc-100 mt-1 truncate">
                              {rt.distance} meters
                            </p>
                            <p className="text-[9px] text-slate-500 dark:text-zinc-400 truncate">
                              Route {idx + 1}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Route summary header with Follow Next Step Controls */}
                <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Route Progress
                    </span>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700">
                      STEP {(directionsState.currentStepIndex || 0) + 1} OF {directionsState.milestones.length}
                    </span>
                  </div>

                  {/* Step Navigation Button Bar */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const prev = Math.max(0, (directionsState.currentStepIndex || 0) - 1);
                        onDirectionsChange?.({ ...directionsState, currentStepIndex: prev });
                      }}
                      disabled={(directionsState.currentStepIndex || 0) === 0}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Prev
                    </button>

                    <button
                      onClick={() => {
                        const next = Math.min(
                          directionsState.milestones.length - 1,
                          (directionsState.currentStepIndex || 0) + 1
                        );
                        onDirectionsChange?.({ ...directionsState, currentStepIndex: next });
                      }}
                      disabled={(directionsState.currentStepIndex || 0) === directionsState.milestones.length - 1}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span>Follow Step {(directionsState.currentStepIndex || 0) + 1}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Milestone Step Cards */}
                <div className="space-y-2">
                  {directionsState.milestones.map((m, idx) => {
                    const isActive = (directionsState.currentStepIndex || 0) === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          onDirectionsChange?.({ ...directionsState, currentStepIndex: idx });
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                            : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-zinc-800 text-slate-500'
                            }`}
                          >
                            {m.stepNumber}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className={`text-xs font-semibold truncate ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-zinc-200'}`}>
                                {m.title}
                              </h5>
                              {isActive && (
                                <span className="text-[9px] font-mono font-bold text-blue-600 px-1.5 py-0.2 rounded bg-blue-100 dark:bg-zinc-800">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 mt-0.5 leading-normal">
                              {m.instruction}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── CHAT MODE ─────────────────────────────────────────── */
        <>
          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 min-h-0 bg-slate-50/50 dark:bg-zinc-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-100 rounded-tl-none shadow-2xs'
                  }`}
                >
                  <div className="space-y-0.5 font-sans">
                    {msg.text.split('\n').map((line, lineIdx) => {
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      const content = parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={pIdx} className={msg.sender === 'user' ? 'font-bold text-white' : 'font-semibold text-blue-600 dark:text-blue-400'}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      });
                      return (
                        <span key={lineIdx} className="block min-h-[1.2em]">
                          {content}
                        </span>
                      );
                    })}
                  </div>

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-zinc-700/60 flex flex-col gap-1.5">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          onClick={() => handleExecuteAction(act)}
                          className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold flex items-center justify-between transition-colors shadow-xs cursor-pointer"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] opacity-70 mt-1.5 text-right font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-zinc-800 flex items-center justify-center text-slate-600">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white dark:bg-zinc-800 px-3.5 py-2 rounded-2xl rounded-tl-none border border-slate-200 dark:border-zinc-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Chips */}
          <div className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
            {[
              "I am at Block B, how to go to Boys Hostel?",
              "How to check faculty in Room 408?",
              "How to open 3D floor map for Block B?",
              "How to view broadcast alerts?"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-700 text-[11px] font-medium text-slate-600 dark:text-zinc-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-2.5 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask DISHAA AI about campus locations..."
              className="flex-1 py-2 px-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

