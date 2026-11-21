package io.github.shijianjs.ktjs.anser

import js.objects.unsafeJso
import kotlin.js.JsAny
import kotlin.js.JsName
import kotlin.js.unsafeCast

/**
 * The options object anser reads when the caller passes none.
 *
 * `process` and `processChunk` read `options` fields without a null check, so a real `null` throws there;
 * every wrapper entry point normalises "no options" to an empty object instead. It is built per call rather
 * than shared: anser writes into the object it receives (`ansiToJson` sets `json`, `process` sets
 * `clearLine`), so a single instance would leak `json = true` into the next call.
 */
private fun effective(options: AnserOptions?): AnserOptions = options ?: unsafeJso { }

/**
 * The options object that makes `process` return entries.
 *
 * Upstream decides "entries or text" by reading `options.json`; the other fields are copied so the caller's
 * object is not mutated (upstream's own `ansiToJson` does write into it).
 */
private fun jsonOptions(options: AnserOptions?): AnserOptions = unsafeJso {
    json = true
    use_classes = options?.use_classes
    remove_empty = options?.remove_empty
}

/**
 * The wrapper's front door: the three conversions, the escaping helpers and the instance factory.
 *
 * ```kotlin
 * val html = Anser.ansiToHtml("\u001b[31mred\u001b[0m")
 * val entries = Anser.ansiToJson("\u001b[31mred\u001b[0m")
 * val instance = Anser.create()
 * ```
 *
 * The module itself is one class (`export = Anser`), so the statics live here and instance methods live on
 * [AnserInstance].
 */
object Anser {
    /** Escapes `&`, `<` and `>` so the result can be put into HTML. */
    fun escapeForHtml(txt: String): String = anser.escapeForHtml(txt)

    /** Turns bare URLs into anchors; run it on the output of [ansiToHtml]. */
    fun linkify(txt: String): String = anser.linkify(txt)

    /** Replaces ANSI SGR escapes with spans. */
    fun ansiToHtml(txt: String, options: AnserOptions? = null): String = anser.ansiToHtml(txt, effective(options))

    /** Converts ANSI input into one entry per span. */
    fun ansiToJson(txt: String, options: AnserOptions? = null): Array<AnserJsonEntry> = anser.ansiToJson(txt, effective(options))

    /** Strips the escapes and returns the plain text. */
    fun ansiToText(txt: String, options: AnserOptions? = null): String = anser.ansiToText(txt, effective(options))

    /**
     * Creates an instance of the converter.
     *
     * The module import is the class itself, so the instance is built with `Reflect.construct` instead of
     * Kotlin's `new`: an external class cannot be constructed through a module value.
     */
    fun create(): AnserInstance =
        AnserInstance(jsReflect.construct(anser.unsafeCast<JsAny>(), arrayOf<JsAny?>()).unsafeCast<AnserRawInstance>())
}

/** Converts ANSI input into HTML; the same call as [Anser.ansiToHtml]. */
fun ansiToHtml(txt: String, options: AnserOptions? = null): String = anser.ansiToHtml(txt, effective(options))

/** Converts ANSI input into one entry per span; the same call as [Anser.ansiToJson]. */
fun ansiToJson(txt: String, options: AnserOptions? = null): Array<AnserJsonEntry> = anser.ansiToJson(txt, effective(options))

/** Strips the escapes and returns the plain text; the same call as [Anser.ansiToText]. */
fun ansiToText(txt: String, options: AnserOptions? = null): String = anser.ansiToText(txt, effective(options))

/** Escapes `&`, `<` and `>`; the same call as [Anser.escapeForHtml]. */
fun escapeForHtml(txt: String): String = Anser.escapeForHtml(txt)

/** Turns bare URLs in already converted HTML into anchors; the same call as [Anser.linkify]. */
fun linkify(txt: String): String = Anser.linkify(txt)

/** Creates an instance of the converter; the same call as [Anser.create]. */
fun createAnser(): AnserInstance = Anser.create()

/**
 * `Reflect.construct`: the only way to `new` a class the module exports as a value.
 *
 * It lives here rather than in the `@JsModule` file on purpose — inside that file every declaration is an
 * import of the npm package, while `Reflect` is the global object.
 */
internal external interface JsReflect {
    fun construct(target: JsAny, arguments: Array<JsAny?>): JsAny
}

/** The global `Reflect` object. */
@JsName("Reflect")
internal external val jsReflect: JsReflect

/**
 * The converter as an object with state.
 *
 * ansers's instance carries the same methods as the statics plus the `process` family; this class narrows
 * the return types that JavaScript picks at run time, so callers do not have to cast.
 */
class AnserInstance internal constructor(private val raw: AnserRawInstance) {
    /** Escapes `&`, `<` and `>` so the result can be put into HTML. */
    fun escapeForHtml(txt: String): String = raw.escapeForHtml(txt)

    /** Turns bare URLs into anchors; run it on the output of [ansiToHtml]. */
    fun linkify(txt: String): String = raw.linkify(txt)

    /** Replaces ANSI SGR escapes with spans. */
    fun ansiToHtml(txt: String, options: AnserOptions? = null): String = raw.ansiToHtml(txt, effective(options))

    /** Converts ANSI input into one entry per span. */
    fun ansiToJson(txt: String, options: AnserOptions? = null): Array<AnserJsonEntry> = raw.ansiToJson(txt, effective(options))

    /** Strips the escapes and returns the plain text. */
    fun ansiToText(txt: String, options: AnserOptions? = null): String = raw.ansiToText(txt, effective(options))

    /** Sets up the palette; the constructor already calls it, exposed for symmetry with the upstream class. */
    fun setupPalette() {
        raw.setupPalette()
    }

    /** Runs the whole conversion in one call, returning HTML. */
    fun process(txt: String, options: AnserOptions? = null, markup: Boolean = true): String =
        raw.processText(txt, effective(options), markup)

    /** Runs the whole conversion in one call, returning one entry per span. */
    fun processJson(txt: String, options: AnserOptions? = null, markup: Boolean = true): Array<AnserJsonEntry> =
        raw.processEntries(txt, jsonOptions(options), markup)

    /** Processes one chunk, returning the text form. */
    fun processChunk(text: String, options: AnserOptions? = null, markup: Boolean = true): String =
        raw.processChunkText(text, effective(options), markup)

    /** Processes one chunk, returning one entry. */
    fun processChunkJson(text: String, options: AnserOptions? = null, markup: Boolean = true): AnserJsonEntry =
        raw.processChunkEntry(text, effective(options), markup)
}

/**
 * Options for every conversion.
 *
 * The field names keep the upstream spelling (`use_classes`, `remove_empty`) because they are keys of the
 * object anser reads, not Kotlin names.
 */
external interface AnserOptions {
    /** Return the JSON representation instead of a string. */
    var json: Boolean?

    /** Append `ansi-*-fg` / `ansi-bright-*-fg` classes instead of inline colours. */
    var use_classes: Boolean?

    /** Drop entries whose content is empty. */
    var remove_empty: Boolean?
}

/** One span of converted output. */
external interface AnserJsonEntry {
    /** The text. */
    var content: String

    /** The foreground colour. */
    var fg: String

    /** The background colour. */
    var bg: String

    /** The 16m foreground colour, when true colour is enabled. */
    var fg_truecolor: String

    /** The 16m background colour, when true colour is enabled. */
    var bg_truecolor: String

    /** `true` when a `\r` was found at the end of the line. */
    var clearLine: Boolean

    /** The decoration declared last before this text. */
    var decoration: DecorationName?

    /** Every decoration that applies to this text. */
    var decorations: Array<DecorationName>

    /** `true` when the colours were processed. */
    var was_processed: Boolean

    /** `true` when the content is empty. */
    fun isEmpty(): Boolean
}

/** A decoration anser reports for a span: `bold`, `dim`, `italic`, `underline`, `blink`, `reverse`, `hidden` or `strikethrough`. */
sealed external interface DecorationName

/** The decorations anser recognises. */
object DecorationNames {
    val bold: DecorationName get() = "bold".unsafeCast<DecorationName>()
    val dim: DecorationName get() = "dim".unsafeCast<DecorationName>()
    val italic: DecorationName get() = "italic".unsafeCast<DecorationName>()
    val underline: DecorationName get() = "underline".unsafeCast<DecorationName>()
    val blink: DecorationName get() = "blink".unsafeCast<DecorationName>()
    val reverse: DecorationName get() = "reverse".unsafeCast<DecorationName>()
    val hidden: DecorationName get() = "hidden".unsafeCast<DecorationName>()
    val strikethrough: DecorationName get() = "strikethrough".unsafeCast<DecorationName>()

    /** Wraps a decoration name the upstream list does not enumerate. */
    fun of(value: String): DecorationName = value.unsafeCast<DecorationName>()
}

/** A colour anser reports for a span: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan` or `white`. */
sealed external interface AnserColorName

/** The colours anser recognises. */
object AnserColorNames {
    val black: AnserColorName get() = "black".unsafeCast<AnserColorName>()
    val red: AnserColorName get() = "red".unsafeCast<AnserColorName>()
    val green: AnserColorName get() = "green".unsafeCast<AnserColorName>()
    val yellow: AnserColorName get() = "yellow".unsafeCast<AnserColorName>()
    val blue: AnserColorName get() = "blue".unsafeCast<AnserColorName>()
    val magenta: AnserColorName get() = "magenta".unsafeCast<AnserColorName>()
    val cyan: AnserColorName get() = "cyan".unsafeCast<AnserColorName>()
    val white: AnserColorName get() = "white".unsafeCast<AnserColorName>()

    /** Wraps a colour name the upstream list does not enumerate. */
    fun of(value: String): AnserColorName = value.unsafeCast<AnserColorName>()
}