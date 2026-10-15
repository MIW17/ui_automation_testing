import {Page, test} from "@playwright/test";
import {createLoginLocators, LoginLocators} from "../locators/login";
import {DashboardPage, IDashboardPage} from "./dashboard";


export interface ILoginPage {
    adminLogin(email: string, password: string): Promise<IDashboardPage>
}

export class LoginPage implements ILoginPage {
    page: Page
    locators: LoginLocators

    private constructor(page: Page, locators: LoginLocators) {
        this.page = page
        this.locators = locators
    }

    public static async getLoginPage(page: Page): Promise<ILoginPage> {
        const locators = createLoginLocators(page)

        // Playwright automatically waits and throws a TimeoutError if not visible
        await locators.signInButton.waitFor({ state: 'visible' })

        return new LoginPage(page, locators)
    }

    async adminLogin(email: string, password: string): Promise<IDashboardPage> {
        return test.step('Fill in valid user credentials', async () => {
            await this.locators.email.fill(email)
            await this.locators.password.fill(password)
            await this.locators.signInButton.click()

            return DashboardPage.getDashboardPage(this.page)
        })
    }
}