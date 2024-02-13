import {test} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/");
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

test ('first test',async ({page})=>{
    await page.locator('input').first().click()


})

test ('user facing elements',async ({page})=>{
    await page.getByRole('textbox', {name:'Email'}).first().click()
    //clicks on input even when searching for label
    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTitle('IoT Dashboard').click()

})
test ('child elements',async ({page})=>{

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()


})