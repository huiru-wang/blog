---
author: huiru
pubDatetime: 2022-02-11T08:39:00Z
title: 内存淘汰机制
postSlug: 内存淘汰机制
featured: false
draft: false
category: DataBase
tags:
 - redis
ogImage: ""
description: redis内存淘汰机制/redis过期策略
rank: 10
---

# 过期策略
Redis采用：**定期删除+惰性删除**来对过期的key进行处理；
## 定期删除

定期删除：在设置key的时候，给定一个expire time（过期时间），指定key的存活时间；

但是：Redis并不会监控这些key，到期就删除；

而是：Redis回每隔100ms随机抽取一些具有过期时间的key，进行检测是否过期，如果过期就删除；

存在问题：既然是随机抽取，就会出现很多到期的key，并没有被抽到，从而没有被删除；

## 惰性删除
每当获取某个key的时候，Redis都会进行检查是否设置了过期时间，是否过期；

存在问题：仍然有可能过期的key，既没有定期删除，也没有被请求访问，导致过期key一直占用内存，就会有内存耗尽的可能；

这就需要内存淘汰机制了；

# Redis内存淘汰机制
过期策略存在无法解决的key，可能导致redis内存耗尽；

这时候就需要：内存淘汰策略（多种淘汰策略）

## 内存淘汰策略
配置：
```conf
maxmemory-policy volatile-lru
```
六种：（三类：报错，AllKeys，volatile）

前提：当内存不足以容纳新写入数据时

- noeviction：新写入操作会报错；（不推荐）
- allkeys-lru：在键空间中，移除最近最少使用的key；（推荐）
- volatile-lru：在设置了过期时间的键空间中，移除最近最少使用的key（不推荐）
- allkeys-random：在键空间中，随机移除某个key；（不推荐）
- volatile-random：在设置了过期时间的键空间中，随机移除某个key（不推荐）
- volatile-ttl：在设置了过期时间的键空间中，有更早过期时间的key优先移除；（不推荐）
