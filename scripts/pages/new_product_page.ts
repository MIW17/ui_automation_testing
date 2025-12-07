import { Page } from "@playwright/test";
import { CommonPage } from "../common_page";
import path from "path";

export class NewProductPage extends CommonPage {
    readonly xpathHeading = `//h1[normalize-space(text()) = "Create a new product"]`;
    // khai báo trong class thì không cần let
    constructor(page: Page) {
        super(page);
    }

    // Ở đây không viết hàm chung trong common_page nên mình không cần bắt theo xpath cũng được
    async uploadProductImage(filePath: string) {
        await this.page.locator('#images input').setInputFiles(path.join(process.cwd(), filePath));
    }
    // __dirname: Là biến toàn cục, nó xét tới cái file đang được thự thi
    // process.cwd(): xét tới cái current working directory (là cái repo đang làm)
}