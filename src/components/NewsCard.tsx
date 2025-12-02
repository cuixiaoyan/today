import React from 'react';
import { NewsItem } from '../types';
import { NewsItemModel } from '../types/models';

interface NewsCardProps {
  news: NewsItem;
  onClick?: (news: NewsItem) => void;
}

/**
 * 新闻卡片组件 - iOS风格设计
 */
export function NewsCard({ news, onClick }: NewsCardProps) {
  const newsModel = new NewsItemModel(news);
  
  const handleClick = () => {
    if (onClick) {
      onClick(news);
    } else if (news.url) {
      window.open(news.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] border border-gray-100 dark:border-gray-700"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* 排名或索引 */}
        {news.index && (
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md transform transition-transform duration-300 hover:rotate-12">
            <span className="text-white font-bold text-sm">
              {news.index}
            </span>
          </div>
        )}

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          {/* 标题 */}
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {news.title}
          </h3>

          {/* 元信息 */}
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="text-xs">📰</span>
              {news.source}
            </span>
            
            <span className="flex items-center gap-1">
              <span className="text-xs">🕐</span>
              {newsModel.getFormattedDate()}
            </span>

            {news.hot && (
              <span className="flex items-center gap-1 text-error">
                <span className="text-xs">🔥</span>
                {typeof news.hot === 'number' ? news.hot.toLocaleString() : news.hot}
              </span>
            )}
          </div>
        </div>

        {/* 缩略图 */}
        {news.image && (
          <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-md transform transition-transform duration-300 hover:scale-110">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
