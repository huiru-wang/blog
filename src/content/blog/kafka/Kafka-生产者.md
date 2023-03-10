---
author: huiru
pubDatetime: 2021-12-12T10:22:30Z
title: Kafka-生产者相关
postSlug: Kafka-生产者相关
featured: false
draft: false
category: bigData
tags:
  - kafka
ogImage: ""
description: Kafka生产者/ACK应答/消息不丢失/幂等
rank: 30
---
<img title="" src="/images/2023-02-05-13-58-02-image.png" alt="" data-align="left" width="756">
# 投递的分区策略

# 生产者提升吞吐量

kafka客户端通过缓冲区、批量发送、压缩消息，来提高吞吐量；

缓冲区：缓存发送请求；

- RecordAccumulator：缓冲区大小，默认64Mb

批量发送：根据批次大小，发送间隔进行批量发送，二者触发一个即可；

- 批次大小：`batch.size`到达一定容量大小，触发发送；默认16kb

- 发送间隔：`liner.ms`到达间隔，触发发送；默认10ms

数据压缩：压缩后，一个批次的消息数增大，来提升吞吐量；

- `compression.type`默认使用snappy，支持GZIP、Snappy、LZ4、zstd

- 压缩通过耗时，提高吞吐量，降低带宽；(时间换空间)

- 注意点：
  
  - broker端默认不会解压消息，会交给消费端解压；
  
  - 如果broker采用了与发送端不同的压缩方式，则会触发解压；
  
  - 如果broker中发生了消息转换，则会触发解压，同时零拷贝失效；
  
  - 以上两种情况发生，则可能导致kafka服务CPU升高；因此，尽量保证全链路数据处理方式一致；

# ACK应答

生产者发送消息到broker的确认机制；

1、ack=0；只管发，不管broker是否接收到消息，不等待数据落盘；(基本不使用)

2、ack=1；消息发送到Leader就返回响应，不管ISR队列是否同步完成

3、ack=-1；消息发送到Leader，并且同步到ISR队列每个副本后，返回成功;

- 如果Follower宕机，无法同步，导致生产端发送时延提高，怎么办？
  
  ISR队列内由心跳机制，Follower心跳超时会被踢出ISR队列；
  
  可以降低ISR同步队列的心跳阈值：`replica.lag.time.max.ms`默认30s；

# 发送数据不丢失(发送可靠性)

1、开启ack=-1；保证能落盘，并同步到ISR队列所有follower；最高可靠性保证；

2、分区的副本数 >= 2

3、ISR副本数`min.insync.replicas` >= 2

4、适当设置retries，发送失败时重试；

# 发送幂等(发送不重复)

![](/images/2023-02-05-15-25-17-image.png)

消息去重的依据：PID + PartionId + SeqNumber 全部相同

当：同一Kafka进程的同一分区的同一个消息序列号，才被Broker判定为一条；

1、开启幂等enable.idempotence，默认false

- kafka为每个消息生成唯一Id，并进行分区内去重；
- 保证：单会话(同一Kafka进程)单分区(同一Partition)的消息不重复；

2、使用发送事务，保证原子性；(前提开启enable.idempotence)

# 发送端保证数据有序
