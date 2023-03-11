---
author: huiru
pubDatetime: 2022-02-18T08:39:00Z
title: Spring-注解
postSlug: Spring-注解
featured: false
draft: false
category: Framework
tags:
 - Spring
ogImage: ""
description: /@Resource/@Autowire/@Inject/@Mapper/@Repository/@Component/@Bean/@PostConstruct/@RequestParam
rank: 30
---

# @Resource、@Autowire、@Inject

- @Autowire由Spring提供；
  
  @Resource、@Inject是Java提供的JSR250规范注解；
  
- @Autowire通过类型注入(byType)
  
  @Resource、@Inject通过名称注入(byName)；
  
- @Autowire当类型相同，可以结合@Qualifier进行Bean的区分;
  

# @Mapper、@Repository

`@Repository`需要额外配置Dao扫描地址；

`@Mapper`=`@Repository`+`@MapperScan`

# @Component、@Bean

@Component和@Bean都是用来：向IOC容器中注入Bean；

@Component：用于标注类；将此类注入IOC容器；

@Bean：用于标注方法，将其返回值注入IOC容器；

# @PostConstruct

1、@PostConstruct在Bean初始化之前执行；

2、然后Bean进行初始化(initalizeBean)

3、如果在xml中配置了，就继续执行init-method方法(已经很少用了)

- init-method通过反射执行，不允许有入参；

# @RequestParam

用于Get请求的参数映射

```java
public Response getUserInfo(@RequestParam(required = true, defaultValue = "", value = "username") String username) {
    User user = userService.getUserByUserName(username);
    return ResponseUtil.success(user);
}
```