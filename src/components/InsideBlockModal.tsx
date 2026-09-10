'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Layers, X, Compass, ArrowLeft, AlertTriangle, Sparkles, Check, ChevronRight } from 'lucide-react';

interface InsideBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInline?: boolean;
  initialBlock?: 'BLOCK A' | 'BLOCK B' | 'BLOCK C';
  initialFloor?: number;
}

export default function InsideBlockModal({
  isOpen,
  onClose,
  isInline = false,
  initialBlock,
  initialFloor,
}: InsideBlockModalProps) {
  const [selectedBlock, setSelectedBlock] = useState<'BLOCK A' | 'BLOCK B' | 'BLOCK C'>('BLOCK A');
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [showFullscreenViewer, setShowFullscreenViewer] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialBlock) {
      setSelectedBlock(initialBlock);
    }
    if (initialFloor !== undefined) {
      setSelectedFloor(initialFloor);
    }
  }, [initialBlock, initialFloor]);

  const blocks = ['BLOCK A', 'BLOCK B', 'BLOCK C'] as const;

  // Available floors per block configuration
  const blockFloorsConfig: Record<string, { value: number; label: string }[]> = {
    'BLOCK A': [{ value: 0, label: '0 (Ground Floor)' }],
    'BLOCK B': [
      { value: 1, label: '1 (1st Floor)' },
      { value: 2, label: '2 (2nd Floor)' },
      { value: 3, label: '3 (3rd Floor)' },
      { value: 4, label: '4 (4th Floor)' },
    ],
    'BLOCK C': [{ value: 0, label: '0 (Ground Floor)' }],
  };

  const availableFloors = blockFloorsConfig[selectedBlock] || [];

  const checkIsFloorReady = (block: string, floorNum: number): boolean => {
    if (block === 'BLOCK A') return floorNum === 0;
    if (block === 'BLOCK B') return [1, 2, 3, 4].includes(floorNum);
    if (block === 'BLOCK C') return floorNum === 0;
    return false;
  };

  const isFloorReady = checkIsFloorReady(selectedBlock, selectedFloor);
  const blockCode = selectedBlock.replace('BLOCK ', '');
  const indoorViewerUrl = `/indoor-viewer/index.html?block=${blockCode}&floor=${selectedFloor}`;

  const handleSelectBlock = (block: 'BLOCK A' | 'BLOCK B' | 'BLOCK C') => {
    setSelectedBlock(block);
    let defaultFloor = 0;
    if (block === 'BLOCK B') defaultFloor = 1;
    setSelectedFloor(defaultFloor);
    setShowFullscreenViewer(true);
  };

  const handleSelectFloor = (floorNum: number) => {
    setSelectedFloor(floorNum);
    if (checkIsFloorReady(selectedBlock, floorNum)) {
      setShowFullscreenViewer(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── 1. SELECTOR PANEL (Inside Block feature panel) ─────────────────────────── */}
      <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
        {/* Header Bar */}
        <div className="p-3.5 px-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">
                Inside Block Navigation
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
                Unified 3D & 2D spatial maps for Block A, B, and C
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Close Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 space-y-4 overflow-y-auto min-h-0 flex-1 bg-slate-50/50 dark:bg-zinc-950/40">
          
          {/* OPTION 1: Select Building Block */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Select Building Block</span>
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold lowercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                all blocks active
              </span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {blocks.map((block) => {
                const isSelected = selectedBlock === block;
                return (
                  <button
                    key={block}
                    type="button"
                    onClick={() => handleSelectBlock(block)}
                    className={`py-2.5 px-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 border cursor-pointer relative ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700/60'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>{block}</span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" title="3D Navigation Available"></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* OPTION 2: Select Floor */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>2. Select Floor for {selectedBlock}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {availableFloors.length} floor{availableFloors.length !== 1 ? 's' : ''} available
              </span>
            </label>

            <div className="grid grid-cols-4 gap-1.5">
              {availableFloors.map((fl) => {
                const isSelected = selectedFloor === fl.value;
                const isReady = checkIsFloorReady(selectedBlock, fl.value);
                return (
                  <button
                    key={fl.value}
                    type="button"
                    onClick={() => handleSelectFloor(fl.value)}
                    className={`py-2 px-1.5 rounded-xl font-semibold text-xs transition-all flex flex-col items-center justify-center border cursor-pointer relative ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700/60'
                    }`}
                  >
                    <span className="text-xs font-mono font-extrabold flex items-center gap-0.5">
                      {fl.value === 0 ? '0F' : `${fl.value}F`}
                      {isReady && !isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      )}
                    </span>
                    <span className="text-[9px] opacity-90 truncate max-w-full">
                      {fl.value === 0 ? 'Ground' : `Floor ${fl.value}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STATUS & ACTION AREA */}
          {isFloorReady ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3D/2D Spatial Map is Active</span>
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono font-bold bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                  {selectedBlock} &bull; {selectedFloor === 0 ? 'Ground' : `Floor ${selectedFloor}`}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                Turn-by-turn indoor routing, classroom/lab search, and 3D architectural views ready for {selectedBlock}.
              </p>
              <button
                type="button"
                onClick={() => setShowFullscreenViewer(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Open Fullscreen Indoor Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                      {selectedBlock} &bull; Floor {selectedFloor}
                    </h4>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900 text-amber-800 dark:text-amber-300 uppercase">
                      Under Construction
                    </span>
                  </div>
                  <p className="text-xs text-amber-800/90 dark:text-amber-300/80 mt-1 leading-relaxed">
                    The 3D indoor map for {selectedBlock} Floor {selectedFloor} is currently under construction.
                  </p>
                </div>
              </div>
            </div>
          )}



        </div>
      </div>

      {/* ── 2. INSTANT FULLSCREEN 3D/2D INDOOR VIEWER ─────────────────────────────── */}
      {showFullscreenViewer && isFloorReady && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-slate-950 flex flex-col overflow-hidden">
          {/* Top Navigation Bar of Fullscreen View */}
          <div className="h-12 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-3 sm:px-4 flex items-center justify-between shrink-0 z-20">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFullscreenViewer(false)}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                title="Return to Block Selection"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Block Selection</span>
              </button>

              <div className="h-4 w-px bg-slate-300 dark:bg-zinc-700"></div>

              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                {selectedBlock} &bull; {selectedFloor === 0 ? 'Ground Floor (0F)' : `Floor ${selectedFloor} (${selectedFloor}F)`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setShowFullscreenViewer(false);
                  onClose();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Close Map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded Fullscreen 3D/2D Viewer iframe */}
          <div className="flex-1 w-full h-full relative bg-slate-900">
            <iframe
              key={`fullscreen-viewer-${selectedBlock}-${selectedFloor}`}
              src={indoorViewerUrl}
              title={`Indoor Map ${selectedBlock} Floor ${selectedFloor}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
        </div>
      )}
    </>
  );
}
