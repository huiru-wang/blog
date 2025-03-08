```shell
#!/bin/bash

TARGET_DIR="/root/blog-website"  # 工作目录
REPO_BLOG_URL="git@github.com:huiru-wang/blog.git"
REPO_BLOG_NAME="blog"                   # 仓库A目录名
REPO_DEV_NOTE_URL="git@github.com:huiru-wang/dev-notes.git"
REPO_DEV_NOTE_NAME="dev-notes"                   # 仓库B目录名
DEV_NOTE_DIR="${TARGET_DIR}/dev-notes"        # 仓库B中的目标目录
PROJECT_DIR="${TARGET_DIR}/blogs"
DEV_NOTE_IMAGES_DIR="${TARGET_DIR}/${REPO_BLOG_NAME}/public/images"  # 图片目录

# 1. 切换到工作目录
cd "$TARGET_DIR" || { echo "无法切换到目录 $TARGET_DIR"; exit 1; }

# 2. 拉取项目代码
echo "================= Update Blog ================="

if [ -d "$REPO_BLOG_NAME/.git" ]; then
    echo "更新BLOG仓库代码"
    (cd "$REPO_BLOG_NAME" && git pull)
else
    echo "拉取BLOG仓库代码"
    git clone "$REPO_BLOG_URL" "$REPO_BLOG_NAME"
fi

# 3. 拉取文件
echo "================= Update Dev Note ================="

if [ -d "$REPO_DEV_NOTE_NAME/.git" ]; then
    echo "更新BLOG仓库代码"
    (cd "$REPO_DEV_NOTE_NAME" && git pull)
else
    echo "拉取BLOG仓库代码"
    git clone "$REPO_DEV_NOTE_URL" "$REPO_DEV_NOTE_NAME"
fi

# 4. 移动文章到项目中
echo "================= Copy Dev Note ================="
rsync -av --progress --exclude='.git' --exclude 'Projects' --exclude 'images' ${REPO_DEV_NOTE_NAME}/ ${DEV_NOTE_DIR}
rsync -av --progress  ${REPO_DEV_NOTE_NAME}/Projects ${PROJECT_DIR}
rsync -av --progress  ${REPO_DEV_NOTE_NAME}/images ${DEV_NOTE_IMAGES_DIR}

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