import { test, expect, Page, request as apiRequest} from '@playwright/test';
import { LoginPage } from '../scripts/pages/login_page';
import { NewProductPage } from '../scripts/pages/new_product_page';
import { ProductsPage } from '../scripts/pages/products_page';

import newProductTemplate from '../data/products/new_product_template.json';

let loginPage: LoginPage; // khai báo biến
let newProductPage: NewProductPage;
let productsPage: ProductsPage;
let productIds: ProductId[] = [];
type ProductId = {
  key: string
  value: string
};

let cookieHeader: string;

test.beforeEach(async({page}) => {
  loginPage = new LoginPage(page);
  newProductPage = new NewProductPage(page);
  productsPage = new ProductsPage(page);
  await loginPage.adminLogin();
  cookieHeader = await loginPage.getCookieHeader();
});

test.afterEach(async({page}) => {
  let currentProductId = productIds.find(p => p.key == test.info().title);
  if (currentProductId) {
    await productsPage.deleteProduct(currentProductId.value, cookieHeader)
  }
});

test("Verify user edit existing product successfully", async ({ page }) => {
    let random = new Date().getTime();
    let productName = `Giày Thể Thao Biti's Hunter Nam Màu Xanh Lá Cây - ${random}`;
    let sku = `SKU-${random}`;
    let urlKey = `giay-the-thao-biti-s-hunter-nam-mau-xanh-la-cay-${random}`; 
    newProductTemplate.name = productName;
    newProductTemplate.sku = sku;
    newProductTemplate.url_key = urlKey;
    let response = await newProductPage.createProduct(newProductTemplate, cookieHeader);
    await expect(response).toBeOK();
    let responseBody = await response.json();
    let productId: ProductId = {
        key: test.info().title,
        value: responseBody.data.uuid
      };
    productIds.push(productId);
    // Tới đây lấy lại chỗ bên new_prouduct_pages.ts
    await newProductPage.clickMenuByLabel("Products");
    await expect(page.locator(productsPage.xpathHeading)).toBeVisible();
    await productsPage.searchInComponentByValue(`${random}`);
    await page.getByText(productName).click();
    await expect(page.getByText(`Editing ${productName}`)).toBeVisible();
    // Giả sử giờ mình Edit giá tiền
    await newProductPage.inputTextByLabel("Price", "10000");
    await newProductPage.clickButtonByLable("Save");
    await newProductPage.verifyPopUpMessage("Product saved successfully!");
    // Edit status
    await newProductPage.clickMenuByLabel("Products");
    await expect(page.locator(productsPage.xpathHeading)).toBeVisible();
    await productsPage.searchInComponentByValue(`${random}`);
    await page.getByText(productName).click();
    await expect(page.getByText(`Editing ${productName}`)).toBeVisible();
    await newProductPage.selectRadioButtonByLable("Status", "Enabled");
    await newProductPage.clickButtonByLable("Save");
    await newProductPage.verifyPopUpMessage("Product saved successfully!");
});