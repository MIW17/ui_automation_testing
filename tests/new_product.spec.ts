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

test("Verify user create new product successfully", async ( { page }) => {
  await loginPage.adminLogin();
  await newProductPage.clickMenuByLabel("New Product");
  let xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`
  await expect(page.locator(xpathHeading)).toBeVisible();
  await newProductPage.inputTextByLabel("Name", "Giày Thể Thao Biti's Hunter Nam Màu Xanh Lá Cây");
  await newProductPage.inputTextByLabel("SKU", "HSM013100XLC");
  await newProductPage.inputTextByLabel("Price", "8000");
  await newProductPage.inputTextByLabel("Weight", "0.2");
  await newProductPage.selectDropdownByLable("Tax class", "Taxable Goods");
  await newProductPage.uploadProductImage("data/images/bitis_image.jpg");
  await newProductPage.inputTextByLabel("Quantity", "100");
  await newProductPage.inputTextByLabel("Url key", "giay-the-thao-biti-s-hunter-nam-mau-xanh-la-cay-hsm013100xlc");
  await newProductPage.inputTextByLabel("Meta title", "Giay Bitis");
  await newProductPage.inputTextByLabel("Meta keywords", "Bitis Nam xanh la");
  await newProductPage.inputTextAreaByLabel("Meta description", "Meta description description description");
  await newProductPage.selectDropdownByLable("Attribute group", "Default");
  await newProductPage.selectDropdownByLable("Color", "White");
  await newProductPage.selectDropdownByLable("Size", "SM");
  await newProductPage.selectRadioButtonByLable("Status", "Enabled");
  await newProductPage.selectRadioButtonByLable("Visibility", "Visible");
  await newProductPage.selectRadioButtonByLable("Manage stock?", "Yes");
  await newProductPage.selectRadioButtonByLable("Stock availability", "Yes");
  await newProductPage.clickButtonByLable("Save");
  await newProductPage.verifyPopUpMessage("Product saved successfully!");
});
