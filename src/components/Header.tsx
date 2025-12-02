import React from 'react';
import { CategoryFilter } from './CategoryFilter';
import { Category } from '../types';

interface HeaderProps {
  categories: Category[];
  selectedCategory: string | null;
  followedCategories: string[];
  onSelectCategory: (categoryId: string | null) => void;
  onToggleFollow: (categoryId: string) => void;
}

/**
 * 页面头部组件
 */
export function Header({
  categories,
  selectedCategory,
  followedCategories,
  onSelectCategory,
  onToggleFollow,
}: HeaderProps) {
  return (
    <header className="bg-surface shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* 分类筛选 */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          followedCategories={followedCategories}
          onSelectCategory={onSelectCategory}
          onToggleFollow={onToggleFollow}
        />
      </div>
    </header>
  );
}
