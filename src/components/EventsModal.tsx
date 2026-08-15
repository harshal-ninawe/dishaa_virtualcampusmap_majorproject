'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Tag, Users, Clock, DollarSign, Sparkles, X, Filter, ChevronRight, Award } from 'lucide-react';

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInline?: boolean;
}

export interface CampusEvent {
  _id?: string;
  title: string;
  type: string;
  organizingDept: string;
  startDate: string;
  endDate: string;
  entryFee: string;
  locationType: 'indoor' | 'outdoor';
  locationDetails: string;
  description: string;
  hostedBy?: {
    name: string;
    department?: string;
    email?: string;
  };
}

export default function EventsModal({ isOpen, onClose, isInline = false }: EventsModalProps) {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  const categories = [
    'all',
    'Technical',
    'Non-Technical',
    'Sports',
    'Cultural',
    'Workshop',
    'Seminar',
  ];

  useEffect(() => {
    if (isOpen) {
      fetchEvents();
    }
  }, [isOpen]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.success && data.data) {
        setEvents(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch campus events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((ev) => {
    if (selectedType === 'all') return true;
    return ev.type.toLowerCase() === selectedType.toLowerCase();
  });

  if (!isOpen) return null;

  const content = (
    <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="p-3.5 px-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">
              Campus Events & Activities
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">Active workshops, fests & seminars</p>
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

      {/* Filter Pills */}
      <div className="px-3 py-2 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 overflow-x-auto flex items-center gap-1.5 shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedType(cat)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              selectedType === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100'
            }`}
          >
            {cat === 'all' ? 'All Events' : cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="p-3.5 overflow-y-auto flex-1 min-h-0 space-y-3 bg-slate-50/50 dark:bg-zinc-950/40">
        {loading ? (
          <div className="py-12 text-center space-y-2 text-blue-600">
            <Sparkles className="w-6 h-6 animate-spin mx-auto text-blue-600" />
            <p className="text-xs font-mono">Fetching active campus events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-12 text-center space-y-2 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 p-4">
            <Award className="w-8 h-8 mx-auto text-slate-400" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100">No Active Events Found</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              There are currently no events listed under this category.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event, idx) => (
              <div
                key={event._id || idx}
                className="p-3.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-zinc-700 border border-blue-200 dark:border-zinc-600 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase">
                    {event.type}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-zinc-700 border border-emerald-200 dark:border-zinc-600 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                    🎟️ {event.entryFee}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100 leading-snug">
                  {event.title}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{event.locationDetails}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-700/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Org: {event.organizingDept}</span>
                  <span className="font-mono text-[10px]">{event.startDate}</span>
                </div>
              </div>
            ))}
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
          className="relative w-full max-w-2xl h-[85vh] z-10"
        >
          {content}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
