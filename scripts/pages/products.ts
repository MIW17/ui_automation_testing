import { Page } from "@playwright/test";
import { CommonPage } from "../common_page";
import path from "path";

export class ProductsPage extends CommonPage {
    readonly xpathHeading = `//h1[normalize-space(text()) = "Products"]`;
    // khai báo trong class thì không cần let
    constructor(page: Page) {
        super(page); // gọi super(page) trước rồi muốn làm gì làm
        this.searchComponentLocator = '#keyword';
    }
}