'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Search, Navigation, Building, Coffee, Trophy, X, Crosshair, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { campusLocations, DirectionsState, CampusLocation } from '@/lib/campusData';

// Custom SVG Markers for DISHAA Map
const createCustomIcon = (color: string, label: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <defs>
        <filter id="glow-${label}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${color}" flood-opacity="0.8"/>
        </filter>
      </defs>
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z" fill="${color}" filter="url(#glow-${label})"/>
      <circle cx="16" cy="14" r="7" fill="#0f172a"/>
      <circle cx="16" cy="14" r="4" fill="#ffffff"/>
    </svg>
  `;
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: svg,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  });
};

// Animated start/end direction marker (bigger, pulsing glow)
const createDirectionIcon = (color: string, label: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="40" height="52">
      <defs>
        <filter id="dglow-${label}" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="${color}" flood-opacity="1"/>
        </filter>
      </defs>
      <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 32 20 32s20-17 20-32C40 8.954 31.046 0 20 0z" fill="${color}" filter="url(#dglow-${label})"/>
      <circle cx="20" cy="18" r="9" fill="#0f172a"/>
      <circle cx="20" cy="18" r="5" fill="#ffffff"/>
      <circle cx="20" cy="18" r="2.5" fill="${color}"/>
    </svg>
  `;
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: svg,
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48],
  });
};

const blockIcon = createCustomIcon('#3b82f6', 'block');
const amenityIcon = createCustomIcon('#06b6d4', 'amenity');
const canteenIcon = createCustomIcon('#f59e0b', 'canteen');
const sportsIcon = createCustomIcon('#10b981', 'sports');
const fromIcon = createDirectionIcon('#22c55e', 'from');
const toIcon = createDirectionIcon('#ef4444', 'to');

const createHumanAvatarIcon = (stepNum: number) => {
  const svg = `
    <div style="position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center;">
      <div style="position:absolute; width:44px; height:44px; border-radius:50%; background:rgba(56,189,248,0.35); border:2px solid #38bdf8;"></div>
      <div style="position:relative; width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, #0284c7, #2563eb); border:2px solid #ffffff; box-shadow:0 0 20px rgba(56,189,248,0.9); display:flex; align-items:center; justify-content:center; font-size:18px;">
        🚶
      </div>
      <div style="position:absolute; top:-20px; background:#0f172a; border:1px solid #38bdf8; color:#38bdf8; font-size:9px; font-weight:bold; font-family:monospace; padding:1px 5px; border-radius:8px; white-space:nowrap; box-shadow:0 2px 8px rgba(0,0,0,0.6);">
        STEP ${stepNum}
      </div>
    </div>
  `;
  return L.divIcon({
    className: 'custom-human-avatar-marker',
    html: svg,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
};

function MapEventsHandler({ onSelectCoords }: { onSelectCoords: (coords: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onSelectCoords([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.flyTo(center, 18.5, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

function HumanAvatarRecenter({ coords }: { coords?: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map && coords) {
      map.flyTo(coords, 18.5, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

function MapResizer({ isCollapsed, directionsActive, heightPercent }: { isCollapsed?: boolean; directionsActive?: boolean; heightPercent?: number }) {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (map) map.invalidateSize({ animate: true });
      } catch (_) {}
    }, 100);
    return () => clearTimeout(timer);
  }, [isCollapsed, directionsActive, heightPercent, map]);
  return null;
}

// Animated dashed polyline (CSS dashOffset animation)
function AnimatedRoute({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || positions.length < 2) return;

    // Fly map to fit the route
    const bounds = L.latLngBounds(positions);
    map.flyToBounds(bounds, { padding: [60, 60], duration: 1.5, maxZoom: 18 });

    // Inject CSS animation for dash offset if not already present
    const styleId = 'dishaa-route-animation';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes dashMove {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0;  }
        }
        .animated-route path {
          animation: dashMove 0.8s linear infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, [positions, map]);

  if (positions.length < 2) return null;

  return (
    <>
      {/* Shadow/glow underline */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#60a5fa',
          weight: 12,
          opacity: 0.18,
        }}
      />
      {/* Main animated dashed route line */}
      <Polyline
        positions={positions}
        className="animated-route"
        pathOptions={{
          color: '#38bdf8',
          weight: 5,
          opacity: 1,
          dashArray: '14 8',
        }}
      />
      {/* Bright center line */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#ffffff',
          weight: 2,
          opacity: 0.55,
        }}
      />
    </>
  );
}

const campusBounds: L.LatLngBoundsExpression = [
  [21.1200, 78.9970],
  [21.1290, 79.0090],
];

interface CampusMapProps {
  isChatCollapsed?: boolean;
  directions?: DirectionsState;
  pickingFor?: 'from' | 'to' | null;
  onSelectLocation?: (loc: (typeof campusLocations)[0]) => void;
  onDirectionsChange?: (state: DirectionsState) => void;
}

export default function CampusMap({ isChatCollapsed, directions, pickingFor, onSelectLocation, onDirectionsChange }: CampusMapProps) {
  const defaultCenter: [number, number] = [21.1245, 79.0030];
  const defaultZoom = 17.5;
  const [selectedCenter, setSelectedCenter] = useState<[number, number]>(defaultCenter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('block');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapHeightPercent, setMapHeightPercent] = useState(50); // Default 50%
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const percent = (offsetY / rect.height) * 100;
    const clamped = Math.max(20, Math.min(80, percent));
    setMapHeightPercent(clamped);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetY = e.touches[0].clientY - rect.top;
    const percent = (offsetY / rect.height) * 100;
    const clamped = Math.max(20, Math.min(80, percent));
    setMapHeightPercent(clamped);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const isDirectionsActive = !!directions?.isActive;
  const activeMilestone = isDirectionsActive
    ? directions?.milestones?.[directions?.currentStepIndex || 0]
    : null;

  const suggestions = campusLocations.filter((loc) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.categoryLabel.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q)
    );
  });

  const filteredLocations = campusLocations.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || loc.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (loc: typeof campusLocations[0]) => {
    setSearchQuery(loc.name);
    setSelectedCenter(loc.coords);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col">

      {/* Map Control Header Bar */}
      <div className="relative z-20 p-2.5 sm:p-3 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2.5">

        {/* Google/Apple-Style Search Input Bar with Autocomplete Dropdown */}
        <div ref={searchRef} className="relative flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setShowSuggestions(true);
              }}
              placeholder="Search campus blocks, canteen, hostel..."
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800">
                Suggested Campus Locations ({suggestions.length})
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-zinc-800">
                {suggestions.map((item) => {
                  let Icon = Building;
                  if (item.type === 'amenity') Icon = Coffee;
                  if (item.type === 'sports') Icon = Trophy;

                  return (
                    <li
                      key={item.id}
                      onClick={() => handleSelectSuggestion(item)}
                      className="px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-zinc-800/80 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-blue-600">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">
                              {item.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-500 font-mono">
                              {item.categoryLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <Navigation className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'block', label: 'Blocks' },
            { id: 'amenity', label: 'Services' },
            { id: 'canteen', label: 'Canteens' },
            { id: 'sports', label: 'Sports' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split: Map (top mapHeightPercent%) + Directions Image placeholder (lower 100 - mapHeightPercent%) */}
      <div ref={containerRef} className="relative flex-1 w-full flex flex-col z-0 min-h-0 select-none">

        {/* Leaflet Map Canvas */}
        <div
          style={isDirectionsActive ? { height: `${mapHeightPercent}%` } : { height: '100%' }}
          className="relative w-full transition-all duration-150 overflow-hidden"
        >
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            minZoom={16.5}
            maxZoom={19}
            maxBounds={campusBounds}
            maxBoundsViscosity={1.0}
            zoomControl={false}
            className="w-full h-full"
            style={{ background: '#f8fafc' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxNativeZoom={19}
              maxZoom={19}
            />

            <MapEventsHandler
              onSelectCoords={(coords) => {
                if (pickingFor) {
                  const tempLoc: CampusLocation = {
                    id: `custom-${Date.now()}`,
                    name: `Selected Point (${coords[0].toFixed(5)}, ${coords[1].toFixed(5)})`,
                    type: 'amenity',
                    categoryLabel: 'Custom Location',
                    description: 'Custom coordinates picked directly on campus map',
                    coords,
                    image: '/college-front.jpg',
                  };
                  onSelectLocation?.(tempLoc);
                }
              }}
            />

            <MapRecenter center={selectedCenter} />
            <MapResizer isCollapsed={isChatCollapsed} directionsActive={isDirectionsActive} heightPercent={mapHeightPercent} />

            {/* Render Route Polylines */}
            {isDirectionsActive && directions?.routePath && directions.routePath.length > 0 && (
              <>
                <Polyline
                  positions={directions.routePath}
                  pathOptions={{ color: '#0284c7', weight: 8, opacity: 0.6 }}
                />
                <Polyline
                  positions={directions.routePath}
                  pathOptions={{ color: '#38bdf8', weight: 4, opacity: 0.95, dashArray: '8, 12' }}
                />
              </>
            )}

            {/* Render Human Moving Avatar */}
            {isDirectionsActive && activeMilestone?.coords && (
              <Marker
                position={activeMilestone.coords}
                icon={createHumanAvatarIcon((directions?.currentStepIndex || 0) + 1)}
                zIndexOffset={1000}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-1 text-slate-900 font-sans text-xs">
                    <p className="font-bold text-blue-600">🚶 You are here</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{activeMilestone.instruction}</p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Render Campus Location Markers */}
            {filteredLocations.map((loc) => {
              const isFrom = directions?.from?.id === loc.id;
              const isTo = directions?.to?.id === loc.id;

              const markerIcon = isFrom
                ? fromIcon
                : isTo
                ? toIcon
                : loc.type === 'amenity'
                ? amenityIcon
                : loc.type === 'canteen'
                ? canteenIcon
                : loc.type === 'sports'
                ? sportsIcon
                : blockIcon;

              return (
                <Marker
                  key={loc.id}
                  position={loc.coords}
                  icon={markerIcon}
                  eventHandlers={{
                    click: () => {
                      if (pickingFor) {
                        onSelectLocation?.(loc);
                      } else {
                        setSelectedCenter(loc.coords);
                      }
                    },
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 max-w-xs text-slate-950 font-sans">
                      <div className="relative w-full h-28 rounded-lg overflow-hidden mb-2 bg-slate-200">
                        <Image src={loc.image} alt={loc.name} fill sizes="300px" className="object-cover" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{loc.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{loc.description}</p>
                      {pickingFor ? (
                        <button
                          onClick={() => onSelectLocation?.(loc)}
                          className="mt-3 w-full py-2 px-3 rounded-md bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Crosshair className="w-4 h-4" />
                          <span>Select as {pickingFor === 'from' ? 'Start Point' : 'Destination'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedCenter(loc.coords)}
                          className="mt-3 w-full py-1.5 px-3 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Focus Location</span>
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-zinc-900/95 px-3 py-2 rounded-xl text-[11px] text-slate-700 dark:text-zinc-300 space-y-1 border border-slate-200 dark:border-zinc-800 shadow-sm hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Academic Blocks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>Amenities & Cafés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Sports & Hostels</span>
            </div>
          </div>
        </div>

        {/* Draggable Resizable Split Handle */}
        {isDirectionsActive && (
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="w-full h-2.5 bg-slate-900 border-y border-white/10 flex items-center justify-center cursor-row-resize hover:bg-slate-800 transition-colors z-30 shrink-0 group select-none shadow-sm"
            title="Drag up/down to adjust Map and Image window sizes"
          >
            <div className="w-10 h-1 rounded-full bg-slate-500 group-hover:bg-slate-300 transition-colors" />
          </div>
        )}

        {/* Lower Resizable Image Window */}
        {isDirectionsActive && (
          <div
            style={{ height: `calc(${100 - mapHeightPercent}% - 10px)` }}
            className="w-full relative overflow-hidden bg-slate-900/90 flex flex-col justify-between p-3.5"
          >
            <div className="absolute inset-0">
              <Image
                key={activeMilestone?.image || 'step-img'}
                src={activeMilestone?.image || directions?.from?.image || '/college-front.jpg'}
                alt={activeMilestone?.title || 'Campus Scene'}
                fill
                sizes="600px"
                className="object-cover opacity-60 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-slate-900/90 border border-white/15 text-slate-200 font-medium text-xs shadow-sm">
                Step {(directions?.currentStepIndex || 0) + 1} of {directions?.milestones?.length || 1}
              </span>
            </div>

            {/* Bottom Info & Next Step Button */}
            <div className="relative z-10 space-y-2">
              <div className="bg-slate-900/90 border border-white/10 p-3 rounded-xl">
                <h5 className="font-semibold text-xs sm:text-sm text-white">
                  {activeMilestone?.title || 'Campus Navigation'}
                </h5>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {activeMilestone?.instruction}
                </p>
              </div>

              {/* Bottom Center Next Step Button */}
              <div className="flex justify-center pt-1">
                <button
                  onClick={() => {
                    if (!directions?.milestones || directions.milestones.length === 0) return;
                    const nextIdx = ((directions.currentStepIndex || 0) + 1) % directions.milestones.length;
                    onDirectionsChange?.({ ...directions, currentStepIndex: nextIdx });
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition-colors flex items-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
