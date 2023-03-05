---
author: huiru
pubDatetime: 2021-12-13T12:22:30Z
title: Kafka-保证消息不丢失
postSlug: Kafka-保证消息不丢失
featured: false
draft: false
category: bigData
tags:
  - kafka
ogImage: ""
description: Kafka保证消息不丢失
rank: 50
---

从消息的整条链路上分步考虑：

## 生产端消息不丢失

1、分区的副本数 >= 2，保证消息有副本；

2、开启ack=-1；保证能落盘，并同步到ISR队列所有follower；最高可靠性保证；(需要衡量性能)

3、ISR副本数`min.insync.replicas` >= 2

4、适当设置retries，发送失败时重试；


## MQ服务端消息不丢失


## 消费端消息不丢失

1、使用手动提交：`enable.auto.commit = false`

- 同步：commitSync，有自动的重试机制；可靠性高；

- 异步：commitAsync，不管是否提交成功；

保证处理完成，再commit；
