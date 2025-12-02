import React from 'react';
import { AppProvider } from './context';
import { useNewsContext, usePreferencesContext } from './context';
import { Layout, NewsList } from './components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useNews } from './hooks';

function AppContent() {
  const { categories, selectedCategory, setSelectedCategory } = useNewsContext();
  const { followedCategories, followCategory, unfollowCategory } = usePreferencesContext();
  const { news, loading, error, refetch } = useNews(selectedCategory || undefined);

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleToggleFollow = (categoryId: string) => {
    if (followedCategories.includes(categoryId)) {
      unfollowCategory(categoryId);
    } else {
      followCategory(categoryId);
    }
  };

  return (
    <Layout
      categories={categories}
      selectedCategory={selectedCategory}
      followedCategories={followedCategories}
      onSelectCategory={handleSelectCategory}
      onToggleFollow={handleToggleFollow}
    >
      <NewsList
        news={news}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
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
