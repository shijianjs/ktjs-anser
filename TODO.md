# TODO

## 上游 API 覆盖

把 anser 2.3.5 的全部公开声明（`lib/index.d.ts`）映射成 Kotlin 类型，并在浏览器里跑通。

- 总计：17
- 已完成：17
- 明确不做：0
- 待完成：0

详细清单：[coverage.md](docs/development/coverage.md)

### 当前待办

- [ ] 无。下一批事项见本文件的「项目交付」小节。

## 项目交付

- [x] 模块 `ktjs-anser`：声明、测试、`wrapper-revisions.properties`
- [x] demo：overview / converter / api / conventions，中英双语
- [x] docs：intro / getting-started / usage / licensing，中英双语，kit 首页五件套
- [x] `pagesSite` 与 Pages 工作流（push 到 main 自动发布）
- [x] MIT 许可 + anser 的 MIT 声明（[guide/licensing](../docs/src/jsMain/resources/docs/guide/licensing.md)）
- [x] GitHub 仓库创建与首次推送（<https://github.com/shijianjs/ktjs-anser>）

### 注意事项

- 声明只放 `jsMain`：`external interface` + sealed 字面量，不写 `dynamic`。
- `@file:JsModule` 的文件里只能有 external 声明；全局 `Reflect` 这类东西要放旁边的文件。
- 上游 `export = Anser`：模块值本身就是类，实例只能 `Reflect.construct`。
- 版本口径：`<npm 版本>-kt.<修订号>`，工作树写 `-SNAPSHOT`。
