import {createMenuLocators, MenuLocators} from "../locators/menu";
import {Page} from "@playwright/test";

export interface IMenu {

}

export class Menu implements IMenu {
    page: Page
    locators: MenuLocators

    private constructor (page: Page, locators: MenuLocators) {
        this.page = page
        this.locators = locators
    }

    public static async getMenu(page: Page) {
        const locators = createMenuLocators(page)

        return new Menu(page, locators)
    }

}