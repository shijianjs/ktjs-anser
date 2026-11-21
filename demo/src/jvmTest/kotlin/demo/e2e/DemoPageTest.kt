package demo.e2e

import com.microsoft.playwright.Page
import com.microsoft.playwright.junit.UsePlaywright
import com.microsoft.playwright.options.WaitUntilState
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import org.junitpioneer.jupiter.RetryingTest

/**
 * Smoke checks for the demo: the shared shell mounts, the drawer drives the router, the converter's
 * pipeline runs against the real package, the table and the list render their copy, and a language
 * switch rewrites the pages in place.
 *
 * The shell lives in a shadow tree, so the demo's own nodes are selected through `#demo` and the page
 * element the shell mounts — never through the document root.
 */
@UsePlaywright(DemoOptions::class)
class DemoPageTest {
    @RetryingTest(maxAttempts = 2)
    fun `overview renders the shell and the three cards`(page: Page) {
        openPage(page)

        assertTrue(page.title().contains("ktjs-anser"), "title: ${page.title()}")
        assertTrue(page.locator("#demo img.layout__logo").isVisible(), "the shell serves the project logo")
        assertEquals("Overview", page.locator("#demo anser-overview-page h1").first().textContent())

        // One top-level row for the lifted start group, one group with the converter and the two reference pages.
        val rows = page.locator("#demo vaadin-side-nav-item").count()
        assertTrue(rows >= 4, "drawer rows: $rows")

        val cards = page.locator("#demo anser-overview-page a.card-link").count()
        assertEquals(3, cards, "one card per page behind the overview")
    }

    @RetryingTest(maxAttempts = 2)
    fun `a card opens its page`(page: Page) {
        openPage(page)
        page.locator("#demo anser-overview-page a.card-link[data-route='converter']").first().click()
        page.waitForSelector("#demo anser-converter-page h1")

        assertEquals("Convert ANSI text", page.locator("#demo anser-converter-page h1").first().textContent())
        assertEquals(1, page.locator("#demo anser-converter-page vaadin-text-area").count())
    }

    @RetryingTest(maxAttempts = 2)
    fun `the converter renders the sample as html`(page: Page) {
        openPage(page)
        openRoute(page, "converter")

        val preview = page.locator("#demo anser-converter-page .converter-output").first()
        // The sample carries SGR escapes, so the rendered preview has at least one span.
        assertTrue(preview.locator("span").count() > 0, "the preview holds converted spans")
        val entries = page.locator("#demo anser-converter-page .readout").first().textContent().orEmpty()
        assertTrue(entries.startsWith("JSON entries: "), entries)
    }

    @RetryingTest(maxAttempts = 2)
    fun `the mapped option reaches the package`(page: Page) {
        openPage(page)
        openRoute(page, "converter")

        val toggle = page.locator("#demo anser-converter-page vaadin-switch").first()
        toggle.click()
        page.locator("#demo anser-converter-page vaadin-button").first().click()

        assertTrue(toggle.evaluate("(node) => node.checked") as Boolean, "the switch keeps its state")
        val source = page.locator("#demo anser-converter-page .converter-output").nth(1).textContent().orEmpty()
        assertTrue(source.contains("ansi-"), "use_classes switches the output to classes: $source")
    }

    @RetryingTest(maxAttempts = 2)
    fun `the mapping table and the conventions list render`(page: Page) {
        openPage(page)
        openRoute(page, "api")
        assertEquals("What the wrapper maps", page.locator("#demo anser-api-page h1").first().textContent())
        // Eight rows of the mapping plus the header row.
        assertEquals(9, page.locator("#demo anser-api-page table tr").count())

        openRoute(page, "conventions")
        assertEquals("Conventions", page.locator("#demo anser-conventions-page h1").first().textContent())
        assertEquals(5, page.locator("#demo anser-conventions-page ul li").count())
    }

    @RetryingTest(maxAttempts = 2)
    fun `the language switch rewrites the page in place`(page: Page) {
        openPage(page)
        openRoute(page, "converter")

        switchLanguage(page, "zh-Hans")
        assertEquals("转换 ANSI 文本", page.locator("#demo anser-converter-page h1").first().textContent())
        assertEquals("转换", page.locator("#demo anser-converter-page vaadin-button").first().textContent())
        val entries = page.locator("#demo anser-converter-page .readout").first().textContent().orEmpty()
        assertTrue(entries.startsWith("JSON 条目数: "), entries)
    }

    @RetryingTest(maxAttempts = 2)
    fun `the page keeps a single scrollbar`(page: Page) {
        openPage(page)
        openRoute(page, "api")

        val horizontal = page.evaluate(
            "() => document.documentElement.scrollWidth - document.documentElement.clientWidth",
        ) as Number
        assertEquals(0, horizontal.toInt(), "no horizontal overflow")
    }

    @RetryingTest(maxAttempts = 2)
    fun `page logs no console errors or failed requests`(page: Page) {
        val consoleErrors = mutableListOf<String>()
        val failedRequests = mutableListOf<String>()
        page.onConsoleMessage { message ->
            if (message.type() == "error") consoleErrors += message.text()
        }
        page.onRequestFailed { request ->
            failedRequests += "${request.url()} ${request.failure()}"
        }

        openPage(page)
        openRoute(page, "converter")

        assertTrue(consoleErrors.isEmpty(), "console errors: $consoleErrors")
        assertTrue(failedRequests.isEmpty(), "failed requests: $failedRequests")
    }

    private fun openPage(page: Page) {
        page.navigate("/", Page.NavigateOptions().setWaitUntil(WaitUntilState.NETWORKIDLE))
        page.waitForSelector("#demo anser-overview-page h1")
    }

    /** Clicks the drawer item for [route]; the router is also what the menu drives. */
    private fun openRoute(page: Page, route: String) {
        page.locator("#demo vaadin-side-nav-item[data-route='$route']").first().click()
        page.waitForSelector("#demo anser-$route-page h1")
    }

    /** Opens the layout's language menu and picks [code]. */
    private fun switchLanguage(page: Page, code: String) {
        page.locator("#demo [data-menu='lang']").first().click()
        page.locator("#demo [data-action='lang:$code']").first().click()
        page.waitForFunction("(expected) => document.documentElement.lang === expected", code)
    }
}
