'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Layers, X, Map, Compass, ChevronDown, Check, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface InsideBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Backend-ready Floor Map Link Registry
// You can replace these placeholder image paths with your exact backend URLs or images!
export const indoorFloorMapLinks: Record<string, Record<number, string>> = {
  'BLOCK A': {
    0: '/college-front.jpg',
    1: '/college-front.jpg',
    2: '/college-front.jpg',
    3: '/college-front.jpg',
    4: '/college-front.jpg',
  },
  'BLOCK B': {
    0: '/CLG.jpeg',
    1: '/CLG.jpeg',
    2: '/CLG.jpeg',
    3: '/CLG.jpeg',
    4: '/CLG.jpeg',
  },
  'BLOCK C': {
    0: '/college-bg.jpg',
    1: '/college-bg.jpg',
    2: '/college-bg.jpg',
    3: '/college-bg.jpg',
    4: '/college-bg.jpg',
  },
};

export default function InsideBlockModal({ isOpen, onClose }: InsideBlockModalProps) {
  const [selectedBlock, setSelectedBlock] = useState<'BLOCK A' | 'BLOCK B' | 'BLOCK C'>('BLOCK A');
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [activeMapUrl, setActiveMapUrl] = useState<string | null>(null);

  const blocks = ['BLOCK A', 'BLOCK B', 'BLOCK C'] as const;
  const floors = [
    { value: 0, label: '0 (Ground Floor)' },
    { value: 1, label: '1 (1st Floor)' },
    { value: 2, label: '2 (2nd Floor)' },
    { value: 3, label: '3 (3rd Floor)' },
    { value: 4, label: '4 (4th Floor)' },
  ];

  const handleGetMap = () => {
    const mapUrl = indoorFloorMapLinks[selectedBlock]?.[selectedFloor] || '/college-front.jpg';
    setActiveMapUrl(mapUrl);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(56,189,248,0.3)] bg-slate-900/95 overflow-hidden flex flex-col max-h-[90vh] z-10"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-white tracking-wide">
                  Inside Block Navigation
                </h3>
                <p className="text-xs text-cyan-400 font-mono">Select Block & Floor for Indoor Map</p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              title="Close Inside Block"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Selection Section */}
          <div className="p-4 sm:p-6 space-y-5 overflow-y-auto min-h-0">
            
            {/* 1. Select Block Dropdown Pane */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>1. Select Block</span>
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {blocks.map((block) => {
                  const isSelected = selectedBlock === block;
                  return (
                    <button
                      key={block}
                      type="button"
                      onClick={() => {
                        setSelectedBlock(block);
                        setActiveMapUrl(null); // Reset preview on block change
                      }}
                      className={`py-3 px-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-[0_0_18px_rgba(56,189,248,0.6)] scale-[1.02]'
                          : 'bg-slate-800/80 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>{block}</span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Floor Options (0, 1, 2, 3, 4) */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>2. Select Floor</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {floors.map((fl) => {
                  const isSelected = selectedFloor === fl.value;
                  return (
                    <button
                      key={fl.value}
                      type="button"
                      onClick={() => {
                        setSelectedFloor(fl.value);
                        setActiveMapUrl(null); // Reset preview on floor change
                      }}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center border cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 border-emerald-300 font-extrabold shadow-[0_0_15px_rgba(52,211,153,0.6)] scale-[1.03]'
                          : 'bg-slate-800/60 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm font-mono font-extrabold">{fl.value}</span>
                      <span className="text-[10px] opacity-80 whitespace-nowrap">
                        {fl.value === 0 ? 'Ground' : `Floor ${fl.value}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Get Map Action Button */}
            <button
              onClick={handleGetMap}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(56,189,248,0.7)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-white/20"
            >
              <Map className="w-5 h-5 text-white" />
              <span>Get Map ({selectedBlock} - Floor {selectedFloor})</span>
            </button>

            {/* Indoor Map Display Viewer (Backend Link Render Area) */}
            {activeMapUrl && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 pt-2"
              >
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    INDOOR MAP: {selectedBlock} &bull; FLOOR {selectedFloor}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-white/10">
                    Backend Link Ready
                  </span>
                </div>

                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-cyan-400/40 shadow-2xl bg-slate-950 flex items-center justify-center">
                  <Image
                    src={activeMapUrl}
                    alt={`${selectedBlock} Floor ${selectedFloor} Map`}
                    fill
                    sizes="700px"
                    className="object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-300">
                      📍 {selectedBlock} - Floor {selectedFloor} Indoor Layout
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Link ID: {selectedBlock.replace(' ', '_')}_F{selectedFloor}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
