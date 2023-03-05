---
author: huiru
pubDatetime: 2022-01-06T15:11:00Z
title: JIT即时编译
postSlug: JIT即时编译
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description: JIT即时编译
rank: 57
---

# JIT

## 逃逸分析

目的：通过算法，减少Java程序中内存分配到堆上；

判断是否逃逸：

- 当一个对象在方法内定义，且只在方法内部使用，此时对象没有逃逸；

- 当一个对象在方法内定义，又被外部方法引用，则认为发生逃逸，

JIT通过逃逸分析，优化代码：

1、当对象没有逃逸：JIT编译器就可能将其分配在栈上，而不是堆上；线程结束，栈内存回收，则回收此类对象；(栈内存速度更快，降低堆内存压力)

2、同步省略：当对象没有逃逸，只会被当前线程访问，那么在并发场景下，就会取消对此对象的同步，也叫锁消除；

举例：

```java
// StringBuffer对象逃逸，分配到堆区
public static StringBuffer getStringBuffer(String s1, String s2) {
   StringBuffer sb = new StringBuffer();
   sb.append(s1);
   sb.append(s2);
   return sb;
}
// 不会发生逃逸，直接使用String的字面量，不分配内存到堆区；
public static String getString(String s1, String s2) {
   StringBuffer sb = new StringBuffer();
   sb.append(s1);
   sb.append(s2);
   return sb.toString();
}
```