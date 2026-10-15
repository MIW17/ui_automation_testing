import {Page} from "@playwright/test";
import {createDashBoardLocators, DashboardLocators} from "../locators/dashboard";


export interface IDashboardPage {

}

export class DashboardPage implements IDashboardPage {
    page: Page
    locators: DashboardLocators

    private constructor(page: Page, locators: DashboardLocators) {
        this.page = page
        this.locators = locators
    }

    public static async getDashboardPage(page: Page) {
        const locators = createDashBoardLocators(page)
        const dashBoardTitle = locators.pageHeading.title
        const allProductsLink = locators.bestSellers.allProducts

        await Promise.all([
            await dashBoardTitle.waitFor({ state: 'visible' }),
            await allProductsLink.waitFor({ state: 'visible' })
        ])

        return new DashboardPage(page, locators)
    }
}