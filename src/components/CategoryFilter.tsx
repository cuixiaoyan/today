import React from 'react';
import { Category } from '../types';
import { useResponsive } from '../hooks/useResponsive';
import { ThemeToggle } from './ThemeToggle';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  followedCategories: string[];
  onSelectCategory: (categoryId: string | null) => void;
  onToggleFollow: (categoryId: string) => void;
}

/**
 * 分类筛选组件 - iOS风格
 */
export function CategoryFilter({
  categories,
  selectedCategory,
  followedCategories,
  onSelectCategory,
  onToggleFollow,
}: CategoryFilterProps) {
  const { isMobile } = useResponsive();

  const isFollowing = (categoryId: string) => {
    return followedCategories.includes(categoryId);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(categoryId);
    }
  };

  const handleFollowClick = (e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    onToggleFollow(categoryId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm p-3">
      {/* 分类列表 */}
      <div
        className={`
          ${isMobile ? 'flex flex-col gap-2' : 'flex flex-wrap gap-2'}
        `}
      >
        {/* 主题切换按钮 */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
        
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const isFollowed = isFollowing(category.id);

          return (
            <div
              key={category.id}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium
                transition-all duration-fast cursor-pointer
                ${
                  isSelected
                    ? 'bg-primary text-white shadow-sm scale-105'
                    : 'bg-background text-text-primary hover:bg-background/80 hover:scale-102'
                }
                ${isMobile ? 'w-full justify-between' : ''}
              `}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
              </span>

              {/* 关注按钮 */}
              <button
                onClick={(e) => handleFollowClick(e, category.id)}
                className={`
                  flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full
                  transition-all duration-fast hover:scale-110 active:scale-95
                  ${
                    isFollowed
                      ? isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-primary/10 text-primary'
                      : isSelected
                      ? 'bg-white/10 text-white/60'
                      : 'bg-border/30 text-text-secondary'
                  }
                `}
                title={isFollowed ? '取消关注' : '关注'}
              >
                {isFollowed ? '⭐' : '☆'}
              </button>
            </div>
          );
        })}
      </div>

      {/* 关注提示 */}
      {followedCategories.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-text-secondary">
            已关注 {followedCategories.length} 个分类
          </p>
        </div>
      )}
    </div>
  );
}
