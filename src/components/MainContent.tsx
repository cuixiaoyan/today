import React, { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

/**
 * 主内容区域组件
 */
export function MainContent({ children }: MainContentProps) {
  return (
    <main className="container mx-auto px-4 py-6">
      {children}
    </main>
  );
}
