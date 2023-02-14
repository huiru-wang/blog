---
author: huiru
pubDatetime: 2022-02-22T13:39:00Z
title: redis-lua脚本
postSlug: redis-lua脚本
featured: true
draft: false
tags:
 - redis
ogImage: ""
description:
 redis-lua脚本
---

# 加锁
```lua
local lockClientId = redis.call('GET', KEYS[1])
if lockClientId == ARGV[1] then
  redis.call('PEXPIRE', KEYS[1], ARGV[2])
  return true
elseif not lockClientId then
redis.call('SET', KEYS[1], ARGV[1], 'PX', ARGV[2])
  return true
end
return false
```
简写为一行：
```lua
local lockClientId = redis.call('GET', KEYS[1])\nif lockClientId == ARGV[1] then\n  redis.call('PEXPIRE', KEYS[1], ARGV[2])\n  return true\nelseif not lockClientId then\n  redis.call('SET', KEYS[1], ARGV[1], 'PX', ARGV[2])\n  return true\nend\nreturn false
```


# 解锁
```lua
if redis.call('GET', KEYS[1]) == ARGV[1] then
  return redis.call('DEL', KEYS[1])==1
else
  return true\nend\n
```

简写为一行：
```lua
if redis.call('GET', KEYS[1]) == ARGV[1] then\n  return redis.call('DEL', KEYS[1])==1\nelse\n  return true\nend\n
```
