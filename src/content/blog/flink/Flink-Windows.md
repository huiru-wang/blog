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
description: Windows/事件处理时间窗口/自定义窗口触发/Trigger/超时关窗
rank: 20
---

[Flink - windows 官方文档](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/dev/datastream/operators/windows/)

![window](/images/window.png)

### **时间窗 ❌**  |  **时间桶  ✔**

-------

## 窗口如何触发

当数据到来、周期的定时器调用特定的钩子，触发特定的窗口操作，来执行关窗、清空等操作；

**窗口触发的5个触发器**：
- onElement()：当数据进入窗口内，调用此方法，通常是判断是否需要关窗
  
  `watermar>=window.endTime`

  通常在这里注册额外的定时器Timer
- onEventTime()：当一个已注册的事件时间计时器启动时调用
  
  注册：`ctx.registerEventTimeTimer()`
- onProcessingTime()：当一个已注册的处理时间计时器启动时调用
  
  注册：`ctx.registerProcessingTimeTimer()`
- onMerge()：与状态性触发器相关，当使用会话窗口时，两个触发器对应的窗口合并时，合并两个触发器的状态。
- clear()：执行任何需要清除的相应窗口。
    
    当有Timer时，需要在这里删除Timer：`ctx.deleteXXXXXTimer()`

**窗口触发的4个动作**：

在触发器方法中返回以下动作，执行特定窗口操作
- CONTINUE：什么也不做
- FIRE：触发计算
- PURGE：清除窗口中的数据
- FIRE_AND_PURGE：触发计算并清除窗口中的数据

## 事件时间窗口的触发
默认触发条件：

当`onElement()`执行时，满足：**窗口内有存量数据 && watermark >= window.maxTimestamp**，则触发**FIRE**

前提是onElement()被执行，即要有数据到来；如果前两个条件满足，但是迟迟没有新的数据到来，是不会触发事件窗口的；

如果要定时关闭窗口，输出数据，需要自定义触发器，注册Timer；

详见：[Github-Trigger](https://github.com/huiru-wang/JavaCodeSnippet/tree/main/FlinkExample/src/main/java/com/snippet/flinkexample/stream/trigger)

Example：[Github-自定义Trigger超时关窗](https://github.com/huiru-wang/JavaCodeSnippet/blob/main/FlinkExample/src/main/java/com/snippet/flinkexample/stream/window/TumbleWindowExample.java)


## 处理时间窗口的触发




## Non-keyed stream窗口
不进行数据keyBy分组，直接使用`windowAll()`，多用于对多个窗口进行聚合操作






