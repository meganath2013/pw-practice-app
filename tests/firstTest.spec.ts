import {test,expect} from '@playwright/test';

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
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()


})

//{name:,hasText:, has:}

test ('parent elements',async ({page})=>{

    await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'}).click()
    await page.locator('nb-card',{has: page.locator("#inputEmail1")}).getByRole('textbox',{name:'Email'}).click()

    await page.locator('nb-card').filter({hasText:"Basic Form"}).getByRole('textbox',{name:"Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:"Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click()  

})

test ('Reusing locators',async ({page})=>{


    const basicForm= page.locator('nb-card').filter({hasText:"Basic Form"})
    const emailField=basicForm.getByRole('textbox',{name:'Email'})
    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox',{name:'Password'}).fill('Welcome123')

    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    //assertion

    await expect(emailField).toHaveValue('test@test.com')
 

})

test ('Extracting values',async ({page})=>{

    //single text value
    const basicForm= page.locator('nb-card').filter({hasText:"Basic Form"})

    const buttonText =await basicForm.locator('button').textContent();
    expect(buttonText).toEqual('Submit')

    // multiple text values
    const allRadioButtonLabels= await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")

    //asserting input value
    const emailField = basicForm.getByRole('textBox',{name:"Email"})
    await emailField.fill('test@test.com')
    const emailValue= await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //asserting attribute values
    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email')

})