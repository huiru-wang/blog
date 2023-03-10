---
author: huiru
pubDatetime: 2022-10-20T18:22:00Z
title: 压测工具
postSlug: 压测工具
featured: false
draft: false
category: WebServer
tags:
 - service
ogImage: ""
description: ApacheBenchmark/Jmeter/QPS/吞吐量/时延/并发量
rank: 25
---
# Apache Benchmark

安装Apache Benchmark
```shell
apt-get install apache2-utils
yum install httpd-tools
```
重点结果分析，重点关注：
- Concurrency Level：并发量
- Requests per second：QPS
- Transfer rate：吞吐量
- Time per request：最大最小时延
```shell
# 一共10000请求 并发50
$ ab -n 100000 -c 50 http://127.0.0.1/                          
----------------------------------------
Server Software:        nginx/1.22.1
Server Hostname:        127.0.0.1
Server Port:            80

Document Path:          /
Document Length:        615 bytes

Concurrency Level:      50
Time taken for tests:   6.400 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      84800000 bytes
HTML transferred:       61500000 bytes
Requests per second:    15625.14 [#/sec] (mean)
Time per request:       3.200 [ms] (mean)
Time per request:       0.064 [ms] (mean, across all concurrent requests)
Transfer rate:          12939.57 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.7      1      12
Processing:     1    2   1.1      2      23
Waiting:        0    2   1.0      2      19
Total:          2    3   1.2      3      23

Percentage of the requests served within a certain time (ms)
  50%      3
  66%      3
  75%      4
  80%      4
  90%      4
  95%      5
  98%      6
  99%      7
 100%     23 (longest request)
```

# Jmeter
[jmeter-官网](https://jmeter.apache.org/)