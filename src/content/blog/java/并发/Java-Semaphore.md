---
author: huiru
pubDatetime: 2022-02-19T13:41:53Z
title: Semaphore
postSlug: Semaphore
featured: false
draft: false
category: java
tags:
  - 并发
ogImage: ""
description: Semaphore
rank: 30
---
示例：[Github: SemaphoreTest](https://github.com/huiru-wang/JavaCodeSnippet/blob/main/JavaBaseCode/src/test/java/com/snippet/javacodebase/SemaphoreTest.java)
# Semaphore
信号量：用来控制同时访问特定资源的线程数量；基于AQS实现；

结构上同ReentrantLock类似，同样拥有内部类：Sync、NonfairSync、FairSync；

## 构造方法

```java
// 默认非公平
public Semaphore(int permits) {
    sync = new NonfairSync(permits);
}

// 公平 true
public Semaphore(int permits, boolean fair) {
    sync = fair ? new FairSync(permits) : new NonfairSync(permits);
}
```
## 核心方法

- **acquire(int permits)**：获取信号量：state减n
  - 公平需要排队；
  - 不公平各自自旋竞争；
- **tryAcquire(int permits)**：不阻塞，直接返回true/false；
- **tryAcquire(int permits, long timeout, TimeUnit unit)**：带超时时间；
- **release(int permits)**：释放信号量：state加n
- **availablePermits()**：返回可用信号量；
- **reducePermits()**：减少总数；