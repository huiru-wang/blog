---
author: huiru
pubDatetime: 2022-02-11T08:39:00Z
title: Git-分支相关
postSlug: Git-分支相关
featured: false
draft: false
category: DevTools
tags:
 - git
ogImage: ""
description:
 git分支相关/本地分支/远程分支/切换分支/创建分支/删除分支
---

# 查看分支

**本地分支**

- `git branch`

**远程分支**

- `git branch -r`

**全部分支**

- `git branch -a`

# 创建分支

**基于当前分支创建本地分支**：

- `git branch [new branch]`：不切换分支；
- `git switch -c [new branch]`✔️推荐
- `git checkout -b [new branch]`

**基于远程分支创建本地分支**：

- `git branch [new branch] [upsteam/branch]`：基于远程分支，创建本地分支，不切换；
- `git switch -c [new local branch] [remotes branch]`：切换（✔️推荐）
- `git checkout -b [new branch] [upsteam/branch]`

**从当前分支的指定commit创建新的分支**：

- `git switch -c [new branch] [commit id]`

**基于本地分支创建远程分支(本地push)**

- `git push origin [local_branch]:[branch]`：创建远程分支；
```shell
git push origin master:master_new
```

# 切换分支

（1）**切换本地已存在分支**：

- `git switch [local branch]`✔️推荐
- `git checkout [local branch]`

（2）**基于远端分支创建本地新分支**：

- `git switch -c [new local branch] [remotes branch]`✔️推荐
- `git checkout -b [new local branch] [remotes branch]`

# 删除分支

**删除本地分支**

- `git branch --delete [branch]`

**删除远程分支(本地push)**

- `git push origin --delete [branch]`：删除`origin`下的某远程分支，分支名不需要再加`origin`

`git push origin -d [branch]`

- `git push origin :[branch]`：删除远程分支，分支名不需要再加`origin`

一般需要同时删除本地和远程：

- 先删本地，再删远程进行同步；
