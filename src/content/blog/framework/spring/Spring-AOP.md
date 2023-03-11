---
author: huiru
pubDatetime: 2022-03-03T08:39:00Z
title: Spring-AOP
postSlug: Spring-AOP
featured: false
draft: false
category: Framework
tags:
 - Spring
ogImage: ""
description: AOP
rank: 25
---

# SpringAOP

AOP：面向切面编程；

目的：在不侵入业务逻辑的情况下，对原有的方法进行增强；

主流的AOP实现有：SpringAOP、AspectJ；

---

SpringAOP：通过代理的方式，运行时创建代理对象，来实现对原有对象的增强；

- JDK动态代理；
  
- CGLib静态代理；
  

AspectJ：通过特殊的编译器，可在编译时、编译后、加载时，完成AOP增强；