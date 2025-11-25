import { Page } from "@playwright/test";
import { CommonPage } from "../common_page";

export class NewProductPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }
    async clickMenuByLabel(label: string) {
        // let xpath = `//a[normalize-space(text())='${label}']`;
        // Đối với menu, hoặc khi mình muốn test ấn vào một khu vực nào đó, thì nên chỉ định thêm rõ area của nó
        let xpath = `//div[contains(concat(' ',normalize-space(@class),' '),' admin-nav ')]//a[normalize-space(text())='${label}']`;
        await this.page.locator(xpath).click();
    }
}