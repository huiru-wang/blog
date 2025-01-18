#!/bin/bash

# 进入项目目录，将以下路径替换为你的项目实际路径
cd /root/blog

# 拉取最新的 Git 代码
echo "===================== Pulling latest Git code ====================="
git pull

# 使用 pnpm 进行重新构建
echo "===================== Rebuilding with pnpm ======================="
pnpm install
pnpm build

# 重启 pm2 中的应用程序，假设你的应用名称是 myapp，根据实际情况修改
if pm2 list | grep -q "blog"; then
    # 应用程序已经在 pm2 中，重启它
    echo "===================== Restarting application ====================="
    pm2 restart blog || { echo "Failed to restart pm2 application. Exiting."; exit 1; }
else
    # 应用程序不在 pm2 中，启动它
    echo "===================== Starting application ====================="
    pm2 start pnpm --name 'blog' -- start || { echo "Failed to start pm2 application. Exiting."; exit 1; }
fi