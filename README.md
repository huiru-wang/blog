# Next.js TailwindCSS RemoteMDX 博客平台

一个后端程序员尝试学习前端，制作的基于 `Next.js`、 `TailwindCSS`、`next-remote-mdx` 的微像素风博客。

前端初学者，很多地方不完善，欢迎指正。

预览博客：[robinverse.me](https://robinverse.me/)

TODO
- SEO
- 丰富主页的个人介绍板块的UI和额外元素；
- Projects模块；
- 添加评论功能；

## 目录
- [简介](#简介)
- [功能特性](#功能特性)
- [安装与配置](#安装与配置)
- [开发](#开发)
- [文件结构](#文件结构)

## 简介

- **Markdown/MDX 支持**：支持 `.md` 和 `.mdx` 文件格式。
- **代码高亮**：使用 `rehype-prism-plus` 插件实现代码块高亮显示，支持单行代码高亮；
- **Markdown目录**：为标题标签（如 `h1`, `h2`）添加 ID，支持目录跳转。
- **Markdown Mermaid支持**：支持渲染`mermaid`图表；
- **多级目录内容支持**：markdown文件从本地读取，默认加载`examples`下的文件，支持多级文件夹结构，自动组装slug，访问对应的blog时解析找到对应文件。
- **Category/Tag筛选**：根据markdown `category` 和 `tag` 进行筛选过滤。
- **自定义Markdown组件**：自定义 markdown渲染组件；
- **黑白主题**：支持黑白主题切换。
- **响应式布局**：响应式布局，支持移动端访问。

![dark](/docs/black-home.png)

![white](/docs/white-blogs.png)

![markdownwhite](/docs/black-markdown.png)

<div style="display: flex;">
<img src="docs/mobile-home.jpg" width="30%" height="30%" center/>
<img src="docs/mobile-blogs.jpg" width="30%" height="30%" center/>
<img src="docs/mobile-projects.jpg" width="30%" height="30%" center/>
</div>


## 安装与配置


```bash
git clone https://github.com/huiru-wang/blog.git
cd blog
```

```bash
pnpm install
```

文件位置：
```env
BLOG_DIR=blogs  # 博客文件存放目录，默认为 "blogs"
```

将md、mdx文件放在blogs目录下即可访问；需配置好frontmatter，否则读取自动跳过
```ts
export type Frontmatter = {
    title: string;
    category: string;
    tags: string[];
    keywords?: string;
    publishedAt?: string;
    description?: string;
}
```

## 启动

启动：

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客平台。

## 文件结构

```
blog/
    ├── blogs/
    │   └── 博客文件.md/mdx
    ├── public/
    │   └── ...静态资源
    ├── src/
    │   ├── app/
    │   │   |── blogs/
    │   │   └── projects/
    │   │   └── layout.tsx
    │   │   └── page.tsx
    │   │   
    │   ├── components/
    │   │   └── ...React、Markdown 组件
    │   │  
    │   ├── lib/
    │   │   └── md.ts  # MDX 解析逻辑
    │   │  
    │   ├── styles/
    │   │   └── ...样式文件
    │   │  
    │   ├── providers/
    │   │   └── ThemeProvider.tsx
    │   │  
    ├── .env          # 环境变量配置
    ├── package.json  # 项目依赖
    └── README.md     # 项目说明
```