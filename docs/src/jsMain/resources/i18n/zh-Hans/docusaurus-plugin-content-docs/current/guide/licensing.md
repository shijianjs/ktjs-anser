---
sidebar_position: 4
title: 许可
---

# 许可

## 本封装

`ktjs-anser` 以 **MIT** 许可发布，全文在仓库根目录的
[`LICENSE`](https://github.com/shijianjs/ktjs-anser/blob/main/LICENSE)。

## anser

anser 同样是 MIT 许可：

```
The MIT License (MIT)

Copyright (c) 2012-25 Ionică Bizău <bizauionica@gmail.com> (https://ionicabizau.net)
```

源码与许可见 [IonicaBizau/anser](https://github.com/IonicaBizau/anser)。anser 没有单独的商用版本，也没有需要
额外声明的使用限制——整个包（含调色板与各转换器）都覆盖在那份 MIT 授权之下。

## npm 依赖

封装引入的运行时依赖只有一个：随模块到达的 anser。Gradle 按 `package.json` 组装 JavaScript，所以在消费项目里
`npm ls` 看到的 anser 版本，就是本模块构建时用的那一个。

## 对你的影响

| 问题 | 答案 |
| --- | --- |
| 能用在闭源产品里吗？ | 可以，MIT 允许；保留版权声明即可。 |
| 改了代码必须公开吗？ | 不必。 |
| anser 有被排除的部分吗？ | 没有，anser 导出的东西全部有封装。 |
