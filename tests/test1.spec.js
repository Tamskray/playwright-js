const { test, expect } = require("@playwright/test");

test("google search", async ({ page }) => {
    await page.goto("https://www.google.com.ua/");
    await page.fill("role=combobox", "dou");
    await page.press("role=combobox", "Enter");
    const title = await page.title();
    expect(title).toContain("dou");
});

test("open page", async ({ page }) => {
    await page.goto("https://www.google.com.ua/");
    await page.fill("role=combobox", "dou");
    await page.press("role=combobox", "Enter");
    await page
        .getByRole("link", { name: /DOU: Спільнота програмістів/ })
        .first()
        .click();
    await expect(page).toHaveTitle(/DOU/);
});
