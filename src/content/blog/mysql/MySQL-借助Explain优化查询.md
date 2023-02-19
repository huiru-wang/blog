---
author: huiru
pubDatetime: 2022-3-07T13:39:00Z
title: MySQL-借助Explain优化查询
postSlug: MySQL-借助Explain优化查询
featured: false
draft: false
category: DataBase
tags:
 - mysql
ogImage: ""
description: EXPLAIN
---

[了解查询执行计划](https://dev.mysql.com/doc/refman/8.0/en/execution-plan-information.html)

EXPLAIN：用于显示SELECT、DELETE、INSERT、REPLACE、UPDATE语句的执行计划；

```sql
explain sql
```
1、id：表示select语句中查询的序号(优先级)；
2、select_type：读取一张表的操作类型；
3、type：表示了表是如何与前一个表连接的，如果是单表则表明当前单表的检索方式；
- 详解：[explain-join-types](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html#explain-join-types)
- 