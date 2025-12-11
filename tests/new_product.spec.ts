// specs không thể import từ specs khác
import { test, expect, Page, request as apiRequest} from '@playwright/test';
// import { login } from '../scripts/common_page';
import { LoginPage } from '../scripts/pages/login_page';
import { NewProductPage } from '../scripts/pages/new_product_page';
import { ProductsPage } from '../scripts/pages/products_page';

let loginPage: LoginPage; // khai báo biến
let newProductPage: NewProductPage;
let productsPage: ProductsPage;
// let productIds: string[] = []; → CẢI TIẾN
let productIds: ProductId[] = [];
type ProductId = {
  key: string
  value: string
};

let cookieHeader: string;
// Ở đây mình cho nó thành list of string luôn → tưởng tượng lỡ có 20 product thì chẳng lẽ tạo 20 biến productId
// Nên mình biến nó thành list luôn để tạo nơi chứa rồi cứ push ID vào là được

// PHẢI NHỚ CHỖ NÀY
test.beforeEach(async({page}) => {
  loginPage = new LoginPage(page);
  // get cái page vào một lần thay vì phải gọi page mỗi lần viết test
  newProductPage = new NewProductPage(page);
  productsPage = new ProductsPage(page);
  await loginPage.adminLogin();
  cookieHeader = await loginPage.getCookieHeader();
});

test.afterEach(async({page}) => {
  // for (let productId of productIds) {
  // await productsPage.deleteProduct(productId, cookieHeader);
  let currentProductId = productIds.find(p => p.key == test.info().title);
  if (currentProductId) {
    await productsPage.deleteProduct(currentProductId.value, cookieHeader)
  }
});


test("Verify user acccess to new product page successfully", async ({ page }) => {
    // await loginPage.login(loginPage.username, loginPage.password); 
    await newProductPage.clickMenuByLabel("New Product");
    let xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`
    await expect(page.locator(xpathHeading)).toBeVisible();
});

test("Verify user create new product successfully", async ( { page }) => {
  let random = new Date().getTime();
  // Ngoài việc random id sản phẩm → cần xử lý data rác mình tạo ra nữa.
  await newProductPage.clickMenuByLabel("New Product");

  // Cái heading này thì mỗi page nó unique rồi nên đưa nó qua chỗ khác cũng được
  // let xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`
  
  await expect(page.locator(newProductPage.xpathHeading)).toBeVisible();
  let productName = `Giày Thể Thao Biti's Hunter Nam Màu Xanh Lá Cây - ${random}`
  await newProductPage.inputTextByLabel("Name", productName);
  let sku = `SKU-${random}`
  await newProductPage.inputTextByLabel("SKU", sku); 
  // đối với những input cần unique ID --> Nếu sau một lần tạo thì nó sẽ trùng lặp data cho lần test sau → test fail
  // vậy thì input bằng Date().getTime
  await newProductPage.inputTextByLabel("Price", "8000");
  await newProductPage.inputTextByLabel("Weight", "0.2");
  await newProductPage.selectDropdownByLable("Tax class", "Taxable Goods");
  await newProductPage.uploadProductImage("data/images/bitis_image.jpg");
  await newProductPage.inputTextByLabel("Quantity", "100");
  await newProductPage.inputTextByLabel("Url key", `giay-the-thao-biti-s-hunter-nam-mau-xanh-la-cay-${random}`);
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
  // Tuy test case Create Product đã thành công → nhưng mình cần view sản phẩm đó lên mới xác minh rằng
  // Sản phẩm đã thực sự tạo và data trả về thật sự
  // Chúng ta cần double check data input vào đã đúng hay chưa? Bằng cách search nó 
  await newProductPage.clickMenuByLabel("Products");
  await expect(page.locator(productsPage.xpathHeading)).toBeVisible();
  await productsPage.searchInComponentByValue(`${random}`);
  await page.getByText(productName).click();
  let productId: ProductId = {
    key: test.info().title,
    value: productsPage.getIdFromUrl()
  };
  // productIds.push(productsPage.getIdFromUrl());
  await expect(page.getByText(`Editing ${productName}`)).toBeVisible();
  await expect(page.getByText(productName)).toBeVisible();
  expect(await productsPage.getInputValueByLabel("Name")).toEqual(productName); // ko cần thực hiện hành động nên không cần await
  expect(await productsPage.getInputValueByLabel("SKU")).toEqual(sku);
});

test("Verify user create new product successfully 02", async ( { page }) => {
  let random = new Date().getTime() + 1;
  // Ngoài việc random id sản phẩm → cần xử lý data rác mình tạo ra nữa.
  await newProductPage.clickMenuByLabel("New Product");

  // Cái heading này thì mỗi page nó unique rồi nên đưa nó qua chỗ khác cũng được
  // let xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`
  
  await expect(page.locator(newProductPage.xpathHeading)).toBeVisible();
  let productName = `Giày Thể Thao Biti's Hunter Nam Màu Xanh Lá Cây - ${random}`
  await newProductPage.inputTextByLabel("Name", productName);
  let sku = `SKU-${random}`
  await newProductPage.inputTextByLabel("SKU", sku); 
  // đối với những input cần unique ID --> Nếu sau một lần tạo thì nó sẽ trùng lặp data cho lần test sau → test fail
  // vậy thì input bằng Date().getTime
  await newProductPage.inputTextByLabel("Price", "8000");
  await newProductPage.inputTextByLabel("Weight", "0.2");
  await newProductPage.selectDropdownByLable("Tax class", "Taxable Goods");
  await newProductPage.uploadProductImage("data/images/bitis_image.jpg");
  await newProductPage.inputTextByLabel("Quantity", "100");
  await newProductPage.inputTextByLabel("Url key", `giay-the-thao-biti-s-hunter-nam-mau-xanh-la-cay-${random}`);
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
  // Tuy test case Create Product đã thành công → nhưng mình cần view sản phẩm đó lên mới xác minh rằng
  // Sản phẩm đã thực sự tạo và data trả về thật sự
  // Chúng ta cần double check data input vào đã đúng hay chưa? Bằng cách search nó 
  await newProductPage.clickMenuByLabel("Products");
  await expect(page.locator(productsPage.xpathHeading)).toBeVisible();
  await productsPage.searchInComponentByValue(`${random}`);
  await page.getByText(productName).click();
  let productId: ProductId = {
    key: test.info().title,
    value: productsPage.getIdFromUrl()
  };
  // productIds.push(productsPage.getIdFromUrl());
  await expect(page.getByText(`Editing ${productName}`)).toBeVisible();
  await expect(page.getByText(productName)).toBeVisible();
  expect(await productsPage.getInputValueByLabel("Name")).toEqual(productName); // ko cần thực hiện hành động nên không cần await
  expect(await productsPage.getInputValueByLabel("SKU")).toEqual(sku);
});


// Nếu muốn test việc edit product, mình dùng API Post tạo product rồi test UI cái việc edit product
// Thay vì phải làm y như trên rồi mới edit product