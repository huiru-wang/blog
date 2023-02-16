---
author: huiru
pubDatetime: 2022-02-12T11:39:00Z
title: Git-rebase
postSlug: Git-rebase
featured: true
draft: false
tags:
 - git
ogImage: ""
description:
 git rebase/合并多个提交/合并远端代码
---

# git rebase -i

`git rebase -i`：可对多个连续的提交，采取多种操作；对其进行合并、删除、修改commit信息等等；

pick：保留该commit（缩写:p）

reword：保留该commit，但我需要修改该commit的注释（缩写:r）

edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）

squash：将该commit和前一个commit合并（缩写:s）

fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）

exec：执行shell命令（缩写:x）

drop：我要丢弃该commit（缩写:d）

# 使用rebase -i 合并多个提交

使用：`git rebase -i`完成多个提交的合并；

- `git rebase -i [start] [end]`：合并 [start, end] 间的提交；
- `git rebase -i [start]`：合并 [start, HEAD] 间的提交；
- `git rebase -i HEAD~n`：合并HEAD前n个提交；

1、执行git rebase -i

2、选择对commit要进行的操作：

- 将第一个commit保留：pick
- 后续commit合并：squash

3、保存退出，修改生成的单独的commit信息；

# 使用fetch/rebase更新本地

1、`git fetch [repository]` 从指定远端仓库拉取最新代码到本地，所有分支都会拉，一般为从主仓fetch

2、`git rebase [branch]`(git rebase origin/master) 将当前分支rebase到origin/master分支上

3、有冲突，则解决冲突，无冲突，则更新代码完成；

4、更新完成，push到个人仓；
