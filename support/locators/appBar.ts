import {Page} from "@playwright/test";

export function createAppBarLocators(page: Page) {
    return {
        logoText: page.getByText('EVERSHOP'),
        searchBar: page.getByPlaceholder('Search'),
        userProfile: {
            profileDropdown: page.locator('.first-letter'),
            logoutButton: page.getByRole('link', { name: 'Logout' })
        }
    }
}

export type AppBarLocators = ReturnType<typeof createAppBarLocators>