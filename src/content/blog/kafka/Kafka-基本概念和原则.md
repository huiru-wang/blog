---
author: huiru
pubDatetime: 2021-12-10T15:22:30Z
title: Kafka-基本概念
postSlug: Kafka-基本概念
featured: false
draft: false
category: bigData
tags:
  - kafka
ogImage: ""
description: Kafka概念/Kafka结构/Kafka offset/AR/ISR/OSR/Leader选举
rank: 10
---

# 基本结构

![Kafka基本结构](/images/image-20220423175515000.png)

<mark>Broker</mark>：Kafka一个节点

<mark>Topic</mark>：业务逻辑概念，一个Topic可分为多个Partition分区

<mark>Partition</mark>：消费单元，可备份（图中未备份）

- 冗余—高可用：Partition会在别的Broker中创建副本(Follower)，进行备份
- 天然负载均衡，消息备份后，可由相同业务下的不同节点，同时进行消费处理
- Re-Partition：Consumer、Partion数量变化，触发重新分配Partition（有延迟）
- 同一Partition的消息是有序的

<mark>生产者</mark>：启动在生产端的kafka线程

- 发送数据到Topic（并非只发送到Leader）

<mark>消费者</mark>：启动在客户端的kafka线程

- 同Topic下的1个Partition数据，只能由同组下的1个Consumer消费 （同Topic的不同partition数据是冗余的，乱消费会乱序，offset保证顺序消费）
- 同Topic下的1个Partition数据，可由不同组的多个Consumer消费（Partition数据是可重复消费的，由offset维护每个订阅者的消息索引）

# 原则

Partition原则：

1、Partition是最小的并行单位；

2、一个消费者，可以消费多个Partition；

3、同一个Partition，可以被多个消费组的消费者消费

4、同一个Partition，不可同时被<mark>同一组</mark>内多个消费者消费

- 这样的设计是避免数据竞争；

- 如果同组多个消费者消费同一个Partition，为避免重复消费，必然要加锁；

5、同一分区内，kafka保证消息顺序；

6、消费者在同一分区，按offset顺序消费；

# AR、ISR、OSR

kafka中所有的副本都成为AR = ISR + OSR；

ISR：与Leader保持同步的Follower集合；

OSR：与Leader副本同步时，延迟过多的副本；(宕机后重新上线，但未完成offset同步)

kafka分区的Leader和Follower之间保持心跳同步的集合；当Follower心跳超时会被踢出ISR队列；

相关配置：

`min.insync.replicas`：ISR最小副本数量，默认1

`replica.lag.time.max.ms`：心跳阈值，默认30s；

# Leader选举过程

![](/images/2023-02-05-21-06-14-image.png)

kafka的Partition的副本，都有controller进行监控；

同时zk中对应节点：

```shell
/kafka/brokers/topics/[topic_name]/partition/[partition_id]/state
```

每个副本下都有ISR信息，与zk之间保持心跳，监控ISR和leader信息；

当leader下线，会被zk踢出ISR队列，其他副本的controller通过zk监听到leader下线，会根据选举规则，按照ISR顺序选举靠前的副本作为leader；

并同步给其他ISR队列节点，其他副本可以通过controller确认新选举的leader；

# offset

0.9x版本后：每个broker都有一个默认Topic：`__comsumer_offset`

存放所有Topic的offset信息；

# kafka文件读写高效

1、本身是分布式集群，通过分区，提高并行度；

2、读数据采用稀疏索引，可以快速定位；

3、写数据是顺序写磁盘，写入效率高；

4、页缓存+零拷贝；

- pageCache：相当于磁盘和Kafka应用之间的缓存；

- 零拷贝：减少上下文切换、数据拷贝次数，传输效率高；本身kafka也不处理数据，不需要将数据拷贝到应用层；
