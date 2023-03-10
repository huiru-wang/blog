---
author: huiru
pubDatetime: 2022-02-02T09:22:53Z
title: 内存泄露和内存溢出
postSlug: 内存泄露和内存溢出
featured: false
draft: false
category: java
tags:
  - 基础
ogImage: ""
description: java内存泄露/内存溢出/OOM/SOF
rank: 30
---
# 内存泄漏

内存泄漏：不再使用的对象，仍占用内存(存在GCRoots引用)，无法回收

情况：

1、**静态集合持有非静态遍历**；

静态的对象、字段生命周期是与程序是一致的；无法释放；

如果元素不再使用，需要手动删除；

2、**长生命周期的对象，持有段生命周期对象的引用**；

即使短生命周期的对象不用了，依然无法释放，因为有引用；

3、**存在无法释放的数据库连接、IO连接等**；

连接使用过程中，垃圾回收不会回收连接使用的对象；

4、**内部类持有外部类对象**；

即使外部类对象不再使用，也不会被回收；

5、**ThreadLocal？？？**；


# 内存溢出

三种常见内存溢出：

1、**元空间内存不足->OOM**

OutOfMemoryError: PermGen space

元空间主要存储着大量的class信息，静态数据；

2、**堆内存不足->OOM**

OutOfMemoryError: Java heap space

3、**栈内存溢出**

- OutOfMemory：栈动态内存扩展，内存不足时抛出；
  
  <mark>JVM没有动态扩展的栈，所以Java进程的栈不会OOM</mark>

- StackOverflowError：栈创建栈帧，没有足够的内存，抛SOF；
  
  一般是递归调用过程中抛出；

可以减少栈内存大小，提高栈帧深度；
