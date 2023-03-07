---
author: huiru
pubDatetime: 2022-3-06T09:39:00Z
title: MySQL-常用SQL及优化
postSlug: MySQL-常用SQL及优化
featured: false
draft: false
category: DataBase
tags:
 - mysql
ogImage: ""
description: 创建索引/大分页/查询优化
rank: 50
---

# 索引
命名：
- 主键：pk_[field]
- 唯一索引：uk_[column]_[column]
- 普通联合索引：idx_[column]_[column]

创建索引：
```sql
ALTER TABLE [table_name] ADD INDEX [index_name] (column, column, column);

ALTER TABLE [table_name] ADD UNIQUE (column);

ALTER TABLE [table_name] ADD PRIMARY KEY (column);

CREATE INDEX [index_name] ON [table_name] (column, column, column);

CREATE UNIQUE INDEX [index_name] ON [table_name] (column_list);
```
删除索引：
```sql
DROP INDEX [index_name] ON [table_name]

ALTER TABLE [table_name] DROP INDEX [index_name]

ALTER TABLE [table_name] DROP PRIMARY KEY
```
建表时创建索引：
```sql
CREATE TABLE IF NOT EXISTS t_xx
(
 ....
 INDEX `idx_startTime_category` (`startTime`, `category`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci
```

# 大数据量分页
如：`limit 1000000, 10`

1、如果id连续，先过滤再limit：
```sql
select id ,name where id > 1000000 limit 10;
```

2、按索引列排序后limit
```sql
select name from t_user order by id limit 10000000,10;
```

3、业务上限制页数，比如最大100页，通过查询条件来筛选数据

# 查询优化





