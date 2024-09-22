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

test('Validate dropdown list', async ({browser})=> 
    {
    
    
        const context = await browser.newContext();
        const page = await context.newPage();
    
        // object locators
        const userName = page.locator('#user-name');
        const password = page.locator('#password');
        const logIn = page.locator("input[value='Login']");
        const logo = page.locator(".app_logo");
        const inventoryList = page.locator(".inventory_item_name");
        const dropdownlist = page.locator(".product_sort_container");

    
        await page.goto("https://www.saucedemo.com/");
       // await page.waitForLoadState("networkidle");
        console.log(await page.title());
        await userName.fill("standard_user");
        await password.fill("secret_sauce")
        await logIn.click();
        await expect(logo).toBeVisible();
        await page.pause();
        console.log(await inventoryList.first().textContent());
        await dropdownlist.selectOption("lohi");
        console.log(await inventoryList.first().textContent());
        

        
    
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
       // await page.waitForLoadState("networkidle");
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

    test('@Web Client App login', async ({ page }) => {
        //js file- Login js, DashboardPage
        const email = "anshika@gmail.com";
        const productName = 'zara coat 3';
        const itemList = page.locator(".card-body b")
        const products = page.locator(".card-body");
        const blinkText = page.locator('//*[@id="products"]/div[1]/div[1]/label')
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").type("Iamking@000");
        await page.locator("[value='Login']").click();
        //await page.waitForLoadState('networkidle');
        await itemList.first().waitFor();
        const titles = await itemList.allTextContents();
        //console.log(titles);
        // await page.locator("#sidebar > form > div:nth-child(3) > div:nth-child(3) > input[type=checkbox]").click();
        // await expect(page.locator("#sidebar > form > div:nth-child(3) > div:nth-child(3) > input[type=checkbox]")).toBeChecked();
        // console.log(await page.locator("#sidebar > form > div:nth-child(3) > div:nth-child(3) > input[type=checkbox]").isChecked());
        // await page.locator("#sidebar > form > div:nth-child(3) > div:nth-child(3) > input[type=checkbox]").uncheck();
        // expect(await page.locator("#sidebar > form > div:nth-child(3) > div:nth-child(3) > input[type=checkbox]").isChecked()).toBeFalsy();
        //await page.pause();
        await expect(blinkText).toHaveAttribute("class","m-2 blink_me");
        console.log(await blinkText.textContent());
     });

