import { NewsItem, Category } from './index';

/**
 * NewsItem 数据模型类
 */
export class NewsItemModel implements NewsItem {
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

  constructor(data: NewsItem) {
    this.id = data.id;
    this.title = data.title;
    this.source = data.source;
    this.category = data.category;
    this.timestamp = data.timestamp;
    this.url = data.url;
    this.description = data.description;
    this.hot = data.hot;
    this.index = data.index;
    this.image = data.image;
  }

  /**
   * 格式化时间戳为可读日期
   */
  getFormattedDate(): string {
    const date = new Date(this.timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) {
      return '刚刚';
    } else if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    }
  }

  /**
   * 检查新闻是否是最近24小时内的
   */
  isRecent(): boolean {
    const now = Date.now();
    const diff = now - this.timestamp;
    return diff < 24 * 60 * 60 * 1000;
  }

  /**
   * 验证新闻数据是否有效
   */
  static validate(data: any): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const required = ['id', 'title', 'source', 'category', 'timestamp'];
    for (const field of required) {
      if (!(field in data)) {
        return false;
      }
    }

    if (typeof data.title !== 'string' || data.title.trim() === '') {
      return false;
    }

    if (typeof data.timestamp !== 'number' || data.timestamp <= 0) {
      return false;
    }

    return true;
  }

  /**
   * 从60秒读懂世界数据创建NewsItem数组
   */
  static from60sData(data: any, date: string): NewsItem[] {
    if (!data.news || !Array.isArray(data.news)) {
      return [];
    }

    return data.news.map((newsText: string, index: number) => ({
      id: `60s-${date}-${index}`,
      title: newsText,
      source: '每天60秒读懂世界',
      category: '60s',
      timestamp: data.created_at || Date.now(),
      url: data.link,
      description: newsText,
      index: index + 1,
      image: data.image || data.cover,
    }));
  }
}

/**
 * Category 数据模型类
 */
export class CategoryModel implements Category {
  id: string;
  name: string;
  icon: string;
  endpoint: string;

  constructor(data: Category) {
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.endpoint = data.endpoint;
  }

  /**
   * 验证分类数据是否有效
   */
  static validate(data: any): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const required = ['id', 'name', 'endpoint'];
    for (const field of required) {
      if (!(field in data) || typeof data[field] !== 'string') {
        return false;
      }
    }

    return true;
  }
}
