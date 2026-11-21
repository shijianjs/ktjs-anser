@file:JsModule("anser")

package io.github.shijianjs.ktjs.anser

import kotlin.js.definedExternally
import kotlin.js.JsAny
import kotlin.js.JsName

/**
 * The value the package exports (`export = Anser` in its own typings).
 *
 * `@JsName("default")` makes Kotlin/JS emit a default import, which is what a CommonJS
 * `module.exports = Anser` needs.
 */
@JsName("default")
external val anser: AnserStatics

/** The static half of the class: what the module value can call without an instance. */
external interface AnserStatics {
    /** Escapes `&`, `<` and `>` so the result can be put into HTML. */
    fun escapeForHtml(txt: String): String

    /** Turns bare URLs into anchors; run it on the output of [ansiToHtml]. */
    fun linkify(txt: String): String

    /** Replaces ANSI SGR escapes with spans. */
    fun ansiToHtml(txt: String, options: AnserOptions? = definedExternally): String

    /** Converts ANSI input into one entry per span. */
    fun ansiToJson(txt: String, options: AnserOptions? = definedExternally): Array<AnserJsonEntry>

    /** Strips the escapes and returns the plain text. */
    fun ansiToText(txt: String, options: AnserOptions? = definedExternally): String
}

/**
 * An instance of the converter as JavaScript sees it.
 *
 * `process` returns an array when `options.json` is set and a string otherwise, which one Kotlin signature
 * cannot express, so it is declared here as [JsAny] and narrowed by [AnserInstance].
 */
external interface AnserRawInstance {
    fun escapeForHtml(txt: String): String
    fun linkify(txt: String): String
    fun ansiToHtml(txt: String, options: AnserOptions? = definedExternally): String
    fun ansiToJson(txt: String, options: AnserOptions? = definedExternally): Array<AnserJsonEntry>
    fun ansiToText(txt: String, options: AnserOptions? = definedExternally): String
    fun setupPalette()
    fun process(txt: String, options: AnserOptions?, markup: Boolean?): JsAny

    /**
     * The same JS method, read as the string it returns when `options.json` is not set.
     *
     * The upstream signatures overload on `json`, which Kotlin cannot express; two declarations with one
     * `@JsName` are how the wrapper keeps each return type honest instead of casting at the call site.
     */
    @JsName("process")
    fun processText(txt: String, options: AnserOptions?, markup: Boolean?): String

    /** The same JS method, read as the entries it returns when `options.json` is set. */
    @JsName("process")
    fun processEntries(txt: String, options: AnserOptions?, markup: Boolean?): Array<AnserJsonEntry>

    fun processChunk(text: String, options: AnserOptions?, markup: Boolean?): JsAny

    /** The chunk form read as a string; see [processText]. */
    @JsName("processChunk")
    fun processChunkText(text: String, options: AnserOptions?, markup: Boolean?): String

    /** The chunk form read as one entry; see [processEntries]. */
    @JsName("processChunkJson")
    fun processChunkEntry(text: String, options: AnserOptions?, markup: Boolean?): AnserJsonEntry
}
