const {test, expect} = require('@playwright/test');
const { timeout } = require('../playwright.config');
const playwrightConfig = require('../playwright.config');
const { escape } = require('querystring');
const { type } = require('os');
const exp = require('constants');


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
        const paymentFields = page.locator("input[type='text']");

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
        await page.locator(".cartSection").locator(".itemImg").waitFor();
        console.log(await page.locator(".heading h1").textContent());
        //await page.pause();
        console.log(await page.locator("h3:has-text('ZARA COAT 3')").isVisible());
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        expect(bool).toBeTruthy();

        await page.locator("button:has-text('Checkout')").click();
        await page.locator(".payment").waitFor();
        await paymentFields.nth(0).fill("");
        await paymentFields.nth(0).fill("1234 5678 9101 1121");
        await paymentFields.nth(1).fill("007");
        await paymentFields.nth(2).fill("Darth Vader");
        await page.locator('select.input.ddl').nth(0).selectOption("12");
        await page.locator('select.input.ddl').nth(1).selectOption("25");
        await paymentFields.nth(3).fill("");
        await paymentFields.nth(3).fill("example@theforce.com");

        

        await page.locator("[placeholder='Select Country']").pressSequentially("Unite");
        await page.locator(".ta-results").waitFor();
        const dropdown = await page.locator(".ta-results");
        const opCount = await dropdown.locator("button").count();

        for(let i=0; i<opCount; i++ )
        {
            const text = await dropdown.locator("button").nth(i).textContent(); 
            if (text === " United States")
            {
                //await page.locator("button:has-text(' United States')").nth(0).click();
                //console.log(await page.locator("button:has-text(' United States')").nth(0).textContent());
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        console.log(await page.locator("[placeholder='Select Country']").textContent());
    

        await page.locator(".btnn.action__submit.ng-star-inserted").click();
        const orderConf = page.locator(".hero-primary");
        await orderConf.waitFor();
        //console.log(await orderConf.textContent());
        expect(await orderConf).toHaveText(" Thankyou for the order. ");

        const OrderNum = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(OrderNum);
        await page.locator("button[routerlink*='myorder']").click();
        await page.locator("tbody").waitFor();
        
        const orderRow = await page.locator("tbody tr"); 
        for (let i=0; i< await orderRow.count(); i++)
        {
            const rowOrdID = await orderRow.nth(i).locator("th").textContent();
            if (OrderNum.includes(rowOrdID))
            {
                console.log("This is the Order ID: "+rowOrdID);
                expect(OrderNum).toContain(rowOrdID);
                await orderRow.nth(i).locator("button").first().click();
                break;
            }
        }
        
        const orderIDDetailsPage = await page.locator(".col-text").textContent();
        expect(OrderNum.includes(orderIDDetailsPage)).toBeTruthy();
        console.log(orderIDDetailsPage);
    
     });

