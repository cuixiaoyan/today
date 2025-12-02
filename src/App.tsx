import React, { useState, useEffect } from 'react';
import { AppProvider } from './context';
import { useNewsContext, usePreferencesContext } from './context';
import { Layout, NewsList } from './components';
import { DetailPanel } from './components/DetailPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useNews, useResponsive } from './hooks';
import { NewsItem } from './types';

function AppContent() {
  const { categories, selectedCategory, setSelectedCategory } = useNewsContext();
  const { followedCategories, followCategory, unfollowCategory } = usePreferencesContext();
  const { news, loading, error, refetch } = useNews(selectedCategory || undefined);
  const { isMobile } = useResponsive();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showOnlyFollowed, setShowOnlyFollowed] = useState(false);

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    // 切换分类时清空选中的新闻，让 useEffect 重新选择第一条
    setSelectedNews(null);
  };

  const handleToggleFollow = (categoryId: string) => {
    if (followedCategories.includes(categoryId)) {
      unfollowCategory(categoryId);
    } else {
      followCategory(categoryId);
    }
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseDetail = () => {
    setSelectedNews(null);
  };

  const handleShowFollowed = () => {
    setShowOnlyFollowed(!showOnlyFollowed);
    setSelectedCategory(null);
    setSelectedNews(null);
  };

  // 根据"我的关注"状态筛选分类
  const displayCategories = showOnlyFollowed
    ? categories.filter(cat => followedCategories.includes(cat.id))
    : categories;

  // PC端：新闻加载完成后自动选中第一条
  useEffect(() => {
    if (!isMobile && !loading && news.length > 0) {
      // 如果当前选中的新闻不在新的新闻列表中，或者没有选中的新闻，则选中第一条
      const isCurrentNewsInList = selectedNews && news.some(item => item.id === selectedNews.id);
      if (!isCurrentNewsInList) {
        setSelectedNews(news[0]);
      }
    }
  }, [news, loading, isMobile]);

  return (
    <Layout
      categories={displayCategories}
      selectedCategory={selectedCategory}
      followedCategories={followedCategories}
      onSelectCategory={handleSelectCategory}
      onToggleFollow={handleToggleFollow}
      onShowFollowed={handleShowFollowed}
    >
      <div className="flex h-full relative">
        {/* 新闻列表 */}
        <div 
          className={`
            ${isMobile 
              ? (selectedNews ? 'hidden' : 'w-full') 
              : (selectedNews ? 'w-1/3' : 'w-full')
            } 
            transition-all duration-300
          `}
        >
          <NewsList
            news={news}
            loading={loading}
            error={error}
            onRetry={refetch}
            onNewsClick={handleNewsClick}
          />
        </div>
        
        {/* 详情面板 */}
        {selectedNews && (
          <div 
            className={`
              ${isMobile 
                ? 'fixed inset-0 z-50' 
                : 'w-2/3'
              }
            `}
          >
            <DetailPanel
              newsItem={selectedNews}
              onClose={handleCloseDetail}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
