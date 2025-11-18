import {test, expect, Page } from '@playwright/test';

async function inputTextByLabel(page: Page, label: string, value: string) {
  let xpath = `(//label[normalize-space(text())="${label}"]/following::input)[1]`;
  await page.locator(xpath).fill(value);
}

test("Log in to Evershop page successfully", async ({ page }) => {
  // If we want to know whether should we use await or not, hover to the function, if it return promises --> use await
  await page.goto("http://localhost:3000/admin/login");
  // Evershop ở đây không cần click mới fill được
  await inputTextByLabel(page, "Email", "tony@gmail.com");
  await inputTextByLabel(page, "Password", "17101406");
  // await page.getByPlaceholder("Email").fill("tony@gmail.com");
  // await page.getByPlaceholder("Password").fill("17101406");
  await page.getByRole("button", { name: "SIGN IN"}).click();
  await expect(page.getByRole("heading", { name: "Dashboard"})).toBeVisible();
});

async function verifyErrorMessage(page: Page, fieldName: string, errorMessage: string) {
    let xpath = `//label[text()='${fieldName}']/following-sibling::div//span[text()='${errorMessage}']`;
    await expect(page.locator(xpath)).toBeVisible(); 
}

test("Log in to Evershop page fail with empty email and password", async ({ page }) => {
  await page.goto("http://localhost:3000/admin/login");
  await page.getByRole("button", { name: "SIGN IN"}).click();

  await verifyErrorMessage(page, "Email", "This field can not be empty");
  await verifyErrorMessage(page, "Password", "This field can not be empty");

});

// test("Log in to Evershop page fail", async ({ page }) => {
//   await page.getByPlaceholder("Email").fill("tony@gmail.com");
//   await page.getByPlaceholder("Password").fill("12345678");
//   await page.getByRole("button", { name: "SIGN IN"}).click();
//   await expect(page.getByText("Invalid email or password")).toBeVisible();
// });