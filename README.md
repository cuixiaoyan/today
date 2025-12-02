# 资讯热搜网站

一个现代化的资讯热搜聚合网站，采用 iOS 风格设计，支持 PC 和移动端。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **HTTP 客户端**: Axios
- **测试框架**: Vitest + React Testing Library
- **属性测试**: fast-check

## 功能特性

- 📱 响应式设计，完美适配 PC 和移动端
- 🔥 实时热搜资讯聚合（微博、知乎、百度、抖音等）
- ⭐ 用户关注功能，个性化内容推荐
- 🎨 iOS 风格现代化界面
- ⚡ 性能优化，快速加载
- 💾 本地缓存，减少 API 调用

## 开始开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm run test
```

## 项目结构

```
src/
├── components/     # React 组件
├── services/       # API 服务层
├── hooks/          # 自定义 Hooks
├── context/        # Context 提供者
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数
└── test/           # 测试配置
```

## API 接口

基础 URL: `https://60s.viki.moe`

支持的平台：
- 60秒读懂世界
- 微博热搜
- 知乎热榜
- 百度热搜
- 抖音热搜
- 哔哩哔哩热搜
- 等等...

## 环境变量

在 `.env` 文件中配置：

```
VITE_API_BASE_URL=https://60s.viki.moe
VITE_CACHE_DURATION=300000
VITE_MAX_RETRIES=3
```
