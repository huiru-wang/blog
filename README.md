# blog 📄

**访问地址**：[blog.haiah.life](blog.haiah.life)

## 安装部署

使用模板：[astro-paper](https://github.com/satnaing/astro-paper)

```shell
npm install
npm run dev
npm run build
```

## 简单配置nginx
```conf
#user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include   mime.types;
    default_type  application/octet-stream;
    
    server {
        
        listen       80;
        server_name  localhost;

        access_log /etc/nginx/logs/access.log;

        location / {
            root /opt/blog/dist;
            index index.html index.htm;
            add_header Access-Control-Allow-Origin *;
        }
    }
}
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
