---
author: huiru
pubDatetime: 2021-10-06T08:36:00Z
title: Linux-用户及权限
postSlug: Linux-用户及权限
featured: false
draft: false
category: DevTools
tags:
  - linux
ogImage: ""
description: 用户及权限
rank: 30
---

## 用户
1、创建用户
```shell
$ useradd nginx
$ passwd nginx
New password:
Retype new password:
passwd: password updated successfully
```
2、切换用户
```shell
su [user]
```


## 修改文件权限：chmod



## 修改所有者
```shell
chown -R [所有者]:[用户组] [path]
```

## 修改用户组
