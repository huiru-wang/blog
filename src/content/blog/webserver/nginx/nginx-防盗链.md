---
author: huiru
pubDatetime: 2021-11-13T09:22:53Z
title: nginx-防盗链
postSlug: nginx
featured: false
draft: false
category: WebServer
tags:
  - nginx
ogImage: ""
description: 防盗链/http referer
rank: 50
---

盗链：盗取别人链接，即直接调用并使用其他服务的资源；

从服务端的角度就是：非自己服务的请求，来访问自己的资源；

防盗链：判断请求的调用方，是否为自有服务；

1、none：只允许无referer的请求访问；
```conf
location ~ .*\.(jpg|gif|png)$ {
    valid_referers none;
    ...
}
```
2、blocked：仅允许不以http/https开头的请求访问；

3、指定允许的ip
```conf
# 图片请求，仅允许192.168.1.1访问
location ~ .*\.(jpg|gif|png)$ {
    valid_referers 192.168.1.1;
    if ($invalid_referer) {
        return 403;
    }
    root  /opt/app/code/images;
}
```
4、正则匹配域名
```conf
location ~ .*\.(jpg|gif|png)$ {
    valid_referers *.google.com *ex.com;
    if ($invalid_referer) {
        return 403;
    }
    root  /opt/app/code/images;
}
```
5、同时匹配多个条件，满足一个即可
```conf
location ~ .*\.(jpg|gif|png)$ {
    valid_referers none blocked *.google.com;
    if ($invalid_referer) {
        return 403;
    }
    root  /opt/app/code/images;
}
```