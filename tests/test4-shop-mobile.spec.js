const { test } = require("@playwright/test");
const credentials = require("../credentials");

const productsUrl = [
    "https://retromagaz.com/product/sony-playstation-5-1tb-black-novaya",
    "https://retromagaz.com/product/ps4-slim-1tb-black-bk-bu-kh",
    "https://retromagaz.com/product/ps3-super-slim-500gb-black-bk-bu-kh",
];

async function addToCart(page, productUrl) {
    await page.goto(productUrl);
    await page.waitForSelector("#btn-by");
    await page.click("#btn-by");
}

test.use({
    viewport: { width: 390, height: 844 },
});

test("complex test from mobile", async ({ page }) => {
    test.setTimeout(60000);
    const { phone, password } = credentials;

    await page.goto("https://retromagaz.com/");
    await page.locator(".menu-link").first().click();
    await page.getByText("Особистий кабінет").click();
    await page.fill("input[name=phone]", phone);
    await page.fill("input[name=password]", password);
    await page.getByRole("button", { name: "Вхід" }).click();
    await page.waitForTimeout(1000);

    for (const url of productsUrl) {
        await addToCart(page, url, "купити");
    }

    await page.getByRole("link", { name: "Checkout" }).click();
    await page.locator(".delete-item").first().click();
    await page.click(".icon-with-text.delete");
    await page.getByRole("link", { name: "Перейти до оформлення" }).click();
    await page.waitForTimeout(5000);
});
