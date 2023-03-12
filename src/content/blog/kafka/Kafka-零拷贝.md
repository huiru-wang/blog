---
author: huiru
pubDatetime: 2021-12-13T10:22:30Z
title: Kafka-零拷贝
postSlug: Kafka-零拷贝
featured: false
draft: false
category: bigData
tags:
  - kafka
ogImage: ""
description: Kafka零拷贝
rank: 60
---

# 传统read()/write()系统调用

![传统io读写](/images/传统io读写.png)

一共发生：
- 4次切换：2次用户到内核的切换、2次内核到用户的切换；
- 4次拷贝：2次CPU拷贝，2次DMA拷贝；

DMA：DirectMemoryAccess 直接存储器访问技术，由DMA控制器提供的技术，DMA控制器是一种外设，由CPU控制；
- 实现存储器间、外设和存储器间的数据传输工作；
- 工作指令由CPU发出，实际传输工作不需要CPU参与，达到解放CPU的作用；
- 仅能用于设备间，不可完全代替CPU拷贝；

# mmap()/write()
![mmap](/images/mmap.png)

使用mmap替换read，建立pageCache到用户空间的虚拟内存的映射，避免了数据从pageCache拷贝到用户空间这一个**CPU拷贝**过程；；

# 零拷贝
