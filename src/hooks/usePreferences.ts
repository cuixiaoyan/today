import { useState, useEffect, useCallback } from 'react';
import { StorageManager } from '../utils/storage';

interface UsePreferencesReturn {
  followedCategories: string[];
  followCategory: (categoryId: string) => void;
  unfollowCategory: (categoryId: string) => void;
  isFollowing: (categoryId: string) => boolean;
}

/**
 * 用户偏好设置Hook
 */
export function usePreferences(): UsePreferencesReturn {
  const [followedCategories, setFollowedCategories] = useState<string[]>([]);

  // 初始化时加载偏好设置
  useEffect(() => {
    const preferences = StorageManager.loadPreferences();
    if (preferences && preferences.followedCategories) {
      setFollowedCategories(preferences.followedCategories);
    }
  }, []);

  // 关注分类
  const followCategory = useCallback((categoryId: string) => {
    setFollowedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev;
      }
      const updated = [...prev, categoryId];
      StorageManager.savePreferences({ followedCategories: updated });
      return updated;
    });
  }, []);

  // 取消关注分类
  const unfollowCategory = useCallback((categoryId: string) => {
    setFollowedCategories(prev => {
      const updated = prev.filter(id => id !== categoryId);
      StorageManager.savePreferences({ followedCategories: updated });
      return updated;
    });
  }, []);

  // 检查是否已关注
  const isFollowing = useCallback((categoryId: string): boolean => {
    return followedCategories.includes(categoryId);
  }, [followedCategories]);

  return {
    followedCategories,
    followCategory,
    unfollowCategory,
    isFollowing,
  };
}
