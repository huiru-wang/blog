---
author: huiru
pubDatetime: 2021-12-15T17:22:30Z
title: Kafka-文件存储机制
postSlug: Kafka-文件存储机制
featured: false
draft: false
category: bigData
tags:
  - kafka
ogImage: ""
description: Kafka文件存储机制/segment/log/index
rank: 57
---
# 消息存储特点

1、**顺序追加写入日志**，不考虑更新操作；

2、**二分搜索** + **稀疏索引** 实现高效查询操作(通过offset/时间戳)

3、大量使用**pageCache**提高读写效率；

4、发送消息采用**零拷贝**；

# 存储结构
![](/images/partitionfile.png)

Partition文件下是一组一组文件构成
- Segment是一个分段概念：`.index` +`.log` + `.timeindex` 文件为一个<mark>Segment</mark>
- `.log`文件每追加到1G大小，生产一个新的Segment；
- `.log`文件：记录每一条消息的存储信息，包括在此文件内的偏移地址，创建时间，是否事务，消息存储的物理地址
- `.index`文件(稀疏索引)：log日志每追加4kb，在index中记录追加的消息起始偏移量、起始position

# 消息寻址过程

![](/images/index文件.png)

寻址主要通过下面几个参数：
- `.index` [消息偏移量，position指针]，position指向.log的position
- `.log`    [消息offset，position指针]

假设查找offset：177854消息寻址过程：(二分搜索)

1. 搜索到17784在[17780-18253]之间，就锁定了以17780为起始的segment(.log/.index文件)
   
2. 根据`.index`记录，17783在17780+3~6的偏移位置之间，因此锁定指针153
   
3. 在`.log`文件中从153开始向下顺序查找，找到offset 17784消息
   
4. 从磁盘读取并发送此条消息(零拷贝)


# RecordBatch/PageCache

![kafka-pagecache](/images/kafka-pagecache.png)

- partition接受消息到返回ACK确认，整个操作都在内存中完成，响应速度很快；
- 消息落盘交由操作系统异步刷新脏页到磁盘文件；