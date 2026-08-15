'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, MapPin, Mail, Building, Layers, Sparkles, X, Phone, Compass } from 'lucide-react';

interface FacultyMember {
  _id?: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone?: string;
  sittingLocation?: {
    block: string;
    floor: number;
    roomNo: string;
  };
}

const mockFacultyData: FacultyMember[] = [
  {
    _id: 'f1',
    name: 'Dr. A. K. Sharma',
    designation: 'HOD & Senior Professor',
    department: 'Computer Science & Engineering',
    email: 'hod.cse@ghrcem.edu.in',
    phone: '+91 98765 43210',
    sittingLocation: { block: 'BLOCK C', floor: 3, roomNo: 'C-301' },
  },
  {
    _id: 'f2',
    name: 'Prof. Rajesh Verma',
    designation: 'Assistant Professor',
    department: 'Artificial Intelligence & Data Science',
    email: 'rajesh.verma@ghrcem.edu.in',
    phone: '+91 98765 43211',
    sittingLocation: { block: 'BLOCK A', floor: 2, roomNo: 'A-204' },
  },
  {
    _id: 'f3',
    name: 'Dr. Sunita Deshmukh',
    designation: 'Associate Professor',
    department: 'Information Technology',
    email: 'sunita.d@ghrcem.edu.in',
    phone: '+91 98765 43212',
    sittingLocation: { block: 'BLOCK B', floor: 1, roomNo: 'B-108' },
  },
  {
    _id: 'f4',
    name: 'Prof. Manoj Kulkarni',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'manoj.k@ghrcem.edu.in',
    phone: '+91 98765 43213',
    sittingLocation: { block: 'BLOCK C', floor: 0, roomNo: 'C-005' },
  },
  {
    _id: 'f5',
    name: 'Dr. Priya Nair',
    designation: 'Professor',
    department: 'Electronics & Telecommunication',
    email: 'priya.nair@ghrcem.edu.in',
    phone: '+91 98765 43214',
    sittingLocation: { block: 'BLOCK B', floor: 2, roomNo: 'B-210' },
  },
];

interface FacultyFinderPanelProps {
  onClose: () => void;
  onSelectFacultyLocation?: (block: string, floor: number) => void;
}

export default function FacultyFinderPanel({ onClose, onSelectFacultyLocation }: FacultyFinderPanelProps) {
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(mockFacultyData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const departments = [
    'all',
    'Computer Science & Engineering',
    'Artificial Intelligence & Data Science',
    'Information Technology',
    'Mechanical Engineering',
    'Electronics & Telecommunication',
  ];

  useEffect(() => {
    fetchFacultyFromApi();
  }, []);

  const fetchFacultyFromApi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faculty');
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setFacultyList(data.data);
      }
    } catch (err) {
      console.log('Using default faculty directory');
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = facultyList.filter((fac) => {
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (fac.sittingLocation?.roomNo || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'all' || fac.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="p-3.5 px-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">
              Faculty & Cabin Finder
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">Search professors, cabins & emails</p>
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

      {/* Search Input Bar */}
      <div className="p-3 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search professor name, dept, cabin room..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        {/* Dept Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          {departments.map((dept) => {
            const label = dept === 'all' ? 'All Depts' : dept.split('&')[0].trim();
            const isSelected = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Faculty List Container */}
      <div className="p-3.5 overflow-y-auto flex-1 min-h-0 space-y-2.5 bg-slate-50/50 dark:bg-zinc-950/40">
        {loading ? (
          <div className="py-12 text-center text-blue-600 space-y-2">
            <Sparkles className="w-5 h-5 animate-spin mx-auto text-blue-600" />
            <p className="text-xs font-mono">Loading Faculty Directory...</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 p-4">
            <Users className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">No Professors Found</p>
            <p className="text-[11px] text-slate-500 mt-1">Try adjusting your search query or department filter.</p>
          </div>
        ) : (
          filteredFaculty.map((fac) => (
            <div
              key={fac._id || fac.name}
              className="p-3.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 space-y-2 shadow-2xs hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">
                    {fac.name}
                  </h4>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                    {fac.designation}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 font-mono text-[10px]">
                  {fac.department.split(' ')[0]}
                </span>
              </div>

              {/* Cabin Location Badge */}
              {fac.sittingLocation && (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300 font-mono">
                    <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>
                      {fac.sittingLocation.block} &bull; Fl {fac.sittingLocation.floor} &bull; Room {fac.sittingLocation.roomNo}
                    </span>
                  </div>

                  {onSelectFacultyLocation && (
                    <button
                      onClick={() => onSelectFacultyLocation(fac.sittingLocation!.block, fac.sittingLocation!.floor)}
                      className="px-2 py-0.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Compass className="w-3 h-3" />
                      <span>View Map</span>
                    </button>
                  )}
                </div>
              )}

              {/* Email Contact */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{fac.email}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
