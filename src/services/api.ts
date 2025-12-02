import axios, { AxiosInstance, AxiosError } from 'axios';
import { APIResponse, NewsItem, Category, News60sData } from '../types';
import { API_CATEGORIES } from '../types/categories';
import { NewsItemModel } from '../types/models';
import { retryManager } from '../utils/retryManager';
import { ErrorHandler } from '../utils/errorHandler';

/**
 * 新闻API服务类
 */
export class NewsAPIService {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://60s.viki.moe';
    
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * 获取所有可用分类
   */
  getCategories(): Category[] {
    return API_CATEGORIES;
  }

  /**
   * 根据分类获取热搜数据（接口默认无参数）
   */
  async fetchNewsByCategory(categoryId: string): Promise<NewsItem[]> {
    return retryManager.executeWithRetry(async () => {
      try {
        const category = API_CATEGORIES.find(cat => cat.id === categoryId);
        if (!category) {
          throw new Error(`Category not found: ${categoryId}`);
        }

        const response = await this.axiosInstance.get(category.endpoint);
        
        if (response.data.code !== 200) {
          throw new Error(response.data.message || 'Failed to fetch news');
        }

        // 特殊处理60秒读懂世界
        if (categoryId === '60s') {
          return NewsItemModel.from60sData(response.data.data, response.data.data.date);
        }

        // 特殊处理AI资讯
        if (categoryId === 'ai-news' && response.data.data.news) {
          return response.data.data.news.map((item: any, index: number) => ({
            id: `${categoryId}-${response.data.data.date}-${index}`,
            title: item.title || '',
            source: item.source || category?.name || 'AI资讯',
            category: categoryId,
            timestamp: new Date(item.date || response.data.data.date).getTime(),
            url: item.link || '',
            description: item.detail || '',
            index: index + 1,
          }));
        }

        // 特殊处理历史上的今天
        if (categoryId === 'history' && response.data.data.items) {
          return response.data.data.items.map((item: any, index: number) => ({
            id: `${categoryId}-${response.data.data.date}-${index}`,
            title: `${item.year}年 - ${item.title}`,
            source: category?.name || '历史上的今天',
            category: categoryId,
            timestamp: Date.now(),
            description: item.description || '',
            url: item.link || '',
            index: index + 1,
          }));
        }

        // 特殊处理必应壁纸
        if (categoryId === 'bing-wallpaper' && response.data.data) {
          const item = response.data.data;
          return [{
            id: `${categoryId}-${item.date || Date.now()}`,
            title: item.title || item.copyright || '必应每日壁纸',
            source: category?.name || '必应壁纸',
            category: categoryId,
            timestamp: Date.now(),
            url: item.url || item.link || '',
            image: item.url || item.image || '',
            description: item.copyright || '',
            index: 1,
          }];
        }

        // 通用处理
        if (response.data.data) {
          return this.normalizeNewsData(response.data.data, categoryId);
        }

        throw new Error('No data available');
      } catch (error) {
        const appError = ErrorHandler.handle(error);
        throw appError;
      }
    }, true);
  }

  /**
   * 获取多个分类的混合热搜
   */
  async fetchMixedNews(categoryIds: string[]): Promise<NewsItem[]> {
    try {
      const promises = categoryIds.map(id => this.fetchNewsByCategory(id));
      const results = await Promise.allSettled(promises);
      
      const allNews: NewsItem[] = [];
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          allNews.push(...result.value);
        }
      });

      return allNews;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 刷新单个分类数据
   */
  async refreshCategory(categoryId: string): Promise<NewsItem[]> {
    return this.fetchNewsByCategory(categoryId);
  }

  /**
   * 标准化不同平台的新闻数据格式
   */
  private normalizeNewsData(data: any, categoryId: string): NewsItem[] {
    const category = API_CATEGORIES.find(cat => cat.id === categoryId);
    const categoryName = category?.name || categoryId;

    // 如果数据是数组格式
    if (Array.isArray(data)) {
      return data.map((item, index) => {
        // 猫眼全球票房
        if (categoryId === 'maoyan-global' && item.movie_name) {
          return {
            id: `${categoryId}-${item.maoyan_id || index}`,
            title: `${item.movie_name} (${item.release_year})`,
            source: categoryName,
            category: categoryId,
            timestamp: Date.now(),
            description: `票房：${item.box_office_desc}`,
            hot: item.box_office_desc,
            index: item.rank || index + 1,
          };
        }

        // 猫眼电影实时票房
        if (categoryId === 'maoyan-movie' && item.movie_name) {
          return {
            id: `${categoryId}-${item.movie_id || index}`,
            title: item.movie_name,
            source: categoryName,
            category: categoryId,
            timestamp: Date.now(),
            description: `${item.release_info || ''} 票房：${item.box_office_desc} 占比：${item.box_office_rate}`,
            hot: item.box_office_desc,
            index: index + 1,
          };
        }

        // 猫眼电视收视排行
        if (categoryId === 'maoyan-tv' && item.programme_name) {
          return {
            id: `${categoryId}-${index}`,
            title: item.programme_name,
            source: `${categoryName} - ${item.channel_name}`,
            category: categoryId,
            timestamp: Date.now(),
            description: `市场份额：${item.market_rate_desc} 关注度：${item.attention_rate_desc}`,
            hot: item.market_rate_desc,
            index: index + 1,
          };
        }

        // 猫眼网剧实时热度
        if (categoryId === 'maoyan-drama' && item.series_name) {
          return {
            id: `${categoryId}-${item.series_id || index}`,
            title: item.series_name,
            source: categoryName,
            category: categoryId,
            timestamp: Date.now(),
            description: `${item.release_info || ''} ${item.platform_desc || ''} 热度：${item.curr_heat_desc}`,
            hot: item.curr_heat_desc,
            index: index + 1,
          };
        }

        // 通用格式
        return {
          id: `${categoryId}-${item.id || item.rank || index}`,
          title: item.title || item.name || item.word || item.query || '',
          source: categoryName,
          category: categoryId,
          timestamp: item.timestamp || item.time || item.mtime || Date.now(),
          url: item.url || item.link || item.href || item.mobilUrl || '',
          description: item.desc || item.description || item.excerpt || item.word_type || '',
          hot: item.hot || item.hotScore || item.heat || item.hot_value || item.hotValue || item.score || '',
          index: item.index || item.rank || index + 1,
          image: item.image || item.pic || item.cover || item.img || item.work_type_icon || '',
        };
      });
    }

    // 如果数据是对象格式，尝试提取列表
    if (typeof data === 'object' && data !== null) {
      const list = data.list || data.data || data.items || [];
      if (Array.isArray(list)) {
        return this.normalizeNewsData(list, categoryId);
      }
    }

    return [];
  }

  /**
   * 处理Axios错误
   */
  private handleAxiosError(error: AxiosError): Error {
    if (error.response) {
      // 服务器返回错误状态码
      return new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      return new Error('Network Error: No response received from server');
    } else {
      // 请求配置出错
      return new Error(`Request Error: ${error.message}`);
    }
  }
}

// 导出单例实例
export const newsAPI = new NewsAPIService();
