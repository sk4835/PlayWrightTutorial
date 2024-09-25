const {test, expect} = require('@playwright/test');
const { timeout } = require('../playwright.config');
const playwrightConfig = require('../playwright.config');
const { escape } = require('querystring');


    test.only('@Web Client App login', async ({ page }) => {
        //js file- Login js, DashboardPage
        const email = "anshika@gmail.com";
        const password = "Iamking@000"
        const userName = page.locator("#userEmail")
        const passField = page.locator("#userPassword")
        const loginButton = page.locator("#login")
        const products = page.locator(".card-body");
        const productName = "ZARA COAT 3"
        const naviButton = page.locator("[class='btn btn-custom']");

        await page.goto("https://rahulshettyacademy.com/client");
        await userName.fill(email);
        await passField.fill(password);
        await loginButton.click();
        //console.log(await page.title());
        //expect(await page.getByTitle("Let's Shop"));
        //await page.pause();
        
        await products.first().waitFor();
        const count = await products.count();
        for (let i = 0; i < count; i++)
        {    
            if(await products.nth(i).locator("b").textContent() === productName)
            {
                await products.nth(i).locator("text= Add To Cart").click();
                await naviButton.nth(2).locator("label").waitFor();
                expect(await naviButton.nth(2).locator("label")).toHaveText("1");
                console.log("SUCCESS")
                console.log(await naviButton.nth(2).locator("label").textContent());
                break;
            }
        }
        await naviButton.nth(2).click();
        expect(await page.locator(".heading h1")).toHaveText("My Cart");
        console.log(await page.locator(".heading h1").textContent());

        

     });

