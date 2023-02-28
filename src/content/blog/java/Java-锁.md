---
author: huiru
pubDatetime: 2022-02-19T11:01:53Z
title: Java-锁
postSlug: Java-锁
featured: false
draft: false
category: java
tags:
  - java
ogImage: ""
description: Java锁/可重入锁/AQS/Lock/ReenTrantLock/acquire
---

# Lock接口
Lock接口规范了JDK层面的锁：
```java
public interface Lock {
    // 获得锁
    void lock();
    // 获得锁
    void unlock();
    // lock非阻塞版本，成功返回true
    boolean tryLock();
    // 添加尝试时间，时间到返回false
    boolean tryLock(long time, TimeUnit unit)
    // 返回一个监视器对象
    Condition newCondition();
}
```

# ReenTrantLock
Lock的实现类，JDK层面的锁；

三个主要的锁抽线内部类：
- Sync（继承AQS）：锁抽象；
- NonfairSync（继承Sync）：非公平锁抽象；
- FairSync（继承Sync）：公平锁抽象；

通过构造器，创建不同的锁：
```java
// 默认：非公平锁，比较高效
public ReentrantLock() {
    sync = new NonfairSync();
}
// 公平锁
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
```

# AQS
线程同步器：一个双端队列；
![](/images/aqs.png)
通过Lock加锁的线程，都需要判断state的状态来决定是否能够继续执行线程任务；
## AQS重要属性：
- state：是资源的抽象：
  - `state>=1`：锁定状态，表示已有线程获取锁；大于1则表示锁重入；
  - `state==0`：未锁定状态，线程可以通过CAS修改state状态来尝试获取锁；
- Node节点：是线程的抽象：
  - 队列的每一个Node装载一个线程；
  - Node的类型定义了线程是独占还是共享：
  - `EXCLUSIVE类型`：独占操作；
  - `SHARED类型`：共享操作；

## 重要方法：
- **acquire**：尝试获取锁；
  - 1、获取AQS的state，如果`state==0`尝试获取锁；
    - 非公平锁：直接尝试一次；
    - 公平锁：队列中有其他线程则不执行，没有则执行；
  - 2、如果持锁线程是当前线程，则直接获取锁；state+1
- **addWaiter**：线程通过CAS入队；
  - 如果队列存在，则入队；不存在，则初始化队列，再入队；
- **acquireQueued**：线程如果没拿到锁，入队之后执行；
  - 入队之后如果发现，前驱节点为Head头节点，说明此时位置处于第二个线程，则进入循环不断尝试获取锁：`for (;;)`
- **tryRelease**：释放锁，每次state-1，直到为0，锁被释放；

# AQS中如何实现公平锁/非公平锁

1、在尝试获取锁的时候，需要先执行：`hasQueuedPredecessors()`，查看队列中是否有其他线程
- FairSync公平锁抽象实现了此方法，则此方法会执行；
- NonfairSync非公平锁抽象，没有实现此方法，为空方法，即不会关注队列是否有线程，会直接尝试获取锁；


# 可重入锁
> 当一个线程获取锁后，再次获取同一把锁，不会阻塞，锁状态累加，解锁时，释放相同的次数；

通常情况下，会存在多种方法对同一个共享资源进行操作，同一个线程也可能进入多个操作方法中，就存在锁需要被获取多次的情况；

synchronized和Lock都是通过计数器实现的可重入锁；

### 为什么需要重入锁，又为什么需要计数器？

1、避免死锁，同一个线程多次进入临界区，重入锁可以防止死锁；但是每次获取锁，只要判断是否为当前线程即可，也同样不会死锁，可以直接重入，可以不需要计数器；

2、解锁时就需要计数器了，根据记录次数进行解锁，如果不记录重入次数，可能发生锁提前释放；