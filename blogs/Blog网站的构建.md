---
title: 【个人】Next.js TailwindCSS RemoteMDX 博客网站
category: project
tags:
  - project
publishedAt: 2023-08-23
description: 后端程序员初学前端，使用Next.js TailwindCSS RemoteMDX构建的博客网站
coverImageUrl: /images/black-markdown.png
---

详见：https://github.com/huiru-wang/blog

# Next.js TailwindCSS RemoteMDX 博客

一个后端程序员尝试学习前端，制作的基于 `Next.js`、 `TailwindCSS`、`next-remote-mdx` 的微像素风博客，博客文章是读取本地的md文件。

使用本地文件的方式，主要因为更习惯使用本地的Obsidian写博客文章、开发笔记，单独使用一个仓库。部署时只需要将对应的文章目录迁移到项目的指定读取目录即可；

预览博客：[robinverse.me](https://robinverse.me/)

## 简介

- **Markdown/MDX 支持**：支持 `.md` 和 `.mdx` 文件格式。
- **代码高亮**：使用 `rehype-prism-plus` 插件实现代码块高亮显示，支持单行代码高亮；
- **Markdown目录**：为标题标签（如 `h1`, `h2`）添加 ID，支持目录跳转。
- **Markdown Mermaid支持**：支持渲染`mermaid`图表、跟随主题切换；
- **多级目录内容支持**：markdown文件从本地读取，默认加载`examples`下的文件，支持多级文件夹结构，自动组装slug，访问对应的blog时解析找到对应文件。
- **响应式布局**：响应式布局，支持移动端访问。

![dark](/images/black-home.webp)

![white](/images/white-blogs.webp)

![markdownwhite](/images/black-markdown.webp)

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

# 文章内容格式

文章开头维护好对应的元数据信息`frontmatter`即可读取和加载；
```
---
title: Next.js TailwindCSS RemoteMDX 博客网站
category: project
tags:
  - project
publishedAt: 2024-06-15
description: 后端程序员初学前端，使用Next.js TailwindCSS RemoteMDX构建的博客网站
---

# 正文
```

# 地图旅行日记

在高德地图基础上，通过marker展示旅行日记；

![](/images/blog-travel-map-marker.webp)

# 项目简单部署

## Nginx配置文件和SSL支持

```shell
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
}

http {
        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        access_log /var/log/nginx/access.log;

        gzip on;

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;

        server {
                listen 80;
                listen [::]:80;
                server_name 106.15.48.213;

                return 301 https://www.robinverse.me$request_uri;
        }

        server {
                set $root /root/blog;
                listen 80;
                listen [::]:80;
                server_name robinverse.me www.robinverse.me;
                return 301 https://$host$request_uri;
        }

        server {
                listen 443 ssl;
                server_name robinverse.me www.robinverse.me;

                ssl_certificate /etc/nginx/ssl/robinverse.me.pem;
                ssl_certificate_key /etc/nginx/ssl/robinverse.me.key;

                location / {
                    proxy_pass http://127.0.0.1:3000;
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
                }
            }
    }    
```

## 部署脚本

个人博客在部署时，主要分为2块：
- 博客项目代码；
- 博客文章；（单独仓库，平时使用 obsidian 写文章）
部署的时候，分别拉取2个仓库的内容，在脚本中将文章迁移到项目的对应目录，然后启动项目即可；

```shell
#!/bin/bash
TARGET_DIR="/root"  # 工作目录
REPO_BLOG_URL="git@github.com:huiru-wang/blog.git"
REPO_BLOG_NAME="blog"
REPO_DEV_NOTE_URL="git@github.com:huiru-wang/dev-notes.git"
REPO_DEV_NOTE_NAME="dev-notes"

SOURCE_DEV_NOTE_DIR="${TARGET_DIR}/${REPO_DEV_NOTE_NAME}"
DEV_NOTE_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/dev-notes"

SOURCE_PROJECT_DIR="${TARGET_DIR}/${REPO_DEV_NOTE_NAME}/Projects"
PROJECT_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/blogs"

SOURCE_TRAVEL_LOGS_DIR="${TARGET_DIR}/${REPO_DEV_NOTE_NAME}/Travel"
TRAVEL_LOGS_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/travel-logs"

SOURCE_IMAGES_DIR="${TARGET_DIR}/${REPO_DEV_NOTE_NAME}/images"
DEV_IMAGES_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/public/images"  # 图片目录

# 1. 切换到工作目录
if [ ! -d "$TARGET_DIR" ]; then
    mkdir -p "$TARGET_DIR"
fi
cd "$TARGET_DIR" || { echo "无法切换到目录 $TARGET_DIR"; exit 1; }

# 2. 拉取项目代码
echo "================= Update Blog ================="
rm -rf "$REPO_BLOG_NAME"
git clone "$REPO_BLOG_URL"

# 3. 拉取文件
echo "================= Update Dev Note ================="
rm -rf "$REPO_DEV_NOTE_NAME"
git clone "$REPO_DEV_NOTE_URL"

# 4. 将文章移动到项目的指定目录
echo "================= Copy Dev Note ================="
if [ -d "$DEV_NOTE_DIR" ]; then
    rm -rf "$DEV_NOTE_DIR"
fi
if [ -d "$PROJECT_DIR" ]; then
    rm -rf "$PROJECT_DIR"
fi
if [ -d "$DEV_IMAGES_DIR" ]; then
    rm -rf "$DEV_IMAGES_DIR"
fi
if [ -d "$TRAVEL_LOGS_DIR" ]; then
    rm -rf "$TRAVEL_LOGS_DIR"
fi
mkdir -p "$DEV_NOTE_DIR"
mkdir -p "$PROJECT_DIR"
mkdir -p "$DEV_IMAGES_DIR"
mkdir -p "$TRAVEL_LOGS_DIR"
mv ${REPO_DEV_NOTE_NAME}/meta.json ${REPO_BLOG_NAME}/
mv ${SOURCE_TRAVEL_LOGS_DIR}/* ${TRAVEL_LOGS_DIR}/
mv ${SOURCE_PROJECT_DIR}/* ${PROJECT_DIR}/
mv ${SOURCE_IMAGES_DIR}/* ${DEV_IMAGES_DIR}/
mv ${SOURCE_DEV_NOTE_DIR}/* ${DEV_NOTE_DIR}/
rm -rf SOURCE_DEV_NOTE_DIR

# 5. 构建启动项目
echo "================= Build Blog App ================="
cd "${TARGET_DIR}/${REPO_BLOG_NAME}"
pnpm install
pnpm build

# 6. 重启 pm2 中的应用程序
if pm2 list | grep -q "blog"; then
    # 应用程序已经在 pm2 中，重启它
    echo "===================== Restarting application ====================="
    pm2 restart blog || { echo "Failed to restart pm2 application. Exiting."; exit 1; }
else
    # 应用程序不在 pm2 中，启动它
    echo "===================== Starting application ====================="
    pm2 start pnpm --name 'blog' -- start || { echo "Failed to start pm2 application. Exiting."; exit 1; }
fi
```

# Github-Webhook自动化更新

## 1. 内容更新脚本

脚本拉取最新的文章仓库，将文章移动到项目的对应目录，重启项目即可；

```shell
#!/bin/bash

TARGET_DIR="/root"  # 工作目录
REPO_BLOG_NAME="blog"
REPO_DEV_NOTE_URL="git@github.com:huiru-wang/dev-notes.git"
REPO_DEV_NOTE_NAME="dev-notes"

SOURCE_DEV_NOTE_DIR="${TARGET_DIR}/${REPO_DEV_NOTE_NAME}"
DEV_NOTE_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/dev-notes"

SOURCE_PROJECT_DIR="${TARGET_DIR}/${REPO_DEV_NOTE_NAME}/Projects"
PROJECT_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/blogs"

SOURCE_IMAGES_DIR="${TARGET_DIR}/${REPO_DEV_NOTE_NAME}/images"
DEV_IMAGES_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/public/images"  # 图片目录

# 1. 切换到工作目录
if [ ! -d "$TARGET_DIR" ]; then
    mkdir -p "$TARGET_DIR"
fi
cd "$TARGET_DIR" || { echo "无法切换到目录 $TARGET_DIR"; exit 1; }

# 2. 拉取文件
echo "================= Update Dev Note ================="
rm -rf "$REPO_DEV_NOTE_NAME"
git clone "$REPO_DEV_NOTE_URL"

# 3. 将文章移动到项目的指定目录
echo "================= Copy Dev Note ================="
if [ -d "$DEV_NOTE_DIR" ]; then
    rm -rf "$DEV_NOTE_DIR"
fi
if [ -d "$PROJECT_DIR" ]; then
    rm -rf "$PROJECT_DIR"
fi
if [ -d "$DEV_IMAGES_DIR" ]; then
    rm -rf "$DEV_IMAGES_DIR"
fi
mkdir -p "$DEV_NOTE_DIR"
mkdir -p "$PROJECT_DIR"
mkdir -p "$DEV_IMAGES_DIR"
mv ${SOURCE_PROJECT_DIR}/* ${PROJECT_DIR}/
mv ${SOURCE_IMAGES_DIR}/* ${DEV_IMAGES_DIR}/
mv ${SOURCE_DEV_NOTE_DIR}/* ${DEV_NOTE_DIR}/
rm -rf "${DEV_NOTE_DIR}/.git"
rm "${DEV_NOTE_DIR}/README.md"

# 4. 重启 pm2 中的应用程序
echo "================= Restart Blog App ================="
cd "${TARGET_DIR}/${REPO_BLOG_NAME}"

if pm2 list | grep -q "blog"; then
    # 应用程序已经在 pm2 中，重启它
    echo "===================== Restarting application ====================="
    pm2 stop blog
    pm2 start blog || { echo "Failed to restart pm2 application. Exiting."; exit 1; }
else
    # 应用程序不在 pm2 中，启动它
    echo "===================== Starting application ====================="
    pm2 start pnpm --name 'blog' -- start || { echo "Failed to start pm2 application. Exiting."; exit 1; }
fi
```
## 2. Github Webhook服务

在服务器启动一个Webhook服务；服务对外暴露一个接口，来提供给github调用；接口内执行对应的脚本即可；
### 2.1. 创建webhook暴露到公网
创建一个简易的node服务，提供一个`post`接口，来实现webhook：

```shell
mkdir github-webhook
cd github-webhook
pnpm init
pnpm add express child_process
```

添加启动脚本：
```json
{
  "name": "blog-webhook",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "child_process": "^1.0.2",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.7",
    "express": "^4.21.2"
  }
}
```

创建`server.js`
```js
const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 5000;

const HOOK_ID = '536763309';
const SCRIPT_PATH = '/root/blog-website/update_blog.sh';

// Webhook路由
app.post('/webhook', (req, res) => {
    const hookId = req.headers['x-github-hook-id'];
    const event = req.headers['x-github-event'];
    if (!hookId || hookId !== HOOK_ID) {
        console.log("HookId:", hookId);
        return res.status(400).send("Not Support Service");
    }
    if (!event) {
        console.error("Empty Event");
        return res.status(400).send("Empty Event");
    }
    switch (event) {
        case 'ping':
            return res.status(200).send(`pong`);
        case 'push':
            execShell();
            console.info("Start Exec Shell");
            return res.status(200).send("Success");
        default:
            console.error("Ignore Not Support Event");
            return res.status(200).send(`Not Support ${event} event`);
    }
});


function execShell() {
    // 执行部署脚本
    exec(`bash ${SCRIPT_PATH}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Blog Update Fail: ${error}`);
            return res.status(500).send(`Blog Update Fail: ${error.message}\n${stderr}`);
        }
        console.log(`Blog Update Success: ${stdout}`);
    });
}

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internel Error, dont do that again');
});

app.listen(port, () => {
    console.log(`Github Webhook serve on http://localhost:${port}`);
});
```

运行实例：
```shell
pm2 start pnpm --name 'github-webhook' -- start
```

修改Nginx配置，接口暴露到公网：

```shell
	server {
			listen 443 ssl;
			server_name robinverse.me www.robinverse.me;
	
			ssl_certificate /etc/nginx/ssl/robinverse.me.pem;
			ssl_certificate_key /etc/nginx/ssl/robinverse.me.key;

			# webhook路由
			location /webhook {
				proxy_pass http://127.0.0.1:5000;
				proxy_http_version 1.1;
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection 'upgrade';
				proxy_set_header Host $host;
				proxy_cache_bypass $http_upgrade;
			}
	
			location / {
				proxy_pass http://127.0.0.1:3000;
				proxy_http_version 1.1;
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection 'upgrade';
				proxy_set_header Host $host;
				proxy_cache_bypass $http_upgrade;
			}
		}
```

### 2.2 对应的内容仓库设置webhook

位置：仓库 -> Settings -> webhooks
- Payload URL：填上自己服务器的webhook；
- Content type：我这里选`application/json`；
- Secret：自行创建密钥；（服务器内自行添加验证逻辑）

Enable SSL verification：Optional；

Just the `push` event.：我这里只选push；

✅Active

创建即可，创建后会自动执行一次`ping`的webhook。后续push操作，自动执行。

![](/images/projects-blog-webhook.webp)
