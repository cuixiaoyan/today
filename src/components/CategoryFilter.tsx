import React from 'react';
import { Category } from '../types';
import { useResponsive } from '../hooks/useResponsive';

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
  const [isExpanded, setIsExpanded] = React.useState(false);

  const isFollowing = (categoryId: string) => {
    return followedCategories.includes(categoryId);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(categoryId);
    }
    // 移动端选择分类后自动收起
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const handleFollowClick = (e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    onToggleFollow(categoryId);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // 获取当前选中的分类
  const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);

  // 渲染分类按钮
  const renderCategoryButton = (category: Category) => {
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
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-102'
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
                : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
            }
          `}
          title={isFollowed ? '取消关注' : '关注'}
        >
          {isFollowed ? '⭐' : '☆'}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm p-3">
      {/* 移动端：显示当前选中的分类和展开按钮 */}
      {isMobile && !isExpanded && (
        <div className="flex items-center justify-between gap-2">
          {selectedCategoryObj && (
            <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-sm text-sm font-medium">
              <span className="text-base">{selectedCategoryObj.icon}</span>
              <span>{selectedCategoryObj.name}</span>
            </div>
          )}
          <button
            onClick={toggleExpanded}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            展开 ▼
          </button>
        </div>
      )}

      {/* 移动端：展开时显示所有分类 */}
      {isMobile && isExpanded && (
        <div className="space-y-2">
          <div className="flex justify-end mb-2">
            <button
              onClick={toggleExpanded}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              收起 ▲
            </button>
          </div>
          {categories.map(renderCategoryButton)}
        </div>
      )}

      {/* 桌面端：正常显示 */}
      {!isMobile && (
        <div className="flex flex-wrap gap-2">
          {categories.map(renderCategoryButton)}
        </div>
      )}

    </div>
  );
}
