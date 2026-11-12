
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)), ".."
);
const url = "file://" + path.join(root, "index.html");

const money = (text) => {
  const value = String(text).replace(/,/g, "");
  const number = Number(value.replace(/[^0-9.]/g, ""));
  return value.includes("−") || value.includes("-")
    ? -number
    : number;
};

let failed = 0;
const ok = (condition, message) => {
  console.log((condition ? "PASS  " : "FAIL  ") + message);
  if (!condition) failed++;
};

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];

page.on("pageerror", (error) => errors.push(error.message));

try {
  await page.goto(url);

  // Test 1: Landing page
  ok(
    await page.locator(".hero h1").isVisible(),
    "Landing page loads"
  );

  // Test 2: Categories match application data
  const categories = await page.evaluate(
    () => Object.keys(CATEGORIES)
  );

  ok(
    await page.locator("#chip-grid .chip").count()
      === categories.length,
    "All vendor categories are displayed"
  );

  // Test 3: Budget dashboard
  await page.locator(".hero .cta-primary").click();

  ok(
    await page.locator("#total-budget-amount")
      .textContent() === "$30,000",
    "Dashboard displays $30,000 budget"
  );

  // Test 4: Budget calculations
  const allocated = money(
    await page.locator("#allocated-amount").textContent()
  );
  const remaining = money(
    await page.locator("#remaining-amount").textContent()
  );

  ok(
    allocated + remaining === 30000,
    "Budget allocation calculations are correct"
  );

  // Test 5: Photography navigation
  const photographyIndex = categories.indexOf("photography");

  ok(
    photographyIndex >= 0,
    "Photography category exists"
  );

  if (photographyIndex >= 0) {
    await page.locator("button.view-vendors")
      .nth(photographyIndex).click();

    ok(
      await page.locator("#matches-kicker")
        .textContent() === "Photography",
      "Photography vendor page opens"
    );

    // Test 6: Vendor filtering
    const expected = await page.evaluate(() => {
      const cat = CATEGORIES.photography;
      const budget = Number(
        document.querySelector("#budget-slider").value
      );
      return {
        fitting: cat.vendors.filter(v => v.price <= budget).length,
        outside: cat.vendors.filter(v => v.price > budget).length
      };
    });

    const fitting = await page.locator(
      "#vendor-list .vendor-card"
    ).count();

    const outside = await page.locator(
      "#vendor-list-out .vendor-card"
    ).count();

    ok(
      fitting === expected.fitting,
      "Vendors within budget are correctly filtered"
    );

    ok(
      outside === expected.outside,
      "Over-budget vendors are correctly filtered"
    );

    // Test 7: Vendor details
    const firstVendor = page.locator(
      "#vendor-list .vendor-card, #vendor-list-out .vendor-card"
    ).first();

    const listedPrice = money(
      await firstVendor.locator(".vprice").textContent()
    );

    await firstVendor.click();

    const total = money(
      await page.locator("#vendor-total").textContent()
    );

    ok(
      total === listedPrice,
      "Vendor detail price matches listed price"
    );

    // Test 8: Price breakdown
    const priceLines = await page.locator(
      "#price-lines .price-line span:last-child"
    ).allTextContents();

    const sum = priceLines.map(money)
      .reduce((a, b) => a + b, 0);

    ok(
      sum === total,
      "Vendor price breakdown adds up correctly"
    );

    // Test 9: Booking interaction
    let dialogText = "";

    page.once("dialog", async (dialog) => {
      dialogText = dialog.message();
      await dialog.accept();
    });

    await page.locator(
      "#screen-vendor .cta-primary.book"
    ).click();

    ok(
      dialogText.length > 0,
      "Booking request button responds"
    );
  }

  // Test 10: JavaScript errors
  ok(
    errors.length === 0,
    "No JavaScript errors"
  );

} catch (error) {
  failed++;
  console.error("FAIL  Unexpected test error:", error);
} finally {
  await browser.close();
}

console.log(
  failed
    ? `\n${failed} check(s) failed`
    : "\nAll checks passed"
);

process.exit(failed ? 1 : 0);
