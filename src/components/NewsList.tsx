import React from 'react';
import { NewsItem } from '../types';
import { NewsCard } from './NewsCard';
import { LoadingSpinner } from './LoadingSpinner';

interface NewsListProps {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

/**
 * 新闻列表组件
 */
export function NewsList({ news, loading, error, onRetry }: NewsListProps) {
  // 加载状态
  if (loading) {
    return <LoadingSpinner />;
  }

  // 错误状态
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-6xl mb-4">😕</div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          加载失败
        </h3>
        <p className="text-text-secondary text-sm mb-6 text-center max-w-md">
          {error}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-primary text-white rounded-sm font-medium hover:bg-primary/90 transition-colors duration-fast active:scale-95"
        >
          重试
        </button>
      </div>
    );
  }

  // 空状态
  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          暂无内容
        </h3>
        <p className="text-text-secondary text-sm text-center max-w-md">
          当前分类下没有可显示的内容
        </p>
      </div>
    );
  }

  // 新闻列表
  return (
    <div className="space-y-3">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
