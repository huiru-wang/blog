---
author: huiru
pubDatetime: 2022-02-12T08:39:00Z
title: Git-仓库相关
postSlug: Git-仓库相关
featured: true
draft: false
tags:
 - git
ogImage: ""
description:
 origin/upstream/git remote/本地仓库/远程仓库/git fetch/远端仓库/更新代码
---

# 仓库操作

查看所有远程仓库：origin/upstream

- `git remote -v`

添加远程仓库：

origin/upstream 为远程仓库的别名，可修改自定义

- `git remote add origin [仓库地址]`
- `git remote add upstream [仓库地址]`

重命名远程仓库：

- `git remote rename [旧仓库名] [新仓库名]`

# 从远端更新本地文件

1、`git fetch [repository]` 从指定远端仓库拉取最新代码到本地，所有分支都会拉，一般为从主仓fetch

- 不会合入当前分支

2、`git rebase [branch]`(git rebase origin/master) 将当前分支rebase到origin/master分支上

3、有冲突，则解决冲突，无冲突，则更新代码完成；

4、更新完成，push到个人仓；
