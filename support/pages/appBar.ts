import {AppBarLocators, createAppBarLocators} from "../locators/appBar";
import {Page, test} from "@playwright/test";
import {ILoginPage, LoginPage} from "./login";

export interface IAppBar {
    logout(): Promise<ILoginPage>
}

export class AppBar implements IAppBar {
    readonly page: Page
    readonly locators: AppBarLocators

    constructor(page: Page) {
        this.page = page
        this.locators = createAppBarLocators(page)
    }

    async logout(): Promise<ILoginPage> {
        return await test.step('Logout from Evershop', async () => {
            await this.locators.searchBar.waitFor({ state: 'visible' })

            await this.locators.userProfile.profileDropdown.click()
            await this.locators.userProfile.logoutButton.click()

            return new LoginPage(this.page)
        })
    }
}