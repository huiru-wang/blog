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
echo "===================== Restarting application ====================="
pm2 restart blog