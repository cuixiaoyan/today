import { UserPreferences, NewsItem, CachedData } from '../types';

/**
 * 本地存储管理类
 */
export class StorageManager {
  private static readonly PREFERENCES_KEY = 'user_preferences';
  private static readonly CACHE_KEY = 'news_cache';
  private static readonly CACHE_DURATION = Number(import.meta.env.VITE_CACHE_DURATION) || 5 * 60 * 1000; // 5分钟

  /**
   * 保存用户偏好设置
   */
  static savePreferences(preferences: UserPreferences): void {
    try {
      const json = JSON.stringify(preferences);
      localStorage.setItem(this.PREFERENCES_KEY, json);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  /**
   * 加载用户偏好设置
   */
  static loadPreferences(): UserPreferences | null {
    try {
      const json = localStorage.getItem(this.PREFERENCES_KEY);
      if (!json) {
        return null;
      }
      return JSON.parse(json) as UserPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return null;
    }
  }

  /**
   * 缓存新闻数据
   */
  static cacheNews(categoryId: string, news: NewsItem[]): void {
    try {
      const cachedData: CachedData<NewsItem[]> = {
        data: news,
        timestamp: Date.now(),
      };
      const key = `${this.CACHE_KEY}_${categoryId}`;
      const json = JSON.stringify(cachedData);
      localStorage.setItem(key, json);
    } catch (error) {
      console.error('Failed to cache news:', error);
    }
  }

  /**
   * 获取缓存的新闻数据
   */
  static getCachedNews(categoryId: string): NewsItem[] | null {
    try {
      const key = `${this.CACHE_KEY}_${categoryId}`;
      const json = localStorage.getItem(key);
      if (!json) {
        return null;
      }

      const cachedData: CachedData<NewsItem[]> = JSON.parse(json);
      
      // 检查缓存是否过期
      if (!this.isCacheValid(cachedData.timestamp)) {
        this.clearCache(categoryId);
        return null;
      }

      return cachedData.data;
    } catch (error) {
      console.error('Failed to get cached news:', error);
      return null;
    }
  }

  /**
   * 检查缓存是否有效
   */
  static isCacheValid(timestamp: number): boolean {
    const now = Date.now();
    const diff = now - timestamp;
    return diff < this.CACHE_DURATION;
  }

  /**
   * 清除指定分类的缓存
   */
  static clearCache(categoryId: string): void {
    try {
      const key = `${this.CACHE_KEY}_${categoryId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  /**
   * 清除所有缓存
   */
  static clearAllCache(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_KEY)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear all cache:', error);
    }
  }

  /**
   * 清除所有数据（包括偏好设置和缓存）
   */
  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear all data:', error);
    }
  }

  /**
   * 获取存储使用情况（字节）
   */
  static getStorageSize(): number {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Failed to get storage size:', error);
      return 0;
    }
  }
}
