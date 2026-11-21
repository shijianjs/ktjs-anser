package io.github.shijianjs.ktjs.anser.demo.page.api

import io.github.shijianjs.ktjs.demo.page.DemoPage
import io.github.shijianjs.ktjs.demo.i18n.Binder
import io.github.shijianjs.ktjs.demo.i18n.Lang
import io.github.shijianjs.ktjs.demo.i18n.Langs
import io.github.shijianjs.ktjs.demo.i18n.Translations
import io.github.shijianjs.ktjs.demo.i18n.texts
import io.github.shijianjs.ktjs.demo.page.Blocks.exampleBox
import io.github.shijianjs.ktjs.demo.page.SectionBlock
import io.github.shijianjs.ktjs.dom.css.cssSheet
import io.github.shijianjs.ktjs.dom.css.dsl.className
import io.github.shijianjs.ktjs.dom.css.dsl.invoke
import io.github.shijianjs.ktjs.dom.element.invoke
import web.cssom.BorderCollapse
import web.cssom.CSSStyleSheet
import web.cssom.ClassName
import web.cssom.Padding
import web.cssom.TextAlign
import web.cssom.integer
import web.cssom.pct
import web.cssom.px
import web.html.HTMLTableRowElement
import web.html.HTMLElement
import web.html.HtmlTagName

/**
 * The mapping table: what the module declares, and what it deliberately leaves to upstream.
 *
 * The right column is code, identical in both languages, so a switch only rewrites the left column.
 */
internal class ApiPage : DemoPage() {

    private val binder = Binder(apiTexts)

    private val headRow: HTMLTableRowElement = HtmlTagName.tr()

    private val bodyRows = HtmlTagName.tbody()

    private val rows: List<ApiRow>

    init {
        rows = english.rows.map {
            val labelCell = HtmlTagName.td { classList.add(API_CELL) }
            val valueCell = HtmlTagName.td { classList.add(API_CELL) }
            bodyRows.append(HtmlTagName.tr { append(labelCell, valueCell) })
            ApiRow(labelCell, valueCell)
        }

        val table = HtmlTagName.table {
            classList.add(API_TABLE)
            append(HtmlTagName.thead { append(headRow) }, bodyRows)
        }

        val section = SectionBlock.NAME { show() }
        binder.bind(section.heading) { it.heading }
        binder.bind(section.hint) { it.hint }
        section.body.append(exampleBox(null, table))

        addSheet(TABLE_SHEET)
        body.append(section.root)
    }

    override fun applyTranslation(lang: Lang) {
        val current = apiTexts[lang]
        setTitle(current.title)
        setSummary(current.summary)
        binder.apply(lang)

        headRow.replaceChildren(
            HtmlTagName.th {
                classList.add(API_CELL)
                classList.add(API_HEAD_CELL)
                textContent = current.upstreamHeading
            },
            HtmlTagName.th {
                classList.add(API_CELL)
                classList.add(API_HEAD_CELL)
                textContent = current.kotlinHeading
            },
        )
        current.rows.zip(rows).forEach { (row, cells) ->
            cells.labelCell.textContent = row.first
            cells.valueCell.textContent = row.second
        }
    }

    companion object : ApiPageDefaultReference() {
        private val english: ApiTexts = ApiTexts(
            title = "What the wrapper maps",
            summary = "Only what anser declares as an API is mapped; the module value is the class itself.",
            heading = "Declaration by declaration",
            hint = "The same table a new module is cut from: read the upstream declaration, then decide the Kotlin type.",
            upstreamHeading = "upstream",
            kotlinHeading = "in Kotlin",
            rows = listOf(
                "npm package" to "anser 2.3.5",
                "module shape" to "export = Anser → `Anser` object + `AnserInstance`",
                "static methods" to "ansiToHtml / ansiToJson / ansiToText / escapeForHtml / linkify",
                "instance extras" to "process / processChunk / processChunkJson / setupPalette",
                "options" to "AnserOptions { json, use_classes, remove_empty }",
                "one span" to "AnserJsonEntry { content, fg, bg, decoration(s), … }",
                "decoration names" to "DecorationNames / AnserColorNames (sealed literal)",
                "constructing" to "Reflect.construct — an `export =` class cannot be `new`-ed",
            ),
        )
        private val chinese: ApiTexts = ApiTexts(
            title = "封装层映射了什么",
            summary = "只映射 anser 声明为 API 的东西；模块值本身就是那个类。",
            heading = "逐条对照",
            hint = "新模块就照这张表切：先读上游声明，再决定 Kotlin 类型。",
            upstreamHeading = "上游",
            kotlinHeading = "Kotlin 侧",
            rows = listOf(
                "npm 包" to "anser 2.3.5",
                "模块形态" to "export = Anser → `Anser` 对象 + `AnserInstance`",
                "静态方法" to "ansiToHtml / ansiToJson / ansiToText / escapeForHtml / linkify",
                "实例另有" to "process / processChunk / processChunkJson / setupPalette",
                "选项" to "AnserOptions { json, use_classes, remove_empty }",
                "一个片段" to "AnserJsonEntry { content, fg, bg, decoration(s), … }",
                "装饰与颜色名" to "DecorationNames / AnserColorNames（sealed literal）",
                "如何构造" to "Reflect.construct——`export =` 的类不能 `new`",
            ),
        )
        private val apiTexts: Translations<ApiTexts> = texts(
            Langs.EN to english,
            Langs.ZH_HANS to chinese,
        )
        /** The table's own class names: only this page selects and carries them. */
        private val API_TABLE: ClassName = ClassName("api-table")
        private val API_CELL: ClassName = ClassName("api-cell")
        private val API_HEAD_CELL: ClassName = ClassName("api-cell-head")

        /**
         * A static definition table has no Anser component counterpart — `vaadin-grid` is the element for data
         * a user navigates, and this is six fixed rows — so it stays a real `<table>`.
         *
         * The rules are the table's own: collapse the borders, one padding per cell, and the header weight. Colours
         * come from Lumo's tokens, so the table follows the theme like everything else on the page.
         */
        private val TABLE_SHEET: CSSStyleSheet = cssSheet {
            className(API_TABLE).invoke {
                width = 100.pct
                borderCollapse = BorderCollapse.collapse
            }

            className(API_CELL).invoke {
                padding = Padding(6.px, 8.px)
            }

            className(API_HEAD_CELL).invoke {
                width = 32.pct
                fontWeight = integer(600)
                textAlign = TextAlign.left
            }
        }
    }
}
