import { test, expect } from '@playwright/test';

// Remember: always use async()
// JavaScript allow writing test like this, but TypeScript does not
// test('my test', async (fixture) => {
//   await fixture.page.goto('https://playwright.dev/');

// });

// beforeAll does not support page, context
// we usually use it with browser
test.beforeAll("Before all tests", async({browser, browserName}) => {
  console.log("Proceed before all tests")
});

test.beforeEach("Before each test case", async({page}) => {
  console.log("Proceed before each test case")
});

test.afterAll("After all tests", async({browser, browserName}) => {
  console.log("Proceed after all tests")
});

test.afterEach("After each test case", async({page}) => {
  console.log("Proceed after each test case")
})

test('my test', async ({ page, context, browser, browserName, request }) => {
  await page.goto('https://playwright.dev/');
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
