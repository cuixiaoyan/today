import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NewsItem, Category } from '../types';
import { API_CATEGORIES } from '../types/categories';

interface NewsContextType {
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
  children: ReactNode;
}

export function NewsProvider({ children }: NewsProviderProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories] = useState<Category[]>(API_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('60s');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const value: NewsContextType = {
    news,
    setNews,
    categories,
    selectedCategory,
    setSelectedCategory,
    loading,
    setLoading,
    error,
    setError,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNewsContext() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
}
