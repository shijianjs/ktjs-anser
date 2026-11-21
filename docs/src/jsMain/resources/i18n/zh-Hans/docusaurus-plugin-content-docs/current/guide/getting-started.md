---
sidebar_position: 2
title: 快速开始
---

# 快速开始

## 环境要求

| 工具 | 本项目的构建版本 |
| --- | --- |
| JDK | 21（Temurin） |
| Node.js | 22（JS 工具链的 npm 由 Gradle 自己驱动） |
| Gradle | 用仓库里的 wrapper，不需要本地安装 |

封装本身没有额外运行时要求：它是 Kotlin/JS 模块，浏览器（或 Node.js）就是运行时，anser 随模块一起到位。

## 加依赖

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    implementation("io.github.shijianjs:ktjs-anser:2.3.5-kt.1")
}
```

模块版本是 `<npm 版本>-kt.<修订号>`：`2.3.5` 是 anser 的版本，`kt.1` 是这层封装的第几修订。npm 包随模块
一起到达——自己的 `package.json` 里不必再写 `anser`。

## 第一次转换

```kotlin
import io.github.shijianjs.ktjs.anser.Anser

val html: String = Anser.ansiToHtml("\u001b[31mred\u001b[0m")
// <span style="color:rgb(187, 0, 0);">red</span>
```

不是自己产出的文本，先转义、最后加链接：

```kotlin
val safe = Anser.linkify(Anser.ansiToHtml(Anser.escapeForHtml(userInput)))
```

## 构建仓库

```bash
./gradlew build                 # 编译、Detekt、模块的浏览器测试
./gradlew :demo:e2eTest         # demo 的 Playwright 套件（不在 `build` 里）
./gradlew :docs:docusaurusBuild # 构建本站
./gradlew pagesSite             # 文档 + demo + API 装配到一个目录
```

两个开发服务器：

```bash
./gradlew :demo:jsBrowserDevelopmentRun   # 只跑 demo
./gradlew :docs:run                       # 本站，热更新
```

## demo 与 API 的位置

| 产物 | 地址 |
| --- | --- |
| 文档 | `https://shijianjs.github.io/ktjs-anser/` |
| demo | `https://shijianjs.github.io/ktjs-anser/demo/` |
| API 文档 | `https://shijianjs.github.io/ktjs-anser/api/` |

三者都由 `pagesSite` 装配，Pages 工作流每次推 `main` 都会跑它。
