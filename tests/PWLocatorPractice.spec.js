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

    test.only("Calendar practice", async ({page}) => {

        const monthNum = "07";
        const day = "14";
        const year = "2024"

        const calendarWrapper = page.locator(".react-date-picker__inputGroup");
        
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await page.waitForLoadState("domcontentloaded");
        
        await calendarWrapper.click();
        await page.locator(".react-calendar__navigation__label__labelText").click();
        await page.locator(".react-calendar__navigation__label__labelText").click();
        await page.getByText(year).click();
        await page.locator(".react-calendar__year-view__months__month").nth(monthNum-1).click();
        await page.locator("//abbr[text()='"+day+"']").click();      
        expect(await page.locator("input[type='date']")).toHaveValue(year+"-"+monthNum+"-"+day);
    });

    test("Popup Validation", async ({page}) => {

        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        // await page.goto("https://www.google.com")
        // await page.goBack();
        // await page.goForward();
        await page.on('dialog', dialog => dialog.accept());


    })