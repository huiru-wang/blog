---
author: huiru
pubDatetime: 2022-02-16T08:36:00Z
title: Java-线程
postSlug: Java-线程
featured: false
draft: false
category: java
tags:
 - 并发
ogImage: ""
description: 创建线程/中断线程/同步异步线程/
---
## 创建线程
本质都是实现Runnable接口，实现run方法，来创建线程任务；

1、继承Thread
- 缺点：Java只有单继承，占用了继承的位置；

2、实现Runnable
- 无返回值的线程任务；
- 创建Thread，传入Runnable接口，也可以实现线程；

3、实现Callable
- 有返回值的线程任务：Future<T>

4、利用线程池
- 向线程池提交Runnable、Callable任务；

## 线程状态
![线程状态](/images/duoxian.png)

1、new

2、Runnable

3、Running

4、Blocked

## 如何中断线程
1、暴力中断：stop():x:禁止使用
```java
@Test
public void stop_thread(){
    CustomThread thread = new CustomThread();
    thread.start();
    thread.stop();  // native 方法暴力中断，不可把控
}
```
2、使用Thread自带的中断标志位，到达自定义的安全点中断：
```java
@Test
public void interrupted_thread() throws InterruptedException {
    CustomThread thread = new CustomThread();
    thread.start();
    TimeUnit.MILLISECONDS.sleep(100);
    thread.interrupt();
    TimeUnit.SECONDS.sleep(1);
}

class CustomThread extends Thread {
    @Override
    public void run() {
        while (!Thread.interrupted()) {
            System.out.println("running");
        }
        System.out.println("thread is stopped"); // quit
    }
}
```
3、自定义标志位，与2相同
```java
@Test
public void interrupted_thread() throws InterruptedException {
    CustomThread thread = new CustomThread();
    thread.start();
    TimeUnit.MILLISECONDS.sleep(100);
    thread.cancel();
    TimeUnit.SECONDS.sleep(1);
}

class CustomThread extends Thread {
    private boolean cancel;
    @Override
    public void run() {
        while (!cancel) {
            System.out.println("running");
        }
        System.out.println("thread is stopped"); // quit
    }

    public void cancel() {
        this.cancel = true;
    }
}
```

## 异步线程

主业务中某些不影响主业务，且耗时的操作可以使用异步的方式执行；

异步执行的方式：
1、创建一个线程执行；

2、提交到线程池；

3、如果需要获取执行结果，使用
- Future：通过`get()`阻塞等待结果
- CompletableFuture：通过回调的方式处理结果；

### 异步线程的回滚
1、手动回滚
```java
CompletableFuture.supplyAsync(()->{
    // 异步任务
}).exceptionally(throwable -> {
    // 这里异步回调，拿到异常，手动回滚；
}
```
2、

