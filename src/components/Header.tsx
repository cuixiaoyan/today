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
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        {/* Logo标题区域 和 分类筛选区域 */}
        <div className="flex gap-3">
          {/* 左侧：Logo、标题、主题切换、我的关注 */}
          <div className="flex-shrink-0 flex flex-col gap-2">
            {/* Logo 和标题 */}
            <div className="flex items-center gap-2 group">
              <img 
                src="https://imgtolinkx.com/i/EJEsVN0r" 
                alt="资讯热搜" 
                className="h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
              />
              <h1 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                资讯热搜
              </h1>
            </div>
            {/* 我的关注按钮 */}
            <button
              onClick={onShowFollowed}
              className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <span className="text-base animate-pulse">⭐</span>
              <span>我的关注</span>
              {followedCategories.length > 0 && (
                <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs font-bold animate-bounce">
                  {followedCategories.length}
                </span>
              )}
            </button>
            {/* 主题切换按钮 */}
            <div className="transform transition-all duration-200 hover:scale-105">
              <ThemeToggle />
            </div>
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
