import {test, Page} from "@playwright/test";
import {LoginPage} from "../support/pages/login";
import {AppBar} from "../support/pages/appBar";

test.describe('Admin user', async () => {
    test('Login as Admin user', async ( {page }) => {
        await page.goto('http://localhost:3000/admin/login')
        const loginPage = await LoginPage.getLoginPage(page)
        const testData = {
            email: 'tony@gmail.com',
            password: 'Testing01'
        }
        await loginPage.adminLogin(
            testData.email,
            testData.password
        )

        const appBar = await AppBar.getAppBar(page)

        await appBar.logout()
    })
})