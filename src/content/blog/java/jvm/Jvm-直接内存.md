---
author: huiru
pubDatetime: 2022-01-04T10:22:00Z
title: Jvm直接内存
postSlug: Jvm直接内存
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description: Jvm直接内存
rank: 6
---

# 直接内存

![directmemory](/images/directmemory.png)

- 不受JVM管理；
- 回收成本高，读写性能高，少一次内存拷贝；常用于数据缓冲，如NIO的ByteBuffer；
- 直接内存也会内存溢出：`java.lang.OutOfMemoryError: Direct buffer memory`

## 直接内存的分配和释放

直接内存不由GC管理，由`Unsafe`类进行管理

- 直接内存手动分配：`unsafe.allocateMemory()`
- 直接内存手动释放：`unsafe.freeMemory()`
---
当ByteBuffer被GC回收时，其使用直接内存也会被释放，但并不是GC回收了直接内存

直接内存的自动释放，是由一个`Cleaner`虚引用完成的；

`ByteBuffer`内有一个`Cleaner`引用，当GC触发，Cleaner虚引用就会被回收，从而触发直接内存的释放；


# 相关JVM参数
1、`-XX:+DisableExplicitGC`：禁止显式调用GC
- **禁止使用此参数**，会导致直接内存无法回收，会造成直接内存长时间得不到释放；
- 一定要手动释放内存，请使用`Unsafe`