---
title: 单点服务和分布式服务
category: DistSystem
tags:
  - systemDesign
publishedAt: 2022-03-01
description: 单点系统和分布式系统优劣对比
---

# Single-Server

1. Simplicity
In a signle-server system, the overall system architecture is relatively simple. All services, applications and data are stored on a single server.
And it is easy to develop and deploy applications to a single server. 
Compared with distributed systems, there is no need to master complex distributed framework and middleware.
2. Cost-effectiveness: Low hardware cost and Low maintenance cost.
A single server only requires one server device which can save a lot of hardware cost.
It is more simple to maintaning a single server.
3. Easy Performance Optimization
In a single server, all resources such as CPU, memory, storage are concentrated on one device. It is more conveniently monitor and allocate resources to optimize system performance.
In distributed services, nodes usually need to communicate through RPC, which will more or less cause some delay.
4. Single Point of Failure
The biggest problem of the single server system is the single-point-of-failure. if this server has a hardware failure, the entire system will stop running and the data may be lost.
5. Limited Scalability
When the business grows, such as an increase in website traffic and an increase in the data volume and processing requirements of applications, a single server may not be able to meet the performance requirements.
And it is difficult to deal with large scale concurrent requests and complex business logic expansiion
# Distributed System

1. High Availability and Fault-Tolerance
Distributed systems provide redundancy by storing data and running services on multiple nodes.
And the failure of an individual node does not lead to the collapse of the entire system.

2. Scalability
Distributed systems' processing power and storage capacity can be increased by adding more nodes. The new nodes added can automatically participate in data processing tasks and share the load.
It is relatively flexible and not limited by hardware resources like a single server system.

3. Performance Improvement
Distributed systems offen use load balancers to evently distribute client requests to multiple servers to improve the performance of the overall service.

4. Complexity
Distributed systems usually have a complex architecture and rely on more distributed middleware such as distributed message queue, distributed cache service.

5. Date-Consistency Chanllenges
It is difficult to achieve strong data consistency in a distributed system. It is difficult for all nodes see exactly the same data at the same time.

6. Network Communication Problems
Distributed systems rely heavily on networks for communication among nodes. Network delays and network failures will all affect the systems' performance and stability, and may even cause services to fail.