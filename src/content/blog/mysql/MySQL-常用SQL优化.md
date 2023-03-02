---
author: huiru
pubDatetime: 2022-3-06T09:39:00Z
title: MySQL-常用SQL优化
postSlug: MySQL-常用SQL优化
featured: false
draft: false
category: DataBase
tags:
 - mysql
ogImage: ""
description: 常用SQL优化
---

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
