---
author: huiru
pubDatetime: 2022-01-05T11:11:00Z
title: 垃圾收集器
postSlug: 垃圾收集器
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description: 垃圾收集器
rank: 21
---

![](/images/collection1.png)

# 垃圾收集器

JDK8默认垃圾收集器

- **Parallel Scavenge**（新生代）

- **Parallel Old**（老年代）

## Serial/SerialOld

![](/images/serial.png)

单线程串行收集器，简单高效

- Serial：复制算法收集年轻代；
- Serial Old：标记-整理收集老年代；

行为：

1、必须暂停其他所有的工作线程，直到它收集结束(Stop The World)

2、Client模式下，新生代的默认收集器。

在用户场景下，JVM管理的内存不会很大，Serial收集器在整理200M以内的内存，可以控制在100ms以内，可以接受。

## ParallelNew/ParallelOld

![](/images/parnew.png)

多线程收集器

- ParNew：复制算法收集新生代；
- ParallelOld：标记-整理收集老年代；

默认开启的线程数量与CPU核数相同，可以使用`-XX:ParallelGCThreads`参数来设置线程数；

# ParallelScavenge

针对年轻代的多线程收集器，使用复制算法；

目的：与ParallelNew关注点不同，尽可能缩短垃圾收集时用户线程的停顿时间；

吞吐量优先：CPU用于运行用户代码的时间占总时间的比值。

控制最大垃圾收集停顿时间：`-XX:MaxGCPauseMillis`

直接设置吞吐量大小：`-XX:GCTimeRatio`

## CMS收集器

Concurrent Mark Sweep：并发标记—清除算法：并发收集，低停顿；

![](/images/CMS.png)

收集流程：

1、初始标记：仅仅只是标记一下 GC Roots 能直接关联到的对象，速度很快，需要停顿；

2、并发标记：进行 GC Roots Tracing 的过程，它在整个回收过程中耗时最长，不需要停顿；

3、重新标记：为了修正并发标记期间因用户程序继续运作而导致标记产生变动的那一部分对象的标记记录，需要停顿；

4、并发清除：不需要停顿，耗时略长；

缺点：

- 吞吐量低：低停顿时间是以牺牲吞吐量为代价的，导致CPU利用率不够高；
- 在并发清除时，用户线程仍会产生垃圾，这些CMS无法处理；
- 收集算法导致：会产生内存碎片

## G1收集器

![](/images/G1.png)

G1：Garbage First(JDK9默认收集器)

- 同时针对新生代和老年代，在物理上不再隔离两个内存区域，将整个堆分为多个大小相等的独立Region，并跟踪各个Region里面的垃圾堆积的价值大小，在后台维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的Region；

- 是一款面向服务端应用的垃圾收集器。

- G1从整体来看是基于“标记—整理”算法实现的收集器
  
  局部(Region之间)上来看是基于“复制”算法实现的

特点：

- 不会产生内存空间碎片

- 可控制的停顿：根据你想要控制的时间内，尽量收集价值高的Region；

执行过程：

1、初始标记：仅仅只是标记一下GC Roots能直接关联到的对象，并且修改TAMS（Next Top at Mark Start）的值，让下一阶段用户程序并发运行时，能在正确可用的Region中创建新对象，这阶段需要停顿线程，但耗时很短。

2、并发标记：从GC Root开始对堆中对象进行可达性分析，找出存活的对象，这阶段耗时较长，但可与用户程序并发执行。

3、最终标记：为了修正在并发标记期间因用户程序继续运作而导致标记产生变动的那一部分标记记录，虚拟机将这段时间对象变化记录在线程Remembered Set Logs里面，最终标记阶段需要把Remembered Set Logs的数据合并到Remembered Set中，这阶段需要停顿线程，但是可并行执行。

4、筛选回收：首先对各个Region的回收价值和成本进行排序，根据用户所期望的GC停顿时间来制定回收计划，这个阶段其实也可以做到与用户程序一起并发执行，但是因为只回收一部分Region，时间是用户可控制的，而且停顿用户线程将大幅提高收集效率。

## 对比CMS/G1

|                | CMS                       | G1                                   |
| -------------- | ------------------------- | ------------------------------------ |
| 收集算法       | 标记-清除                 | 标记-整理                            |
| 内存是否规整   | 不规则，存在内存碎片      | 内存规整，不存在内存碎片             |
| 关注点         | 响应优先，尽量减少STW时间 | 响应优先，尽量减少STW时间            |
| 关注的内存区域 | 只收集老年代              | 同时收集新生代和老年代，物理上不隔离 |

G1的目标场景就是针对大型应用，占用内存大的多核机器；在小内存应用上效果并不会特别显著；

CMS追求低停顿的GC，需要并发标记、并发清除，就对CPU核数比较敏感，在多核机器上效果会更好，对内存要求不高；

# 收集器组合搭配

年轻代和老年代的垃圾收集器并不可以随意搭配，如CMS就不能和ParallelScavenge搭配；

一下为一些常用的搭配：

## Parallel GC

并行GC的模式下，有两种搭配方式：

1、`Parallel Scavenge` + `Serial Old(PSMarkSweep)`

开启参数：`-XX:+UseParallelGC`

2、`Parallel scavenge` + `Parallel Old`

开启参数：`-XX:+UserParallelOldGC`




