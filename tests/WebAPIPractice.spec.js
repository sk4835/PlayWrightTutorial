const {test, expect, request} = require('@playwright/test');
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


// It is greate to use API to help tests become more robust.
// In this example we'll use log in API to make this more efficient, aassuming Log in functionality is already tested in another TC 
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