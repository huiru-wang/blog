---
author: huiru
pubDatetime: 2022-05-12T11:39:00Z
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

## Flink中的时间类型
两个时间类型：
- TIMESTAMP：不携带时区，可以直接从标准格式字符串自动转换；或从Long通过自带函数转换；
- TIMESTAMP_LTZ：携带时区(UTC)

以下类型可以直接互转：
| flink        | java                              | MySQL    |
| ------------ | --------------------------------- | -------- |
| TIMESTAMP(3) | String(yyyy-MM-dd HH:mm:ss)       | dateTime |
| TIMESTAMP    | TO_TIMESTAMP(FROM_UNIXTIME(Long)) | dateTime |
- Java的Long型时间戳需要用秒级
- 除了标准格式外，其他类型需要自定义函数转换


## 自定义时间函数
下面代码简写：
```java
public static void main(String[] args) throws Exception {
    StreamTableEnvironment tEnv =...;

    tEnv.createTemporaryFunction("ParseLocalDate", new LocalDateTimeParserFunction());

    tEnv.createTemporaryFunction("ParseTimestamp", new TimestampParserFunction());

    String contents = "1,beer,3,2019-12-12T00:00:01.123";

    String ddl = "CREATE TABLE orders (\n" +
            "  startTime STRING,\n" +   // 非标准格式，只能读取STRING
            "  ts AS TO_TIMESTAMP(FROM_UNIXTIME(ParseTimestamp(startTime))), \n" +  // str->Long->TIMESTAMP
            "  ts AS TO_TIMESTAMP(ParseLocalDate(startTime)), \n" + // str->TIMESTAMP
            "  WATERMARK FOR ts AS ts - INTERVAL '3' SECOND\n" +  // TIMESTAMP 的 ts 可以作为watermark使用
            ");
```
**自定义函数：**

```java
// 转Long时间戳(s)
public class TimestampParserFunction extends ScalarFunction {

    private static final String DEFAULT_FMT = "yyyy-MM-dd'T'HH:mm:ss.SSS";

    public Long eval(String dateStr) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DEFAULT_FMT);
        LocalDateTime localDateTime = LocalDateTime.parse(dateStr, dateTimeFormatter);
        return localDateTime.atZone(ZoneId.systemDefault()).toInstant().getEpochSecond();
    }
}

// 转string
public class LocalDateTimeParserFunction extends ScalarFunction {

    private static final String DEFAULT_FMT = "yyyy-MM-dd'T'HH:mm:ss.SSS";
    private static final String NORMAL_FMT = "yyyy-MM-dd HH:mm:ss";

    private static final DateTimeFormatter defaultFormatter = DateTimeFormatter.ofPattern(DEFAULT_FMT);
    private static final DateTimeFormatter normalFormatter = DateTimeFormatter.ofPattern(NORMAL_FMT);

    public String eval(String dateStr) {
        LocalDateTime localDateTime = LocalDateTime.parse(dateStr, defaultFormatter);
        return localDateTime.format(normalFormatter);
    }
}
```