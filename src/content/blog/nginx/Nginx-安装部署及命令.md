---
author: huiru
pubDatetime: 2021-12-03T09:22:53Z
title: nginx-安装部署及命令
postSlug: nginx
featured: false
draft: false
category: Server
tags:
  - nginx
ogImage: ""
description: nginx/安装/命令/
rank: 2
---

# 安装

1、官网下载包，编译安装：http://nginx.org/en/download.html

所需依赖：
```shell
apt-get install gcc
apt-get install pcre pcre-devel
apt-get install zlib zlib-devel

# 还需要什么执行 configure脚本会提示，并--prefix指定安装目录
./configure --prefix=/opt/nginx
```
安装：
```shell
make
make install
```

2、软件包安装

```shell
apt-get install nginx
service nginx start/restart/stop
----------------------------------
# 配置文件：/usr/local/nginx/conf
```

3、docker 启动：

```conf
docker pull nginx:latest
# 简单启动
docker run -d --name nginx -p 80:80 nginx:latest

# 配置启动
docker run -d `
--name nginx `
-p 80:80 `
-v /d/data/nginx/nginx.conf:/etc/nginx/nginx.conf `
-v /d/data/nginx/log:/var/log/nginx `
-v /d/data/nginx/html:/usr/share/nginx/html `
-v /d/data/nginx/conf:/etc/nginx/conf.d `
nginx:latest
```

# 命令

```shell
Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : 检查配置文件是否正确
  -t filename   : 检查指定配置文件
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s reload     : 重新加载配置
  -s stop       : 强制停止
  -s quit       : 优雅停止
  -s reopen     : 当日志文件不存在，重写创建文件写入，用于切割日志文件
                  一般先移动原日志文件(按日期重命名)，再执行reopen
                  也可用滚动日志：logrotate
  -p prefix     : set prefix path (default: /etc/nginx/)
  -e filename   : set error log file (default: /var/log/nginx/error.log)
  -c filename   : 指定配置文件启动
  -g directives : set global directives out of configuration file
```
常用：
```shell
./nginx 启动
./nginx -s stop 快速停止
./nginx -s quit 优雅关闭，在退出前完成已经接受的连接请求
./nginx -s reload 重新加载配置，不会导致服务中断
```