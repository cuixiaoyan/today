// API Response Types
export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 60秒读懂世界 API Response
export interface News60sData {
  date: string;
  news: string[];
  image: string;
  tip: string;
  cover: string;
  audio: {
    music: string;
    news: string;
  };
  link: string;
  created: string;
  created_at: number;
  updated: string;
  updated_at: number;
  day_of_week: string;
  lunar_date: string;
  api_updated: string;
  api_updated_at: number;
}

// 通用新闻条目
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  timestamp: number;
  url?: string;
  description?: string;
  hot?: string | number;
  index?: number;
  image?: string;
}

// 分类定义
export interface Category {
  id: string;
  name: string;
  icon: string;
  endpoint: string;
}

// 应用状态
export interface AppState {
  news: NewsItem[];
  categories: Category[];
  followedCategories: string[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
}

// 用户偏好设置
export interface UserPreferences {
  followedCategories: string[];
  theme?: 'light' | 'dark';
}

// 错误类型
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

// 应用错误
export interface AppError {
  type: ErrorType;
  message: string;
  code?: number;
  retryable: boolean;
}

// 缓存数据结构
export interface CachedData<T> {
  data: T;
  timestamp: number;
}
