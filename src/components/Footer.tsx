import React from 'react';

/**
 * 页面底部组件 - iOS风格
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm text-text-secondary mb-2">
            资讯热搜网站 · 实时热点资讯聚合
          </p>
          <p className="text-xs text-text-secondary">
            © {currentYear} All rights reserved
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-text-secondary">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-fast"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-fast"
            >
              关于
            </a>
            <span>·</span>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-fast"
            >
              反馈
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
