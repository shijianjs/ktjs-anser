package io.github.shijianjs.ktjs.anser.demo.page.conventions

import io.github.shijianjs.ktjs.demo.page.DemoPage
import web.dom.TagName
import io.github.shijianjs.ktjs.demo.i18n.Binder
import io.github.shijianjs.ktjs.demo.i18n.Lang
import io.github.shijianjs.ktjs.demo.i18n.Langs
import io.github.shijianjs.ktjs.demo.i18n.Translations
import io.github.shijianjs.ktjs.demo.i18n.texts
import io.github.shijianjs.ktjs.demo.page.Blocks.bulletList
import io.github.shijianjs.ktjs.demo.page.SectionBlock
import io.github.shijianjs.ktjs.dom.element.invoke
import web.html.HTMLElement
import web.html.HtmlTagName

/**
 * The rules the library and the demo are both written by, as a list.
 *
 * A list of whole lines is the one case where replacing the collection is right: each line comes from
 * one language, the nodes are this page's own, and nothing above them is touched.
 */
internal class ConventionsPage : DemoPage() {

    private val binder = Binder(conventionsTexts)

    private val list: HTMLElement = bulletList(emptyList())

    init {
        val section = SectionBlock.NAME { show() }
        binder.bind(section.heading) { it.heading }
        binder.bind(section.hint) { it.hint }
        section.body.append(list)

        body.append(section.root)
    }

    override fun applyTranslation(lang: Lang) {
        val current = conventionsTexts[lang]
        setTitle(current.title)
        setSummary(current.summary)
        binder.apply(lang)

        list.replaceChildren(*current.lines.map { HtmlTagName.li { textContent = it } }.toTypedArray())
    }

    companion object : ConventionsPageDefaultReference() {
        private val english: ConventionsTexts = ConventionsTexts(
            title = "Conventions",
            summary = "The same rules as the library: declarations only, no dynamic, and one entry point per module.",
            heading = "Rules this wrapper follows",
            hint = "A derived project inherits these; the checklist is what a review looks for.",
            lines = listOf(
                "One module per npm package, one namespace package per module (io.github.shijianjs.ktjs.anser).",
                "Declarations live in jsMain only: external interfaces, sealed literals, no `dynamic`.",
                "A file marked @file:JsModule holds nothing but external declarations — the Kotlin API lives beside it.",
                "Return types JavaScript picks at run time (process with options.json) are narrowed at the boundary, once.",
                "The demo reuses ktjs-demo-kit for the frame, so no site here hand-rolls navigation or i18n.",
            ),
        )
        private val chinese: ConventionsTexts = ConventionsTexts(
            title = "约定",
            summary = "和库本身同一套规矩：只做声明、不用 dynamic、每个模块一个入口。",
            heading = "这个封装遵守的规矩",
            hint = "派生项目直接继承这些规矩；评审就照这份清单看。",
            lines = listOf(
                "一个 npm 包一个模块，一个模块一个命名空间包（io.github.shijianjs.ktjs.anser）。",
                "声明只放在 jsMain：external 接口、sealed 字面量，不出现 `dynamic`。",
                "标了 @file:JsModule 的文件里只有 external 声明——Kotlin 侧 API 放在它旁边。",
                "运行时才决定类型的返回值（process 配 options.json）只在边界处收口一次。",
                "demo 直接复用 ktjs-demo-kit 的外壳，不再自己搓导航与多语言。",
            ),
        )
        private val conventionsTexts: Translations<ConventionsTexts> = texts(
            Langs.EN to english,
            Langs.ZH_HANS to chinese,
        )
    }
}
