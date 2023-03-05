---
author: huiru
pubDatetime: 2022-01-06T15:11:00Z
title: Jvm场景问题排查
postSlug: Jvm场景问题排查
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description: CPU飙高定位
rank: 58
---

# CPU飙高定位

1、定位进程：`top`

2、定位线程：
- ps：输出进程下所有线程及CPU使用情况 `ps H -eo pid, tid, %cpu | grep [进程id]`

3、获取线程详情：`jstack [tid]`

输出的线程详情中的nid，通常为十六进制，需要将tid换算成十六进制；

详情中可以获取代码调用，定位到具体代码位置

# 





