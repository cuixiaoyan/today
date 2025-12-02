import React from 'react';

/**
 * 加载动画组件 - iOS风格
 */
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-border rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-text-secondary text-sm">加载中...</p>
    </div>
  );
}
