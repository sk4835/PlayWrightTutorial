const {test, expect} = require('@playwright/test');
const { timeout } = require('../playwright.config');


test.only('Validate error message on incorrect login', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title());
    await page.locator('#user-name').fill("rahulshetty@gmail.com");
    await page.locator('#password').fill("learning");
    await page.locator("input[value='Login']").click();
    //await expect(page.locator(".error-button")).toBeVisible();
    console.log(await page.locator("h3[data-test='error']").textContent());
    await expect(page.locator("h3[data-test='error']")).toHaveText("Epic sadface: Username and password do not match any user in this service");


});

test('Page Playwright test', async ({page})=> 
    {
        await page.goto("https://google.com");
        //get title and put an assertion to validate it is correct
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");

    
    });