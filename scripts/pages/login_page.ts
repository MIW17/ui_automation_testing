// Motivation: vì lúc viết test lúc nào cũng dùng page → sinh ra khái niệm Page Object

import { Page } from "@playwright/test";
import { inputTextByLabel } from "../common";

export class LoginPage {
    page: Page // we need `constructor` 
    // Thêm biến constant để khai báo username và password
    readonly username = "tony@gmail.com";
    readonly password = "17101406";
    // Nhưng mà như vậy thì chẳng lẽ ghi trong test là: await loginPage.login(loginPage.username, loginPage.password);
    // Như vậy dài và xấu
    constructor(page: Page) { // → khai báo biến page là một thuộc tính của class này
        this.page = page; // this.page: page mình đang xét trong này → = page: page này là page mình dùng ở bên test
    }

    // Bây giờ mình đưa hàm login từ common.ts vào
    async login(username: string, password: string) {
      await this.page.goto("http://localhost:3000/admin/login");
      await inputTextByLabel(this.page, "Email", username);
      await inputTextByLabel(this.page, "Password", password);
      await this.page.getByRole("button", { name: "SIGN IN"}).click();
    }

    // Để tránh câu chuyện await loginPage.username và loginPage.password
    async adminLogin() {
      await this.login(this.username, this.password);
    }
}