import { useEffect, useState, useCallback } from 'react';
import { voiceNavigation, type VoicePriority, type VoiceSettings } from '../services/voiceNavigation';

export interface UseVoiceNavigationReturn {
  isSupported: boolean;
  isEnabled: boolean;
  isSpeaking: boolean;
  enableVoice: () => void;
  disableVoice: () => void;
  toggleVoice: () => void;
  speak: (text: string, priority?: VoicePriority, dedupeKey?: string) => void;
  cancel: () => void;
  initVoice: () => void;
  startSession: (sessionId: string) => void;
  stopSession: () => void;
  isSessionArrived: () => boolean;
  settings: VoiceSettings;
  updateSettings: (newSettings: Partial<VoiceSettings>) => void;
}

export function useVoiceNavigation(): UseVoiceNavigationReturn {
  const [isSupported] = useState<boolean>(() => voiceNavigation.isSupported());
  const [isEnabled, setIsEnabled] = useState<boolean>(() => voiceNavigation.isEnabled());
  const [isSpeaking, setIsSpeaking] = useState<boolean>(() => voiceNavigation.isSpeaking());
  const [settings, setSettings] = useState<VoiceSettings>(() => voiceNavigation.getSettings());

  useEffect(() => {
    const unsubSpeaking = voiceNavigation.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });

    const unsubEnabled = voiceNavigation.subscribeEnabled((enabled) => {
      setIsEnabled(enabled);
    });

    return () => {
      unsubSpeaking();
      unsubEnabled();
    };
  }, []);

  const enableVoice = useCallback(() => {
    voiceNavigation.setEnabled(true);
  }, []);

  const disableVoice = useCallback(() => {
    voiceNavigation.setEnabled(false);
  }, []);

  const toggleVoice = useCallback(() => {
    voiceNavigation.initGestureActivation();
    voiceNavigation.toggle();
  }, []);

  const speak = useCallback((text: string, priority: VoicePriority = 'NORMAL', dedupeKey?: string) => {
    voiceNavigation.speak(text, priority, dedupeKey);
  }, []);

  const cancel = useCallback(() => {
    voiceNavigation.cancel();
  }, []);

  const initVoice = useCallback(() => {
    voiceNavigation.initGestureActivation();
  }, []);

  const startSession = useCallback((sessionId: string) => {
    voiceNavigation.startSession(sessionId);
  }, []);

  const stopSession = useCallback(() => {
    voiceNavigation.stopSession();
  }, []);

  const isSessionArrived = useCallback(() => {
    return voiceNavigation.isSessionArrived();
  }, []);

  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    voiceNavigation.updateSettings(newSettings);
    setSettings(voiceNavigation.getSettings());
  }, []);

  return {
    isSupported,
    isEnabled,
    isSpeaking,
    enableVoice,
    disableVoice,
    toggleVoice,
    speak,
    cancel,
    initVoice,
    startSession,
    stopSession,
    isSessionArrived,
    settings,
    updateSettings,
  };
}
