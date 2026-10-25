import { Page } from '@playwright/test'

export function createMenuLocators(page: Page) {
    return {
        quickLinks: {
            dashboard: page.locator('a[href$="/admin"]'),
            newProduct: page.locator('a[href$="/products/new"]'),
            newCoupon: page.locator('a[href$="/coupon/new"]')
        },
        catalog: {
            products: page.locator('a[href$="/products"]'),
            categories: page.locator('a[href$="/categories"]'),
            collections: page.locator('a[href$="/collections"]'),
            attributes: page.locator('a[href$="/attributes"]')
        },
        sale: {
            orders: page.locator('a[href$="/orders"]')
        },
        customer: {
            customers: page.locator('a[href$="/customers"]')
        },
        promotion: {
            coupons: page.locator('a[href$="/coupons"]')
        },
        cms: {
            pages: page.locator('a[href$="/pages"]'),
            widgets: page.locator('a[href$="/widgets"]')
        },
        settings: page.locator('a[href$="/setting/store"]')
    }
}

export type MenuLocators = ReturnType<typeof createMenuLocators>