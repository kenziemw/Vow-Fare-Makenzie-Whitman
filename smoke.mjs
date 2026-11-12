// Smoke tests: load the page in a real browser and walk the main flow.
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = "file://" + path.join(root, "index.html");
const money = (t) => Number(String(t).replace(/[^0-9.-]/g, ""));
let failed = 0;
const ok = (cond, msg) => { console.log((cond ? "PASS  " : "FAIL  ") + msg); if (!cond) failed++; };

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(url);
ok(await page.locator(".hero h1").isVisible(), "landing page loads");
ok((await page.locator("#chip-grid .chip").count()) === 8, "all 8 vendor categories are listed");

await page.click(".hero .cta-primary");
ok((await page.textContent("#total-budget-amount")) === "$30,000", "dashboard shows the $30,000 total");
const alloc = money(await page.textContent("#allocated-amount")), left = money(await page.textContent("#remaining-amount"));
ok(alloc + left === 30000, `allocated + still available equals the total (${alloc} + ${left})`);

await page.click("button.view-vendors >> nth=2"); // Photography
ok((await page.textContent("#matches-kicker")) === "Photography", "photography page opens");
ok((await page.locator("#vendor-list .vendor-card").count()) === 3, "3 vendors fit a $3,200 budget");
ok((await page.locator("#vendor-list-out .vendor-card").count()) === 5, "5 vendors are outside the budget");

await page.click("#vendor-list .vendor-card >> nth=0");
const total = money(await page.textContent("#vendor-total"));
ok(total === 1450, `vendor page shows the listed price ($${total})`);
const sum = (await page.locator("#price-lines .price-line span:last-child").allTextContents()).map(money).reduce((a, b) => a + b, 0);
ok(sum === total, `price lines add up to the total (${sum})`);

let dialogText = "";
page.once("dialog", async (d) => { dialogText = d.message(); await d.accept(); });
await page.click("#screen-vendor .cta-primary.book");
ok(dialogText.length > 0, "Request to book responds");

ok(errors.length === 0, "no JavaScript errors" + (errors.length ? ": " + errors.join("; ") : ""));
await browser.close();
console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
