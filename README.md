# 资讯热搜网站

一个现代化的资讯热搜聚合网站，采用简约风格设计，支持深色模式，完美适配PC和移动端。

🌐 **在线体验**: [https://zx.cuicui.host](https://zx.cuicui.host)

![alt text](image.png)
![alt text](image-1.png)

## ✨ 功能特性

### 核心功能
- 🔥 **多平台热搜聚合** - 支持 20+ 热门平台的实时热搜
- 📰 **智能详情面板** - PC 端三分之一布局，移动端全屏显示
- 🌙 **深色模式** - 支持浅色/深色主题切换，自动保存偏好
- ⭐ **分类关注** - 关注感兴趣的分类，快速访问
- 📱 **响应式设计** - 完美适配桌面端和移动端

### 用户体验
- ⚡ **快速加载** - 智能缓存和重试机制
- 🎯 **自动选中** - PC 端自动显示第一条新闻详情
- 📂 **分类折叠** - 移动端分类列表可展开/收起
- 🔗 **外链跳转** - 一键跳转到新闻原文
- 💾 **本地存储** - 保存用户偏好和主题设置

### 界面设计
- 🎨 **iOS 风格** - 现代化的界面设计
- 🌈 **平滑过渡** - 流畅的动画效果
- 📐 **灵活布局** - 自适应不同屏幕尺寸
- 🎭 **深色模式** - 护眼的深色主题

## 🛠 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式方案**: Tailwind CSS 3
- **HTTP 客户端**: Axios
- **测试框架**: Vitest + React Testing Library
- **属性测试**: fast-check

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

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── CategoryFilter.tsx    # 分类筛选（支持移动端折叠）
│   ├── DetailPanel.tsx        # 详情面板
│   ├── ThemeToggle.tsx        # 主题切换按钮
│   ├── NewsList.tsx           # 新闻列表
│   ├── NewsCard.tsx           # 新闻卡片
│   └── ...
├── services/            # API 服务层
│   └── api.ts                 # 新闻 API 服务
├── hooks/               # 自定义 Hooks
│   ├── useNews.ts             # 新闻数据 Hook
│   ├── useTheme.ts            # 主题管理 Hook
│   ├── useResponsive.ts       # 响应式检测 Hook
│   └── ...
├── context/             # Context 提供者
│   ├── NewsContext.tsx        # 新闻上下文
│   └── PreferencesContext.tsx # 用户偏好上下文
├── types/               # TypeScript 类型定义
│   ├── index.ts               # 通用类型
│   ├── categories.ts          # 分类配置
│   └── models.ts              # 数据模型
├── utils/               # 工具函数
│   ├── storage.ts             # 本地存储
│   ├── errorHandler.ts        # 错误处理
│   └── retryManager.ts        # 重试管理
└── test/                # 测试配置
```

## 📡 支持的平台

基础 API: `https://60s.viki.moe`

### 热门榜单
- 🎵 抖音热搜
- 📕 小红书热点
- ⚡ 夸克热点
- 🔥 微博热搜
- 🔍 百度实时热搜
- 📺 百度电视剧榜
- 💬 百度贴吧话题榜
- 📄 头条热搜榜
- 💡 知乎话题榜
- 🚗 懂车帝热搜
- 🎵 网易云榜单
- 🎬 猫眼全球票房总榜
- 🎥 猫眼电影实时票房
- 📺 猫眼电视收视排行
- 🎭 猫眼网剧实时热度

### 周期资讯
- 📰 每天60秒读懂世界
- 🤖 AI资讯快报
- 📅 历史上的今天

## ⚙️ 环境变量

在 `.env` 文件中配置：

```env
# API 基础 URL
VITE_API_BASE_URL=https://60s.viki.moe

# 缓存时长（毫秒）
VITE_CACHE_DURATION=300000

# 最大重试次数
VITE_MAX_RETRIES=3
```

## 🎯 使用说明

### PC 端
1. 点击顶部分类按钮切换不同平台
2. 自动显示第一条新闻的详情
3. 点击新闻卡片切换详情内容
4. 点击"阅读原文"跳转到新闻源网站
5. 点击主题切换按钮切换深色/浅色模式

### 移动端
1. 点击"展开"按钮查看所有分类
2. 选择分类后自动收起列表
3. 点击新闻卡片全屏查看详情
4. 点击关闭按钮返回列表

## 🌟 特色功能

### 智能详情面板
- **PC 端**: 新闻列表占 1/3，详情面板占 2/3
- **移动端**: 详情面板全屏显示，返回后显示列表
- **自动选中**: PC 端切换分类后自动显示第一条新闻

### 深色模式
- 支持浅色/深色主题切换
- 自动保存用户偏好到本地存储
- 所有组件完美适配深色模式

### 移动端优化
- 分类列表可折叠，节省屏幕空间
- 选择分类后自动收起
- 详情面板全屏显示，更好的阅读体验

## 📝 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 React Hooks 最佳实践
- 组件采用函数式编程
- 使用 Context API 管理全局状态
- Tailwind CSS 实现响应式设计

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
