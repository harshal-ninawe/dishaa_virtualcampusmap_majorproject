'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot, Send, Mic, Sparkles, User, PanelRightClose,
  Navigation2, MapPin, X, CheckCircle2, ArrowRight,
  Building, Coffee, Trophy, Clock, Crosshair,
} from 'lucide-react';
import { campusLocations, DirectionsState, CampusLocation, StepMilestone } from '@/lib/campusData';
import { findRoute, generateStepsFromRoute, generateMilestonesFromRoute } from '@/lib/pathfinding';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AIChatWindowProps {
  onToggleCollapse?: () => void;
  onDirectionsChange?: (state: DirectionsState) => void;
  onPickOnMap?: (picking: 'from' | 'to' | null) => void;
  mapPickedLocation?: CampusLocation | null;
  directionsState?: DirectionsState;
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
      <span className={`absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${dotColor} shadow-lg z-10`} />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => { if (value.trim()) setOpen(true); }}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full pl-8 pr-8 py-2.5 rounded-xl bg-slate-800/80 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
      />
      {value && (
        <button
          onClick={() => { onChange(''); setOpen(false); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-slate-900/98 border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden max-h-44 overflow-y-auto backdrop-blur-xl">
          <div className="px-3 py-1 text-[9px] font-mono text-cyan-400/70 uppercase tracking-wider border-b border-white/10">
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
                className="w-full px-3 py-2 hover:bg-cyan-500/15 transition-colors flex items-center gap-2.5 text-left border-b border-white/5 last:border-0 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{loc.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{loc.categoryLabel}</p>
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
}: AIChatWindowProps) {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "👋 Hi! I am DISHAA AI, your smart virtual campus assistant. Ask me about building blocks, faculty cabins, canteens, or multi-floor routes!",
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

  const handleSendMessage = (textToSend?: string) => {
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

    setTimeout(() => {
      let replyText = "I can guide you! Block A is near the main entrance, Block C has the Computer Science & AI departments.";
      const lower = text.toLowerCase();
      if (lower.includes('canteen') || lower.includes('food') || lower.includes('coffee'))
        replyText = "📍 Canteen 1 is inside Block B. Nescafé Outlet and Siddhi Café are near Block C!";
      else if (lower.includes('block c') || lower.includes('ai') || lower.includes('cs'))
        replyText = "🏢 Block C contains Computer Engineering, AI, and Data Science departments. Located near the sports ground.";
      else if (lower.includes('faculty') || lower.includes('prof'))
        replyText = "👨‍🏫 Faculty cabins are on the 2nd & 3rd floors of Block A and Block C. Use the Faculty Directory for specific professors!";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleGetDirections = () => {
    if (!fromLoc || !toLoc) return;

    // Run A* pathfinding on real road network
    const result = findRoute(fromLoc.coords, toLoc.coords);

    let routePath: [number, number][] = [];
    let totalDistance = 0;
    let generatedSteps: string[] = [];
    let milestones: StepMilestone[] = [];

    if (result) {
      routePath = result.path;
      totalDistance = result.distance;
      const res = generateMilestonesFromRoute(result.path, fromLoc, toLoc, result.distance);
      generatedSteps = res.steps;
      milestones = res.milestones;
    } else {
      routePath = [fromLoc.coords, toLoc.coords];
      totalDistance = 0;
      milestones = [
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
      generatedSteps = milestones.map((m) => `📍 ${m.title}: ${m.instruction}`);
    }

    setSteps(generatedSteps);
    setRouteActive(true);

    onDirectionsChange?.({
      isActive: true,
      from: fromLoc,
      to: toLoc,
      steps: generatedSteps,
      routePath,
      totalDistance,
      currentStepIndex: 0,
      milestones,
    });

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
    <div className="w-full h-full min-h-[450px] lg:min-h-0 rounded-3xl overflow-hidden border border-white/15 glass-panel shadow-2xl flex flex-col relative">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="p-4 glass-panel border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-100 text-base">DISHAA AI Assistant</h3>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <p className="text-xs text-cyan-300/80 font-mono">Virtual Campus Guide &bull; Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-medium hidden sm:block">
            AI v2.0
          </div>
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-xl text-slate-400 hover:text-white glass-card hover:bg-white/15 border border-white/15 transition-all cursor-pointer flex items-center gap-1"
              title="Hide AI Assistant"
            >
              <PanelRightClose className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-medium hidden sm:inline">Hide</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Show Directions Toggle Button ──────────────────────── */}
      <div className="px-4 py-3 border-b border-white/10 bg-slate-900/60 shrink-0">
        <button
          onClick={() => {
            setDirectionsOpen(!directionsOpen);
            if (directionsOpen) handleClearDirections();
          }}
          className={`w-full py-3 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 border ${
            directionsOpen
              ? 'bg-gradient-to-r from-emerald-600 to-cyan-500 border-emerald-400/40 text-white shadow-[0_0_25px_rgba(52,211,153,0.5)] scale-[1.02]'
              : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 border-cyan-400/40 text-white shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:shadow-[0_0_40px_rgba(56,189,248,0.9)] hover:scale-[1.02]'
          }`}
        >
          <div className={`p-1.5 rounded-xl bg-white/20 transition-transform duration-300 ${directionsOpen ? 'rotate-45' : ''}`}>
            <Navigation2 className="w-5 h-5 text-white" />
          </div>
          <span className="tracking-wide text-base">
            {directionsOpen ? '✕ Close Directions' : '🗺️ Show Directions'}
          </span>
          {!directionsOpen && (
            <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 border border-white/20 text-cyan-100">
              BETA
            </span>
          )}
        </button>
      </div>

      {/* ── DIRECTIONS MODE (replaces chat) ────────────────────── */}
      {directionsOpen ? (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

          {/* Upper 40% — From / To inputs */}
          <div className="h-[40%] shrink-0 overflow-y-auto px-4 py-3 bg-slate-900/50 border-b border-white/10 space-y-3">
            <p className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest">
              📍 Route Planner — G.H. Raisoni Campus
            </p>

            {/* From Input */}
            <div className="space-y-1">
              <label htmlFor="from-input" className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
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
                    dotColor="bg-emerald-400 shadow-emerald-400/80"
                  />
                </div>
                <button
                  onClick={() => {
                    const next = pickingFor === 'from' ? null : 'from' as const;
                    setPickingFor(next);
                    onPickOnMap?.(next);
                  }}
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    pickingFor === 'from'
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.7)] animate-pulse'
                      : 'bg-slate-800 border-white/15 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/40'
                  }`}
                  title="Pick on Map"
                >
                  <Crosshair className="w-5 h-5" />
                </button>
              </div>
              {pickingFor === 'from' && (
                <p className="text-[10px] text-emerald-400 pl-2 animate-pulse font-mono">👆 Tap a location on the map...</p>
              )}
              {fromLoc && !pickingFor && (
                <p className="text-[10px] text-emerald-300/80 pl-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {fromLoc.categoryLabel}
                </p>
              )}
            </div>

            {/* Swap arrow */}
            <div className="flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />
            </div>

            {/* To Input */}
            <div className="space-y-1">
              <label htmlFor="to-input" className="text-[10px] font-mono text-red-400 uppercase tracking-wider">
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
                    dotColor="bg-red-400 shadow-red-400/80"
                  />
                </div>
                <button
                  onClick={() => {
                    const next = pickingFor === 'to' ? null : 'to' as const;
                    setPickingFor(next);
                    onPickOnMap?.(next);
                  }}
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    pickingFor === 'to'
                      ? 'bg-red-500 border-red-400 text-white shadow-[0_0_15px_rgba(248,113,113,0.7)] animate-pulse'
                      : 'bg-slate-800 border-white/15 text-slate-400 hover:text-red-400 hover:border-red-400/40'
                  }`}
                  title="Pick on Map"
                >
                  <Crosshair className="w-5 h-5" />
                </button>
              </div>
              {pickingFor === 'to' && (
                <p className="text-[10px] text-red-400 pl-2 animate-pulse font-mono">👆 Tap a location on the map...</p>
              )}
              {toLoc && !pickingFor && (
                <p className="text-[10px] text-red-300/80 pl-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {toLoc.categoryLabel}
                </p>
              )}
            </div>

            {/* Get Directions Button */}
            <button
              onClick={handleGetDirections}
              disabled={!fromLoc || !toLoc || fromLoc.id === toLoc.id}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 border cursor-pointer ${
                fromLoc && toLoc && fromLoc.id !== toLoc.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400/30 text-white shadow-[0_0_18px_rgba(56,189,248,0.7)] hover:scale-[1.02]'
                  : 'bg-slate-800/60 border-white/10 text-slate-500 cursor-not-allowed opacity-50'
              }`}
            >
              <Navigation2 className="w-4 h-4" />
              <span>Get Directions (A* Route)</span>
            </button>

            {routeActive && (
              <button
                onClick={handleClearDirections}
                className="w-full py-2 rounded-xl text-[11px] font-medium text-slate-400 hover:text-red-300 border border-white/10 hover:border-red-400/30 transition-colors cursor-pointer"
              >
                ✕ Clear Route
              </button>
            )}
          </div>

          {/* Lower 60% — Gamified Step-by-step instructions */}
          <div ref={stepsRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {!routeActive || !directionsState?.milestones || directionsState.milestones.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2 opacity-50">
                <MapPin className="w-8 h-8 text-cyan-400/40" />
                <p className="text-xs text-slate-500 font-mono">
                  Select start & destination,<br />then tap Get Directions.
                </p>
              </div>
            ) : (
              <>
                {/* Route summary header with Follow Next Step Controls */}
                <div className="p-3.5 rounded-2xl glass-card border border-cyan-500/30 bg-slate-900/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono">
                        Gamified Route Progress
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30">
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
                      className="px-3 py-2 rounded-xl bg-slate-800 border border-white/15 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      ⬅ Prev
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
                      className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span>Follow Step {(directionsState.currentStepIndex || 0) + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 4 Milestone Step Cards */}
                <div className="space-y-2.5">
                  {directionsState.milestones.map((m, idx) => {
                    const isActive = (directionsState.currentStepIndex || 0) === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          onDirectionsChange?.({ ...directionsState, currentStepIndex: idx });
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                          isActive
                            ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-[1.01]'
                            : 'border-white/10 bg-slate-900/60 hover:bg-white/5 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                              isActive
                                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-md animate-pulse'
                                : 'bg-slate-800 text-slate-400 border border-white/10'
                            }`}
                          >
                            {m.stepNumber}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className={`text-xs font-bold truncate ${isActive ? 'text-cyan-300' : 'text-slate-200'}`}>
                                {m.title}
                              </h5>
                              {isActive && (
                                <span className="text-[9px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5 leading-relaxed">
                              {m.instruction}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* ── CHAT MODE ─────────────────────────────────────────── */
        <>
          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600/90 text-white rounded-tr-none'
                      : 'glass-card border border-white/10 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[10px] text-slate-400/80 mt-1 text-right font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="glass-card px-4 py-2.5 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Chips */}
          <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto border-t border-white/5 shrink-0">
            {['Where is Block C?', 'Find Canteen 1', 'Faculty Cabins', 'Sports Ground'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-3 py-1 rounded-full glass-card text-[11px] font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors whitespace-nowrap cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 glass-panel border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <button type="button" className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors cursor-pointer" title="Voice Search">
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask DISHAA AI about campus locations..."
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900/80 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
