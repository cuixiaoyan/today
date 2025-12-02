import { Category } from './index';

/**
 * 预定义的API端点分类（严格按照llms.txt顺序，仅包含已验证可用的接口）
 */
export const API_CATEGORIES: Category[] = [
  // 🔥 热门榜单（按llms.txt顺序）
  { 
    id: 'douyin', 
    name: '抖音热搜', 
    endpoint: '/v2/douyin', 
    icon: '🎵' 
  },
  { 
    id: 'xiaohongshu', 
    name: '小红书热点', 
    endpoint: '/v2/rednote', 
    icon: '📕' 
  },
  { 
    id: 'quark', 
    name: '夸克热点', 
    endpoint: '/v2/quark', 
    icon: '⚡' 
  },
  { 
    id: 'weibo', 
    name: '微博热搜', 
    endpoint: '/v2/weibo', 
    icon: '🔥' 
  },
  { 
    id: 'baidu', 
    name: '百度实时热搜', 
    endpoint: '/v2/baidu/hot', 
    icon: '🔍' 
  },
  { 
    id: 'baidu-tv', 
    name: '百度电视剧榜', 
    endpoint: '/v2/baidu/teleplay', 
    icon: '📺' 
  },
  { 
    id: 'baidu-tieba', 
    name: '百度贴吧话题榜', 
    endpoint: '/v2/baidu/tieba', 
    icon: '💬' 
  },
  { 
    id: 'toutiao', 
    name: '头条热搜榜', 
    endpoint: '/v2/toutiao', 
    icon: '📄' 
  },
  { 
    id: 'zhihu', 
    name: '知乎话题榜', 
    endpoint: '/v2/zhihu', 
    icon: '💡' 
  },
  { 
    id: 'dongchedi', 
    name: '懂车帝热搜', 
    endpoint: '/v2/dongchedi', 
    icon: '🚗' 
  },
  { 
    id: 'netease-music', 
    name: '网易云榜单列表', 
    endpoint: '/v2/ncm-rank/list', 
    icon: '🎵' 
  },
  { 
    id: 'maoyan-global', 
    name: '猫眼全球票房总榜', 
    endpoint: '/v2/maoyan/all/movie', 
    icon: '🎬' 
  },
  { 
    id: 'maoyan-movie', 
    name: '猫眼电影实时票房', 
    endpoint: '/v2/maoyan/realtime/movie', 
    icon: '🎥' 
  },
  { 
    id: 'maoyan-tv', 
    name: '猫眼电视收视排行', 
    endpoint: '/v2/maoyan/realtime/tv', 
    icon: '📺' 
  },
  { 
    id: 'maoyan-drama', 
    name: '猫眼网剧实时热度', 
    endpoint: '/v2/maoyan/realtime/web', 
    icon: '🎭' 
  },
  
  // 🕘 周期资讯（按llms.txt顺序）
  { 
    id: '60s', 
    name: '每天60秒读懂世界', 
    endpoint: '/v2/60s', 
    icon: '📰' 
  },
  { 
    id: 'ai-news', 
    name: 'AI资讯快报', 
    endpoint: '/v2/ai-news', 
    icon: '🤖' 
  },
  { 
    id: 'history', 
    name: '历史上的今天', 
    endpoint: '/v2/history', 
    icon: '📅' 
  },
];

/**
 * 根据ID获取分类
 */
export function getCategoryById(id: string): Category | undefined {
  return API_CATEGORIES.find(cat => cat.id === id);
}

/**
 * 根据名称获取分类
 */
export function getCategoryByName(name: string): Category | undefined {
  return API_CATEGORIES.find(cat => cat.name === name);
}
