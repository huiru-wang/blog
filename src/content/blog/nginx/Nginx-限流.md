---
author: huiru
pubDatetime: 2021-11-19T09:22:53Z
title: nginx-限流
postSlug: nginx-限流
featured: false
draft: false
category: Server
tags:
  - nginx
ogImage: ""
description: nginx限流
rank: 30
---

[nginx-限流官网文档](http://nginx.org/en/docs/http/ngx_http_limit_req_module.html)

```conf
http{
  # 定义一个限流规则：使用10m的缓存 记录远程地址 对其限制每秒 1 request
  limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;

  server{
    location / {
      limit_req zone=one burst=5;  # 使用one限流规则，突发请求不超过5
    }
  }
}
```
- 超出速率默认响应：`503 Service Temporarily Unavailable`