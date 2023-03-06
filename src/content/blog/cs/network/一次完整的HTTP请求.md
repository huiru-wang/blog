---
author: huiru
pubDatetime: 2021-08-02T13:39:00Z
title: 一次完整的HTTP请求
postSlug: 一次完整的HTTP请求
featured: false
draft: false
category: CS
tags:
 - network
ogImage: ""
description: ""
rank: 17
---
# 一次完整的HTTP请求

## 1、域名解析

- 首先浏览器搜索自身的DNS缓存
  
- 如果浏览器没有缓存,则会搜索系统的DNS缓存
  
- 如果还没有,就从hosts文件中找
  
- 还没有,就递归地去域名服务器查找
  

## 2、建立TCP连接

三次握手，建立成功后，客户端才能发送Http请求

## 3、客户端发送HTTP请求

HTTP请求报文由三部分组成：请求行，请求头和请求正文

- 请求行：用于描述客户端的请求方式，请求的资源名称以及使用的HTTP协议的版本号
  
- 请求头：用于描述客户端请求哪台主机，以及客户端的一些环境信息等
  
- 空行
  
- 请求正文(数据)
  

```context
POST /user HTTP/1.1 //请求行

Host: www.user.com

Content-Type: application/x-www-form-urlencoded

Connection: Keep-Alive

User-agent: Mozilla/5.0. //以上是请求头

（此处必须有一空行） //空行分割header和请求内容

name=world 请求正文
```

## 4、服务端响应html

HTTP响应也由三部分组成：状态码，响应头和实体内容  
- 状态码  
- 若干响应头  
- 实体内容

## 5、浏览器解析html代码

览器拿到html文件后，就开始解析其中的html代码  
遇到js/css/image等静态资源时，就向服务器端去请求下载  
此时就需要用到Connection:keep-alive特性了,建立一次连接,就可以请求多个资源  
针对每个资源, 进行多线程请求, 页面显示顺序不一定按照代码顺序执行

## 6、浏览器渲染HTML

浏览器是一个边解析边渲染的过程

- 首先浏览器解析HTML文件构建DOM树
  
- 然后解析CSS文件构建渲染树
  
- 等到渲染树构建完成后，浏览器开始布局渲染树并将其绘制到屏幕上
  

JS的解析是由浏览器中的JS解析引擎完成的。  
JS是单线程运行，JS有可能修改DOM结构，  
意味着JS执行完成前，后续所有资源的下载是没有必要的，所以JS是单线程，会阻塞后续资源下载

7.服务端关闭TCP连接  
如果浏览器的请求头信息中有Connection:keep-alive,则会保持连接