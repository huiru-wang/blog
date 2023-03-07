---
author: huiru
pubDatetime: 2021-09-13T11:39:00Z
title: 磁盘IO
postSlug: 磁盘IO
featured: false
draft: false
category: CS
tags:
 - os
ogImage: ""
description: 磁盘IO/预读/回写/page cache
rank: 35
---

## 磁盘IO和预读
https://tech.meituan.com/2017/05/19/about-desk-io.html

磁盘的数据读取是靠机械运动，耗时主要在：寻道时间、旋转延迟、数据传输时间

- 寻道时间：磁臂移动到磁道需要的时间；
- 旋转延迟：盘片旋转将请求数据所在的扇区移动到读写磁盘下方所需要的时间，取决于磁盘转速
- 数据传输时间：

### 随机读写和顺序读写
- 随机读写：磁头需要不停移动进行读写，大量时间浪费在磁头寻址；
- 顺序读写：

### PageCache
操作系统引入缓存层，缓存磁盘上的部分数据，当请求到达，数据如果在Cache中，并且未过期，则不需要读取磁盘，直接返回；
