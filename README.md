# blog 📄

**访问地址**：[blog.haiah.life](blog.haiah.life)

**使用的模板**：[astro-paper](https://github.com/satnaing/astro-paper)

## 安装部署
```shell
npm install
npm run dev
npm run build
```

## 定时任务
创建脚本：/opt/bin/schedule_task.sh
```shell
#/bin/bash

blog=/opt/blog

cd ${blog}

git pull

npm run build
```
启动定时任务：
```shell
vim /etc/crontab
----------------------
# 新增
* 3 * * * * root /opt/bin/schedule_task.sh
```
