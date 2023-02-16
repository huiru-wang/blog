---
author: huiru
pubDatetime: 2022-02-12T07:39:00Z
title: Redis-大key
postSlug: Redis-大key
featured: false
draft: false
category: DataBase
tags:
 - redis
ogImage: ""
description:
 redis大key
---

多大算Redis的大Key，根据机器配置、业务决定；

一般满足下面的条件，算作大key：

- 单个字符串大于10kb
- hash、set、zset、list：元素超5000

危害：
- 占用内存；
- 读取很占CPU；

**查找大key**：
```shell
redis -cli -h [ip] -p [port] -a [password] --bigkeys
```

**删除大key**：(可能短暂CPU飙高)

1、底层删除
```shell
x unlink [key]
```
2、通过配置惰性删除
```shell
lazyfree-lazy-expire on			# 过期惰性删除
lazyfree-lazy-eviction on		# 超过最大内存惰性删除
lazyfree-lazy-server-del on		# 服务端被动惰性删除
```
