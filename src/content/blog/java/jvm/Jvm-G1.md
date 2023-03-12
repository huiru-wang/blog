---
author: huiru
pubDatetime: 2022-01-05T11:11:00Z
title: G1垃圾收集器
postSlug: G1垃圾收集器
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description: G1垃圾收集器
rank: 22
---
G1：Garbage First(JDK9默认收集器)

# 内存模型
- 内存依然分区,但是会进一步分块：Region；使用不同的Region表示Eden、Survivor(From/To)、Old
- Region物理上不连续；且Region也可以转变类型，如Eden变成Old；以此调整分区间比例大小
- Region都是2的整数次幂：1MB、2MB、4MB...(`-XX:G1HeapRegionSize=1m`指定)
  
![](/images/g1memory.png)

### Remember Set

Rset记录了不同Region间的引用关系

目的：防止Region间存在依赖关系，但是回收时扫描了部分Region，而导致存在引用的对象被回收；

![](/images/rset.png)

对象间引用的类别：
- Region内部对象间引用：不需要记录到RSet；
- 新生代Region间的对象引用：不需要记录到RSet，因为GC时会包含整个新生代，可达性分析中可以关联到所有新生代间的引用，不会导致存在引用的对象被回收；
- 新生代引用老年代：不需要记录到RSet，新生代对象被回收，不影响老年代；
- 老年代引用新生代：需要记录到RSet；如图所示，新生代被引用的对象不应该被回收；
- 老年代引用老年代：需要记录到RSet；因为老年代回收时不一定全部扫描；

### Collection Set
CSet：记录了可被回收的Region的合集；可以来自所有分代的Region；

当GC结束，CSet中存活的数据，会被移动到别的可用分区；

# 收集特点

1、低停顿、没有内存碎片(Region间复制算法)；

2、可预测停顿
因为Region的分区，G1可以进行部分区域的回收，可以缩小回收范围；

G1会跟踪每个Region的价值大小(回收获得的空间/回收需要的时间)，维护一个优先列表，根据允许的停顿时间，指定回收计划，优先回收价值最大的Region，有限时间内获得更高的收集效率；

3、适用于大内存环境，堆内存6-8G以上；

# 收集过程
分为4个步骤，通常不会触发FullGC即可完成收集

## 1 Young Collection
Eden区满，触发YoungGC：(STW)

- 新生代回收，幸存对象复制进Survivor区；
- 不够年龄的对象，在幸存区间复制；
- 达到年龄的对象，进入老年代；

![](/images/g11.png)

## 2 Young Collection + Concurrent Mark
如果**整个堆内存**已使用的大小，达到了阈值：`-XX:InitiatingHeapOccupancyPercent=45%`，触发并发标记;

先触发一次新生代垃圾回收(STW)

再触发并发标记：不会触发STW；(使用三色标记)

### 并发标记的过程
![](/images/G1.png)

1、初始标记：

仅仅只是标记一下GC Roots能直接关联到的对象，并且修改TAMS(Next Top at Mark Start)的值，让下一阶段用户程序并发运行时，能在正确可用的Region中创建新对象，这阶段需要停顿线程，但耗时很短。

2、并发标记：

从GC Root开始对堆中对象进行可达性分析，找出存活的对象，这阶段耗时较长，但可与用户程序并发执行；

3、最终标记：

并发标记期间因用户程序继续运作，可能产生新的引用、垃圾；在这个阶段进行RSet记录修复；

4、筛选回收：

首先对各个Region的回收价值和成本进行排序，根据用户所期望的GC停顿时间来制定回收计划，这个阶段其实也可以做到与用户程序一起并发执行，但是因为只回收一部分Region，时间是可控制的，而且停顿用户线程将大幅提高收集效率。


## 3 Mixed Collection
- 最终标记：触发STW
- 拷贝存活：触发STW

G1根据设置的停顿时间`-XX:MaxGCPauseMillis=200ms`，根据优先列表，来制定回收计划

有选择地回收那些价值高更的Region

![](/images/g12.png)

## 4 Full GC
- 触发STW
FullGC不是必需的，如果混合回收效果不佳，收集速度跟不上内存分配，仍然不能满足内存要求，就执行FullGC，使用SerialOld进行单线程的FullGC；



# 三色标记

并发场景下存在多标、漏标问题，因此G1并发收集使用三色标记；


# G1参数配置

| 参数                       | 作用                                      |
| -------------------------- | ----------------------------------------- |
| -XX:+UseG1GC               | 使用G1垃圾收集器                          |
| -XX:G1HeapRegionSize=1m    | G1中Region大小                            |
| -XX:G1NewSizePercent       | G1中新生代初始占比                        |
| -XX:G1MaxNewSizePercent    | G1中新生代最大占比                        |
| -XX:MaxGCPauseMillis=200ms | 默认200ms，GC触发的停顿大小               |
| -XX:SurvivorRation=8       | Eden占新生代的8/10，剩余2/10,From/To 平分 |

1、G1 收集器 MixedGC 参数：

- -XX:InitiatingHeapOccupancyPercent：触发 MixedGC 的内存阈值；

  默认老年代内存达到 45%触发








