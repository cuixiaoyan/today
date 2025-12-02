import React, { createContext, useContext, ReactNode } from 'react';
import { usePreferences } from '../hooks/usePreferences';

interface PreferencesContextType {
  followedCategories: string[];
  followCategory: (categoryId: string) => void;
  unfollowCategory: (categoryId: string) => void;
  isFollowing: (categoryId: string) => boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

interface PreferencesProviderProps {
  children: ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const preferences = usePreferences();

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferencesContext() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferencesContext must be used within a PreferencesProvider');
  }
  return context;
}
