const { test, expect } = require("@playwright/test");
const credentials = require("../credentials");

const productsUrl = [
    "https://retromagaz.com/product/sony-playstation-5-1tb-black-novaya",
    "https://retromagaz.com/product/ps4-slim-1tb-black-bk-bu-kh",
    "https://retromagaz.com/product/ps3-super-slim-500gb-black-bk-bu-kh",
    "https://retromagaz.com/product/ps4-dzhoystik-dualshock-4-v2-white-belyy-bu-kh",
    "https://retromagaz.com/product/konsol-nintendo-switch-heg-001-white-64gb-noviy",
];

test.beforeEach(async ({ page }) => {
    const { phone, password } = credentials;

    await page.goto("https://retromagaz.com/");
    await page.locator(".user-link > svg").first().click();
    await page.fill("input[name=phone]", phone);
    await page.fill("input[name=password]", password);
    await page.getByRole("button", { name: "Вхід" }).click();
    await page.waitForTimeout(1000);

    // // check span image that appears after authorization
    await page.waitForSelector(".user-link span img");
    const imageElement = await page.$(".user-link span img");

    expect(imageElement).not.toBeNull();
});

async function addToCart(page, productUrl, buttonText) {
    await page.goto(productUrl);
    await page.getByRole("link", { name: buttonText, exact: true }).click();
}

test("complex test", async ({ page }) => {
    test.setTimeout(60000);

    for (const url of productsUrl) {
        await addToCart(page, url, "купити");
    }

    await page.getByRole("link", { name: "Checkout" }).click();
    await page.locator(".delete-item").first().click();
    await page.locator("div:nth-child(3) > .delete-item").click();
    await page.getByRole("link", { name: "Оформити замовлення" }).click();
    await page.waitForTimeout(5000);
});
