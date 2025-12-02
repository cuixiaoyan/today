import React, { ReactNode } from 'react';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { Footer } from './Footer';
import { Category } from '../types';

interface LayoutProps {
  children: ReactNode;
  categories: Category[];
  selectedCategory: string | null;
  followedCategories: string[];
  onSelectCategory: (categoryId: string | null) => void;
  onToggleFollow: (categoryId: string) => void;
}

/**
 * 页面布局组件
 */
export function Layout({
  children,
  categories,
  selectedCategory,
  followedCategories,
  onSelectCategory,
  onToggleFollow,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        followedCategories={followedCategories}
        onSelectCategory={onSelectCategory}
        onToggleFollow={onToggleFollow}
      />
      
      <MainContent>{children}</MainContent>
      
      <Footer />
    </div>
  );
}
