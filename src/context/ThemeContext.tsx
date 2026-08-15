'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // Enforce light theme as default on app start
    setThemeState('light');
    localStorage.setItem('dishaa-theme', 'light');
    applyTheme('light');
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    const body = document.body;

    if (t === 'light') {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.classList.add('light');
      body.classList.add('light');
    } else {
      root.classList.add('dark');
      body.classList.add('dark');
      root.classList.remove('light');
      body.classList.remove('light');
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('dishaa-theme', t);
    applyTheme(t);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
