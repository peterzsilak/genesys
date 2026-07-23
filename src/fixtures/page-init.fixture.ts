import { test as base, expect } from "@playwright/test";

import { getCredentialByUsername } from "@/config/credential-loader";
import { CartPage } from "@/page-objects/cart-page";
import { CheckoutCompletePage } from "@/page-objects/checkout-complete-page";
import { CheckoutInfoPage } from "@/page-objects/checkout-info-page";
import { CheckoutSummaryPage } from "@/page-objects/checkout-summary-page";
import { FooterPage } from "@/page-objects/footer-page";
import { HeaderPage } from "@/page-objects/header-page";
import { InventoryPage } from "@/page-objects/inventory-page";
import { LoginPage } from "@/page-objects/login-page";

export interface AuthOptions {
    username: string | undefined;
}

export interface SauceDemoPages {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    headerPage: HeaderPage;
    cartPage: CartPage;
    checkoutInfoPage: CheckoutInfoPage;
    checkoutSummaryPage: CheckoutSummaryPage;
    checkoutCompletePage: CheckoutCompletePage;
    footerPage: FooterPage;
}

export interface AuthFixtures {
    sauceDemoSession: undefined;
}

type CustomFixtures = AuthOptions & SauceDemoPages & AuthFixtures;

export const test = base.extend<CustomFixtures>({
    username: [undefined, { option: true }],

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    headerPage: async ({ page }, use) => {
        await use(new HeaderPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutInfoPage: async ({ page }, use) => {
        await use(new CheckoutInfoPage(page));
    },
    checkoutSummaryPage: async ({ page }, use) => {
        await use(new CheckoutSummaryPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },
    footerPage: async ({ page }, use) => {
        await use(new FooterPage(page));
    },

    sauceDemoSession: [
        async ({ page, username, loginPage }, use) => {
            await page.goto("/");
            if (username !== undefined) {
                await loginPage.authenticate(getCredentialByUsername(username));
            }
            await use(undefined);
        },
        { auto: true },
    ],
});

export { expect };
