import { useState, useEffect, useCallback } from 'react';
import { NewsItem, AppError } from '../types';
import { newsAPI } from '../services/api';
import { StorageManager } from '../utils/storage';
import { ErrorHandler } from '../utils/errorHandler';
import { prioritizeNewsByFollowedCategories, deduplicateNews } from '../utils/newsUtils';

interface UseNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * 数据获取Hook
 * @param categoryId 分类ID，如果为空则获取所有关注的分类
 */
export function useNews(categoryId?: string): UseNewsReturn {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 先尝试从缓存获取
      if (categoryId) {
        const cached = StorageManager.getCachedNews(categoryId);
        if (cached && cached.length > 0) {
          setNews(cached);
          setLoading(false);
          return;
        }
      }

      // 从API获取
      let fetchedNews: NewsItem[];
      const preferences = StorageManager.loadPreferences();
      const followedCategories = preferences?.followedCategories || [];
      
      if (categoryId) {
        fetchedNews = await newsAPI.fetchNewsByCategory(categoryId);
        // 缓存数据
        StorageManager.cacheNews(categoryId, fetchedNews);
      } else {
        // 获取所有关注的分类
        if (followedCategories.length > 0) {
          fetchedNews = await newsAPI.fetchMixedNews(followedCategories);
        } else {
          // 如果没有关注任何分类，默认获取60秒读懂世界
          fetchedNews = await newsAPI.fetchNewsByCategory('60s');
        }
      }

      // 去重
      fetchedNews = deduplicateNews(fetchedNews);

      // 如果没有指定分类，根据关注的分类进行优先级排序
      if (!categoryId && followedCategories.length > 0) {
        fetchedNews = prioritizeNewsByFollowedCategories(fetchedNews, followedCategories);
      }

      setNews(fetchedNews);
    } catch (err: any) {
      const appError = ErrorHandler.handle(err);
      setError(ErrorHandler.getUserFriendlyMessage(appError));
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refetch = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    refetch,
  };
}
