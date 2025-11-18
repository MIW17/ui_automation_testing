// specs không thể import từ specs khác
import { test, expect, Page} from '@playwright/test';
import { login } from '../scripts/common';

async function clickMenuByLabel(page: Page, label: string) {
    // let xpath = `//a[normalize-space(text())='${label}']`;
    // Đối với menu, hoặc khi mình muốn test ấn vào một khu vực nào đó, thì nên chỉ định thêm rõ area của nó
    let xpath = `//div[contains(concat(' ',normalize-space(@class),' '),' admin-nav ')]//a[normalize-space(text())='${label}']`;
    await page.locator(xpath).click();
}

test("Create new product", async ({ page }) => {
    await login(page, "tony@gmail.com", "17101406");
    await clickMenuByLabel(page, "New Product");
    let xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`
    await expect(page.locator(xpathHeading)).toBeVisible();
});
