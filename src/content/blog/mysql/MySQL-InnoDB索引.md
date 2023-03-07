---
author: huiru
pubDatetime: 2022-3-03T13:39:00Z
title: MySQL-InnoDB索引
postSlug: MySQL-InnoDB索引
featured: false
draft: false
category: DataBase
tags:
 - mysql
ogImage: ""
description: MySQL/InnoDB
rank: 15
---
## Indexes
InnoDB的索引是InnoDB提供的一种B+树数据结构；

目的：提高数据查询效率，就像书本的目录一样，根据文章标题(辅助索引)找到页码(主键)，再找到具体文章内容(row)；

索引页默认：16K，由`innodb_page_size`设置；



## Clustered Indexes
聚簇(聚集)索引：InnoDB为每一个表设置的索引，是一种叶子节点覆盖所有列的索引；
- 索引列通常为主键；
- 每张表只能有一个聚簇索引(主键只有一个)；
- 通过聚簇索引访问表的速度最快；

聚簇索引的创建：
- 当表设置了主键，即主键为聚簇索引；
- 当表没有主键，则第一个非空索引，设为聚簇索引；
- 当表没有任何索引，InnoDB会创建一个隐藏的row-id为聚簇索引；




## Secondary Indexes
聚簇索引之外的索引，都成为：二级索引，也叫辅助索引；
- 其叶子节点仅涵盖索引列的数据；



## 索引对插入/更新的影响
