# 部署文档

## 构建生产版本

```bash
npm run build:prod
```

构建产物将生成在 `dist/` 目录中。

## 环境变量

生产环境的环境变量配置在 `.env.production` 文件中：

```
VITE_API_BASE_URL=https://60s.viki.moe
VITE_CACHE_DURATION=300000
VITE_MAX_RETRIES=3
```

## 部署到静态托管服务

### Vercel

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 部署：
```bash
vercel
```

### Netlify

1. 安装 Netlify CLI：
```bash
npm install -g netlify-cli
```

2. 部署：
```bash
netlify deploy --prod
```

### GitHub Pages

1. 修改 `vite.config.ts`，添加 base 路径：
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. 构建并部署：
```bash
npm run build:prod
```

3. 将 `dist/` 目录推送到 `gh-pages` 分支

### 服务器部署

将 `dist/` 目录中的所有文件上传到服务器的 web 根目录。

确保服务器配置了正确的 MIME 类型和 SPA 路由支持。

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 性能优化建议

1. **启用 CDN** - 使用 CDN 加速静态资源加载
2. **启用 HTTP/2** - 提升并发请求性能
3. **启用 Brotli 压缩** - 比 gzip 更好的压缩率
4. **配置缓存策略** - 为静态资源设置长期缓存
5. **使用 Service Worker** - 实现离线访问（可选）

## 监控和分析

建议集成以下工具：

- **Google Analytics** - 用户行为分析
- **Sentry** - 错误监控
- **Lighthouse** - 性能监控

## 浏览器支持

- Chrome/Edge: 最新 2 个版本
- Firefox: 最新 2 个版本
- Safari: 最新 2 个版本
- iOS Safari: 12+
- Android Chrome: 最新 2 个版本
