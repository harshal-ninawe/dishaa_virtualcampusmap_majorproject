'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Layers, X, Map, Compass, ChevronDown, Check, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface InsideBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInline?: boolean;
}

// Backend-ready Floor Map Link Registry
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

export default function InsideBlockModal({ isOpen, onClose, isInline = false }: InsideBlockModalProps) {
  const [selectedBlock, setSelectedBlock] = useState<'BLOCK A' | 'BLOCK B' | 'BLOCK C'>('BLOCK A');
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [activeMapUrl, setActiveMapUrl] = useState<string | null>('/college-front.jpg');

  const blocks = ['BLOCK A', 'BLOCK B', 'BLOCK C'] as const;
  const floors = [
    { value: 0, label: '0 (Ground)' },
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

  const content = (
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
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">Select Block & Floor for Indoor Map</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Hide Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4 overflow-y-auto min-h-0 flex-1 bg-slate-50/50 dark:bg-zinc-950/40">
        
        {/* 1. Select Block */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>1. Select Building Block</span>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {blocks.map((block) => {
              const isSelected = selectedBlock === block;
              return (
                <button
                  key={block}
                  type="button"
                  onClick={() => {
                    setSelectedBlock(block);
                    const mapUrl = indoorFloorMapLinks[block]?.[selectedFloor] || '/college-front.jpg';
                    setActiveMapUrl(mapUrl);
                  }}
                  className={`py-2 px-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>{block}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Select Floor */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>2. Select Floor</span>
          </label>

          <div className="grid grid-cols-5 gap-1.5">
            {floors.map((fl) => {
              const isSelected = selectedFloor === fl.value;
              return (
                <button
                  key={fl.value}
                  type="button"
                  onClick={() => {
                    setSelectedFloor(fl.value);
                    const mapUrl = indoorFloorMapLinks[selectedBlock]?.[fl.value] || '/college-front.jpg';
                    setActiveMapUrl(mapUrl);
                  }}
                  className={`py-2 px-1.5 rounded-xl font-semibold text-xs transition-all flex flex-col items-center justify-center border cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-mono font-extrabold">{fl.value}</span>
                  <span className="text-[9px] opacity-90 truncate max-w-full">
                    {fl.value === 0 ? 'Gnd' : `Fl ${fl.value}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Indoor Map Display Viewer */}
        {activeMapUrl && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                {selectedBlock} &bull; Floor {selectedFloor} Plan
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" />
                Active Map
              </span>
            </div>

            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-200 shadow-inner">
              <Image
                src={activeMapUrl}
                alt={`${selectedBlock} Floor ${selectedFloor}`}
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>

            {/* Room Directory on selected floor */}
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider block font-mono">
                Rooms & Facilities on Floor {selectedFloor}:
              </span>
              <ul className="text-xs text-slate-600 dark:text-zinc-400 space-y-1">
                <li>• Classroom {selectedBlock.slice(-1)}{selectedFloor}01 & {selectedBlock.slice(-1)}{selectedFloor}02</li>
                <li>• Department HOD Office & Faculty Room</li>
                <li>• Computer Laboratory {selectedFloor + 1}</li>
                <li>• Restrooms & Water Dispenser</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );

  if (isInline) {
    return content;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl h-[85vh] z-10"
        >
          {content}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
