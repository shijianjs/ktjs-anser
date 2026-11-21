---
sidebar_position: 2
title: Getting started
---

# Getting started

## Requirements

| Tool | Version the project is built with |
| --- | --- |
| JDK | 21 (Temurin) |
| Node.js | 22 (Gradle drives npm itself for the JS toolchain) |
| Gradle | the wrapper in the repository, no local install needed |

The wrapper adds no runtime requirement of its own: it is a Kotlin/JS module, so the browser (or
Node.js) is the runtime, and anser arrives with the module.

## Add the dependency

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    implementation("io.github.shijianjs:ktjs-anser:2.3.5-kt.1")
}
```

The module version is `<npm version>-kt.<revision>`: `2.3.5` is anser's version, `kt.1` is which
revision of this wrapper wraps it. The npm package comes with the module — you do not add `anser` to
your own `package.json`.

## First conversion

```kotlin
import io.github.shijianjs.ktjs.anser.Anser

val html: String = Anser.ansiToHtml("\u001b[31mred\u001b[0m")
// <span style="color:rgb(187, 0, 0);">red</span>
```

For text you did not produce, escape first and link last:

```kotlin
val safe = Anser.linkify(Anser.ansiToHtml(Anser.escapeForHtml(userInput)))
```

## Build the repository

```bash
./gradlew build                 # compile, Detekt, the module's browser tests
./gradlew :demo:e2eTest         # Playwright suite for the demo (not part of `build`)
./gradlew :docs:docusaurusBuild # build this site
./gradlew pagesSite             # docs + demo + API in one directory for Pages
```

Two dev servers:

```bash
./gradlew :demo:jsBrowserDevelopmentRun   # the demo alone
./gradlew :docs:run                       # this site, hot reloading
```

## Where the demo and the API live

| Artifact | URL |
| --- | --- |
| documentation | `https://shijianjs.github.io/ktjs-anser/` |
| demo | `https://shijianjs.github.io/ktjs-anser/demo/` |
| API reference | `https://shijianjs.github.io/ktjs-anser/api/` |

All three are assembled by `pagesSite`, which the Pages workflow runs on every push to `main`.
