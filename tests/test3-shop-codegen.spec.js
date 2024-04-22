const { test } = require("@playwright/test");

test("complex test codegen", async ({ page }) => {
    test.setTimeout(60000);

    await page.goto("https://retromagaz.com/");
    await page.getByRole("textbox", { name: "Я шукаю" }).click();
    await page.getByRole("textbox", { name: "Я шукаю" }).fill("dualshok");
    await page.getByRole("textbox", { name: "Я шукаю" }).press("Enter");
    await page
        .getByRole("link", {
            name: "Геймпад Бездротовий Sony PlayStation 4 DualShock 4 Version 2 Black Б/У Хороший - 7873 Топ продажів Знижка 2%",
            exact: true,
        })
        .click();
    await page.getByRole("link", { name: "купити" }).click();
    await page.goto("https://retromagaz.com/product/ps4-dzhoystik-dualshock-4-v2-midnight-blue-i-temno-siniy-bu");
    await page.getByRole("link", { name: "купити" }).click();
    await page.getByRole("link", { name: "Checkout" }).click();
    await page
        .locator("div:nth-child(2) > .cart-item__info > .cart-item__block--bottom > .counter > .counter-plus")
        .click();
    await page
        .locator("div:nth-child(2) > .cart-item__info > .cart-item__block--bottom > .counter > .counter-plus")
        .click();

    // await page.waitForTimeout(5000);
    await page.getByRole("link", { name: "Оформити замовлення" }).click();
    // await page.waitForTimeout(5000);
});
