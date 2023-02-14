---
author: huiru
pubDatetime: 2022-01-06T08:36:00Z
title: Linux命令-netstat
postSlug: Linux命令-netstat
featured: true
draft: false
tags:
  - linux
ogImage: ""
description:
  Linux/netstat/端口/网络
---

`netstat`是针对TCP/IP协议的一个网络工具，可以监控tcp、udp、unix的网络状态；
```shell
# netstat
Proto   Recv-Q    Send-Q    Local Address   Foreign Address   State   PID/Program name
```

常用参数：

- `-a`：all 显示所有网络状态
- `-t`：tcp 显示tcp网络状态
- `-u`：udp 显示udp网络状态
- `-l`：listen 显示处于LISTEN监听状态的连接
- `-p`：PID/Program name 显示进程Id和名称
- `-n`：不显示别名，尽量显示数字
- `-r`：显示路由表

常用命令：
- `netstat -tlpn`：所有处于LISTEN的TCP进程；
- `netstat -apt | grep [pid/process_name]`：显示对应pid/进程名的tcp网络状态；

## Tcp State
能够见到的最多的是前3个可以保持一段时间的状态

- `LISTEN`：监听状态；
- `ESTABLISHED`：连接状态；
- `TIME_WAIT`：主动释放连接后等待状态；



