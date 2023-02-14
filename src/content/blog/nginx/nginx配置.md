---
author: huiru
pubDatetime: 2022-06-03T09:22:53Z
title: nginx-配置
postSlug: nginx
featured: true
draft: false
tags:
  - nginx
ogImage: ""
description:
  nginx配置/转发/二级域名/多实例/负载均衡
---

# 配置结构
- 全局配置
- event：工作模式、连接数
- http：http全局配置
  - server：每个server为一个代理服务
    - location：路由相关配置
  - upstream：服务负载均衡配置

# 引入子配置文件
```conf
-- nginx.conf
   | -- default.conf
   | -- server1.conf
   | -- server2.conf

# 相对路径引入
include server1.conf;
```

# 配置
**全局配置：**
```conf
# 全局配置

# 进程数，对应物理CPU核心数
worker_processes  2;

events {
    # 每一个woker进程 创建的连接数
    worker_connections  1024;
}

```
**http全局配置：**
```conf


```

**http负载均衡配置：**
```conf
http {
    # 引入http全局配置
    
    # server负载均衡
    upstream test {
        server 172.25.96.1:9999 weight=1;
        server 172.25.96.1:9998 weight=2;
    }
    
    server {
        
        listen       80;
        server_name  localhost;

        location / {
            proxy_pass http://test; # 这里指定upstream名称
        }
    }
}
```

**多域名转发配置：**
```conf
http {
    server {
        listen       80;
        server_name  haiah.life;

        location /api {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass http://127.0.0.1:9090;
        }
    }
    server {
        listen       80;
        server_name  haiah.com;
        
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass http://127.0.0.1:7091;
        }
    }
}

```

**多路径转发配置：**
```conf
http {
    # 代理服务,一个虚拟主机，监听端口，进行配置、转发等
    server {
        
        listen       80;
        server_name  localhost;
        
        # 接收到<域名>:<80>的请求，匹配对应的location路径，进行路由
        location / {
            root   html;
            index  index.html index.htm;
        }
        
        # 指定转发路径
        location /admin {
            proxy_pass http://172.25.96.1:7777;
        }

        # 增加新的路径
        # ..
    }
}
```