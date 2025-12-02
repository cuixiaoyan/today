# Design Document

## Overview

资讯热搜网站是一个响应式Web应用，采用现代化的前端技术栈构建。系统通过对接外部API获取热搜资讯数据，为用户提供跨设备的浏览体验。界面设计遵循iOS风格，注重简约和现代感。

核心技术选型：
- **前端框架**: React 18+ with TypeScript
- **样式方案**: Tailwind CSS + CSS Modules
- **状态管理**: React Context API + Custom Hooks
- **HTTP客户端**: Axios
- **构建工具**: Vite
- **响应式设计**: Mobile-first approach with breakpoints

## Architecture

系统采用分层架构设计：

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (React Components + iOS Styling)   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Application Layer           │
│   (Hooks, Context, State Logic)     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│          Service Layer              │
│    (API Client, Data Fetching)      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Storage Layer               │
│      (LocalStorage, Cache)          │
└─────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   └── CategoryFilter
│   ├── MainContent
│   │   ├── NewsList
│   │   │   └── NewsCard (multiple)
│   │   └── LoadingSpinner
│   └── Footer
└── ErrorBoundary
```

## Components and Interfaces

### 1. API Service Layer

```typescript
interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  timestamp: number;
  url?: string;
  description?: string;
  hot?: string | number; // 热度值
  index?: number; // 排名
}

interface Category {
  id: string;
  name: string;
  icon?: string;
  endpoint: string; // API端点路径
}

interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 预定义的API端点分类
const API_CATEGORIES = [
  { id: '60s', name: '60秒读懂世界', endpoint: '/60s', icon: '📰' },
  { id: 'history', name: '历史上的今天', endpoint: '/history', icon: '📅' },
  { id: 'netease', name: '网易新闻', endpoint: '/netease', icon: '📱' },
  { id: 'weibo', name: '微博热搜', endpoint: '/weibo', icon: '🔥' },
  { id: 'zhihu', name: '知乎热榜', endpoint: '/zhihu', icon: '💡' },
  { id: 'baidu', name: '百度热搜', endpoint: '/baidu', icon: '🔍' },
  { id: 'douyin', name: '抖音热搜', endpoint: '/douyin', icon: '🎵' },
  { id: 'bilibili', name: '哔哩哔哩热搜', endpoint: '/bilibili', icon: '📺' },
  { id: 'toutiao', name: '今日头条', endpoint: '/toutiao', icon: '📄' },
  { id: '36kr', name: '36氪', endpoint: '/36kr', icon: '💼' },
  { id: 'ithome', name: 'IT之家', endpoint: '/ithome', icon: '💻' },
  { id: 'thepaper', name: '澎湃新闻', endpoint: '/thepaper', icon: '📰' },
];

class NewsAPIService {
  private baseURL: string = 'https://api.vvhan.com/api/hotlist';
  private axiosInstance: AxiosInstance;
  
  // 获取所有可用分类
  getCategories(): Category[] {
    return API_CATEGORIES;
  }
  
  // 根据分类获取热搜数据（接口默认无参数）
  async fetchNewsByCategory(categoryId: string): Promise<NewsItem[]>;
  
  // 获取多个分类的混合热搜
  async fetchMixedNews(categoryIds: string[]): Promise<NewsItem[]>;
  
  // 刷新单个分类数据
  async refreshCategory(categoryId: string): Promise<NewsItem[]>;
}
```

### 2. State Management

```typescript
interface AppState {
  news: NewsItem[];
  categories: Category[];
  followedCategories: string[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
}

interface UserPreferences {
  followedCategories: string[];
  theme?: 'light' | 'dark';
}

// Context API
const NewsContext = React.createContext<AppState | undefined>(undefined);
const PreferencesContext = React.createContext<UserPreferences | undefined>(undefined);
```

### 3. Custom Hooks

```typescript
// Data fetching hook
function useNews(categoryId?: string): {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// User preferences hook
function usePreferences(): {
  followedCategories: string[];
  followCategory: (categoryId: string) => void;
  unfollowCategory: (categoryId: string) => void;
}

// Responsive design hook
function useResponsive(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
```

### 4. UI Components

```typescript
// NewsCard Component
interface NewsCardProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
}

// CategoryFilter Component
interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  followedCategories: string[];
  onSelectCategory: (categoryId: string | null) => void;
  onToggleFollow: (categoryId: string) => void;
}

// NewsList Component
interface NewsListProps {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}
```

## Data Models

### NewsItem Model

```typescript
class NewsItemModel {
  constructor(
    public id: string,
    public title: string,
    public source: string,
    public category: string,
    public timestamp: number,
    public url?: string,
    public description?: string
  ) {}
  
  // Format timestamp to readable date
  getFormattedDate(): string;
  
  // Check if news is recent (within 24 hours)
  isRecent(): boolean;
  
  // Validate news item data
  static validate(data: any): boolean;
}
```

### Category Model

```typescript
class CategoryModel {
  constructor(
    public id: string,
    public name: string,
    public icon?: string
  ) {}
  
  static validate(data: any): boolean;
}
```

### LocalStorage Manager

```typescript
class StorageManager {
  private static PREFERENCES_KEY = 'user_preferences';
  private static CACHE_KEY = 'news_cache';
  private static CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  
  static savePreferences(preferences: UserPreferences): void;
  static loadPreferences(): UserPreferences | null;
  
  static cacheNews(news: NewsItem[]): void;
  static getCachedNews(): NewsItem[] | null;
  static isCacheValid(): boolean;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Responsive layout adaptation
*For any* viewport width, the system should apply the appropriate layout (mobile, tablet, or desktop) based on defined breakpoints, and layout changes should occur without page reload when viewport is resized.
**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: News data fetching and rendering
*For any* successful API response containing news items, the system should render all returned news items on the homepage.
**Validates: Requirements 2.1**

### Property 3: News item content completeness
*For any* news item rendered in the UI, the displayed content should include the title, source, and formatted timestamp from the news data.
**Validates: Requirements 2.2**

### Property 4: Loading state visibility
*For any* asynchronous data fetching operation, the system should display a loading indicator while the operation is in progress.
**Validates: Requirements 2.4**

### Property 5: News item navigation
*For any* news item displayed in the list, clicking on it should trigger navigation to either a detail view or external URL.
**Validates: Requirements 2.5**

### Property 6: Category list completeness
*For any* API response containing categories, the system should render all categories in the category filter UI.
**Validates: Requirements 3.1**

### Property 7: Category filtering correctness
*For any* selected category filter, all displayed news items should belong to that category, and no news items from other categories should be visible.
**Validates: Requirements 3.2**

### Property 8: Selected category visual feedback
*For any* active category filter, the selected category should have distinct visual styling to indicate its selected state.
**Validates: Requirements 3.3**

### Property 9: Filter reset completeness
*For any* filtered news list, clearing the category filter should restore the display to show all available news items.
**Validates: Requirements 3.4**

### Property 10: Preferences persistence round-trip
*For any* set of followed categories, saving them to localStorage and then retrieving them should return the same set of categories, and these preferences should be automatically loaded when the user returns to the website.
**Validates: Requirements 4.1, 4.2**

### Property 11: News prioritization by followed categories
*For any* non-empty set of followed categories, news items from those categories should appear before news items from non-followed categories in the display order.
**Validates: Requirements 4.3**

### Property 12: Unfollow updates state
*For any* followed category, unfollowing it should remove it from the followed list in both localStorage and the UI state, and the news display should update accordingly.
**Validates: Requirements 4.4**

### Property 13: Color contrast accessibility
*For any* text element displayed on a background, the color combination should meet WCAG AA contrast ratio requirements (minimum 4.5:1 for normal text, 3:1 for large text).
**Validates: Requirements 5.4**

### Property 14: API request format correctness
*For any* API request made by the system, the request should be sent to the correct endpoint with proper headers and parameters as specified in the API documentation.
**Validates: Requirements 6.1, 6.4**

### Property 15: JSON parsing correctness
*For any* valid JSON response from the API, the system should successfully parse it and produce correctly typed data structures matching the expected interfaces.
**Validates: Requirements 6.2**

### Property 16: API error handling
*For any* API response containing an error code, the system should handle it gracefully by displaying an appropriate error message to the user and providing recovery options.
**Validates: Requirements 6.3**

### Property 17: Retry with exponential backoff
*For any* failed API request due to network unavailability, the system should implement retry logic where each subsequent retry attempt waits exponentially longer than the previous attempt.
**Validates: Requirements 6.5**

### Property 18: Image lazy loading
*For any* image element in the news list, images that are outside the current viewport should not be loaded until they are about to enter the viewport.
**Validates: Requirements 7.3**

### Property 19: Cache effectiveness
*For any* identical API request made within the cache validity period, the system should return cached data instead of making a new API call.
**Validates: Requirements 7.4**

## Error Handling

### API Error Handling Strategy

```typescript
enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

interface AppError {
  type: ErrorType;
  message: string;
  code?: number;
  retryable: boolean;
}

class ErrorHandler {
  static handleAPIError(error: any): AppError;
  static handleNetworkError(error: any): AppError;
  static handleParseError(error: any): AppError;
  
  static getUserFriendlyMessage(error: AppError): string;
  static shouldRetry(error: AppError): boolean;
}
```

### Error Scenarios

1. **Network Failure**: Display "网络连接失败，请检查您的网络设置" with retry button
2. **API Error (4xx)**: Display specific error message from API response
3. **API Error (5xx)**: Display "服务器暂时不可用，请稍后重试" with retry button
4. **Parse Error**: Log error and display "数据格式错误，请刷新页面"
5. **Validation Error**: Silently filter invalid data and log warning

### Retry Logic

```typescript
class RetryManager {
  private maxRetries = 3;
  private baseDelay = 1000; // 1 second
  
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    retryable: boolean
  ): Promise<T> {
    // Implement exponential backoff: 1s, 2s, 4s
  }
}
```

## Testing Strategy

### Unit Testing

使用 **Vitest** 作为单元测试框架，配合 **React Testing Library** 进行组件测试。

**测试覆盖范围**：
- API Service层的所有方法
- 数据模型的验证和转换逻辑
- Custom Hooks的状态管理逻辑
- StorageManager的读写操作
- ErrorHandler的错误处理逻辑
- 关键UI组件的渲染和交互

**示例测试**：
```typescript
describe('NewsAPIService', () => {
  it('should fetch hot news successfully', async () => {
    // Test specific example of successful API call
  });
  
  it('should handle API error responses', () => {
    // Test error handling with specific error codes
  });
});

describe('StorageManager', () => {
  it('should save and load preferences correctly', () => {
    // Test specific example of storage operations
  });
});
```

### Property-Based Testing

使用 **fast-check** 作为属性测试库，验证系统的通用正确性属性。

**配置要求**：
- 每个属性测试至少运行 100 次迭代
- 每个测试必须使用注释标记对应的设计文档属性
- 标记格式：`// Feature: news-hotspot-website, Property X: [property description]`

**测试策略**：
- 生成随机的新闻数据、分类数据和用户偏好
- 测试响应式布局在各种视口尺寸下的行为
- 验证过滤、排序和缓存逻辑的正确性
- 测试localStorage的持久化round-trip
- 验证API请求格式和错误处理

**示例属性测试**：
```typescript
import fc from 'fast-check';

// Feature: news-hotspot-website, Property 10: Preferences persistence round-trip
describe('Property 10: Preferences persistence', () => {
  it('should preserve followed categories through save and load cycle', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string(), { minLength: 0, maxLength: 10 }),
        (followedCategories) => {
          const preferences = { followedCategories };
          StorageManager.savePreferences(preferences);
          const loaded = StorageManager.loadPreferences();
          expect(loaded?.followedCategories).toEqual(followedCategories);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: news-hotspot-website, Property 7: Category filtering correctness
describe('Property 7: Category filtering', () => {
  it('should only display news from selected category', () => {
    fc.assert(
      fc.property(
        fc.array(newsItemArbitrary()),
        fc.string(),
        (allNews, selectedCategory) => {
          const filtered = filterNewsByCategory(allNews, selectedCategory);
          expect(filtered.every(item => item.category === selectedCategory)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

- 测试API Service与实际API端点的集成（使用mock server）
- 测试组件之间的数据流和状态同步
- 测试完整的用户流程（浏览 → 筛选 → 关注 → 刷新）

### Accessibility Testing

- 使用 **axe-core** 进行自动化可访问性测试
- 验证键盘导航功能
- 测试屏幕阅读器兼容性
- 验证颜色对比度（Property 13）

## iOS-Style Design Specifications

### Design Tokens

```css
:root {
  /* Colors - iOS inspired palette */
  --color-primary: #007AFF;
  --color-background: #F2F2F7;
  --color-surface: #FFFFFF;
  --color-text-primary: #000000;
  --color-text-secondary: #8E8E93;
  --color-border: #C6C6C8;
  --color-error: #FF3B30;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

### Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: '0px',      // 0 - 767px
  tablet: '768px',    // 768px - 1023px
  desktop: '1024px'   // 1024px+
};
```

### Component Styling Guidelines

1. **Cards**: Use `--radius-md`, `--shadow-sm`, white background
2. **Buttons**: Use `--radius-sm`, `--transition-fast` for hover effects
3. **Lists**: Use subtle dividers with `--color-border`
4. **Typography**: Use system font stack for native feel
5. **Animations**: Keep under 300ms, use ease-out timing

## Performance Optimization

### Code Splitting

```typescript
// Lazy load routes and heavy components
const NewsDetail = lazy(() => import('./components/NewsDetail'));
const CategoryManager = lazy(() => import('./components/CategoryManager'));
```

### Caching Strategy

- **API Cache**: 5 minutes for news data, 1 hour for categories
- **Image Cache**: Browser cache with appropriate headers
- **Service Worker**: Consider implementing for offline support (future enhancement)

### Bundle Optimization

- Tree shaking for unused code
- Minification and compression
- Dynamic imports for non-critical features
- Image optimization (WebP format with fallbacks)

## Deployment Considerations

### Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'utils': ['axios', 'date-fns']
        }
      }
    }
  }
});
```

### Environment Variables

```
VITE_API_BASE_URL=https://api.vvhan.com/api/hotlist
VITE_CACHE_DURATION=300000
VITE_MAX_RETRIES=3
```

### Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- iOS Safari: 12+
- Android Chrome: Last 2 versions

## Security Considerations

1. **XSS Prevention**: Sanitize all user inputs and API responses
2. **HTTPS Only**: Enforce secure connections
3. **Content Security Policy**: Implement appropriate CSP headers
4. **API Key Management**: Store API keys in environment variables, never in code
5. **Data Validation**: Validate all data from external sources before use
