import {Page} from '@playwright/test'

export function createDashBoardLocators(page: Page) {
    return {
        pageHeading: {
            title: page.locator('.page-heading-title')
                .filter( {
                    hasText: 'Dashboard'
                }
            )
        },
        saleStatistics: {
            chartTitle: page.getByText('Sales Statistics'),
            daily: page.getByRole('link', { name: 'Daily' }),
            weekly: page.getByRole('link', { name: 'Weekly' }),
            monthly: page.getByRole('link', { name: 'Monthly' })
        },
        bestSellers: {
            allProducts: page.getByRole('link', { name: 'All Products' })
        }
    }
}

export type DashboardLocators = ReturnType<typeof createDashBoardLocators>