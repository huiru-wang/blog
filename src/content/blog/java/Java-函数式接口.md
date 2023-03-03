---
author: huiru
pubDatetime: 2022-02-11T08:39:00Z
title: Java-函数式接口
postSlug: Java-函数式接口
featured: false
draft: false
category: java
tags:
 - 基础
ogImage: ""
description:
  函数式接口/Consumer/Supplier/BiConsumer/Function
---

以BiConsumer为例，此函数，输入为2个参数，没有输出；实现一个CallBack
```java

asyncExecute(httpRequest, callback(consumer));

private static Callback callback(BiConsumer<Response, IOException> consumer) {
    return new Callback() {
        @Override
        public void onFailure(@NotNull Call call, @NotNull IOException e) {
            consumer.accept(null, e);
        }

        @Override
        public void onResponse(@NotNull Call call, @NotNull Response response) {
            consumer.accept(response, null);
        }
    };
}
```
