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
      className="bg-surface rounded-md p-4 shadow-sm hover:shadow-md transition-all duration-fast cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* 排名或索引 */}
        {news.index && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {news.index}
            </span>
          </div>
        )}

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          {/* 标题 */}
          <h3 className="text-base font-medium text-text-primary mb-2 line-clamp-2">
            {news.title}
          </h3>

          {/* 元信息 */}
          <div className="flex items-center gap-3 text-sm text-text-secondary">
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
          <div className="flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden bg-background">
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
