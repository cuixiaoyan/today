import { useState, useEffect } from 'react';
import { StorageManager } from '../utils/storage';

export type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * 主题切换Hook
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(() => {
    const preferences = StorageManager.loadPreferences();
    return preferences?.theme || 'light';
  });

  useEffect(() => {
    // 应用主题到document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // 保存到localStorage
    const preferences = StorageManager.loadPreferences() || { followedCategories: [], theme: 'light' };
    StorageManager.savePreferences({ ...preferences, theme });
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
