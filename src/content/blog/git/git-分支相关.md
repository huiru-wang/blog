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
 git分支相关/本地分支/远程分支/切换分支
---

# 查看分支

本地分支

- `git branch`

远程分支

- `git branch -r`

全部分支

- `git branch -a`

# 创建分支

基于当前分支创建本地分支：

- `git branch [new branch]`：不切换分支；
- `git switch -c [new branch]`✔️推荐
- `git checkout -b [new branch]`

基于远程分支创建本地分支：

- `git branch [new branch] [upsteam/branch]`：基于远程分支，创建本地分支，不切换；
- `git switch -c [new local branch] [remotes branch]`：切换（✔️推荐）
- `git checkout -b [new branch] [upsteam/branch]`

从当前分支的指定commit创建新的分支：

- `git switch -c [new branch] [commit id]`

创建远程分支（本地push）

- `git push origin [branch]`：创建远程分支；

# 切换分支

（1）切换本地已存在分支：

- `git switch [local branch]`✔️推荐
- `git checkout [local branch]`

（2）基于远端分支创建本地新分支：

- `git switch -c [new local branch] [remotes branch]`✔️推荐
- `git checkout -b [new local branch] [remotes branch]`

# 删除分支

删除本地分支

- `git branch --delete [branch]`

删除远程分支（本地push）

- `git push origin --delete [branch]`：删除`origin`下的某远程分支，分支名不需要再加`origin`

`git push origin -d [branch]`

- `git push origin :[branch]`：删除远程分支，分支名不需要再加`origin`

一般需要同时删除本地和远程：

- 先删本地，再删远程进行同步；

## git revert

`A --> B` git revert `A --> B -->C`

新增一个commit C，回退掉上次的commit B

相当于仅提交了 `A`，但是B的commit记录仍在

- 本地工作区commit B 的代码全部回退；
- 但是commit B的代码仍存在暂存区；可以恢复；代码仍存在于提交记录中；
- 对于主仓分支，一般只能用revert新增来回退，不可用reset强制修改分支；

## git reset

Reset current HEAD to the specified state

强制将分支回到某个commit

语法：`git reset [commit id]`

分支：`A --> B -->C` git reset --hard [commit B] `A --> B`

三种模式solf、mixed、hard：

决定被丢弃的commit，是否从本地删除

1、`--hard`：完全丢弃此commit id之后的commit，也就是C完全删除

2、`--soft`：重置的commit id 之后的commit，仍存于工作区，即C仍在本地；

3、`--mixed(默认)`：保留工作目录，并清空暂存区

场景：

1、单纯回退到某个commit

2、对 commit --amend 同样适用

`A --> B(amend) --> C(amend)` git reset B `A --> B(amend)`

3、针对git revert后的情况，revert是通过新增commit来撤销上次commit，可以通过reset恢复，撤销revert；

4、主仓不可用reset，尽量使用revert；

# 2、回退文件

## 文件在工作区，未stage到暂存区：

（1）撤销修改，即rollback（返回最新的commit的文件状态）：

- `git restore [filen]`✔️推荐
- `git checkout HEAD -- [file]`

![](https://cdn.nlark.com/yuque/0/2022/png/28755652/1671864522905-27060f0a-1e2c-4034-bb37-9593448f031a.png)

## 文件在暂存区，未commit：

（1）撤销stage，并保留修改，即回到not staged状态：

![](https://cdn.nlark.com/yuque/0/2022/png/28755652/1671864801586-3dfdde18-776d-4031-b64c-de0c6277720f.png)

- `git restore --staged [file]`✔️推荐
- `git reset HEAD [file]`

## 文件已commit，未Push：

（1）如果是新文件，不想提交了，希望从commit中删除文件，而不从本地删除：

- `git rm --cached [file]`：文件从git中移除，本地仍在
- `git commit --amend --allow-empty`：删除后，再次提交

（2）如果是旧文件，不想修改了，希望从commit中取消提交：

如果还需要此文件的修改，先暂存

然后，将文件回退到某个commit，然后再add，amend提交：

- `git checkout [commit_id] -- [file]`：将文件回退到指定commit
- `git add [file] && git commit --amend`
