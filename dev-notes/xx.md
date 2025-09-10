---
title: Java的泛型
category: CS基础
tags:
  - Java
publishedAt: 2021-08-12
description: 泛型和协变逆变、类型擦除特性
---

# 为什么需要泛型

1. 代码重用性；可以使用泛型来编写更通用的方法，复用性更强；如集合类型，通常使用泛型来声明集合元素的类型；
2. 抽象数据结构；以此来创建通用的数据结构和方法；
3. 代码的可读性和可维护性；使得代码更清晰、简洁；

# 类型擦除

擦除：泛型编译后，丢弃泛型的类型信息，所有泛型都变为父类；

类型擦除实际如何影响开发？
1. 运行时无法获取具体类型，因为都是Object了，只能使用 `instance of`判断；
2. 无法重载，泛型集合参数；
```java
// 编译失败，这2个方法编译后，签名相同
void processStrings(List<String> strings);
void processStrings(List<Integer> strings);  X

// 业务发基于返回类型重载
List<String> process();
List<Integer> process();  X
```
3. 无法创建泛型数组；
4. 反序列化时，必须指明类型，因为运行时无法得知类型；比如：
```java
List<String> result = deserialize(json);   // X 不能这么写
List<String> result2 = deserialize(json, String.class);  // 必须指明
```
5. 集合无法使用基本数据类型，因为基本数据类型无法擦除；如果支持`List<int>`性能将大幅提升；
```java
List<int> numbers = new ArrayList<>();    X
```

为什么要类型擦除？
- <font color="#de7802">实现简单</font>；如果支持满血泛型，JVM要重写；
- <font color="#de7802">向低版本兼容</font>；早期Java没有泛型，此时Java已经发布10年，如果不支持旧代码，可能被抛弃；

# 如何理解协变和逆变

## 1. 是什么？

协变和逆变：是<font color="#de7802">泛型</font>如何在<font color="#de7802">继承关系</font>中<font color="#de7802">变化</font>的2个概念；
- 协变（Co-Variance）：`泛型类型变化方向`和`类型继承方向`<font color="#de7802">相同</font>；
- 逆变（Contra-Variance）：`泛型类型变化方向`和`类型继承方向`<font color="#de7802">相反</font>；

继承关系：`Animal` → `Dog` → `Husky`（动物 - 狗 - 哈士奇）
- 协变：`List<Dog>` 可以被当作 `List<? extends Animal>` 使用
- 逆变：`List<Animal>` 可以被当作 `List<? super Dog>` 使用

## 2. 为什么需要`协变`和`逆变`？

目的：为了<font color="#de7802">类型安全</font>；

假设现在有一个集合：`List<Animal> animals = new ArrayList<Dog>();`集合中实际存储的是`Animal`的某个子类，但子类可能有多个：`Cat`、`Bird`等；此时：
- 读取：是在向上转型，一定是安全的；
- 写入：是在向下转型，不一定是安全的；

同样的：`List<? super Dog> dogs = new ArrayList<Animal>();
- 读取：是在向下转型，不一定是安全的；
- 写入：是在向上转型，一定是安全的；

那直接用：`List<Animal> animals = new ArrayList<Dog>();`不就好了？
- 这段代码无法编译通过，在没有泛型支持的基础上，2个不同的类型，不可以直接这样声明；

因此，协变逆变存在是为了解决：<font color="#de7802">泛型集合如何安全地支持多态的问题</font>
- 当一个接受泛型参数的接口，又期望只处理某个类型及其子类时，必须使用协变、逆变声明来保证安全；

## 3. 怎么用？

2中的声明例子，只是为了理解，实际开发，这样声明一个集合没有意义，因为要么只能读，要么只能写，实际开发不会这么写。

如在声明接口时，使用协变逆变来保证对入参操作的类型安全，在开发层面杜绝掉类型安全问题；

```java
public interface AnimalShelterService {  
    // 只读  
    void acceptAnimals(List<? extends Animal> animals);

	// void acceptAnimals(List<Animal> animals); 不可接收Dog、Cat
	// void acceptAnimals(List<T> animals); 无法限定泛型上下届
  
    // 只写  
    void transferDogs(List<? super Dog> dogs);  
    void transferCat(List<? super Cat> cats);  
}
```
