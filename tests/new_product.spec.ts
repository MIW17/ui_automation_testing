// specs không thể import từ specs khác
import { test, expect, Page} from '@playwright/test';
// import { login } from '../scripts/common_page';
import { LoginPage } from '../scripts/pages/login_page';
import { NewProductPage } from '../scripts/pages/new_product_page';

let loginPage: LoginPage; // khai báo biến
let newProductPage: NewProductPage;

test.beforeEach(async({page}) => {
  loginPage = new LoginPage(page);
  // get cái page vào một lần thay vì phải gọi page mỗi lần viết test
  newProductPage = new NewProductPage(page);
})


test("Verify user acccess to new product page successfully", async ({ page }) => {
    // await loginPage.login(loginPage.username, loginPage.password); 
    await loginPage.adminLogin();
    await newProductPage.clickMenuByLabel("New Product");
    let xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`
    await expect(page.locator(xpathHeading)).toBeVisible();
});
