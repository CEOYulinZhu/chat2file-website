# chat2file-website

chat2file-deepseek-web 是一个基于 Next.js 构建的现代化、国际化的 Web 应用程序。该项目旨在提供一个清晰、可扩展的前端架构，集成了多语言支持、响应式设计和丰富的 UI 组件。

## ✨ 功能特性

- **国际化 (i18n)**: 支持多种语言（中文、英文、日文），内容根据用户偏好动态切换。
- **组件化架构**: 使用 React 和 TypeScript 构建了可复用的 UI 组件，提高了开发效率和代码可维护性。
- **现代化 UI**: 采用 Tailwind CSS 和 Framer Motion，实现了美观、流畅的响应式用户界面和动画效果。
- **SEO 友好**: 通过 Next.js 的服务端渲染和静态站点生成功能，自动生成页面的 `meta` 标签，优化了搜索引擎排名。
- **清晰的项目结构**: 合理的目录组织，将组件、国际化文件、页面和工具函数分门别类，易于理解和扩展。

## 📄 页面内容

项目的主页面由以下几个核心部分组成，每个部分都是一个独立的组件，易于维护和扩展：

- **Header (页眉)**: 位于页面顶部，包含 Logo、导航链接。
- **Hero (主视觉区)**: 吸引用户的首屏内容，包含应用的标题、简短介绍和主要操作入口。
- **Features (功能介绍)**: 分点介绍应用的核心功能和优势。
- **Showcase (案例展示)**: 通过图片或截图展示应用的实际使用场景和效果。
- **Timeline (发展历程)**: 以时间线的形式呈现项目的重要节点或工作流程。
- **Help (帮助中心)**: 提供常见问题解答或用户帮助信息。
- **Feedback (用户反馈)**: 展示来自用户的评价或感言。
- **Footer (页脚)**: 位于页面底部，包含版权信息和语言切换功能。

## 🛠️ 技术栈

- **框架**: [Next.js](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **UI 库**: [React](https://react.dev/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **国际化**: [next-intl](https://next-intl-docs.vercel.app/)

## 🚀 本地运行

1.  **克隆仓库**

    ```bash
    git clone https://github.com/your-username/chat2file-deepseek-web.git
    cd chat2file-deepseek-web
    ```

2.  **安装依赖**

    ```bash
    npm install
    ```

3.  **启动开发服务器**

    ```bash
    npm run dev
    ```

    打开 [http://localhost:3000](http://localhost:3000) 即可在浏览器中查看项目。

## 📂 项目结构

```
/
├── public/                # 静态资源，如图片、字体等
├── src/
│   ├── app/
│   │   └── [locale]/      # Next.js App Router, 按语言区域划分
│   │       ├── layout.tsx # 页面布局
│   │       ├── page.tsx   # 主页面
│   │       └── globals.css# 全局样式
│   ├── components/
│   │   ├── common/        # 通用组件 (页头, 页脚等)
│   │   ├── sections/      # 页面区域组件 (特性, 时间线等)
│   │   └── ui/            # 基础 UI 元素 (按钮等)
│   ├── dictionaries/      # 国际化 (i18n) 字典文件
│   ├── get-dictionary.ts  # 获取字典的工具函数
│   ├── i18n-config.ts     # i18n 配置文件
│   ├── middleware.ts      # Next.js 中间件，处理路由和国际化
│   └── ...
├── next.config.ts         # Next.js 配置文件
├── package.json           # 项目依赖和脚本
└── tsconfig.json          # TypeScript 配置文件
```