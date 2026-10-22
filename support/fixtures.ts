import { test as base, expect } from '@playwright/test'
import { LoginPage, ILoginPage } from './pages/login'
import {IMenu} from "./pages/menu";
import {AppBar} from "./pages/appBar";

// 1. Declare fixtures interface to be injected into test scripts
type AccessFixture = {
    login: (email: string, password: string) => Promise<IMenu>
    appBar: AppBar
    logout: () => Promise<ILoginPage>
}

// 2. Extend base test from Playwright
export const test = base.extend<AccessFixture>({
    login: async ({ page }, use) => {
        // Define login method inside fixture (already has 'page')
        const loginHelper = async (email: string, password: string) => {
            const loginPage = new LoginPage(page)
            return await loginPage.adminLogin(email, password)
        }

        await use(loginHelper) // PW will send out method loginHelper to test scripts
    },
    appBar: async ( { page }, use) => {
        await use(new AppBar(page))
    },
    logout: async ({ appBar }, use) => {
        const logoutHelper = async () => {
            return await appBar.logout()
        }

        await use(logoutHelper)
    }
})

// related to import { test as base, expect } from '@playwright/test'
// So in test script, we can import in 1 line:
// import {test, expect} from '../support/fixtures'
export { expect }
