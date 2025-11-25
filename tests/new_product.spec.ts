// specs không thể import từ specs khác
import { test, expect, Page} from '@playwright/test';
import { login } from '../scripts/common';
import { LoginPage } from '../scripts/pages/login_page';

let loginPage: LoginPage; // khai báo biến

test.beforeEach(async({page}) => {
  loginPage = new LoginPage(page);
  // get cái page vào một lần thay vì phải gọi page mỗi lần viết test
})

async function clickMenuByLabel(page: Page, label: string) {
    // let xpath = `//a[normalize-space(text())='${label}']`;
    // Đối với menu, hoặc khi mình muốn test ấn vào một khu vực nào đó, thì nên chỉ định thêm rõ area của nó
    let xpath = `//div[contains(concat(' ',normalize-space(@class),' '),' admin-nav ')]//a[normalize-space(text())='${label}']`;
    await page.locator(xpath).click();
}

test("Verify user acccess to new product page successfully", async ({ page }) => {
    // await loginPage.login(loginPage.username, loginPage.password); 
    await loginPage.adminLogin();
    await clickMenuByLabel(page, "New Product");
    let xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`
    await expect(page.locator(xpathHeading)).toBeVisible();
});
