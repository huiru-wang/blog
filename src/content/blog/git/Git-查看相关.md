---
author: huiru
pubDatetime: 2022-02-15T18:39:00Z
title: Git-查看相关
postSlug: Git-查看相关
featured: false
draft: false
category: DevTools
tags:
 - git
ogImage: ""
description: git查看文件修改历史/git查看commit/git查看commit提交记录/git查看日志
rank: 1
---

## 查看日志
```shell
# 查看当前分支下按时间由近到远
git log 

# 仅显示一行：id message
git log --pretty=oneline

# 仅显示最近的n个
git log --pretty=oneline -n 10

# 查看指定提交者 name匹配靠前字符
git log --author=[name] --pretty=oneline -n 10

# 显示commit的简略信息：Author\Date\File
git log --stat

# 显示起始时间 不包含输入时间
git log --since='2023-02-15'
git log --since='2023-02-16 13:13:13'
git log --before='2023-02-16 13:13:13'
```

## 详细查看指定commit
```shell
# 显示commit所有信息
git show [commit_id]

# 显示commit的简略信息：Author\Date\File
git show [commit_id] --stat


```





## 查看文件历史
```shell
git log [filename]
```

