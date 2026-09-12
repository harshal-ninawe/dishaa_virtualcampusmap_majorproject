/**
 * DISHAA 2.0 Dedicated Voice Navigation Service
 *
 * Fully deterministic, client-side browser SpeechSynthesis wrapper.
 * Features:
 * - Zero LLM dependencies in real-time navigation loop
 * - Priority-based speech queue (ARRIVAL > IMMEDIATE > OFF_ROUTE > APPROACHING > NORMAL)
 * - Stage-based deduplication to prevent repetitive speech on GPS loops
 * - Natural language voice fallback: en-IN -> en-US -> browser default
 * - Autoplay activation support via user gesture
 * - Safe error handling on unsupported or restricted browsers
 */

export type VoicePriority =
  | 'NORMAL'
  | 'REASSURANCE'
  | 'NAVIGATION'
  | 'APPROACHING'
  | 'DESTINATION_APPROACH'
  | 'OFF_ROUTE'
  | 'IMMEDIATE'
  | 'ARRIVAL';

export const PRIORITY_LEVELS: Record<VoicePriority, number> = {
  NORMAL: 1,
  REASSURANCE: 1,
  NAVIGATION: 2,
  APPROACHING: 3,
  DESTINATION_APPROACH: 4,
  OFF_ROUTE: 5,
  IMMEDIATE: 6,
  ARRIVAL: 7,
};

export type VoiceState =
  | 'IDLE'
  | 'NAVIGATING'
  | 'WAITING'
  | 'ANNOUNCING'
  | 'OFF_ROUTE'
  | 'APPROACHING_DESTINATION'
  | 'ARRIVED'
  | 'STOPPED';

export interface VoiceSettings {
  rate: number;   // 0.8 to 1.5 (default 1.0)
  pitch: number;  // 0.8 to 1.2 (default 1.0)
  volume: number; // 0 to 1 (default 1.0)
}

function cleanTextForSpeech(text: string): string {
  if (!text) return '';
  return text
    .replace(/\s*\([^)]*\)/g, '') // remove parenthetical technical notes e.g. (Total: ~148m, ~2 min walk)
    .replace(/[📍🚶🧭↗️✅]/gu, '') // remove emojis
    .replace(/[~#]/g, '')         // remove symbols like ~ or #
    .replace(/\s+/g, ' ')         // collapse double spaces
    .trim();
}

class VoiceNavigationService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isVoiceEnabled = true;
  private isSpeakingInternal = false;
  private lastSpokenText = '';
  private lastSpokenTime = 0;
  private currentPriorityLevel = 0;
  private isInitialized = false;
  private currentSessionId: string | null = null;
  private isArrived = false;
  private spokenKeys: Set<string> = new Set();
  private voiceState: VoiceState = 'IDLE';
  private settings: VoiceSettings = {
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  };
  private listeners: Set<(speaking: boolean) => void> = new Set();
  private enabledListeners: Set<(enabled: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Load saved preference if available
      try {
        const saved = localStorage.getItem('dishaa_voice_enabled');
        if (saved !== null) {
          this.isVoiceEnabled = saved === 'true';
        }
      } catch (_) {}

      // Handle async voice loading in modern browsers
      if (typeof this.synth.onvoiceschanged !== 'undefined') {
        this.synth.onvoiceschanged = () => {
          this.getBestVoice();
        };
      }
    }
  }

  public isSupported(): boolean {
    return Boolean(this.synth);
  }

  public isEnabled(): boolean {
    return this.isVoiceEnabled;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingInternal;
  }

  public getVoiceState(): VoiceState {
    return this.voiceState;
  }

  public getSessionId(): string | null {
    return this.currentSessionId;
  }

  public isSessionArrived(): boolean {
    return this.isArrived;
  }

  public startSession(sessionId: string): void {
    this.cancelInternal();
    this.currentSessionId = sessionId;
    this.isArrived = false;
    this.spokenKeys.clear();
    this.lastSpokenText = '';
    this.lastSpokenTime = 0;
    this.currentPriorityLevel = 0;
    this.voiceState = 'NAVIGATING';
  }

  public stopSession(): void {
    this.cancelInternal();
    this.currentSessionId = null;
    this.isArrived = false;
    this.spokenKeys.clear();
    this.lastSpokenText = '';
    this.lastSpokenTime = 0;
    this.currentPriorityLevel = 0;
    this.voiceState = 'IDLE';
  }

  public setEnabled(enabled: boolean): void {
    this.isVoiceEnabled = enabled;
    if (!enabled) {
      this.cancel();
    }
    try {
      localStorage.setItem('dishaa_voice_enabled', String(enabled));
    } catch (_) {}
    this.notifyEnabledListeners();
  }

  public toggle(): boolean {
    this.setEnabled(!this.isVoiceEnabled);
    return this.isVoiceEnabled;
  }

  /**
   * Unlock SpeechSynthesis on mobile/restricted browsers through a user gesture.
   * Call this on "Start Navigation" or voice toggle click.
   */
  public initGestureActivation(): void {
    if (!this.synth || this.isInitialized) return;
    try {
      this.synth.resume();
      this.isInitialized = true;
    } catch (_) {}
  }

  /**
   * Pick the most natural voice available (preferring en-IN, then en-US, then default)
   */
  private getBestVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prefer Indian English voice if available on device
    const enIn = voices.find((v) => v.lang === 'en-IN' || v.lang.replace('_', '-') === 'en-IN');
    if (enIn) return enIn;

    // Fallback to standard US/GB English
    const enGeneral = voices.find((v) => v.lang.startsWith('en'));
    if (enGeneral) return enGeneral;

    return voices[0] || null;
  }

  /**
   * Internal cancel without resetting arrival lock or session ID
   */
  private cancelInternal(): void {
    if (!this.synth) return;
    try {
      if (this.currentUtterance) {
        this.currentUtterance.onstart = null;
        this.currentUtterance.onend = null;
        this.currentUtterance.onerror = null;
      }
      this.synth.cancel();
    } catch (_) {}
    this.currentUtterance = null;
    this.isSpeakingInternal = false;
    this.currentPriorityLevel = 0;
    this.notifyListeners(false);
  }

  /**
   * Speak a navigation instruction with deduplication, priority handling, and arrival locking.
   */
  public speak(
    text: string,
    priority: VoicePriority = 'NORMAL',
    dedupeKey?: string,
    force = false
  ): void {
    if (!this.synth || !this.isVoiceEnabled) return;

    // ARRIVAL permanently locks voice assistance for this session
    if (this.isArrived) {
      return;
    }

    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) return;

    // Deduplication check: if key already spoken in this session, reject immediately
    if (dedupeKey && this.spokenKeys.has(dedupeKey)) {
      return;
    }

    const newPriorityLevel = PRIORITY_LEVELS[priority] || 1;
    const now = Date.now();

    // Text-based rapid deduplication only when no explicit dedupeKey is provided
    if (!dedupeKey && !force) {
      const isSameText = this.lastSpokenText.toLowerCase() === cleaned.toLowerCase();
      const isRecent = now - this.lastSpokenTime < 3000;
      if (isSameText && isRecent && newPriorityLevel <= this.currentPriorityLevel) {
        return;
      }
    }

    const wasSpeaking = this.isSpeakingInternal || (this.synth.speaking && !this.synth.paused);

    // ARRIVAL is the highest priority: cancel any current speech and lock
    if (priority === 'ARRIVAL') {
      this.isArrived = true;
      this.voiceState = 'ARRIVED';
      this.cancelInternal();
    } else if (wasSpeaking) {
      // Allow NAVIGATION, IMMEDIATE, or force to interrupt current speech cleanly
      if (newPriorityLevel >= this.currentPriorityLevel || priority === 'NAVIGATION' || force) {
        this.cancelInternal();
      } else {
        // Lower priority instruction suppressed while higher instruction speaks
        return;
      }
    }

    try {
      this.initGestureActivation();

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = this.settings.rate;
      utterance.pitch = this.settings.pitch;
      utterance.volume = this.settings.volume;

      const voice = this.getBestVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || 'en-IN';

      if (dedupeKey) {
        this.spokenKeys.add(dedupeKey);
      }

      this.currentPriorityLevel = newPriorityLevel;
      this.lastSpokenText = cleaned;
      this.lastSpokenTime = now;
      if (priority !== 'ARRIVAL') {
        this.voiceState = 'ANNOUNCING';
      }

      utterance.onstart = () => {
        this.isSpeakingInternal = true;
        this.notifyListeners(true);
      };

      utterance.onend = () => {
        this.isSpeakingInternal = false;
        this.currentPriorityLevel = 0;
        this.currentUtterance = null;
        if (!this.isArrived) {
          this.voiceState = this.currentSessionId ? 'NAVIGATING' : 'IDLE';
        }
        this.notifyListeners(false);
      };

      utterance.onerror = (e: any) => {
        // If an arrival utterance was canceled by a browser timing race, retry once after 100ms
        if (priority === 'ARRIVAL' && e && (e.error === 'canceled' || e.error === 'interrupted')) {
          setTimeout(() => {
            try {
              if (this.synth?.paused) this.synth.resume();
              this.synth?.speak(utterance);
            } catch (_) {}
          }, 100);
          return;
        }
        this.isSpeakingInternal = false;
        this.currentPriorityLevel = 0;
        this.currentUtterance = null;
        if (!this.isArrived) {
          this.voiceState = this.currentSessionId ? 'NAVIGATING' : 'IDLE';
        }
        this.notifyListeners(false);
      };

      const executeSpeak = () => {
        try {
          this.currentUtterance = utterance;
          if (this.synth?.paused) {
            this.synth.resume();
          }
          this.synth?.speak(utterance);
        } catch (_) {
          this.isSpeakingInternal = false;
          this.currentPriorityLevel = 0;
          this.notifyListeners(false);
        }
      };

      if (wasSpeaking) {
        this.cancelInternal();
        // Allow Web Speech audio queue to cleanly clear before dispatching next utterance
        setTimeout(executeSpeak, 60);
      } else {
        executeSpeak();
      }
    } catch (_) {
      this.isSpeakingInternal = false;
      this.currentPriorityLevel = 0;
      this.notifyListeners(false);
    }
  }

  public cancel(): void {
    this.cancelInternal();
    if (!this.isArrived) {
      this.voiceState = this.currentSessionId ? 'NAVIGATING' : 'IDLE';
    }
  }

  public pause(): void {
    if (!this.synth) return;
    try {
      this.synth.pause();
    } catch (_) {}
  }

  public resume(): void {
    if (!this.synth) return;
    try {
      this.synth.resume();
    } catch (_) {}
  }

  public updateSettings(newSettings: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  public getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  public subscribe(listener: (speaking: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public subscribeEnabled(listener: (enabled: boolean) => void): () => void {
    this.enabledListeners.add(listener);
    return () => {
      this.enabledListeners.delete(listener);
    };
  }

  private notifyListeners(speaking: boolean): void {
    this.listeners.forEach((fn) => {
      try { fn(speaking); } catch (_) {}
    });
  }

  private notifyEnabledListeners(): void {
    this.enabledListeners.forEach((fn) => {
      try { fn(this.isVoiceEnabled); } catch (_) {}
    });
  }
}

export const voiceNavigation = new VoiceNavigationService();
