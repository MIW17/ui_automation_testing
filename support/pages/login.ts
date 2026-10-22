import {Page, test} from "@playwright/test";
import {createLoginLocators, LoginLocators} from "../locators/login";
import {IMenu, Menu} from "./menu";


export interface ILoginPage {
    adminLogin(email: string, password: string): Promise<IMenu>
}

export class LoginPage implements ILoginPage {
    readonly page: Page
    readonly locators: LoginLocators

    constructor(page: Page) {
        this.page = page
        this.locators = createLoginLocators(page)
    }

    // public static async getLoginPage(page: Page): Promise<ILoginPage> {
    //      const locators = createLoginLocators(page)
    //
    //     // Playwright automatically waits and throws a TimeoutError if not visible
    //     await locators.signInButton.waitFor({ state: 'visible' })
    //
    //     return new LoginPage(page)
    // }

    async adminLogin(email: string, password: string): Promise<IMenu> {
        return test.step('Fill in valid user credentials', async () => {
            await this.locators.email.fill(email)
            await this.locators.password.fill(password)
            await this.locators.signInButton.click()

            return Menu.getMenu(this.page)
        })
    }
}