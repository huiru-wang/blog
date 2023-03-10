---
author: huiru
pubDatetime: 2021-09-03T15:39:00Z
title: TCP网络编程
postSlug: TCP网络编程
featured: false
draft: false
category: CS
tags:
 - os
ogImage: ""
description: TCP网络编程
rank: 19
---
Socket生命周期

```shell
# 查看linux socket文档
man socket
```

1、创建Socket对象：

```c
int socket(int domain, int type, int protocol);
```

- domain：通信协议族，有很多协议，一般选择IP地址类型：

  - AF_INET（IPV4）

  - AF_INET6（IPV6）

- 数据传输方式：

  - SOCK_STREAM（双向可靠数据流）

  - SOCK_DGRAM（单向不可靠无连接报文）

- 协议：TCP、UDP

创建socket，成功后，返回创建的socket的fd文件描述符

为socket打开一个fd文件，返回一个int，0则打开成功，-1则失败，成功后

2、Socket.bind()绑定端口号，并

```c
int bind(int sockfd,const struct sockaddr *addr,socklen_t addrlen);
```

- sockfd：成功创建的socket文件描述符；

- addr：一个包含绑定IP、端口的结构体sockaddr；

- addrlen：addr结构体的大小；

此时才真正的为创建的socket分配内存；

3、listen()将socket置于监听状态，等待客户端连接

此时服务端处于listen状态

```c
int listen(int sockfd, int backlog);
```

- sockfd：监听的socket文件描述符

- backlog：连接队列的最大长度；当连接队列满时，有客户端尝试建立连接，则返回ECONNREFUSED，拒绝连接；

---

此时服务端才算处于监听listen状态，客户端才可与服务端尝试建立连接；

（1）当有客户端尝试建立连接，server则创建一个socket加入半连接队列；

（2）当完成三次握手，server则会取出半连接队列的socket，加入全连接队列；

之后，应用程序，则可通过accept取出全连接队列中就绪的socket；

---

4、socket.accept()：阻塞等待就绪的socket，返回新创建的socket，专门用于特定连接的读写；

```c
 int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen);
```

TODO：

![](/images/socket.png)

5、断开连接

6、手动配置socket：

```c
int getsockopt(int sockfd, int level, int optname,
                      void *optval, socklen_t *optlen);
```

主动断开连接的一方将处于TIME_WAIT状态，需要等待2分钟；一般server不会主动断开连接，如果服务器想要主动断开连接，应该对socket进行配置：

- SO_REUSEADDE：端口释放后，立即可以再次被利用，不再等待2分钟；
