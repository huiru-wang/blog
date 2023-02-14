---
author: huiru
pubDatetime: 2022-03-16T08:36:00Z
title: Java-线程
postSlug: Java-线程
featured: true
draft: false
tags:
 - linux
ogImage: ""
description:
 Java/线程/中断线程
---

:large_orange_diamond:-----------------------------------------------------------------------------------------------------------------------------------------------------:large_orange_diamond:

# 如何中断线程
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
