---
author: huiru
pubDatetime: 2022-01-04T10:22:00Z
title: Jvm内存相关异常
postSlug: Jvm内存相关异常
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description: Jvm内存相关异常
rank: 9
---

## 栈内存可能的问题
1、栈内存溢出StackOverflow

- 栈帧过多：递归调用，栈帧不断扩展，无法申请到更多的内存容纳栈帧，导致栈内存溢出；
- 栈帧过大；
- `-Xss`过小；


## 共享内存相关问题
1、`java.lang.OutOfMemoryError: Java heap space`

2、`java.lang.OutOfMemoryError: MetaSpace`

3、`java.lang.OutOfMemoryError: GC overhead limit`

当有JVM参数：`-XX:+UseGCOverheadLimit`时，满足以下条件会触发：
- 当98%的时间都花在了垃圾回收上，只有2%的空间被回收了，就会触发此异常；

4、`java.lang.OutOfMemoryError: Direct buffer memory`
- 直接内存溢出