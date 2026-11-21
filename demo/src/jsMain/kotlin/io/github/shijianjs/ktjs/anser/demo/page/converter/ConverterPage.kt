package io.github.shijianjs.ktjs.anser.demo.page.converter

import io.github.shijianjs.ktjs.anser.Anser
import io.github.shijianjs.ktjs.anser.AnserOptions
import io.github.shijianjs.ktjs.demo.i18n.Binder
import io.github.shijianjs.ktjs.demo.i18n.Lang
import io.github.shijianjs.ktjs.demo.i18n.Langs
import io.github.shijianjs.ktjs.demo.i18n.Translations
import io.github.shijianjs.ktjs.demo.i18n.texts
import io.github.shijianjs.ktjs.demo.page.Blocks.exampleBox
import io.github.shijianjs.ktjs.demo.page.Blocks.row
import io.github.shijianjs.ktjs.demo.page.DemoPage
import io.github.shijianjs.ktjs.demo.page.Readout
import io.github.shijianjs.ktjs.demo.page.SectionBlock
import io.github.shijianjs.ktjs.dom.css.cssSheet
import io.github.shijianjs.ktjs.dom.css.dsl.className
import io.github.shijianjs.ktjs.dom.css.dsl.invoke
import io.github.shijianjs.ktjs.dom.element.invoke
import io.github.shijianjs.ktjs.vaadin.button.createButton
import io.github.shijianjs.ktjs.vaadin.switch.createSwitch
import io.github.shijianjs.ktjs.vaadin.textarea.createTextArea
import js.objects.unsafeJso
import web.cssom.ClassName
import web.cssom.FontFamily
import web.cssom.WhiteSpace
import web.cssom.pct
import web.cssom.px
import web.dom.clickEvent
import web.events.addHandler
import web.html.HTMLPreElement
import web.html.HTMLElement
import web.html.HtmlSource
import web.html.HtmlTagName

/**
 * The one thing the wrapper exists for: ANSI text in, HTML / JSON / plain text out.
 *
 * The page is the pipeline the documentation describes, run once per click: `escapeForHtml` first, then
 * `ansiToHtml` (or `ansiToJson` / `ansiToText`), then `linkify`. The input area is a real
 * `<vaadin-text-area>`; the output is the converted HTML next to the same markup as source.
 */
internal class ConverterPage : DemoPage() {

    private val binder = Binder(converterTexts)

    private val input = createTextArea { value = SAMPLE }

    private val useClasses = createSwitch { checked = false }

    private val convert = createButton { }

    private val reset = createButton { }

    private val preview: HTMLElement = HtmlTagName.pre { classList.add(OUTPUT) }

    private val source: HTMLPreElement = HtmlTagName.pre { classList.add(OUTPUT) }

    private val entries = Readout.NAME { show() }

    private val plain = Readout.NAME { show() }

    /** The two labels are this page's own text nodes: a field's `label` is a property to bind, not text. */
    private val inputLabel = HtmlTagName.label { }

    private val classesLabel = HtmlTagName.label { }

    private var current: ConverterTexts = english

    init {
        convert.clickEvent.addHandler { writeOutputs() }
        reset.clickEvent.addHandler {
            input.value = SAMPLE
            writeOutputs()
        }

        val controls = row(useClasses, classesLabel, convert, reset)

        val section = SectionBlock.NAME { show() }
        binder.bind(section.heading) { it.demoHeading }
        binder.bind(section.hint) { it.demoHint }
        binder.bind(inputLabel) { it.inputLabel }
        binder.bind(classesLabel) { it.useClassesLabel }
        binder.bind(convert) { it.convertLabel }
        binder.bind(reset) { it.resetLabel }

        val previewHeading = HtmlTagName.h3 { }
        binder.bind(previewHeading) { it.previewHeading }
        val sourceHeading = HtmlTagName.h3 { }
        binder.bind(sourceHeading) { it.sourceHeading }

        section.body.append(
            exampleBox(null, inputLabel, input, controls, entries.root, plain.root),
            previewHeading,
            exampleBox(null, preview),
            sourceHeading,
            exampleBox(null, source),
        )

        addSheet(OUTPUT_SHEET)
        body.append(section.root)
        writeOutputs()
    }

    /**
     * Runs the same three calls for every output but keeps the user's own option: `use_classes` swaps inline
     * colours for the `ansi-*-fg` classes.
     */
    private fun writeOutputs() {
        val text = input.value
        val escaped = Anser.escapeForHtml(text)
        val options = unsafeJso<AnserOptions> { use_classes = useClasses.checked }
        val html = Anser.linkify(Anser.ansiToHtml(escaped, options))
        val json = Anser.ansiToJson(text)

        preview.innerHTML = HtmlSource(html)
        source.textContent = html
        entries.set("${current.entriesPrefix}: ${json.size}")
        plain.set("${current.plainPrefix}: ${Anser.ansiToText(text)}")
    }

    override fun applyTranslation(lang: Lang) {
        current = converterTexts[lang]
        setTitle(current.title)
        setSummary(current.summary)
        binder.apply(lang)
        writeOutputs()
    }

    companion object : ConverterPageDefaultReference() {
        /**
         * The sample output of a build tool: bold, colours, a truecolour span and a URL, so one click shows
         * every branch of the converter.
         */
        private const val SAMPLE: String =
            "\u001b[1m$ kotlin build\u001b[0m\n" +
                "\u001b[32mOK\u001b[0m 12 tests, \u001b[33m3 skipped\u001b[0m in 0.4s\n" +
                "\u001b[31mFAILED\u001b[0m task ':ktjs-anser:jsBrowserTest'\n" +
                "see \u001b[4mhttps://example.com/report\u001b[0m for the details"

        private val english: ConverterTexts = ConverterTexts(
            title = "Convert ANSI text",
            summary = "Every output on this page comes from the wrapper: `escapeForHtml`, `ansiToHtml`, " +
                "`ansiToJson`, `ansiToText` and `linkify`.",
            demoHeading = "One pipeline, three outputs",
            demoHint = "Edit the input, flip `use_classes`, then convert. The preview is the HTML anser " +
                "returns; the source below it is the same string, unescaped.",
            inputLabel = "ANSI input",
            useClassesLabel = "Use classes (ansi-*-fg)",
            convertLabel = "Convert",
            resetLabel = "Reset sample",
            previewHeading = "Rendered HTML",
            sourceHeading = "The same markup, as source",
            entriesPrefix = "JSON entries",
            plainPrefix = "Plain text",
        )
        private val chinese: ConverterTexts = ConverterTexts(
            title = "转换 ANSI 文本",
            summary = "这一页的每种输出都来自封装层：`escapeForHtml`、`ansiToHtml`、`ansiToJson`、`ansiToText` 与 `linkify`。",
            demoHeading = "一条流水线，三种输出",
            demoHint = "改输入、拨 `use_classes`，再点转换。预览是 anser 返回的 HTML；下方源码是同一个字符串，未做转义。",
            inputLabel = "ANSI 输入",
            useClassesLabel = "使用 class（ansi-*-fg）",
            convertLabel = "转换",
            resetLabel = "恢复示例",
            previewHeading = "渲染后的 HTML",
            sourceHeading = "同一段标记的源码",
            entriesPrefix = "JSON 条目数",
            plainPrefix = "纯文本",
        )
        private val converterTexts: Translations<ConverterTexts> = texts(
            Langs.EN to english,
            Langs.ZH_HANS to chinese,
        )

        /** The converted output is code: monospace, wrapped, and it keeps the spaces anser produced. */
        private val OUTPUT: ClassName = ClassName("converter-output")

        private val OUTPUT_SHEET = cssSheet {
            className(OUTPUT).invoke {
                margin = 0.px
                whiteSpace = WhiteSpace.preWrap
                fontFamily = FontFamily.monospace
                fontSize = 13.px
                width = 100.pct
            }
        }
    }
}
