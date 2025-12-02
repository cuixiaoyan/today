import React, { useState } from 'react';
import { AppProvider } from './context';
import { useNewsContext, usePreferencesContext } from './context';
import { Layout, NewsList } from './components';
import { DetailPanel } from './components/DetailPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useNews } from './hooks';
import { NewsItem } from './types';

function AppContent() {
  const { categories, selectedCategory, setSelectedCategory } = useNewsContext();
  const { followedCategories, followCategory, unfollowCategory } = usePreferencesContext();
  const { news, loading, error, refetch } = useNews(selectedCategory || undefined);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedNews(null); // 切换分类时关闭详情面板
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

  return (
    <Layout
      categories={categories}
      selectedCategory={selectedCategory}
      followedCategories={followedCategories}
      onSelectCategory={handleSelectCategory}
      onToggleFollow={handleToggleFollow}
    >
      <div className="flex h-full">
        {/* 新闻列表 - 占1/3宽度 */}
        <div className={`${selectedNews ? 'w-1/3' : 'w-full'} transition-all duration-300`}>
          <NewsList
            news={news}
            loading={loading}
            error={error}
            onRetry={refetch}
            onNewsClick={handleNewsClick}
          />
        </div>
        {/* 详情面板 - 占2/3宽度 */}
        {selectedNews && (
          <DetailPanel
            newsItem={selectedNews}
            onClose={handleCloseDetail}
          />
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
