# API coverage

## 来源与范围

- 上游：[IonicaBizau/anser](https://github.com/IonicaBizau/anser)，本地副本 `S:\workspace\github\IonicaBizau\anser`
- 版本：`anser` 2.3.5（`package.json`），类型文件 `lib/index.d.ts`
- 核对日期：2026-11-22
- 纳入统计：`lib/index.d.ts` 里的全部公开成员——类的静态方法、实例方法，以及导出的类型
- 不纳入：`lib/` 内部实现（`ansi_parser.js` 等私有文件）、CLI（`bin/`）

上游是 MIT 许可，无商业版本；整个包都纳入范围。

## 统计

| 状态 | 数量 |
|---|---:|
| 总计 | 17 |
| 已完成 | 17 |
| 明确不做 | 0 |
| 待完成 | 0 |

## 已完成（17）

| # | 上游声明 | Kotlin 侧 | 验证 |
|---|---|---|---|
| 1 | `static escapeForHtml` | `Anser.escapeForHtml` / 顶层 `escapeForHtml` | `AnserTest.escapeForHtmlEscapesTheThreeCharacters` |
| 2 | `static linkify` | `Anser.linkify` / 顶层 `linkify` | `AnserTest.linkifyTurnsUrlsIntoAnchors` |
| 3 | `static ansiToHtml` | `Anser.ansiToHtml` / 顶层 `ansiToHtml` | `AnserTest.ansiToHtmlWrapsTheTextInASpan`、`ansiToHtmlWithClassesUsesTheAmpersandClasses` |
| 4 | `static ansiToJson` | `Anser.ansiToJson` / 顶层 `ansiToJson` | `AnserTest.ansiToJsonReportsOneEntryPerSpan` |
| 5 | `static ansiToText` | `Anser.ansiToText` / 顶层 `ansiToText` | `AnserTest.ansiToTextStripsTheEscapes` |
| 6 | `setupPalette` | `AnserInstance.setupPalette` | 构造时由上游调用；包装方法可直接调用 |
| 7 | `escapeForHtml`（实例） | `AnserInstance.escapeForHtml` | `AnserTest.theInstanceApiMatchesTheStatics`（同一实现在实例上） |
| 8 | `linkify`（实例） | `AnserInstance.linkify` | 同上 |
| 9 | `ansiToHtml`（实例） | `AnserInstance.ansiToHtml` | 同上 |
| 10 | `ansiToJson`（实例） | `AnserInstance.ansiToJson` | 同上 |
| 11 | `ansiToText`（实例） | `AnserInstance.ansiToText` | `AnserTest.theInstanceApiMatchesTheStatics` |
| 12 | `process(…, options)` | `AnserInstance.process` → `String`；`processJson` → `Array` | `theInstanceApiMatchesTheStatics`（`process`） |
| 13 | `processChunk(…, options)` | `AnserInstance.processChunk` → `String`；`processChunkJson` → `AnserJsonEntry` | `theInstanceApiMatchesTheStatics`（两者） |
| 14 | `interface AnserJsonEntry` | `external interface AnserJsonEntry`（10 个成员，含 `isEmpty()`） | 编译期 + `ansiToJson` 用例读 `content` / `was_processed` |
| 15 | `interface AnserOptions` | `external interface AnserOptions`（3 个字段，保留上游拼写） | `ansiToHtmlWithClassesUsesTheAmpersandClasses` 传真值 |
| 16 | `type DecorationName` | `sealed external interface DecorationName` + `DecorationNames` | `decorationNamesCarryTheUpstreamStrings` |
| 17 | `export = Anser` | `@JsName("default") external val anser` + `Anser` / `AnserInstance` | 全部用例都经这条导入链 |

## 明确不做

无。

## 决策记录

- **`process` / `processChunk` 的重载**：上游按 `options.json` 在运行时决定返回数组还是字符串，Kotlin 一个签名表达不了两种返回，
  因此在 `AnserRawInstance` 上声明为 `JsAny`，由 `AnserInstance.process` / `processJson` 在边界处收口一次。
- **`markup` 默认 `true`**：上游只在参数为 `undefined` 时才当 `true` 用；Kotlin 的 `Boolean?` 传 `null` 会到 JS 变成 `null`，
  上游按假值处理、不染色（`was_processed` 变 `false`）。所以包装层把默认值定成 `true`，调用方要关染色显式传 `false`。
- **选项对象按调用新建**：上游会往传进去的 options 写字段（`ansiToJson` 写 `json`、`process` 写 `clearLine`）。
  共用一个空对象会让上一次调用的 `json = true` 泄到下一次，`process` 于是返回数组而不是字符串。
  因此 `effective()` / `jsonOptions()` 每次都新建一个对象，也不改调用方传进来的对象。
- **chunk 家族吃的是片段**：`processChunk` / `processChunkJson` 接收的是已经切掉 `ESC[` 前缀的片段（如 `31mred`），
  `process` 内部就是先 `split(/\033\[/)` 再逐段喂给它们；传整条转义序列不会报错，但不会有任何染色。
- **`Reflect.construct`**：`export =` 的类值不能 `new`。`JsReflect` 放在 `Anser.kt` 而不是 `AnserModule.kt`——后者带
  `@file:JsModule`，里面任何声明都会变成 npm 包的导入属性，全局 `Reflect` 就拿不到了。
- **颜色名**：上游没有导出颜色名的联合类型，`AnserColorNames` 按 `ansiToHtml` 的 class 规则（`ansi-*-fg`）给出，

  并以 `.of(...)` 保留上游未列举的取值。
