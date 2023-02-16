---
author: huiru
pubDatetime: 2021-12-25T21:22:30Z
title: Kafka-消费者相关
postSlug: Kafka-消费者相关
featured: false
draft: false
category: MessageQueue
tags:
  - kafka
ogImage: ""
description:
  Kafka消费者/不丢失消息/消费幂等/消费顺序/Kafka事务
---
# 消费方式

Kafka采用Pull的方式，消费者主动轮询拉取消息；

- 好处：对消费端更友好，能根据消费能力，拉取消息；

- 坏处：没有消息，也会一直轮询，占用CPU；

# 消费者和Partition数量关系

Partition存放同一Topic的不同消息，提高并行度；

同组内消费者(C)，与同一个Topic的Partition(C)的数量关系：

- 当C<P，就存在某消费者消费多个Partition；

- 当C=P，效率最高，最大并行度；

- 当C>P，多余的消费者，不会消费这个Topic数据；

一个Partition最多绑定同组内一个消费者；

---

不同组的消费者，在相同Partition的offset不同，不会互相干扰，可以重复消费；

# 消费流程

以下前提是组管理：(也可以不用组，直接消费者连接)

1、消费者上线，向Server发送JoinGroup请求，加入到群组当中；

2、Server端每个Partition有一个Coordinator协调器，由协调器选出群组的消费者Leader；这个协调过程是由Leader-Partition的协调器完成；

3、选出C-Leader后，Leader-Partition的协调器将消费的Topic信息，发送给C-Leader，C-Leader来指定消费方案；(pull模式)

4、消费方案确定后，返回给Leader协调器，再下发给所有的消费者；

5、至此开始按照方案消费；

6、每个消费者都和Leader-Partition的协调器保持心跳；一旦超时，触发再平衡

---

可配置参数：

`partition.assignment.strategy`：分区策略，多个策略可以组合；

- 如果设置，指定此参数的value为：org.apache.kafka.clients.consumer下的xxxxAssignor；

`heartbeat.interval.ms`：心跳间隔；超出则认为下线；触发再平衡，默认3s

`max.poll.interval.ms`：消费者处理消息时长，超出则认为下线，触发再平衡

`session.timeout.ms`：消费者和协调器间的连接超时时间；默认45s

---

Kafka的Partition进行分配消费者的方式有：

- Range：partitions/consumers 决定每个消费者消费几个分区；
  
  - 按照字母顺序，依次分配；
  
  - 如果不是正好平均，就会数据倾斜；
  
  - 触发再平衡，则重新计算；

- RoundRobin：轮流分配；
  
  - 触发再平衡，则重新计算；

- Sticky：粘性分配，再平衡时会尽可能少变动，节省开销；
  
  - 尽量均匀的前提下，尽量少变动；

- CooperativeSticky

由参数：`partition.assignment.strategy`决定

# 消费者保证不丢失消息

1、使用手动提交：`enable.auto.commit = false`

- 同步：commitSync，有自动的重试机制；可靠性高；

- 异步：commitAsync，不管是否提交成功；

保证处理完成，再commit；

# 消费者保证消费幂等

重复消费情况：消费端处理完消息，提交前宕机，offset未更新，则可能重新消费此消息；

解决：

1、需要结合业务，业务代码中，根据业务的消息唯一Id，在处理消息的业务层面做幂等；重复消费时，进行过滤；

具体场景，需要根据业务需要；

# 消费者事务

目标：精准一次消费；

措施：将业务消费过程 + 提交offset 作为原子操作；

需要借助额外的事务支持：

可以借助Spring的事务 + MySQL操作，将方法封装为一个事务；

也可以是发送到其他主题，利用生产者事务；

<img title="" src="/images/2023-02-05-23-06-20-image.png" alt="" data-align="left" width="756">
# 数据积压

原因：消费力不足，处理不过来；

措施：

1、提高分区数，增加消费者数量，并最好 1：1；

2、适当提高消费吞吐量，增加消费批次的大小；

- `fetch.max.bytes`：一次拉取消息的总字节数；默认50Mb

- `max.poll.records`：一次拉取消息的数量；默认500条；

# 消费顺序

首先：同一Partition，kafka保证消息有序；

其次考虑生产端和消费端：

生产端需保证，需要顺序消费的消息，投递到同一Partition；

- 可以设置消息的Key，相同key进入同一个Partition

消费端需要自行保证拿到消息后的消费顺序：

- 单线程消费，则天然顺序消费；(最好是单线程，简单)

- 多线程消费，需要额外进行保证；
