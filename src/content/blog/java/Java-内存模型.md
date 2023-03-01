---
author: huiru
pubDatetime: 2022-02-16T08:36:00Z
title: Java-内存模型
postSlug: Java-内存模型
featured: false
draft: false
category: java
tags:
 - concurrency
ogImage: ""
description: 内存模型
---

## JMM-Java Memory Model
![JMM](/images/jmm.png)

线程本地内存与堆内存间的交互：读取变量 -> 处理变量 -> 写回变量

此过程不是原子性的操作，是并发问题的根源；


## 并发需要遵守的原则
可见性

有序性

原子性

## volatile

volatile仅解决了并发原则中的可见性和有序性，不保证原子性；

1、解决可见性：

同时Java线程是系统级线程，也就是说每个线程占用一个CPU核，同时拥有一个CPU缓存；因此不同线程操作同一个变量，线程间是不可见的；

volatile关键字修饰的变量禁用CPU缓存，是操作系统支持的，读取写入变量都必须基于内存；

2、解决有序性：

线程中的一系列指令，可能同时存在对同一个变量的读和写，编译优化可能进行执行重排序，多线程场景下就会带来问题；

volatile修饰变量后，对于该变量的读写操作禁止指令重排序；

