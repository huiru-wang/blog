---
author: huiru
pubDatetime: 2022-01-06T15:11:00Z
title: jvm-参数调优相关
postSlug: Jvm-参数调优相关
featured: false
draft: false
category: Java
tags:
  - jvm
ogImage: ""
description: Jvm参数/调优相关/MinorGC/FullGC/GC/jmap
---

![](/images/heap.png?msec=1676139896889)

> JVM 调优主要调整 Heap 区域的参数配置

# Heap 相关参数

> 大部分的默认值都是经验值，需要根据具体场景，进行配置

默认：新生代：老年代 = 1：2

默认：Eden：From：To = 8：1：1

0、栈内存大小：

- `-Xss`：默认 1MB,决定了栈的调用深度；

1、Heap 大小：

- `-Xms600m`：堆的起始内存
- `-Xmx600m`：堆的最大内存

  (超出触发 MajorGC，无法回收则抛：OutOfMemoryError)

2、自适应策略(JDK1.7)

- `-XX:+UseAdaptiveSizePolicy`：动态调整 JVM 各区大小以及 gc 年龄阈值；
- 默认初始：老/新 = 2，Eden/Survivor = 8：2，默认年龄阈值 15；
- 每次 GC 后，动态计算大小 Eden/Survivor 的内存分配；
- 默认开启，且推荐不要关闭，除非一定要使用特定的 JVM 分区大小；

以下 2 个参数开启前提：关闭自适应策略

3、新生代老年代比例：

- `-XX:NewRation=2`：老年代/新生代比例大小

4、新生代内分区比例：

- `-XX:SurvivorRation=8`：Eden 占新生代的比例，剩余 From/To 平分

5、控制对象进入老年代的参数：

- `-XX:MaxTenuringThreshold=15`：默认 15，超出此阈值，对象移入老年代；
- `-XX:TargetSurvivorRatio=90`：Survivor 区占用达到 90%，再将对象移入老年代

  通常是占用达到 50%，按照年龄排序后，超出 50%的大年龄对象，会在 MinorGC 时移入老年代；

- `-XX:PretenureSizeThreshold=3145728`：如果对象大小超过这个值，将直接分配在老年代

6、元空间大小：

- -XX:MetaspaceSize：设置元空间内存大小；默认 20.75MB
- -XX:MaxMetaspaceSize：默认-1，无限大；

7、G1 收集器 MixedGC 参数：

- -XX:InitiatingHeapOccupancyPercent：触发 MixedGC 的内存阈值；

  默认老年代内存达到 45%触发

10、输出 JVM 默认参数配置：

- `java -XX:+PrintCommandLineFlags -version`

# JVM 优化核心

1、提升对象从年轻代进入老年代的门槛；

2、降低 FullGC 次数；(核心)

# FullGC 触发原因

# 常见优化原则

1、尽可能将新对象留在年轻代，并提高进入老年代门槛；

- `-XX:PetenureSizeThreshold`：默认 15，超出此阈值，对象移入老年代；
- `-XX:TargetSurvivorRatio=90`：Survivor 区占用达到 90%，再将对象移入老年代

  提高 Survivor 区的利用率；

2、大对象应该直接进入老年代

大对象仍然创建在年轻代，对 MinorGC 也是一种压力；

如果占用空间很多，即使 gc 年龄很小，也会被很快移入老年代，不如直接分配在老年代

`-XX:PetenureSizeThreshold`：如果对象大小超过这个值，将直接分配在老年代

3、尽可能固定堆的大小，可以减少 GC 频率；

如果-Xms 小于-Xmx，堆会尽可能维持在较小的大小，并且有两个参数，会根据堆的空闲比例，对堆空间进行扩展、压缩；

- `-XX:MinHeapFreeRatio`：最小空闲比例，超出，扩展堆；
- `-XX:MaxHeapFreeRatio`：最大空闲比例，超出，压缩堆；

如果`-Xms == -Xmx`，可以获得一个较为稳定的堆，并且上面的两个参数自动失效；

4、根据场景，选择合适的垃圾收集器

重视响应速度、交互的用户体验：

- ParallelNew + CMS(应用内存占用不大，可以用 CMS)
- G1(应用需要大内存、G1 会比 CMS 好)

重视计算，而非交互型的低延迟：

- Parallel Scavenge + Parallel Old

## 年轻代内存优化方向

年轻代优化需要考虑两个问题：
1、年轻代如果内存过小，就会导致很容易满，幸存对象更容易进入老年代，给 FullGC 带来压力；

2、年轻代如果内存过大，就会影响复制算法的效率；

因此需要选择合适的年轻代大小；

# 调优思路/流程/命令

1、定位

jmap
jstack

# JVM 调优工具

## 常用 shell

1、`jps`：获取 Java 进程的 PID

2、`jmap -heap [pid]`：获取详细的对象内存占用情况

3、`jmap -histo [pid] > jvm.txt`：获取详细的对象内存占用情况

```shell
num   instances  bytes  class name
```

可以观察所有对象的实例数量、内存占用、类名

4、`top`：按 CPU、内存占用排序查看进程；

## 开发工具

VisualVM：可视化内存状态

arthas：开源的 Java 诊断工具

# JVM 优化常见问题

## FullGC 释放内存不大

考虑：内存泄漏，存在无法回收，又不使用的对象；

## FullGC 频繁

## FullGC 耗时过长
