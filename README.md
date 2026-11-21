# ktjs-anser

<p align="center"><img src="docs/src/jsMain/resources/static/img/ktjs-anser-logo.png" width="120" alt="ktjs-anser"></p>

A Kotlin/JS wrapper for [`anser`](https://www.npmjs.com/package/anser): ANSI SGR escape sequences to
HTML, JSON or plain text, with Kotlin types the compiler checks.

[English](README.md) | [简体中文](README.zh-CN.md)

**[Documentation](https://shijianjs.github.io/ktjs-anser/)** ·
**[Live demo](https://shijianjs.github.io/ktjs-anser/demo/)** ·
**[API reference](https://shijianjs.github.io/ktjs-anser/api/)**

```kotlin
val html = Anser.ansiToHtml("\u001b[1;32mOK\u001b[0m 12 tests")
// <span style="font-weight:bold;color:rgb(0, 187, 0);">OK</span> 12 tests
```

## Modules

| Module | npm package | Wrapper version |
| --- | --- | --- |
| [ktjs-anser](ktjs-anser/README.md) | `anser` | `2.3.5-kt.1` |

## What the wrapper maps

| Upstream | Kotlin |
| --- | --- |
| `export = Anser` (a class) | `Anser` object (statics) + `AnserInstance` (instance methods) |
| `ansiToHtml` / `ansiToJson` / `ansiToText` | same names, typed returns |
| `escapeForHtml` / `linkify` | same names, also as top-level functions |
| `AnserOptions` (`json`, `use_classes`, `remove_empty`) | `AnserOptions`, field names kept |
| `AnserJsonEntry` | `AnserJsonEntry` |
| `DecorationName` union | `sealed external interface DecorationName` + `DecorationNames` |

## Build

```bash
./gradlew build                  # module + tests (browser)
./gradlew :demo:e2eTest          # the demo's Playwright suite
./gradlew :docs:docusaurusBuild  # this documentation site
./gradlew pagesSite              # docs + demo + API for GitHub Pages
```

The demo and the documentation both switch between English and Chinese; the API reference is Dokka
output for the published module.

## Licence

MIT. anser is MIT too, © 2012-25 Ionică Bizău — see
[Licensing](https://shijianjs.github.io/ktjs-anser/guide/licensing).
