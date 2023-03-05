---
author: huiru
pubDatetime: 2022-01-06T08:36:00Z
title: Linux命令-sed
postSlug: Linux命令-sed
featured: false
draft: true
category: DevTools
tags:
  - linux
ogImage: ""
description: Linux/sed
rank: 70
---

sed命令：用于对文件进行增删改查；

增删改查分别对应：
- `sed na [filename]`：在n行的下一行新增
- c ：取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
- `sed 'n,md' [filename]`：删除n到m行，包含n，m；
- `sed ni [filename]`：在上一行插入；
- p ：打印，亦即将某个选择的数据印出。通常 p 会与参数 sed -n 一起运行～
- s ：取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正则表达式！例如 1,20s/old/new/g 就是啦！

# 增
```shell
sed 
```
