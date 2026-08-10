'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Tag, Users, Clock, DollarSign, Sparkles, X, Filter, ChevronRight, Award } from 'lucide-react';

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function EventsModal({ isOpen, onClose }: EventsModalProps) {
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
        
        {/* Backdrop overlay */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl border border-white/20 shadow-[0_0_60px_rgba(56,189,248,0.35)] bg-slate-900/95 overflow-hidden flex flex-col max-h-[90vh] z-10"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/90 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                <Calendar className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-white tracking-wide">
                  Campus Events & Activities
                </h3>
                <p className="text-xs text-emerald-400 font-mono">
                  Live Active Events (Auto-exits after End Date)
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              title="Close Events"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="px-4 py-3 border-b border-white/10 bg-slate-950/60 overflow-x-auto flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedType === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat === 'all' ? 'All Events' : cat}
              </button>
            ))}
          </div>

          {/* Event Cards Container */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-4">
            
            {loading ? (
              <div className="py-16 text-center space-y-3 text-cyan-400">
                <Sparkles className="w-8 h-8 animate-spin mx-auto text-cyan-400" />
                <p className="text-xs font-mono">Fetching active campus events from MongoDB Atlas...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="py-16 text-center space-y-3 glass-card rounded-3xl border border-white/10 p-6">
                <Award className="w-10 h-10 mx-auto text-slate-500" />
                <h4 className="font-extrabold text-base text-white">No Active Events Found</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  There are currently no active events in this category. Faculty members can host new campus events directly from the Admin Portal!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map((event, idx) => (
                  <motion.div
                    key={event._id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-4 rounded-2xl glass-card border border-white/15 bg-slate-950/80 hover:border-cyan-400/50 transition-all space-y-3 flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-2.5">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-extrabold uppercase tracking-wider">
                          {event.type}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold">
                          🎟️ {event.entryFee}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {event.title}
                      </h4>

                      {/* Event Location */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{event.locationDetails}</span>
                      </div>

                      {/* Event Dates */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{event.startDate} &bull; {event.endDate}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-1">
                        {event.description}
                      </p>
                    </div>

                    {/* Host & Department Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Organized by: <strong className="text-cyan-300">{event.organizingDept}</strong></span>
                      {event.hostedBy?.name && (
                        <span className="text-slate-300">By {event.hostedBy.name}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
