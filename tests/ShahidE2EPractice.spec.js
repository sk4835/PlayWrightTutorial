const {test, expect, request} = require('@playwright/test');
const { timeout } = require('../playwright.config');
const playwrightConfig = require('../playwright.config');
const { escape } = require('querystring');
const { type } = require('os');
const exp = require('constants');

const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayload = {orders: [{country: "United States", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}

let response;

test.beforeAll(async () => 
{
    
    const apiContext = await request.newContext();
    const apiUtilsInstance = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtilsInstance.createOrder(orderPayload);

})

    //This is E2E with login validation 
    test.only('Validate placing an order through the UI', async ({ page }) => {
        //Below are page objects
        const email = "anshika@gmail.com";
        const password = "Iamking@000";
        const userName = page.locator("#userEmail");
        const passField = page.locator("#userPassword");
        const loginButton = page.locator("#login");
        const products = page.locator(".card-body");
        const productName = "ZARA COAT 3"
        const cartButton = page.getByRole("listitem").getByRole("button", {name: "Cart"});
        const paymentFields = page.locator("input[type='text']");

        //below are steps for the TC
        //Navigate and log into Demo Site
        await page.goto("https://rahulshettyacademy.com/client");
        await userName.fill(email);
        await passField.fill(password);
        await loginButton.click();

        //Wait for page to load, select product, and add to cart
        await page.waitForLoadState('networkidle');
        await products.first().waitFor();
        await products.filter({hasText: productName}).getByRole('button', {name: 'Add to Cart'}).click();

        // validating the Cart button has 1 after clicking add to cart
        expect(await cartButton.locator("label")).toHaveText("1");
        await cartButton.click();

        // validating navigation to correct page with My Cart header being visible
        expect(await page.locator(".heading h1")).toHaveText("My Cart");
        await page.locator(".cartSection").locator(".itemImg").waitFor();

        // validating the correct product name we are added is listed here and navigate to payment page
        expect(await page.getByText(productName)).toBeVisible();
        await page.getByRole('button', {name: "Checkout"}).click();

        // Wait for payment locator to load and fill in payment details
        await page.locator(".payment").waitFor();
        await paymentFields.nth(0).fill("");
        await paymentFields.nth(0).fill("1234 5678 9101 1121");
        await paymentFields.nth(1).fill("007");
        await paymentFields.nth(2).fill("Darth Vader");
        await page.locator('select.input.ddl').nth(0).selectOption("12");
        await page.locator('select.input.ddl').nth(1).selectOption("25");
        await paymentFields.nth(3).fill("");
        await paymentFields.nth(3).fill("example@theforce.com");
        await page.getByPlaceholder("Select Country").pressSequentially("Unite");
        await page.locator(".ta-results").waitFor();
        await page.getByRole("button", {name: "United States"}).nth(0).click();
        // Using input value to help output the value into console
        console.log(await page.getByPlaceholder("Select Country").inputValue());

        // click place order and validate landing on order confirmation page
        await page.getByText("PLACE ORDER").click();
        await page.getByText("Thankyou for the order.").waitFor();
        await page.getByText("Thankyou for the order.").isVisible();

        // Below is navigating to Order History Page and validating the transaction Order number is listed in the Order History Page
        const OrderNum = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
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



    // It is greate to use API to help tests become more robust.
    // In this example we'll use log in API to make this more efficient, assuming Log in functionality is already tested in another TC
    // Also purpose of this is to show case optimizing executing tests where repeated steps can be skiped ie. logging in via UI
test.only('Validate Order Id displays in Order History', async ({ page }) => {

    //Below is taking token and passing into local storage in browser
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token)

    //below are steps for the TC
    //Navigate to Demo Site directly through API, bypassing log in screen
    await page.goto("https://rahulshettyacademy.com/client");


    // Below is navigating to Order History Page and validating the transaction Order number is listed in the Order History Page
    await page.locator("button[routerlink*='myorder']").click();
    await page.locator("tbody").waitFor();
    const orderRow = await page.locator("tbody tr"); 
    for (let i=0; i< await orderRow.count(); i++)
    {
        const rowOrdID = await orderRow.nth(i).locator("th").textContent();
        if (response.OrderNum.includes(rowOrdID))
        {
            console.log("This is the Order ID: "+rowOrdID);
            expect(response.OrderNum).toContain(rowOrdID);
            await orderRow.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIDDetailsPage = await page.locator(".col-text").textContent();
    expect(response.OrderNum.includes(orderIDDetailsPage)).toBeTruthy();
    console.log(orderIDDetailsPage);
    });

