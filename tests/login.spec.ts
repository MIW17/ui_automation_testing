import {test, expect, Page } from '@playwright/test';

async function inputTextByLabel(page: Page, label: string, value: string) {
  let xpath = `(//label[normalize-space(text())="${label}"]/following::input)[1]`;
  await page.locator(xpath).fill(value);
}

async function verifyErrorMessageByLabel(page: Page, fieldName: string, errorMessage: string) {
  // //label[text()='Email']/following-sibling::div//span[normalize-space(text())= 'This field can not be empty']
    let xpath = `//label[text()='${fieldName}']/following-sibling::div//span[normalize-space(text())='${errorMessage}']`;
    let error = await page.locator(xpath).textContent();
    return error;
    // await expect(page.locator(xpath)).toBeVisible(); 
    // Nếu chèn expect trong function thì test script sẽ không rõ ràng (không thấy phần verify)
}

async function login(page: Page, username: string, password: string) {
  await page.goto("http://localhost:3000/admin/login");
  await inputTextByLabel(page, "Email", username);
  await inputTextByLabel(page, "Password", password);
}

test("Log in to Evershop page successfully", async ({ page }) => {
  // If we want to know whether should we use await or not, hover to the function, if it return promises --> use await
  await login(page, "tony@gmail.com", "17101406");
  // await page.goto("http://localhost:3000/admin/login"); (DRY)
  // Evershop ở đây không cần click mới fill được
  // await inputTextByLabel(page, "Email", "tony@gmail.com"); (DRY)
  // await inputTextByLabel(page, "Password", "17101406"); (DRY)
  // await page.getByPlaceholder("Email").fill("tony@gmail.com");
  // await page.getByPlaceholder("Password").fill("17101406");
  await page.getByRole("button", { name: "SIGN IN"}).click();
  await expect(page.getByRole("heading", { name: "Dashboard"})).toBeVisible();
});

test("Log in to Evershop page fail with empty email and password", async ({ page }) => {
  await page.goto("http://localhost:3000/admin/login");
  await page.getByRole("button", { name: "SIGN IN"}).click();

  await expect(await verifyErrorMessageByLabel(page, "Email", "This field can not be empty")).toBe("This field can not be empty");
  await expect(await verifyErrorMessageByLabel(page, "Password", "This field can not be empty")).toBe("This field can not be empty");
});

// test("Log in to Evershop page fail", async ({ page }) => {
//   await page.getByPlaceholder("Email").fill("tony@gmail.com");
//   await page.getByPlaceholder("Password").fill("12345678");
//   await page.getByRole("button", { name: "SIGN IN"}).click();
//   await expect(page.getByText("Invalid email or password")).toBeVisible();
// });