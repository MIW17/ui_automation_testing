// // Motivation: vì lúc viết test lúc nào cũng dùng page → sinh ra khái niệm Page Object
//
// import { Page } from "@playwright/test";
// import { CommonPage } from "../common_page";
//
// // Lưu ý: Sau khi biến common_page thành class CommonPage rồi
// // Thì thằng CommonPage là class cha của LoginPage
// // Mình dùng extends
// // Như vậy là không cần khai báo lại page và constructor(page: Page) {}
// // export class LoginPage {
//   export class LoginPage extends CommonPage {
//     // page: Page // we need `constructor`
//     // Thêm biến constant để khai báo username và password
//     readonly username = ADMIN_USER_NAME;
//     readonly password = ADMIN_PASSWORD;
//     // Nhưng mà như vậy thì chẳng lẽ ghi trong test là: await loginPage.login(loginPage.username, loginPage.password);
//     // Như vậy dài và xấu
//     constructor(page: Page) { // → khai báo biến page là một thuộc tính của class này
//         // this.page = page; // this.page: page mình đang xét trong này → = page: page này là page mình dùng ở bên test
//         super(page);
//     }
//
//     // Bây giờ mình đưa hàm login từ common.ts vào
//     async login(username: string, password: string) {
//       await this.page.goto(UI_ADMIN_PATH);
//       await this.inputTextByLabel("Email", username);
//       await this.inputTextByLabel("Password", password);
//       await this.page.getByRole("button", { name: "SIGN IN"}).click();
//     }
//
//     // Để tránh câu chuyện await loginPage.username và loginPage.password
//     async adminLogin() {
//       await this.login(this.username, this.password);
//     }
// }