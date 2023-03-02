---
author: huiru
pubDatetime: 2022-12-24T13:39:00Z
title: Flink-Windows
postSlug: Flink-Windows
featured: false
draft: false
category: bigData
tags:
 - flink
ogImage: ""
description: Windows/时间窗口
---

[Flink - windows 官方文档](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/dev/datastream/operators/windows/)

![window](/images/watermark-broadcast.png)

**时间窗 ×**

**时间桶 √**

## 窗口分类

## 窗口的触发
窗口5个触发器：
- onElement()：每个元素被添加到窗口时调用
- onEventTime()：当一个已注册的事件时间计时器启动时调用
- onProcessingTime()：当一个已注册的处理时间计时器启动时调用
- onMerge()：与状态性触发器相关，当使用会话窗口时，两个触发器对应的窗口合并时，合并两个触发器的状态。
- clear()：执行任何需要清除的相应窗口。

窗口触发的4个动作：
- CONTINUE：什么也不做
- FIRE：触发计算
- PURGE：清除窗口中的数据
- FIRE_AND_PURGE：触发计算并清除窗口中的数据

### 事件时间窗口的默认触发
触发条件：当**onElement()**执行时，满足：**窗口内有存量数据 && watermark >= window.maxTimestamp**，则触发*FIRE**

前提是onElement()被执行，即要有数据到来；如果前两个条件满足，但是迟迟没有新的数据到来，是不会触发事件窗口的；

### 处理时间窗口的默认触发


### 自定义窗口触发
自定义：重写Trigger，实现触发器方法，并返回对应的触发动作；






