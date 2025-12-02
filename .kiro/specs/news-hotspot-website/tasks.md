# Implementation Plan

- [x] 1. Initialize project structure and dependencies



  - Create Vite + React + TypeScript project
  - Install dependencies: axios, tailwindcss, fast-check, vitest, @testing-library/react
  - Configure Tailwind CSS with iOS-style design tokens
  - Set up project folder structure (components, services, hooks, types, utils)
  - Configure environment variables for API endpoint
  - _Requirements: All requirements (foundation)_



- [ ] 2. Implement core data models and type definitions
  - Define TypeScript interfaces for NewsItem, Category, APIResponse, UserPreferences
  - Create NewsItemModel class with validation and utility methods
  - Create CategoryModel class with validation
  - Define AppState and context interfaces
  - _Requirements: 2.2, 6.2_

- [ ]* 2.1 Write property test for JSON parsing correctness
  - **Property 15: JSON parsing correctness**


  - **Validates: Requirements 6.2**

- [ ] 3. Build API service layer
  - Create NewsAPIService class with axios instance (base URL: https://api.vvhan.com/api/hotlist)
  - Define API_CATEGORIES constant with all available endpoints (60s, weibo, zhihu, baidu, douyin, bilibili, etc.)
  - Implement getCategories() method to return predefined categories
  - Implement fetchNewsByCategory() method for single category (接口默认无参数)
  - Implement fetchMixedNews() method to fetch from multiple categories
  - Add response data normalization to unified NewsItem format
  - _Requirements: 6.1, 6.4_



- [ ]* 3.1 Write property test for API request format
  - **Property 14: API request format correctness**
  - **Validates: Requirements 6.1, 6.4**

- [ ] 4. Implement error handling system
  - Create ErrorType enum and AppError interface
  - Build ErrorHandler class with error classification methods
  - Implement getUserFriendlyMessage() for localized error messages
  - Create RetryManager class with exponential backoff logic
  - Integrate retry logic into API service
  - _Requirements: 2.3, 6.3, 6.5_

- [ ]* 4.1 Write property test for retry exponential backoff
  - **Property 17: Retry with exponential backoff**


  - **Validates: Requirements 6.5**

- [ ]* 4.2 Write property test for API error handling
  - **Property 16: API error handling**
  - **Validates: Requirements 6.3**

- [ ] 5. Create storage management system
  - Implement StorageManager class for localStorage operations
  - Add savePreferences() and loadPreferences() methods
  - Implement cacheNews() and getCachedNews() with timestamp validation
  - Add isCacheValid() method with configurable cache duration
  - _Requirements: 4.1, 4.2, 7.4_



- [ ]* 5.1 Write property test for preferences persistence
  - **Property 10: Preferences persistence round-trip**
  - **Validates: Requirements 4.1, 4.2**

- [ ]* 5.2 Write property test for cache effectiveness
  - **Property 19: Cache effectiveness**
  - **Validates: Requirements 7.4**

- [ ] 6. Build custom hooks for state management
  - Create useNews() hook for data fetching with loading and error states


  - Implement usePreferences() hook for managing followed categories
  - Build useResponsive() hook for detecting device type and viewport size
  - Add refetch functionality to useNews hook
  - _Requirements: 2.1, 2.4, 4.1, 4.2, 1.1, 1.2_



- [ ]* 6.1 Write unit tests for custom hooks
  - Test useNews hook with various states
  - Test usePreferences hook operations
  - Test useResponsive hook breakpoint detection

- [ ] 7. Create context providers for global state
  - Implement NewsContext with provider component
  - Implement PreferencesContext with provider component
  - Create combined AppProvider wrapper component
  - _Requirements: 2.1, 4.1_

- [x] 8. Build core UI components - NewsCard


  - Create NewsCard component with iOS-style card design
  - Implement click handler for navigation
  - Add formatted date display using NewsItemModel methods
  - Apply responsive styling for mobile and desktop
  - _Requirements: 2.2, 2.5_

- [ ]* 8.1 Write property test for news item content completeness
  - **Property 3: News item content completeness**
  - **Validates: Requirements 2.2**

- [ ]* 8.2 Write property test for news item navigation
  - **Property 5: News item navigation**
  - **Validates: Requirements 2.5**

- [ ] 9. Build NewsList component
  - Create NewsList component to render array of NewsCard components
  - Implement loading state with LoadingSpinner component
  - Add error state display with retry button


  - Implement empty state when no news available
  - Add lazy loading for images using Intersection Observer
  - _Requirements: 2.1, 2.3, 2.4, 7.3_

- [ ]* 9.1 Write property test for loading state visibility
  - **Property 4: Loading state visibility**
  - **Validates: Requirements 2.4**

- [ ]* 9.2 Write property test for image lazy loading
  - **Property 18: Image lazy loading**
  - **Validates: Requirements 7.3**

- [ ]* 9.3 Write property test for news data rendering
  - **Property 2: News data fetching and rendering**
  - **Validates: Requirements 2.1**

- [ ] 10. Build CategoryFilter component
  - Create CategoryFilter component with horizontal scrollable layout
  - Display all predefined categories with emoji icons (📰 60秒, 🔥 微博, 💡 知乎, etc.)
  - Implement category selection logic
  - Add visual feedback for selected category (iOS-style highlight with smooth animation)
  - Implement follow/unfollow toggle (star icon) for each category
  - Add "All" option to show mixed content from followed categories
  - Apply responsive design for mobile (vertical scroll) and desktop (horizontal scroll)


  - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.3_

- [ ]* 10.1 Write property test for category list completeness
  - **Property 6: Category list completeness**
  - **Validates: Requirements 3.1**

- [ ]* 10.2 Write property test for category filtering correctness
  - **Property 7: Category filtering correctness**
  - **Validates: Requirements 3.2**

- [ ]* 10.3 Write property test for selected category visual feedback
  - **Property 8: Selected category visual feedback**


  - **Validates: Requirements 3.3**

- [ ]* 10.4 Write property test for filter reset
  - **Property 9: Filter reset completeness**
  - **Validates: Requirements 3.4**

- [ ] 11. Implement news prioritization logic
  - Create utility function to sort news by followed categories
  - Integrate prioritization into useNews hook
  - Ensure prioritization only applies when user has followed categories


  - _Requirements: 4.3, 4.5_

- [ ]* 11.1 Write property test for news prioritization
  - **Property 11: News prioritization by followed categories**
  - **Validates: Requirements 4.3**


- [ ]* 11.2 Write property test for unfollow state update
  - **Property 12: Unfollow updates state**
  - **Validates: Requirements 4.4**

- [ ] 12. Build layout components
  - Create Header component with logo and CategoryFilter integration
  - Create MainContent component as container for NewsList
  - Create Footer component with minimal iOS-style design
  - Build Layout component to compose Header, MainContent, and Footer
  - Implement responsive layout switching based on viewport
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 12.1 Write property test for responsive layout adaptation
  - **Property 1: Responsive layout adaptation**

  - **Validates: Requirements 1.1, 1.2, 1.3**

- [ ] 13. Create App component and wire everything together
  - Build App component with ErrorBoundary wrapper
  - Integrate AppProvider for global state
  - Compose Layout with all child components
  - Add React Router if needed for navigation


  - Implement initial data fetching on mount
  - _Requirements: All requirements_

- [ ] 14. Implement iOS-style design system
  - Create CSS custom properties for design tokens (colors, spacing, shadows, etc.)
  - Apply iOS-style card designs with rounded corners (12px) and subtle shadows
  - Design beautiful inline icons for each category using emoji or icon library
  - Implement smooth transitions and animations (under 300ms)
  - Use system font stack (-apple-system, BlinkMacSystemFont) for native iOS feel
  - Add hover and active states with scale transforms for interactive elements
  - Create gradient backgrounds and glassmorphism effects for modern look
  - Design clean, minimalist news cards with proper typography hierarchy
  - _Requirements: 5.1, 5.2, 5.3, 5.5_



- [ ]* 14.1 Write property test for color contrast accessibility
  - **Property 13: Color contrast accessibility**
  - **Validates: Requirements 5.4**

- [x] 15. Optimize performance


  - Implement code splitting for lazy-loaded components
  - Configure Vite build optimization (minification, tree shaking)
  - Set up manual chunks for vendor code
  - Add image optimization and WebP format support
  - Verify cache implementation is working correctly
  - _Requirements: 7.1, 7.2, 7.4_

- [ ] 16. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 17. Add integration tests
  - Test complete user flow: browse → filter → follow → refresh
  - Test API integration with mock server
  - Test error recovery scenarios
  - Test responsive behavior across breakpoints

- [ ]* 18. Perform accessibility audit
  - Run axe-core automated accessibility tests
  - Test keyboard navigation functionality
  - Verify screen reader compatibility
  - Validate color contrast ratios meet WCAG AA standards
  - _Requirements: 5.4_

- [ ] 19. Create production build configuration
  - Set up environment variables for production
  - Configure Vite build settings with proper target and minification
  - Add build scripts to package.json
  - Create deployment documentation
  - _Requirements: All requirements_

- [ ] 20. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
