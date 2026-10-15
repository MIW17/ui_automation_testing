import {AppBarLocators, createAppBarLocators} from "../locators/appBar";
import {Page, test} from "@playwright/test";
import {ILoginPage, LoginPage} from "./login";

export interface IAppBar {
    logout(): Promise<ILoginPage>
}

export class AppBar implements IAppBar {
    page: Page
    locators: AppBarLocators

    private constructor(page: Page, locators: AppBarLocators) {
        this.page = page
        this.locators = locators
    }

    public static async getAppBar(page: Page) {
        const locators = createAppBarLocators(page)
        await locators.searchBar.waitFor({ state: 'visible' })

        return new AppBar(page, locators)
    }

    async logout(): Promise<ILoginPage> {
        return await test.step('Logout from Evershop', async () => {
            await this.locators.userProfile.profileDropdown.click()
            await this.locators.userProfile.logoutButton.click()
            return LoginPage.getLoginPage(this.page)
        })
    }
}