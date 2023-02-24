---
author: huiru
pubDatetime: 2022-12-25T11:39:00Z
title: FlinkSQL-时间处理
postSlug: FlinkSQL-时间处理
featured: false
draft: false
category: bigData
tags:
 - flink
ogImage: ""
description: flink/flinkSql时间处理/自定义时间函数
---

## Flink时间语义
1、事件时间：数据携带的时间或发生的时间；

3、处理时间：Flink读取到数据的当前时间；

## Watermark

如果想向数据流插入一条水位线，

Flink不依赖系统时间，每个并行子任务都会基于数据自带的时间戳去定义了一个时钟，以此驱动每个子任务的作业进展；

- 水位线主要的内容是一个时间戳；插入到流中作为标记；
- 水位线的时间戳必须单调递增，确保任务向前推进；
- 水位线基于事件时间生成；
- 水位线通过设置延迟，来保证正确处理乱序数据；
- 要创建watermark，就要告知flink事件时间，基于事件时间生成watermark；
- 两个watermark间的数据是左闭右开 [8:00,9:00)

### 内置水位线生成器
本质上有两种生成方式：
- 周期性生成：
- 断点式生成：

根据流的事件时间特点，选择生成策略：
1、有序流：时间单调递增，不会出现迟到数据；(理想状态，很少用)
  - `WatermarkStrategy.forMonotonousTimestamps()`

2、乱序流：时间可能乱序，就必须设置一个固定量的延迟时间；(延迟：一般指数据发生时间到flink处理时间差)
  - `WatermarkStrategy.forBoundedOutOfOrderness(Duration.ofSeconds(5))`
3、自定义生成策略



## Flink中的时间类型
两个时间类型：
- TIMESTAMP：不携带时区，可以直接从标准格式字符串自动转换；或从Long通过自带函数转换；
- TIMESTAMP_LTZ：携带时区(UTC)

以下类型可以直接互转(**String必须为标准格式：yyyy-MM-dd HH:mm:ss**)：
| flink        | java                              | MySQL    |
| ------------ | --------------------------------- | -------- |
| TIMESTAMP(3) | String // 仅CREATE TABLE可用      | dateTime |
| TIMESTAMP(3) | TO_TIMESTAMP(String)              | dateTime |
| TIMESTAMP    | TO_TIMESTAMP(FROM_UNIXTIME(Long)) | dateTime |
- Java的Long型时间戳需要用秒级
- 除了标准格式外，其他类型需要自定义函数转换

```java
String contents = "2021-12-12 00:00:01";   // 标准格式

// 标准格式，直接读入TIMESTAMP
String ddl = "CREATE TABLE contents (\n" +
        "  ts TIMESTAMP,\n" + 
        "  WATERMARK FOR ts AS ts - INTERVAL '3' SECOND\n" +
        ")";

// 也可读入STRING,但不能作为TIMESTAMP使用，需要内置函数TO_TIMESTAMP转换
String ddl = "CREATE TABLE contents (\n" +
        "  startTime STRING,\n" +
        "  ts AS TO_TIMESTAMP(startTime),\n" +
        "  WATERMARK FOR ts AS ts - INTERVAL '3' SECOND\n" +
        ");        
```

## 自定义时间函数
**两种非标格式时间字符串转换(简写)：**
```java
StreamTableEnvironment tEnv =...;

tEnv.createTemporaryFunction("ParseLocalDate", new LocalDateTimeParserFunction());

tEnv.createTemporaryFunction("ParseTimestamp", new TimestampParserFunction());

String contents = "2021-12-12T00:00:01.123";    // 非标格式

String ddl = "CREATE TABLE contents (\n" +
        "  startTime STRING,\n" +   // 非标准格式，只能读取STRING
        // str->Long->TIMESTAMP
        "  ts AS TO_TIMESTAMP(FROM_UNIXTIME(ParseTimestamp(startTime))), \n" +
        // str->TIMESTAMP
        "  ts AS TO_TIMESTAMP(ParseLocalDate(startTime)), \n" +
        // TIMESTAMP 的 ts 可以作为watermark使用
        "  WATERMARK FOR ts AS ts - INTERVAL '3' SECOND\n" +
        ");
```
**自定义函数：**

```java
// 转Long时间戳(s)
public class TimestampParserFunction extends ScalarFunction {

    static final String DEFAULT_FMT = "yyyy-MM-dd'T'HH:mm:ss.SSS";
    
    static final DateTimeFormatter defaultFormatter 
                    = DateTimeFormatter.ofPattern(DEFAULT_FMT);

    public Long eval(String dateStr) {
        LocalDateTime localDate = LocalDateTime.parse(dateStr, dateTimeFormatter);

        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());

        return zonedDateTime.toInstant().getEpochSecond();
    }
}

// 转string
public class LocalDateTimeParserFunction extends ScalarFunction {

    static final String DEFAULT_FMT = "yyyy-MM-dd'T'HH:mm:ss.SSS";
    static final String NORMAL_FMT = "yyyy-MM-dd HH:mm:ss";

    static final DateTimeFormatter defaultFormatter 
                    = DateTimeFormatter.ofPattern(DEFAULT_FMT);

    static final DateTimeFormatter normalFormatter 
                    = DateTimeFormatter.ofPattern(NORMAL_FMT);

    public String eval(String dateStr) {

        LocalDateTime localDateTime 
                    = LocalDateTime.parse(dateStr, defaultFormatter);

        return localDateTime.format(normalFormatter);
    }
}
```