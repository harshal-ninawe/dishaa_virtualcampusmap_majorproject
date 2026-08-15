'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, User, Building, Layers, MapPin, Mail, Phone, Lock, Eye, EyeOff,
  CheckCircle2, X, Sparkles, ArrowRight, LogOut, Check, Save, Database, AlertCircle, Settings, LogIn, UserPlus,
  Search, Calendar, PlusCircle, Tag, DollarSign, Trophy, Megaphone, Trash2, ListFilter
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInline?: boolean;
}

export default function AdminPortalModal({ isOpen, onClose, isInline = false }: AdminPortalModalProps) {
  // Main Portal Role State: 'faculty' | 'admin'
  const [selectedRole, setSelectedRole] = useState<'faculty' | 'admin'>('faculty');

  // Faculty Sub-Mode: 'login' | 'register'
  const [facultySubMode, setFacultySubMode] = useState<'login' | 'register'>('login');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{
    role: 'faculty' | 'admin';
    name: string;
    department?: string;
    location?: string;
    email?: string;
  } | null>(null);

  // Authenticated Dashboard Tab State: 'search-faculty' | 'host-event' | 'my-events' | 'my-profile'
  const [dashboardTab, setDashboardTab] = useState<'search-faculty' | 'host-event' | 'my-events' | 'my-profile'>('search-faculty');

  // Faculty Form Fields
  const [facultyName, setFacultyName] = useState('');
  const [facultyDesignation, setFacultyDesignation] = useState('Assistant Professor');
  const [facultyDept, setFacultyDept] = useState('Computer Science & Engineering');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [showFacultyPassword, setShowFacultyPassword] = useState(false);
  const [facultyPhone, setFacultyPhone] = useState('');
  const [facultyBlock, setFacultyBlock] = useState<'BLOCK A' | 'BLOCK B' | 'BLOCK C'>('BLOCK A');
  const [facultyFloor, setFacultyFloor] = useState<number>(0);
  const [facultyRoomNo, setFacultyRoomNo] = useState('');

  // Admin Form Fields
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Status & Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ── SEARCH FACULTY STATE ──────────────────────────────────────────────────
  const [searchFacultyQuery, setSearchFacultyQuery] = useState('');
  const [facultyResults, setFacultyResults] = useState<any[]>([]);
  const [isSearchingFaculty, setIsSearchingFaculty] = useState(false);

  // ── HOST EVENT FORM STATE ─────────────────────────────────────────────────
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Technical');
  const [eventDept, setEventDept] = useState('Computer Science & Engineering');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventEntryFee, setEventEntryFee] = useState('Free');
  const [eventLocType, setEventLocType] = useState<'indoor' | 'outdoor'>('outdoor');
  const [eventLocBlock, setEventLocBlock] = useState<'BLOCK A' | 'BLOCK B' | 'BLOCK C'>('BLOCK B');
  const [eventLocFloor, setEventLocFloor] = useState<number>(1);
  const [eventLocRoomNo, setEventLocRoomNo] = useState('');
  const [eventLocOutdoorText, setEventLocOutdoorText] = useState('College Turf');
  const [eventDescription, setEventDescription] = useState('');
  const [isHostingEvent, setIsHostingEvent] = useState(false);
  const [eventSuccessMsg, setEventSuccessMsg] = useState('');
  const [eventErrorMsg, setEventErrorMsg] = useState('');

  // ── MY HOSTED EVENTS STATE ────────────────────────────────────────────────
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [loadingMyEvents, setLoadingMyEvents] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const departments = [
    'Computer Science & Engineering',
    'Artificial Intelligence & Data Science',
    'Cybersecurity & Network Security',
    'Information Technology',
    'Electronics & Telecommunication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Basic Sciences & Humanities',
  ];

  const eventTypes = [
    'Technical',
    'Non-Technical',
    'Sports',
    'Cultural',
    'Workshop',
    'Seminar',
  ];

  // Fetch data when dashboard tab changes
  useEffect(() => {
    if (isAuthenticated) {
      if (dashboardTab === 'search-faculty') fetchFacultyList();
      if (dashboardTab === 'my-events') fetchMyEvents();
    }
  }, [isAuthenticated, dashboardTab]);

  const fetchFacultyList = async () => {
    setIsSearchingFaculty(true);
    try {
      const res = await fetch('/api/faculty');
      const data = await res.json();
      if (data.success && data.data) {
        setFacultyResults(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingFaculty(false);
    }
  };

  const fetchMyEvents = async () => {
    setLoadingMyEvents(true);
    try {
      const queryParam = loggedInUser?.email ? `?facultyEmail=${encodeURIComponent(loggedInUser.email)}` : '?includeExpired=true';
      const res = await fetch(`/api/events${queryParam}`);
      const data = await res.json();
      if (data.success && data.data) {
        setMyEvents(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch hosted events:', err);
    } finally {
      setLoadingMyEvents(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? It will be removed from MongoDB Atlas and the Events tab.')) {
      return;
    }

    setDeletingEventId(eventId);
    try {
      const res = await fetch(`/api/events?id=${eventId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMyEvents((prev) => prev.filter((ev) => ev._id !== eventId));
      } else {
        alert(data.error || 'Failed to delete event.');
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Network error deleting event.');
    } finally {
      setDeletingEventId(null);
    }
  };

  // Faculty Registration & Login Handler
  const handleFacultyAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (facultySubMode === 'login') {
        // Faculty Login
        if (!facultyEmail.trim() || !facultyPassword.trim()) {
          setErrorMessage('Please enter both Email and Password to log in.');
          setIsSubmitting(false);
          return;
        }

        const res = await fetch('/api/faculty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'login',
            email: facultyEmail,
            password: facultyPassword,
          }),
        });

        const data = await res.json();
        if (data.success && data.faculty) {
          const f = data.faculty;
          setSuccessMessage('✅ Login successful! Welcome back.');
          setIsAuthenticated(true);
          setLoggedInUser({
            role: 'faculty',
            name: f.name,
            department: f.department,
            location: f.sittingLocation
              ? `${f.sittingLocation.block} - Floor ${f.sittingLocation.floor} - ${f.sittingLocation.roomNo}`
              : 'Location Not Set',
            email: f.email,
          });
          setEventDept(f.department || 'Computer Science & Engineering');
        } else {
          setErrorMessage(data.error || 'Invalid Email or Password.');
        }
      } else {
        // Faculty Registration
        if (!facultyName.trim() || !facultyEmail.trim() || !facultyPassword.trim() || !facultyRoomNo.trim()) {
          setErrorMessage('Please fill in Name, Email, Password, Department, and Room Number.');
          setIsSubmitting(false);
          return;
        }

        const res = await fetch('/api/faculty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'register',
            name: facultyName,
            designation: facultyDesignation,
            department: facultyDept,
            email: facultyEmail,
            password: facultyPassword,
            phone: facultyPhone,
            block: facultyBlock,
            floor: facultyFloor,
            roomNo: facultyRoomNo,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setSuccessMessage('✅ Account registered & sitting location saved to MongoDB Atlas!');
          setIsAuthenticated(true);
          setLoggedInUser({
            role: 'faculty',
            name: facultyName,
            department: facultyDept,
            location: `${facultyBlock} - Floor ${facultyFloor} - ${facultyRoomNo}`,
            email: facultyEmail,
          });
          setEventDept(facultyDept);
        } else {
          setErrorMessage(data.error || 'Registration failed.');
        }
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : 'Network error connecting to MongoDB backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Host Event Handler
  const handleHostEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventStartDate || !eventEndDate || !eventDescription.trim()) {
      setEventErrorMsg('Please fill in Event Title, Start & End Dates, and Description.');
      return;
    }

    setIsHostingEvent(true);
    setEventSuccessMsg('');
    setEventErrorMsg('');

    const finalLocation = eventLocType === 'indoor'
      ? `${eventLocBlock} - Floor ${eventLocFloor} - ${eventLocRoomNo || 'Room 101'}`
      : eventLocOutdoorText;

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: eventTitle,
          type: eventType,
          organizingDept: eventDept,
          startDate: eventStartDate,
          endDate: eventEndDate,
          entryFee: eventEntryFee,
          locationType: eventLocType,
          locationDetails: finalLocation,
          description: eventDescription,
          hostedBy: {
            name: loggedInUser?.name || 'Faculty Member',
            department: loggedInUser?.department || eventDept,
            email: loggedInUser?.email || '',
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEventSuccessMsg('🎉 Event published live to MongoDB Atlas (`dishaadb.events`) & Home Events Tab!');
        setEventTitle('');
        setEventDescription('');
        fetchMyEvents(); // Refresh events list
      } else {
        setEventErrorMsg(data.error || 'Failed to publish event.');
      }
    } catch (err) {
      console.error(err);
      setEventErrorMsg('Network error publishing event.');
    } finally {
      setIsHostingEvent(false);
    }
  };

  // Administrator Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (
      (adminUsername === 'admin' || adminUsername === 'admin@dishaa.edu') &&
      adminPassword === 'admin123'
    ) {
      setIsAuthenticated(true);
      setLoggedInUser({
        role: 'admin',
        name: 'System Administrator',
        department: 'DISHAA System Core',
        location: 'Main Server Control Room',
      });
    } else {
      setAdminError('Invalid Admin credentials. Try: admin / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUser(null);
    setSuccessMessage('');
    setErrorMessage('');
    setAdminError('');
    setEventSuccessMsg('');
    setEventErrorMsg('');
  };

  const filteredFacultyList = facultyResults.filter((f) => {
    if (!searchFacultyQuery.trim()) return true;
    const q = searchFacultyQuery.toLowerCase();
    const locStr = f.sittingLocation ? `${f.sittingLocation.block} ${f.sittingLocation.floor} ${f.sittingLocation.roomNo}` : '';
    return (
      f.name?.toLowerCase().includes(q) ||
      f.department?.toLowerCase().includes(q) ||
      f.designation?.toLowerCase().includes(q) ||
      locStr.toLowerCase().includes(q)
    );
  });

  if (!isOpen) return null;

  const content = (
    <div className={`w-full flex flex-col bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs ${isInline ? 'h-full' : 'max-h-[92vh] max-w-4xl'}`}>
      {/* Top Modal Header */}
      <div className="p-3.5 px-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            {selectedRole === 'faculty' ? <Users className="w-4 h-4 text-white" /> : <Shield className="w-4 h-4 text-white" />}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">
              Admin & Faculty Portal
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
              {isAuthenticated
                ? `Logged in: ${loggedInUser?.name}`
                : 'Sign in to manage campus listings & events'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Close Portal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0 space-y-5 bg-slate-50/50 dark:bg-zinc-950/40">

            {/* ── NOT AUTHENTICATED: LOGIN / REGISTRATION MODE ────────────────────── */}
            {!isAuthenticated ? (
              <>
                {/* Main Role Selection Tabs (Faculty vs Administrator) */}
                <div className="p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => { setSelectedRole('faculty'); setErrorMessage(''); setAdminError(''); }}
                    className={`py-2.5 px-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      selectedRole === 'faculty'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>👨‍🏫 Faculty Portal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedRole('admin'); setErrorMessage(''); setAdminError(''); }}
                    className={`py-2.5 px-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>🛡️ Admin Portal</span>
                  </button>
                </div>

                {/* Notifications Alert */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 👨‍🏫 FACULTY PORTAL (LOGIN & REGISTER MODES) */}
                {selectedRole === 'faculty' && (
                  <div className="space-y-4">
                    
                    {/* Faculty Sub-Mode Switcher */}
                    <div className="flex items-center justify-center gap-2 border-b border-slate-200 dark:border-zinc-800 pb-3">
                      <button
                        type="button"
                        onClick={() => { setFacultySubMode('login'); setErrorMessage(''); }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          facultySubMode === 'login'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700'
                        }`}
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Sign In (Existing Faculty)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setFacultySubMode('register'); setErrorMessage(''); }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          facultySubMode === 'register'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700'
                        }`}
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Register New Account</span>
                      </button>
                    </div>

                    {/* MODE A: FACULTY LOGIN FORM */}
                    {facultySubMode === 'login' && (
                      <form onSubmit={handleFacultyAuth} className="space-y-3.5 max-w-md mx-auto py-1">
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-xs text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                          <Database className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Sign in with your registered Email & Password.</span>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                            Faculty Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={facultyEmail}
                              onChange={(e) => setFacultyEmail(e.target.value)}
                              placeholder="faculty@raisoni.net"
                              className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                            Password *
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type={showFacultyPassword ? 'text' : 'password'}
                              required
                              value={facultyPassword}
                              onChange={(e) => setFacultyPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full py-2 pl-9 pr-9 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => setShowFacultyPassword(!showFacultyPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                            >
                              {showFacultyPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Faculty Portal'}</span>
                        </button>

                        <div className="text-center pt-1">
                          <button
                            type="button"
                            onClick={() => { setFacultySubMode('register'); setErrorMessage(''); }}
                            className="text-xs text-blue-600 hover:underline font-medium"
                          >
                            New Faculty? Register Account & Sitting Location &rarr;
                          </button>
                        </div>
                      </form>
                    )}

                    {/* MODE B: FACULTY REGISTRATION FORM */}
                    {facultySubMode === 'register' && (
                      <form onSubmit={handleFacultyAuth} className="space-y-3.5">
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-zinc-800 border border-emerald-200 dark:border-zinc-700 text-xs text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Register your account & sitting location to MongoDB Atlas.</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                              Full Name *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="text"
                                required
                                value={facultyName}
                                onChange={(e) => setFacultyName(e.target.value)}
                                placeholder="e.g. Dr. A. K. Sharma"
                                className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                              Designation
                            </label>
                            <select
                              value={facultyDesignation}
                              onChange={(e) => setFacultyDesignation(e.target.value)}
                              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-blue-600"
                            >
                              <option value="Professor & HOD">Professor & HOD</option>
                              <option value="Professor">Professor</option>
                              <option value="Associate Professor">Associate Professor</option>
                              <option value="Assistant Professor">Assistant Professor</option>
                              <option value="Lab Incharge">Lab Incharge / Instructor</option>
                            </select>
                          </div>

                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                              Department *
                            </label>
                            <select
                              value={facultyDept}
                              onChange={(e) => setFacultyDept(e.target.value)}
                              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-blue-600"
                            >
                              {departments.map((d, i) => (
                                <option key={i} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="email"
                                required
                                value={facultyEmail}
                                onChange={(e) => setFacultyEmail(e.target.value)}
                                placeholder="faculty@raisoni.net"
                                className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                              Set Password *
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type={showFacultyPassword ? 'text' : 'password'}
                                required
                                value={facultyPassword}
                                onChange={(e) => setFacultyPassword(e.target.value)}
                                placeholder="Create password"
                                className="w-full py-2 pl-9 pr-9 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                              />
                              <button
                                type="button"
                                onClick={() => setShowFacultyPassword(!showFacultyPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                              >
                                {showFacultyPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                              Contact Phone
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="tel"
                                value={facultyPhone}
                                onChange={(e) => setFacultyPhone(e.target.value)}
                                placeholder="+91 98765 43210"
                                className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Sitting Location Setup */}
                        <div className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 font-mono uppercase">
                              Sitting Location Setup (Block - Floor - Room No.)
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-slate-500 uppercase">Block</label>
                              <select
                                value={facultyBlock}
                                onChange={(e) => setFacultyBlock(e.target.value as any)}
                                className="w-full py-1.5 px-2 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100"
                              >
                                <option value="BLOCK A">BLOCK A</option>
                                <option value="BLOCK B">BLOCK B</option>
                                <option value="BLOCK C">BLOCK C</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-slate-500 uppercase">Floor</label>
                              <select
                                value={facultyFloor}
                                onChange={(e) => setFacultyFloor(Number(e.target.value))}
                                className="w-full py-1.5 px-2 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100"
                              >
                                <option value={0}>Floor 0 (Ground)</option>
                                <option value={1}>Floor 1 (1st)</option>
                                <option value={2}>Floor 2 (2nd)</option>
                                <option value={3}>Floor 3 (3rd)</option>
                                <option value={4}>Floor 4 (4th)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-slate-500 uppercase">Room No. *</label>
                              <input
                                type="text"
                                required
                                value={facultyRoomNo}
                                onChange={(e) => setFacultyRoomNo(e.target.value)}
                                placeholder="e.g. Room 101, Lab 2"
                                className="w-full py-1.5 px-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>{isSubmitting ? 'Registering...' : 'Register Account & Save Location'}</span>
                        </button>

                        <div className="text-center pt-1">
                          <button
                            type="button"
                            onClick={() => { setFacultySubMode('login'); setErrorMessage(''); }}
                            className="text-xs text-emerald-600 hover:underline font-medium"
                          >
                            Already registered? Sign In here &rarr;
                          </button>
                        </div>
                      </form>
                    )}

                  </div>
                )}

                {/* 🛡️ ROLE 2: ADMINISTRATOR PORTAL LOGIN */}
                {selectedRole === 'admin' && (
                  <form onSubmit={handleAdminLogin} className="space-y-3.5 max-w-md mx-auto py-1">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-xs text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>System Administrator Master Control Panel.</span>
                    </div>

                    {adminError && (
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{adminError}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                        Admin Username / Email
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={adminUsername}
                          onChange={(e) => setAdminUsername(e.target.value)}
                          placeholder="admin or admin@dishaa.edu"
                          className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showAdminPassword ? 'text' : 'password'}
                          required
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full py-2 pl-9 pr-9 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                        <button
                          type="button"
                          onClick={() => setShowAdminPassword(!showAdminPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                        >
                          {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setAdminUsername('admin');
                          setAdminPassword('admin123');
                        }}
                        className="text-blue-600 hover:underline font-medium text-[11px]"
                      >
                        ⚡ Fill Demo Admin Credentials
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Sign In as System Administrator</span>
                    </button>
                  </form>
                )}
              </>
            ) : (
              /* ── AUTHENTICATED FACULTY & ADMIN DASHBOARD WORKSPACE ──────────────── */
              <div className="space-y-4">
                
                {/* Header User Badge & Logout */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                      {loggedInUser?.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100">{loggedInUser?.name}</h4>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-zinc-700 border border-emerald-200 dark:border-zinc-600 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase">
                          {loggedInUser?.role} ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">{loggedInUser?.department}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-mono font-semibold">
                        📍 {loggedInUser?.location}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>

                {/* Dashboard Action Tabs */}
                <div className="p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 grid grid-cols-2 sm:grid-cols-4 gap-1">
                  <button
                    onClick={() => setDashboardTab('search-faculty')}
                    className={`py-2 px-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      dashboardTab === 'search-faculty'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Faculty</span>
                  </button>

                  <button
                    onClick={() => setDashboardTab('host-event')}
                    className={`py-2 px-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      dashboardTab === 'host-event'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>Host Event</span>
                  </button>

                  <button
                    onClick={() => setDashboardTab('my-events')}
                    className={`py-2 px-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      dashboardTab === 'my-events'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>My Events</span>
                  </button>

                  <button
                    onClick={() => setDashboardTab('my-profile')}
                    className={`py-2 px-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      dashboardTab === 'my-profile'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Profile</span>
                  </button>
                </div>

                {/* 🔍 DASHBOARD TAB 1: SEARCH OTHER FACULTIES */}
                {dashboardTab === 'search-faculty' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                      <input
                        type="text"
                        value={searchFacultyQuery}
                        onChange={(e) => setSearchFacultyQuery(e.target.value)}
                        placeholder="Search faculty by Name, Department, or Room No..."
                        className="w-full py-3 pl-10 pr-4 rounded-2xl bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {isSearchingFaculty ? (
                      <div className="py-12 text-center text-xs text-cyan-400 font-mono">
                        Querying MongoDB Atlas faculty records...
                      </div>
                    ) : filteredFacultyList.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-400 glass-card rounded-2xl border border-white/10 p-6">
                        No faculty members match your search query.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                        {filteredFacultyList.map((f, i) => (
                          <div
                            key={f._id || i}
                            className="p-3.5 rounded-2xl glass-card border border-white/15 bg-slate-950/70 hover:border-cyan-400/40 transition-all space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="font-extrabold text-sm text-white">{f.name}</h5>
                              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono">
                                {f.designation || 'Faculty'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 font-medium">{f.department}</p>
                            {f.sittingLocation && (
                              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono pt-1 border-t border-white/10">
                                <MapPin className="w-3.5 h-3.5 shrink-0" />
                                <span>
                                  {f.sittingLocation.block} &bull; Floor {f.sittingLocation.floor} &bull; {f.sittingLocation.roomNo}
                                </span>
                              </div>
                            )}
                            {f.email && (
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                                <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                                <span>{f.email}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 🎉 DASHBOARD TAB 2: HOST EVENT FORM */}
                {dashboardTab === 'host-event' && (
                  <form onSubmit={handleHostEvent} className="space-y-4">
                    <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Host a new campus event! Published live to MongoDB Atlas & Events Tab.</span>
                    </div>

                    {eventSuccessMsg && (
                      <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{eventSuccessMsg}</span>
                      </div>
                    )}

                    {eventErrorMsg && (
                      <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{eventErrorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Event Title */}
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                          Event Title / Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          placeholder="e.g. CodeStorm 2026 Hackathon, Annual Sports Meet"
                          className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      {/* Type of Event */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                          Type of Event *
                        </label>
                        <select
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400"
                        >
                          {eventTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      {/* Entry Fee */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                          Entry Fee
                        </label>
                        <input
                          type="text"
                          value={eventEntryFee}
                          onChange={(e) => setEventEntryFee(e.target.value)}
                          placeholder="e.g. Free, ₹50, ₹100"
                          className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      {/* Start Date */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={eventStartDate}
                          onChange={(e) => setEventStartDate(e.target.value)}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      {/* End Date */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                          End Date (Auto-Expires After) *
                        </label>
                        <input
                          type="date"
                          required
                          value={eventEndDate}
                          onChange={(e) => setEventEndDate(e.target.value)}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Location Selector */}
                    <div className="p-4 rounded-2xl glass-card border border-emerald-500/30 bg-slate-950/70 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span>Event Location Setup</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEventLocType('outdoor')}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                              eventLocType === 'outdoor'
                                ? 'bg-emerald-500 text-slate-950 shadow-md'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Outdoor / Open Space
                          </button>
                          <button
                            type="button"
                            onClick={() => setEventLocType('indoor')}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                              eventLocType === 'indoor'
                                ? 'bg-cyan-500 text-slate-950 shadow-md'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Indoor Classroom / Lab
                          </button>
                        </div>
                      </div>

                      {eventLocType === 'indoor' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 uppercase">Block</label>
                            <select
                              value={eventLocBlock}
                              onChange={(e) => setEventLocBlock(e.target.value as any)}
                              className="w-full py-2 px-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white focus:border-cyan-400"
                            >
                              <option value="BLOCK A">BLOCK A</option>
                              <option value="BLOCK B">BLOCK B</option>
                              <option value="BLOCK C">BLOCK C</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 uppercase">Floor</label>
                            <select
                              value={eventLocFloor}
                              onChange={(e) => setEventLocFloor(Number(e.target.value))}
                              className="w-full py-2 px-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white focus:border-cyan-400"
                            >
                              <option value={0}>Floor 0 (Ground)</option>
                              <option value={1}>Floor 1 (1st)</option>
                              <option value={2}>Floor 2 (2nd)</option>
                              <option value={3}>Floor 3 (3rd)</option>
                              <option value={4}>Floor 4 (4th)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400 uppercase">Room / Lab No.</label>
                            <input
                              type="text"
                              value={eventLocRoomNo}
                              onChange={(e) => setEventLocRoomNo(e.target.value)}
                              placeholder="e.g. Room 101, Computer Lab 3"
                              className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-cyan-400"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1 pt-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase">Open Space Location</label>
                          <select
                            value={eventLocOutdoorText}
                            onChange={(e) => setEventLocOutdoorText(e.target.value)}
                            className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white focus:border-emerald-400"
                          >
                            <option value="College Turf / Futsal Ground">College Turf / Futsal Ground</option>
                            <option value="Main Basketball Court">Main Basketball Court</option>
                            <option value="Volleyball Court & Ground">Volleyball Court & Ground</option>
                            <option value="Main Auditorium & Seminar Hall">Main Auditorium & Seminar Hall</option>
                            <option value="College Central Canteen Ground">College Central Canteen Ground</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                        Event Description & Details *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        placeholder="Provide details about schedule, prizes, eligibility, rules..."
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isHostingEvent}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(52,211,153,0.6)] hover:scale-[1.01] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                    >
                      <Megaphone className="w-5 h-5" />
                      <span>{isHostingEvent ? 'Publishing to MongoDB Atlas...' : 'Publish Event Live to Campus'}</span>
                    </button>
                  </form>
                )}

                {/* 📋 DASHBOARD TAB 3: MY HOSTED EVENTS WITH DELETE ACTION */}
                {dashboardTab === 'my-events' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>Hosted Events ({myEvents.length})</span>
                      </span>
                      <button
                        onClick={fetchMyEvents}
                        className="text-xs text-cyan-400 hover:underline font-mono"
                      >
                        🔄 Refresh List
                      </button>
                    </div>

                    {loadingMyEvents ? (
                      <div className="py-12 text-center text-xs text-cyan-400 font-mono">
                        Fetching hosted events from MongoDB Atlas...
                      </div>
                    ) : myEvents.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-400 glass-card rounded-2xl border border-white/10 p-6">
                        You have not hosted any events yet. Click <strong>Host Event</strong> to publish your first campus activity!
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                        {myEvents.map((ev) => (
                          <div
                            key={ev._id}
                            className="p-4 rounded-2xl glass-card border border-white/15 bg-slate-950/80 hover:border-cyan-400/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h5 className="font-extrabold text-sm text-white">{ev.title}</h5>
                                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold">
                                  {ev.type}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
                                <span>📍 {ev.locationDetails}</span>
                                <span>📅 {ev.startDate} to {ev.endDate}</span>
                                <span>🎟️ {ev.entryFee}</span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1">{ev.description}</p>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteEvent(ev._id)}
                              disabled={deletingEventId === ev._id}
                              className="px-3.5 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
                              title="Delete Event from MongoDB Atlas"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                              <span>{deletingEventId === ev._id ? 'Deleting...' : 'Delete Event'}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 👤 DASHBOARD TAB 4: MY PROFILE */}
                {dashboardTab === 'my-profile' && (
                  <div className="p-6 rounded-3xl border border-white/15 bg-slate-950/60 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                        {loggedInUser?.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg text-white">{loggedInUser?.name}</h4>
                        <p className="text-xs text-cyan-300 font-mono">{loggedInUser?.department}</p>
                        <p className="text-xs text-slate-400 font-mono">{loggedInUser?.email}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-mono">Assigned Sitting Location:</span>
                        <span className="font-bold text-emerald-400 font-mono">{loggedInUser?.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/10">
                        <span className="text-slate-400 font-mono">Database Status:</span>
                        <span className="font-bold text-cyan-400 font-mono">MongoDB Atlas Synced</span>
                      </div>
                    </div>
                  </div>
                )}

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[90vh] z-10"
        >
          {content}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
