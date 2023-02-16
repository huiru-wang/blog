# blog 📄

**访问地址**：[blog.haiah.life](blog.haiah.life)

## 安装部署
```shell
npm install
npm run dev
npm run build
```

## nginx
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
        
        listen       80;		# 绑定的端口号
        # 绑定的域名,可配置多个域名 空格分隔，可用正则，最前加上~
        server_name  localhost;

        access_log /etc/nginx/logs/access.log;

        location / {
            
            root C:\Users\haiah\Desktop\blog\dist;
            
            index index.html index.htm;
            add_header Access-Control-Allow-Origin *;
        }
    }
}
```

## 定时任务
创建脚本：
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


```
