import { NewsItem } from '../types';

/**
 * 根据关注的分类对新闻进行优先级排序
 * @param news 新闻列表
 * @param followedCategories 关注的分类ID列表
 * @returns 排序后的新闻列表
 */
export function prioritizeNewsByFollowedCategories(
  news: NewsItem[],
  followedCategories: string[]
): NewsItem[] {
  // 如果没有关注任何分类，直接返回原列表
  if (followedCategories.length === 0) {
    return news;
  }

  // 将新闻分为两组：关注的和未关注的
  const followedNews: NewsItem[] = [];
  const unfollowedNews: NewsItem[] = [];

  news.forEach((item) => {
    if (followedCategories.includes(item.category)) {
      followedNews.push(item);
    } else {
      unfollowedNews.push(item);
    }
  });

  // 关注的新闻在前，未关注的在后
  return [...followedNews, ...unfollowedNews];
}

/**
 * 按时间戳排序新闻（最新的在前）
 */
export function sortNewsByTime(news: NewsItem[]): NewsItem[] {
  return [...news].sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * 按热度排序新闻
 */
export function sortNewsByHot(news: NewsItem[]): NewsItem[] {
  return [...news].sort((a, b) => {
    const hotA = typeof a.hot === 'number' ? a.hot : 0;
    const hotB = typeof b.hot === 'number' ? b.hot : 0;
    return hotB - hotA;
  });
}

/**
 * 过滤指定分类的新闻
 */
export function filterNewsByCategory(
  news: NewsItem[],
  categoryId: string
): NewsItem[] {
  return news.filter((item) => item.category === categoryId);
}

/**
 * 去重新闻（基于ID）
 */
export function deduplicateNews(news: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  return news.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}
