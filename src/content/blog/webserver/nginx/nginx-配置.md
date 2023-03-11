---
author: huiru
pubDatetime: 2021-11-13T09:22:53Z
title: nginx-常用配置
postSlug: nginx
featured: false
draft: false
category: WebServer
tags:
  - nginx
ogImage: ""
description: nginx配置/转发/二级域名/多实例/负载均衡
rank: 5
---
[nginx](/images/nginxnet.png)
## 配置结构

- 全局配置
- event：工作模式、连接数
- http：http全局配置
  - upstream：服务负载均衡配置
  - server：每个server为一个代理服务
    - location：路由相关配置

## 常用配置

```conf
worker_processes  2; # 进程数，对应物理CPU核心数

events {
    use epoll;
    worker_connections  1024; # 每一个woker进程 创建的连接数

}
http {
    include       mime.types;   # 定义用户可访问的文件类型及对应的请求头
    # 如果请求的文件不在mime.types中就默认使用octet-stream，二进制流
    default_type  application/octet-stream; 

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on; # 零拷贝
    #tcp_nopush     on; # 提升传输效率，必须开启sendfile

    keepalive_timeout  65;  # 长连接 超时时间

    #gzip  on;

    upstream cluster1 {
        server 172.25.96.1:9999 weight=1 down;
        server 172.25.96.1:9998 weight=2;
        server 172.25.96.2:9997 weight=1 backup;
    }
    upstream cluster2 {
        server 172.25.104.1:9999 weight=1;
        server 172.25.105.1:9998 weight=2;
        server 172.25.106.2:9997 weight=1;
    }
    server {
        listen       80;
        server_name  haiah.life;

        location /api {
            # 设置转发的header
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;

            proxy_pass http://cluster;
        }
        error_page 500 502 503 /50x.html; # 如果5xx，则返回 http://localhost/50x.html
        location = /50x.html{   # 如果没有/50x.html 返回
            root html;
        }
    }
    server {
        listen       80;
        server_name  cun.com;

        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;

            proxy_pass http://cluster2;
        }
    }
}
```
## upstream负载均衡
声明一个server集群，实现负载均衡；ip:port唯一确定一个节点；

- down：下线；backup：备用，只有其他节点全不可用才会使用；这两个参数都不咋常用；

负载均衡策略：
1、轮询
仅用于无状态的服务；请求会不断在后端节点间轮询；

2、权重

3、ip_hash
根据ip对后台节点数量进行hash，容易流量倾斜；

4、least_conn
最少连接访问

5、url_hash
根据用户访问的url定向转发请求，用于状态类的服务，特定服务总会落到特定集群；

一般用于服务器拥有特定资源，定向转发

(需要第三方插件)

## server虚拟主机
配置多个server，代理多个虚拟主机
- host:port确定唯一server，且按顺序匹配请求；
- server_name支持正则、通配符：`~^[0-9]+\.haiah\.com$`、`*.haiah.com`
- server_name使用单节点而非upstream时，需要http://
- server_name不支持https协议

## location
匹配到指定路径，进行转发

匹配模式：
- /api/xxx：通用的以path从前向后匹配；
- =/api/pro/list：精准匹配；
- ~：正则匹配，区分大小写；
- ~*：正则匹配，不区分大小写；
- ^~：非正则匹配，

匹配顺序：
1、多个**正则location**同时满足，则按顺序，先匹配则不会向后再匹配；
2、多个**非正则location**同时满足，则全部匹配，最后选取匹配度最高的location转发；
3、

## 引入子配置文件

```conf
-- nginx.conf
   | -- default.conf
   | -- server1.conf
   | -- server2.conf

# 全局配置中加入相对路径引入
include server1.conf;
```