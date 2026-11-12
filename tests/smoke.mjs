
import { chromium } from "playwright";

const baseURL = "http://127.0.0.1:8000";
let failures = 0;

function check(condition, message) {
  console.log(`${condition ? "PASS" : "FAIL"}  ${message}`);
  if (!condition) failures++;
}

function money(value) {
  const text = String(value);
  const amount = Number(text.replace(/[^0-9.]/g, ""));
  return text.includes("−") || text.includes("-")
    ? -amount : amount;
}

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];

page.on("pageerror", e => errors.push(e.message));

page.on("response", response => {
  if (response.status() >= 400) {
    errors.push(
      `HTTP ${response.status()}: ${response.url()}`
    );
  }
});

try {
  await page.goto(baseURL, {
    waitUntil: "networkidle"
  });

  // 1. Landing page
  check(
    await page.locator(".hero h1").isVisible(),
    "Landing page loads"
  );

  // 2. Vendor data and categories
  const categories = await page.evaluate(
    () => Object.entries(CATEGORIES).map(
      ([key, value]) => ({
        key,
        label: value.label,
        start: value.start,
        vendors: value.vendors
      })
    )
  );

  check(
    categories.length === 8,
    "All 8 vendor categories load"
  );

  check(
    await page.locator("#chip-grid .chip").count()
      === categories.length,
    "All vendor category buttons display"
  );

  // 3. Budget dashboard
  await page.locator(".hero .cta-primary").click();

  check(
    money(await page.locator(
      "#total-budget-amount"
    ).textContent()) === 30000,
    "Dashboard displays $30,000 budget"
  );

  const allocated = money(
    await page.locator("#allocated-amount").textContent()
  );

  const remaining = money(
    await page.locator("#remaining-amount").textContent()
  );

  check(
    allocated + remaining === 30000,
    "Budget allocation calculations are correct"
  );

  // 4. Photography navigation
  const photographyIndex = categories.findIndex(
    c => c.key === "photography"
  );

  check(
    photographyIndex !== -1,
    "Photography category exists"
  );

  if (photographyIndex !== -1) {
    const photography = categories[photographyIndex];

    await page.locator("button.view-vendors")
      .nth(photographyIndex).click();

    check(
      (await page.locator("#matches-kicker")
        .textContent()).trim() === photography.label,
      "Photography vendor page opens"
    );

    // 5. Vendor budget filtering
    const budget = Number(
      await page.locator("#budget-slider").inputValue()
    );

    const expectedFits = photography.vendors.filter(
      vendor => vendor.price <= budget
    ).length;

    const expectedOutside =
      photography.vendors.length - expectedFits;

    check(
      await page.locator(
        "#vendor-list .vendor-card"
      ).count() === expectedFits,
      "Within-budget vendors display correctly"
    );

    check(
      await page.locator(
        "#vendor-list-out .vendor-card"
      ).count() === expectedOutside,
      "Over-budget vendors display correctly"
    );

    // 6. Vendor detail page
    const firstVendor = page.locator(
      "#vendor-list .vendor-card, " +
      "#vendor-list-out .vendor-card"
    ).first();

    const listedPrice = money(
      await firstVendor.locator(".vprice").textContent()
    );

    await firstVendor.click();

    const total = money(
      await page.locator("#vendor-total").textContent()
    );

    check(
      total === listedPrice,
      "Vendor detail price matches listing"
    );

    // 7. Price breakdown
    const lines = await page.locator(
      "#price-lines .price-line span:last-child"
    ).allTextContents();

    const sum = lines.map(money).reduce(
      (a, b) => a + b, 0
    );

    check(
      sum === total,
      "Vendor price breakdown is accurate"
    );

    // 8. Booking button
    let bookingResponded = false;

    page.once("dialog", async dialog => {
      bookingResponded = true;
      await dialog.accept();
    });

    await page.locator(
      "#screen-vendor .cta-primary.book"
    ).click();

    check(
      bookingResponded,
      "Booking request button responds"
    );
  }

} catch (error) {
  failures++;
  console.error("FAIL  Test execution:", error.message);
}

// 9. JavaScript errors
check(
  errors.length === 0,
  "No JavaScript or HTTP errors"
);

if (errors.length) {
  console.error(errors.join("\n"));
}

await browser.close();

console.log(
  failures === 0
    ? "\nAll checks passed!"
    : `\n${failures} check(s) failed`
);

process.exit(failures ? 1 : 0);
