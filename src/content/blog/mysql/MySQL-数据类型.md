---
author: huiru
pubDatetime: 2021-12-21T13:39:00Z
title: MySQL-数据类型
postSlug: MySQL-数据类型
featured: false
draft: false
category: DataBase
tags:
 - mysql
ogImage: ""
description:
 MySQL数据类型/varchar
---

# 字符串类型
参考：[MySQL8.0-The CHAR and VARCHAR Types](https://dev.mysql.com/doc/refman/8.0/en/char.html)

## char/varchar
char(n) / varchar(n)：n为声明的最大字符数，非字节；

char和varchar存储对比：
| Value        | `CHAR(4)` | Storage Required | `VARCHAR(4)` | Storage Required |
| ------------ | --------- | ---------------- | ------------ | ---------------- |
| `''`         | `'    '`  | 4 bytes          | `''`         | 1 byte           |
| `'ab'`       | `'ab  '`  | 4 bytes          | `'ab'`       | 3 bytes          |
| `'abcd'`     | `'abcd'`  | 4 bytes          | `'abcd'`     | 5 bytes          |
| `'abcdefgh'` | `'abcd'`  | 4 bytes          | `'abcd'`     | 5 bytes          |
- char长度固定(0-255)，varchar在最大长度内动态扩容(0-65535)
- 两者都不可超过最大字符数；
- varchar使用`1byte`的额外存储，用来表示长度
  - 当n<=255，额外占用1byte；
  - 当n>255，额外占用2byte；

## Text
不占用MySQL行的字节大小；



