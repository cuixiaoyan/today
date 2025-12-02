import React from 'react';
import { NewsItem } from '../types';

interface DetailPanelProps {
  newsItem: NewsItem | null;
  onClose: () => void;
}

export function DetailPanel({ newsItem, onClose }: DetailPanelProps) {
  if (!newsItem) return null;

  return (
    <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-l-4 border-blue-500 dark:border-blue-600 flex flex-col shadow-2xl">
      {/* 头部 */}
      <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          详情
        </h2>
        <div className="flex items-center gap-2">
          {/* 阅读原文按钮 */}
          {newsItem.url && (
            <a
              href={newsItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <span>阅读原文</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 transform hover:scale-110 hover:rotate-90 active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 内容 */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* 标题 */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {newsItem.title}
        </h1>

        {/* 元信息 */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <span className="text-xs">📰</span>
            {newsItem.source}
          </span>
          {newsItem.hot && (
            <span className="flex items-center gap-1 text-red-500 dark:text-red-400">
              <span className="text-xs">🔥</span>
              {typeof newsItem.hot === 'number' ? newsItem.hot.toLocaleString() : newsItem.hot}
            </span>
          )}
          {newsItem.index && (
            <span className="flex items-center gap-1">
              <span className="text-xs">#</span>
              {newsItem.index}
            </span>
          )}
        </div>

        {/* 图片 */}
        {newsItem.image && (
          <div className="mb-6">
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* 描述 */}
        {newsItem.description && (
          <div className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {newsItem.description}
            </p>
          </div>
        )}


      </div>
    </div>
  );
}
