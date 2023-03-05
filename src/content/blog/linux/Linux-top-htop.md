---
author: huiru
pubDatetime: 2022-01-06T08:36:00Z
title: Linux命令-top htop
postSlug: Linux命令-top htop
featured: false
draft: false
category: DevTools
tags:
  - linux
ogImage: ""
description: Linux/top/htop/CPU/进程/
rank: 40
---

# top

`top`：动态查看系统进程运行情况，如：内存、CPU、负载等资源占用情况，每隔 5 秒刷新一次；
两种查看方式(配合使用)：

1、`top`打开动态界面后，再进行按键调整；

- P：按 CPU 使用率排序；
- M：按内存占用排序；
- E：切换顶部的内存单位：KB、MB、GB
- e：切换每个进程的内存单位；
- 2、`top`直接加参数

- `-d [secs]`：动态刷新时间间隔(s)
- `-p [pid]`：指定进程；
- `-H`：显示所有线程；
- `-n [max]`：刷新次数，到达次数，自动退出 top；
- `-o`
- `-w`

常用命令参数：

- `top -p [pid]`：查看指定进程；
- `top -H -p [pid]`：查看指定进程的所有线程；

# htop
