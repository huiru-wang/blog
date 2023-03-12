---
author: huiru
pubDatetime: 2022-3-03T13:39:00Z
title: InnoDB-B+树索引及使用原则
postSlug: InnoDB-B+树索引及使用原则
featured: false
draft: false
category: DataBase
tags:
 - mysql
ogImage: ""
description: MySQL/InnoDB/B+树
rank: 15
---
[MySQL-InnoDB 官方文档](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)

# 索引
InnoDB中的索引是InnoDB提供的一种B+树数据结构；

目的：提高数据查询效率，就像书本的目录一样，根据文章标题(辅助索引)找到页码(主键)，再找到具体文章内容(row)；

索引页默认：16K，由`innodb_page_size`设置；非PageCache的一页，通常为多页PageCache；

# B+树结构

![b+tree](/images/b+tree.png)

- 一张表有几个索引，就有几个B+树结构，最少一个；
- 每个节点就是一页InnoDB缓存页：[磁盘IO](/posts/磁盘IO)
- 非叶子节点进存储当前B+树的索引信息；
- 叶子节点存放具体的记录；
  - 聚簇索引：存放全量数据（如图主键索引）；
  - 二级索引：存放索引列 + 主键列的数据；
- 假设一页只考虑记录头和索引，一页索引数量 = 16kb / (记录头5b + 索引列占用大小)

## B+树查找过程
1、将节点1加载进内存中，发生一次磁盘IO；

2、在内存中使用二分查找，确定索引列的位置，通过指针，找到下一个节点；

3、将下一个节点加载进内存，发生一次磁盘IO；以此类推；

4、直到最后找到叶子节点，加载进内存，发生一次磁盘IO，并找到索引对应的数据，读取数据；

因此三层B+树仅需三次磁盘IO，就能锁定数据；一般的表3层足矣；

## 为什么用B+树
从查找过程可以看出：
- 非叶子节点只存放索引，使得索引效率很高，存放的数据量很大；
- 大量减少磁盘IO，大部分场景最多只需要三次磁盘IO；

# Clustered Indexes
聚簇(聚集)索引：InnoDB为每一个表设置的索引，是一种叶子节点覆盖所有列的索引；
- 索引列通常为主键；
- 每张表只能有一个聚簇索引(主键只有一个)；
- 通过聚簇索引访问表的速度最快；

聚簇索引的创建：
- 当表设置了主键，即主键为聚簇索引；
- 当表没有主键，则第一个非空索引，设为聚簇索引；
- 当表没有任何索引，InnoDB会创建一个隐藏的row-id为聚簇索引；

# Secondary Indexes
聚簇索引之外的索引，都成为：二级索引，也叫辅助索引；
- 其叶子节点仅涵盖索引列的数据；

# 索引创建原则
1、**命名规范**

- 主键：pk_[column]
- 唯一索引：uk_[column]_[column]
- 普通联合索引：idx_[column]_[column]

[创建索引](/posts/mysql-常用sql及优化.md)

2、**最左前缀匹配**
```sql
-- t表有索引：idx_a_b_c_d，下面sql只能用到索引：a_b
select id from t where a = 1 and b = 2 and c > 3 and d = 5;
```
MySQL顺序匹配索引，当匹配到c，发现是(>、<、between、like)，则停止，后续的d不会使用索引；
```sql
-- 下面sql能用到索引：a_b_d
select id from t where a = 1 and b = 2 and d = 5 and c > 3;
```
- 尽量查询条件按保持索引顺序排列，通常要考虑到业务中多个使用到同一索引的查询顺序；
- 范围条件(>、<、between、like)尽量放在最后；并非是不走索引，而是可能不走索引

  由InnoDB的优化器决定，当Mysql发现通过索引扫描的行记录数超过全表的10%-30%时，就会全表扫描；

3、**使用区分度高的列作为索引**

计算区分度：`count(distinct col) / count(*)`

- 加快数据过滤、索引定位；

4、**条件语句中的索引列禁止参与计算**

5、**扩展索引而非新增索引**

表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可
