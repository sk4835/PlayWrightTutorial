const {test, expect} = require('@playwright/test');
const { timeout } = require('../playwright.config');


test('Validate error message on incorrect login', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    // object locators
    const userName = page.locator('#user-name');
    const password = page.locator('#password');
    const logIn = page.locator("input[value='Login']");

    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title());
    await userName.fill("randomUser");
    await password.fill("learning");
    await logIn.click();
    //await expect(page.locator(".error-button")).toBeVisible();
    console.log(await page.locator("h3[data-test='error']").textContent());
    await expect(page.locator("h3[data-test='error']")).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await userName.fill("");
    await userName.fill("standard_user");
    await password.fill("secret_sauce")


});

test('Validate inventory list', async ({browser})=> 
    {
    
    
        const context = await browser.newContext();
        const page = await context.newPage();
    
        // object locators
        const userName = page.locator('#user-name');
        const password = page.locator('#password');
        const logIn = page.locator("input[value='Login']");
        const logo = page.locator(".app_logo");
        const inventoryList = page.locator(".inventory_item_name");
    
        await page.goto("https://www.saucedemo.com/");
        console.log(await page.title());
        await userName.fill("standard_user");
        await password.fill("secret_sauce")
        await logIn.click();
        await expect(logo).toBeVisible();
        console.log(await inventoryList.first().textContent());
        console.log(await inventoryList.nth(1).textContent());
        const allInventory = await inventoryList.allTextContents();
        console.log(allInventory);
        
    
    });

test('Page Playwright test', async ({page})=> 
    {
        await page.goto("https://google.com");
        //get title and put an assertion to validate it is correct
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");

    
    });