---
author: huiru
pubDatetime: 2022-02-19T14:01:53Z
title: CountDownLatch
postSlug: CountDownLatch
featured: false
draft: false
category: java
tags:
  - 并发
ogImage: ""
description: ""
rank: 20
---
示例：[Github: CountDownLatchTest](https://github.com/huiru-wang/JavaCodeSnippet/blob/main/JavaBaseCode/src/test/java/com/snippet/javacodebase/CountDownLatchTest.java)

# CountDownLatch
用于线程执行顺序，主任务等待一批子任务结束后，再执行；基于AQS；

类似与`Thread.join()`，join基于`Object的wait()`、`notify()`实现

## 构造方法
```java
public CountDownLatch(int count) {
    if (count < 0) throw new IllegalArgumentException("count < 0");
    this.sync = new Sync(count);
}
```

## 核心方法

- **await()**：阻塞当前线程，直到计数器为零为止；
- **await(long timeout, TimeUnit unit)**：可以指定阻塞时长；
- **countDown()**：计数器减1，如果计数达到零，释放所有等待的线程。
- **getCount()**：返回当前计数