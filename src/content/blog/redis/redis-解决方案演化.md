---
author: huiru
pubDatetime: 2022-02-11T08:39:00Z
title: 解决方案演化
postSlug: 解决方案演化
featured: false
draft: false
category: DataBase
tags:
 - redis
ogImage: ""
description: redis方案/架构演化
rank: 20
---

1. 数据怕丢失 -> 持久化（RDB/AOF）
2. 恢复时间久 -> 主从副本（副本随时可切）
3. 故障手动切换慢 -> 哨兵集群（自动切换）
4. 读存在压力 -> 扩容副本（读写分离）
5. 写存在压力/容量瓶颈 -> 分片集群
6. 分片集群社区方案 ->  Twemproxy、Codis（Redis 节点之间无通信，需要部署哨兵，可横向扩容）
7. 分片集群官方方案 ->  Redis Cluster （Redis 节点之间 Gossip 协议，无需部署哨兵，可横向扩容）
8. 业务侧升级困难 -> Proxy + Redis Cluster（不侵入业务侧）

> 参考：https://mp.weixin.qq.com/s/QssILJLna_v7XQWtV5UMzA
