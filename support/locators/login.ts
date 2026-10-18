import { Page } from "@playwright/test";


export function createLoginLocators(page: Page) {
    return {
        email: page.getByPlaceholder("Email"),
        password: page.getByPlaceholder("Password"),
        signInButton: page.getByRole('button', { name: 'SIGN IN' })
    }
}

export type LoginLocators = ReturnType<typeof createLoginLocators>
