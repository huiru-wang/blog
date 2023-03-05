---
author: huiru
pubDatetime: 2022-01-04T10:22:00Z
title: Jvm运行时常量池
postSlug: Jvm运行时常量池
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description: Jvm运行时常量池
rank: 2
---

# 反编译看常量池
```
Constant pool:
   #1 = Methodref    #6.#20      // java/lang/Object."<init>":()V
   #2 = Fieldref     #21.#22     // java/lang/System.out:Ljava/io/PrintStream;
   #3 = String       #23         // Hello world
   #4 = Methodref    #24.#25     // java/io/PrintStream.println:(Ljava/lang/String;)V
   #5 = Class        #26         // HelloWorld
   #7 = Utf8         <init>
  #20 = NameAndType  #7:#8       // "<init>":()V
  #21 = Class        #28         // java/lang/System
  #23 = Utf8         Hello world
{
  public HelloWorld();  # 构造函数
    descriptor: ()V
      stack=2, locals=1, args_size=1
         0: getstatic     #2 
         3: ldc           #3  
         5: invokevirtual #4  
         8: return
      LineNumberTable:
        line 6: 0
        line 7: 8
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  args   [Ljava/lang/String;
}
```
通过反编译，可以看到常量池表的信息，在程序运行中，会放入运行时常量池
- Methodref：方法引用；
- Fieldref：成员变量引用；
- String：常量；
- Class：类名；

代码的反编译中，可以看到：

- `getstatic`：获取静态变量`#2字段引用`
- `ldc`：代表从常量池中获取`#3`常量，又指向`#23`，`#23`是一个UTF字符串：Hello world
- `invokevirtual`：虚方法调用，指向`#4方法引用`

# StringTable

串池：存放字符串对象；

## 创建字符串到常量池
延迟加载，只有加载到创建字符串对象时，才会把字符串放入串池；

```java
String s0 = "a";   // StringTable: ["a"]
String s1 = "b";   // StringTable: ["a", "b"]
String s2 = "ab";  // StringTable: ["a", "b", "ab"]
String s = "a";    // StringTable: ["a", "b", "ab"]
```

## 拼接字符串

编译器优化，编译期间已经确定了s3的结果，直接从常量池获取了
```java
String s3 = "a" + "b";
System.out.println(s2 == s3);
-----------------------------------------------------
8: astore_3
9: ldc           #4                  // String ab

```

## 拼接字符串引用

反编译后字符串引用拼接

相当于执行了：`new StringBuilder().append("a").append("b").toString()`相当于`new String()`

引用拼接的是引用，编译期间无法确认，无法优化成直接从常量池获取

```java
String s3 = s0 + s1; 
System.out.println(s2 == s3); // false
-----------------------------------------------------
13: invokespecial #6   // Method java/lang/StringBuilder."<init>":()V
16: aload_1            // s0
17: invokevirtual #7   // Method java/lang/StringBuilder.append
20: aload_2            // s1
21: invokevirtual #7   // Method java/lang/StringBuilder.append
24: invokevirtual #8   // Method java/lang/StringBuilder.toString
```
