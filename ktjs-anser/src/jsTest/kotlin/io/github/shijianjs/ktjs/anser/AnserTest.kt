package io.github.shijianjs.ktjs.anser

import js.objects.unsafeJso
import kotlin.js.unsafeCast
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/**
 * Checks the wrapper against the real `anser` package.
 *
 * The upstream project ships no test suite of its own (its checks live in `test/` as hand-run scripts),
 * so these cases translate the documented behaviour from `DOCUMENTATION.md` and `lib/index.d.ts`: the
 * three conversions, the option object, the decoration names and the instance API.
 */
class AnserTest {
    private val red = "\u001b[31mred\u001b[0m"

    @Test
    fun escapeForHtmlEscapesTheThreeCharacters() {
        assertEquals("a &amp; b &lt; c &gt; d", escapeForHtml("a & b < c > d"))
    }

    @Test
    fun ansiToHtmlWrapsTheTextInASpan() {
        val html = ansiToHtml(red)

        assertContains(html, "red")
        assertContains(html, "<span")
    }

    @Test
    fun ansiToHtmlWithClassesUsesTheAmpersandClasses() {
        val html = ansiToHtml("\u001b[31mred\u001b[0m", unsafeOptions(useClasses = true))

        assertContains(html, "ansi-red-fg")
    }

    @Test
    fun ansiToTextStripsTheEscapes() {
        assertEquals("red", ansiToText(red))
    }

    @Test
    fun ansiToJsonReportsOneEntryPerSpan() {
        val entries = ansiToJson(red)

        assertTrue(entries.isNotEmpty(), "a coloured span yields at least one entry")
        // anser emits the text before the first escape as its own (empty) entry, so the coloured span is
        // found by content instead of by index.
        val coloured = entries.first { it.content == "red" }
        assertFalse(coloured.isEmpty())
        assertTrue(coloured.was_processed)
    }

    @Test
    fun linkifyTurnsUrlsIntoAnchors() {
        val html = linkify("see https://example.com for details")

        assertContains(html, "<a href=\"https://example.com\"")
    }

    @Test
    fun decorationNamesCarryTheUpstreamStrings() {
        assertEquals("bold", DecorationNames.bold.asDynamicString())
        assertEquals("strikethrough", DecorationNames.of("strikethrough").asDynamicString())
    }

    @Test
    fun theInstanceApiMatchesTheStatics() {
        val anser = createAnser()

        assertEquals(ansiToText(red), anser.ansiToText(red))
        assertContains(anser.process(red), "red")

        // The chunk family takes a fragment that already had its `ESC[` prefix split off, which is what
        // `process` does internally; passing the whole sequence leaves the escape unparsed.
        val chunk = "31mred"
        assertContains(anser.processChunk(chunk), "red")
        assertTrue(anser.processChunkJson(chunk).was_processed)
        assertEquals("red", anser.processJson(red).first { it.was_processed }.content)
    }
}

/** Reads the string behind a sealed literal type, which is what a caller compares against. */
private fun Any?.asDynamicString(): String = unsafeCast<String>()

/** Builds the option object the package reads; the field names are the upstream keys. */
private fun unsafeOptions(json: Boolean = false, useClasses: Boolean = false, removeEmpty: Boolean = false): AnserOptions =
    unsafeJso {
        this.json = json
        this.use_classes = useClasses
        this.remove_empty = removeEmpty
    }
