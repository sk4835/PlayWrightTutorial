const {test, expect} = require('@playwright/test');

    
test('Playright Special Locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    //await page.getByPlaceholder("Password").pressSequentially("PA$$W@rd", 100);
    await page.getByPlaceholder("Password").fill("PA$$W@rd");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText(" The Form has been submitted successfully!. ").isVisible();
    await page.getByRole("link",{name: "Shop"}).click();

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    console.log(await page.locator(".nav-item a").filter({hasText: "Checkout"}).textContent());
    expect(await page.locator(".nav-item a").filter({hasText: "Checkout"})).toHaveText(/Checkout \( 1 \)/);



    });