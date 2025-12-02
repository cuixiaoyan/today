import React, { ReactNode } from 'react';
import { NewsProvider } from './NewsContext';
import { PreferencesProvider } from './PreferencesContext';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * 组合所有Context Provider
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <PreferencesProvider>
      <NewsProvider>
        {children}
      </NewsProvider>
    </PreferencesProvider>
  );
}
