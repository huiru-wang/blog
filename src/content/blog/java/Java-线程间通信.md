---
author: huiru
pubDatetime: 2022-02-16T08:36:00Z
title: Java-线程间通信方式
postSlug: Java-线程间通信方式
featured: false
draft: false
category: java
tags:
 - 并发
ogImage: ""
description: 线程间通信/wait/notify/Condition/volatile/CountDownLatch
---

## synchronized + wait + notify
synchronized是依赖于对象的，线程间通信也需要依赖于对象；

因此要使用`Object`下的`wait()`、`notify()`方法

wait()：

notify()：

## ReentrantLock + Condition

ReentrantLock是JDK级别的锁，需要结合Condition的API进行线程通信；


## volatile

volatile仅解决了并发原则中的可见性和有序性，不保证原子性；

同时Java线程是系统级线程，也就是说每个线程占用一个CPU核，同时拥有一个CPU缓存；因此不同线程操作同一个变量，线程间是不可见的；

volatile关键字修饰的变量禁用CPU缓存，是操作系统支持的，读取写入变量都必须基于内存；

其中可见性，也可以算是线程间的通信；


## CountDownLatch