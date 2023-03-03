---
author: huiru
pubDatetime: 2022-02-11T08:39:00Z
title: Spring-事务
postSlug: Spring-事务
featured: false
draft: false
category: Framework
tags:
 - Spring
ogImage: ""
description: Spring事务/事务超时
---

# 关键对象


# 长事务超时
长/大事务：

Spring中配置超时时间

Spring中仅在执行SQL时，判断是否超时，如果执行完SQL了，同一个方法内，后续部分超时，不会回滚


# 事务重点关注问题：
- 长事务
- 事务传播
