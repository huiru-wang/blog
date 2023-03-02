---
author: huiru
pubDatetime: 2022-12-24T11:39:00Z
title: Flink-Watermark
postSlug: Flink-Watermark
featured: false
draft: false
category: bigData
tags:
 - flink
ogImage: ""
description: Watermark/水印/水位线
---
[Flink - watermarks官方文档](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/dev/datastream/event-time/generating_watermarks/)

## Flink时间语义
1、事件时间：数据携带的时间或发生的时间；

3、处理时间：Flink读取到数据的当前时间；

## Watermark

flink要想根据时间处理数据，就需要从数据上提取一个时间字段，作为处理的标识，通常是从元素中提取时间戳，随着流在集群中传递；

这个时间字段就像是flink给数据流中每个元素打上的水印；

- 水位线的时间戳必须单调递增，确保任务向前推进；
- 水位线通过设置延迟，来保证正确处理乱序数据；
- 两个watermark间的数据是左闭右开 [8:00,9:00)

### 内置水位线生成器
本质上有两种生成方式：
- 周期性生成：
- 断点式生成：每一条数据都会进行特定的条件判断，来生成水印；

根据流的事件时间特点，选择生成策略：

1、有序流：时间单调递增，不会出现迟到数据；(理想状态，很少用)
  - `WatermarkStrategy.forMonotonousTimestamps()`
  - Monotonous：单调的

2、乱序流：时间可能乱序，就必须设置一个固定量的延迟时间；(延迟：一般指数据发生时间到flink处理时间差)
  - `WatermarkStrategy.forBoundedOutOfOrderness(Duration.ofSeconds(5))`
  - 有界乱序
  
3、自定义生成策略

### 水位线的传递

![水位线的传递](/images/watermark-broadcast.png)

1、水位线以广播形式传递；

2、每个分区接受的水位线可能有时差，当出现更小的水位线时，TaskManager需要更新将要广播的水位线 调为最小值；

