---
author: huiru
pubDatetime: 2022-01-05T12:11:00Z
title: jvm-类加载
postSlug: Jvm-类加载
featured: false
draft: false
category: java
tags:
  - jvm
ogImage: ""
description:
  Jvm类加载机制/双亲委派/类加载器/类加载过程
---
# 类加载机制
## 类加载过程

类加载分为三个部分：加载，连接，初始化；

![](/images/2023-02-10-00-23-49-image.png)

1、Loading加载

此阶段由**类加载**器完成，做三件事：

- 通过一个类的全类名，获取定义此类的二进制字节流；
- 根据字节码文件，加载静态数据到元数据空间；
- 在Heap内存中生成一个代表这个类的java.lang.Class对象，作为元空间这个类的各种数据的访问入口

这个阶段，如果是非数组对象，是可以使用JVM提供的类加载器完成加载，也可以根据自己定义的类加载器完成加载；

但是数组对象，是由Java虚拟机直接创建的，不通过类加载器创建；但是，如果数组的类型，是对象类型，还是要通过类加载器创建的；

---

2、Linking连接

连接由三步组成：验证、准备、解析

验证：校验字节码文件的正确性；一般有四种校验：
  
  - 验证`.class`文件格式是否正确；
  
  - 验证元数据是否正确；

  - 字节码校验；
  
  - 符号引用验证
    
    能否通过这个全限定类名的字符串找到这个类；
    
    类的字段的访问性是否合适，就是访问控制关键字；

准备：给类变量分配内存，并设置默认值(零值)，并非用户自定义的值；

  - `final`修饰的类变量在编译时就分配了，在这里会直接初始化；

解析：将符号引用替换成直接引用；

- 符号：就是类名，变量名，方法名等等；
  
  比如main方法，将其替换为一个指向内存地址的指针；

---

3、Initialization初始化：初始化静态变量；

- 执行类构造器方法`clinit()`，执行所有类变量、静态代码块的赋值动作；根据代码，将用户定义的值，赋值给静态变量；

- 如果有父类，则先初始化父类；

- `clinit()`方法多线程下加锁执行；保证一个类只会被初始化一次；

触发初始化的5种情况：

1. 为一个类型创建一个新的对象实例时(比如new、反射、序列化)
2. 读取、设置一个类的静态字段，调用类的静态方法；
3. 使用反射对类进行调用的时候，如果没有进行过初始化，则触发初始化；
4. 初始化一个类，发现其父类还没有初始化，那么会初始化其父类；
5. 虚拟机启动，需要指定主类，那么这个主类，会被首先初始化；

## 类的生命周期

字节码->类加载->链接->初始化->使用->卸载


## 类加载器

目的：通过类的全限定名获取该类的二进制字节流，加载进内存；

行为：

1、每个classLoader都绑定自己要加载的资源的目录，且只会加载自己目录下的资源；

2、一个类由类加载器A加载，那么其依赖类也应该由相同的类加载器加载；

类加载器的分类(两种)：

- Java虚拟机自带类加载器
  
  - 启动类(引导)加载器(Bootstrap ClassLoader)：C++实现
    
    加载`rt.jar`，或者被`-Xbootclasspath`参数限定的类
    
    如：Object.class
  
  - 扩展类加载器(Extension ClassLoader)：Java实现
    
    加载\lib\ext，或者被java.ext.dirs系统变量指定的类
    
    如：DNSNameService.class
  
  - 应用程序类加载器(Application ClassLoader)：
    
    加载ClassPath中的类库,一般自己写的代码都由此加载器加载；
  
  - URLClassLoader：JDK提供的类加载器，父加载器为AppClassLoader
    
    提供本地文件、URL可以方便的从本地、网络上加载类；
  
  - 线程上下文类加载器：JDK提供的类加载器，加载双亲委派模型无法加载的类
    
    Java提供了很多服务接口，供第三方实现(SPI、JDBC)，但是启动加载器无法找到SPI的实现类，它只加载Java核心类库，同时也无法委托其他类加载器，因为它是顶层类加载器；
    
    总结：父加载器访问不到子加载器的类；
    
    因此出现：ContextClassLoader，实现可以设置当前线程的类加载器，使得父类加载器在加载不到实现类时，通过设置类加载器，完成加载；
    
    如：JDBC

- 用户自定义类加载器：
  
  - 继承java.lang.Classloader
  
  - 构造器：指定加载的文件目录，指定其父类加载器(默认AppClassloader)
  
  - 覆盖`findClass`方法，不可覆盖loadClass方法；

## 核心类加载方法

loadClass、findClass、defineClass

1. 双亲委派机制的实现，首先判断当前类加载器是否有父加载器(parent)，如果有，则调用父加载器的loadClass，直到无父加载器；

2. 如果父加载器的loadClass返回null，说明父加载器无法加载此类，则调用当前加载器重写的findClass方法，根据全限定类名，拼接上此加载器的加载路径，进行类加载；

3. 如果加载的方式是通过读取文件字节流，则需要使用defineClass；根据字节流转化为Class对象；

### 自定义类加载器
1、继承`ClassLoader`

2、覆盖`findClass`方法
```java
public class MyClassLoader  extends  ClassLoader{
    private String directory;
    // 默认 AppClassLoader
    public MyClassLoader(String directory) {
        this.directory =directory;
    }
    @Override
    protected Class<?> findClass(String name){
        System.out.println("MyClassLoader find class ：" + name);
        try {
            String file = this.directory + File.separator + name.replace(".", File.separator) + ".class";
            FileInputStream  inputStream= new FileInputStream(file);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buf = new byte[1024];
            int len = -1;
            while ((len = inputStream.read(buf)) != -1) {
                outputStream.write(buf, 0, len);
            }
            byte[] data = outputStream.toByteArray();
            inputStream.close();
            outputStream.close();
            return defineClass(name, data, 0, data.length);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public static void main(String[] args) throws Exception {
        MyClassLoader myClassLoader = new MyClassLoader("D：\\workspace\\JavaCodeSnippet\\JavaBase\\src\\main\\java\\org\\snippet\\classLoader");
        Class<?> app = myClassLoader.loadClass("org.snippet.App");
        Object instance = app.getDeclaredConstructor().newInstance();
    }
}
```

## 双亲委派机制
简述：
针对一个类进行加载时，从最底层的类加载器开始：
- 自底向上委派，直到顶层类加载器，检查是否能够加载；
- 自顶向下尝试加载，直到加载成功，都不能加载则抛出异常；
---

### 为什么需要双亲委派

1. 避免类的重复加载；(不会加载自己写的java.lang.String类)
2. 保证Java核心类库的安全性，不会被修改；

### 打破双亲委派
双亲委派是由loadClass方法实现的；不断通过parent父加载器尝试加载，直到顶层加载器，如果无法加载，则尝试自行加载；

因此如果要打破双亲委派，就要重写loadClas方法，不使用原生的loadClass；

# JDBC类加载

Java提供了JDBC标准接口：java.sql.Driver

MySQL实现了Driver接口，也就是MySQL的驱动：com.mysql.cj.jdbc；

通过JDK提供的DriverManager，注册驱动，以SPI的方式，加载Driver实现类；

![](/images/2023-01-27-22-56-36-image.png)

```java
ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
```

SPI的load方法则是通过当前线程的线程上下文类加载器，来加载JDBC驱动的类库；
