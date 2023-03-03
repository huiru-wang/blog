---
author: huiru
pubDatetime: 2022-02-11T08:39:00Z
title: Spring-事务
postSlug: Spring-事务
featured: false
draft: false
category: Framework
tags:
 - Spring
ogImage: ""
description: Spring事务/事务超时
---

[实际使用：Spring-Transaction-demo](https://github.com/huiru-wang/JavaCodeSnippet/tree/main/SpringTransaction)

# 三大基础设施
1、PlatformTransactionManager
最顶层事务接口：约束了最基础的事务方法：
```java
public interface PlatformTransactionManager extends TransactionManager {

    TransactionStatus getTransaction(@Nullable TransactionDefinition definition) throws TransactionException;

    void commit(TransactionStatus status) throws TransactionException;

    void rollback(TransactionStatus status) throws TransactionException;
}
```
2、TransactionDefinition

通过TransactionDefinition，可以配置Spring开启的事务的事务属性：

一般用于编程式事务，相当于配置声明式事务注解中的参数
- 事务的传播特性
- 事务的隔离性
- 事务的回滚规则
- 事务超时时间
- 事务是否只读

3、TransactionStatus

事务状态，可以通过TransactionStatus查看事务状态信息；

编程式事务，进行回滚、提交时需要此对象；


# Spring七种事务传播

**事务的传播行为：当前的事务下的子事务，是否共用一个事务**

`@Transactional(propagation = Propagation.REQUIRED)`

常用的就前面几个；

- **PROPAGATION_REQUIRED**：共用一个事务，如果没有事务，就开启一个新的
- **PROPAGATION_SUPPORTS**：共用一个事务，如果没有事务，就不用事务
- **PROPAGATION_MANDATORY**：共用一个事务，如果没有事务，就抛出异常
- **PROPAGATION_REQUIRES_NEW**：新建一个事务，并把父事务挂起
- **PROPAGATION_NOT_SUPPORTED**：不使用事务，并把父事务挂起
- **PROPAGATION_NEVER**：不使用事务，如果存在父事务，就抛出异常
- **PROPAGATION_NESTED**：不使用事务，如果存在嵌套事务，就抛出异常

# 长/大事务
长/大事务：事务从开始到结束时间很长；
- 时间长，时延就大；
- 长时间占用数据库连接；
- 事务涉及的数据库资源范围大，数据被锁，可能阻塞其他线程；
- 如果回滚了，也会需要很长时间；

可能的原因：
- 事务内耗时任务：远程调用、耗时计算等；
- 并发量大，事务执行过程中需要竞争锁；



Spring中配置超时时间

Spring中仅在执行SQL时，判断是否超时，如果执行完SQL了，同一个方法内，后续部分超时，不会回滚



# 事务失效场景：

失效的本质：**没有使用代理对象，或代理对象无法感知到指定异常，或数据库不支持事务；**

1、异常被捕获，没有抛出，代理对象无法感知
```java
@Transactional(rollbackFor = Exception.class)
public void insertWithTransaction(Order order) {
    try{
        // ...
        orderMapper.insert(order);
    }catch(Exception e){
        // ..
    }
}
```
2、this方法调用，且注解在this方法上，主要看能不能生成代理对象

注解加在上面的方法是可以生成代理对象的，事务没问题

注解在this方法上失效
```java
// @Transactional 加在这里事务不会失效！
public void failCondition1() {
    Order order = OrderUtils.getOrder();
    orderMapper.insert(order);
    this.insertOrderWithThisTransaction(order);
}

// 这里事务会失效，不可AOP，两条数据都会插入
@Transactional(rollbackFor = Exception.class)
public void insertOrderWithThisTransaction(Order order) {
    orderMapper.insert(order);
    throw new RuntimeException();
}
```
3、private、final、static修饰的方法

4、数据库不支持事务


## 声明式、编程式
声明式简洁易用，虽然看起来粒度是整个方法，但是只有第一个写操作，才会真正开启事务

因此不存在编程式事务粒度更细这一说；
