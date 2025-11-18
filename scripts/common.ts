import { test, expect, Page} from '@playwright/test';

export async function inputTextByLabel(page: Page, label: string, value: string) {
  let xpath = `(//label[normalize-space(text())="${label}"]/following::input)[1]`;
  await page.locator(xpath).fill(value);
}

export async function login(page: Page, username: string, password: string) {
  await page.goto("http://localhost:3000/admin/login");
  await inputTextByLabel(page, "Email", username);
  await inputTextByLabel(page, "Password", password);
  await page.getByRole("button", { name: "SIGN IN"}).click();
}