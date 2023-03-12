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

从消息的整条链路上分步考虑可能丢失消息的场景：

## 生产端消息丢失
生产端的消息丢失主要是ACK机制=0，没有保证消息发送到broker；

因此：
- 开启`ack = 1`，仅需确认Leader接受，无需等待Followers备份，时延不会太高；
- kafka只要数据写入PageCache中，就会返回ACK，不需要等待落盘，除非pageCache写入硬盘时宕机，否则基本不会丢失消息；
- 适当设置retries，发送失败时重试；


## MQ服务端消息丢失
pageCache可能落盘前宕机丢失；概率很小，如果性能可以让步，就`ack = -1`；并保证：
- 分区的副本数 >= 2，保证消息有副本，且不在同一节点上；
- ISR副本数`min.insync.replicas` >= 2

## 消费端消息丢失
消费者消费失败，自动提交了offset；
- 使用手动提交：`enable.auto.commit = false`
  - 同步：commitSync，有自动的重试机制；可靠性高；
  - 异步：commitAsync，不管是否提交成功；
- 将消费逻辑和手动提交绑定在一个事务中，保证原子性；
