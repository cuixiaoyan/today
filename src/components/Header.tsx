import React from 'react';
import { CategoryFilter } from './CategoryFilter';
import { ThemeToggle } from './ThemeToggle';
import { Category } from '../types';

interface HeaderProps {
  categories: Category[];
  selectedCategory: string | null;
  followedCategories: string[];
  onSelectCategory: (categoryId: string | null) => void;
  onToggleFollow: (categoryId: string) => void;
  onShowFollowed: () => void;
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
  onShowFollowed,
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Logo标题区域 和 分类筛选区域 */}
        <div className="flex gap-3">
          {/* 左侧：Logo、标题、主题切换、我的关注 */}
          <div className="flex-shrink-0 flex flex-col gap-2">
            {/* Logo 和标题 */}
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="资讯热搜" className="h-7 w-7 flex-shrink-0" />
              <h1 className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">资讯热搜</h1>
            </div>
            {/* 主题切换按钮 */}
            <div>
              <ThemeToggle />
            </div>
            {/* 我的关注按钮 */}
            <button
              onClick={onShowFollowed}
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>⭐</span>
              <span>我的关注</span>
              {followedCategories.length > 0 && (
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
                  {followedCategories.length}
                </span>
              )}
            </button>
          </div>
          
          {/* 右侧：分类筛选 */}
          <div className="flex-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              followedCategories={followedCategories}
              onSelectCategory={onSelectCategory}
              onToggleFollow={onToggleFollow}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
