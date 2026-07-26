import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('carelink_theme') as ThemeMode | null;
    return saved || 'system';
  });

  const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    setIsSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const resolvedTheme = theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('carelink_theme', theme);
  }, [theme, resolvedTheme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
    isSystemDark,
  };
}
