const {test, expect} = require('@playwright/test');
const { timeout } = require('../playwright.config');


test('Browser Context Playwright test', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://github.com/sk4835/PlayWrightTutorial");
    console.log(await page.title());
    await expect(page).toHaveTitle("GitHub - sk4835/PlayWrightTutorial");

});

test('Page Playwright test', async ({page})=> 
    {
        await page.goto("https://google.com");
        //get title and put an assertion to validate it is correct
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");

    
    });