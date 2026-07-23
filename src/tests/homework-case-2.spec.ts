import { testTags } from "@/config/test-tags";
import { expect, test } from "@/fixtures/page-init.fixture";

test.describe("Case 2 - Mandatory field error", () => {
    test(
        "shows the username-required error when logging in with empty fields",
        { tag: [testTags.regression, testTags.desktop] },
        async ({ loginPage }) => {
            await loginPage.loginButton.click();

            await expect(
                loginPage.errorMessage,
                "Empty login should surface the mandatory username error",
            ).toHaveText("Epic sadface: Username is required");
        },
    );
});

test.describe("Case 2 - Footer content", () => {
    test.use({ username: "standard_user" });

    test(
        "shows the copyright year and terms of service in the footer",
        { tag: [testTags.regression, testTags.desktop] },
        async ({ footerPage }) => {
            await footerPage.scrollIntoView();

            await expect(
                footerPage.copyright,
                "Footer should display the Sauce Labs copyright line with the year",
            ).toContainText(/© \d{4} Sauce Labs\. All Rights Reserved\./);
            await expect(
                footerPage.copyright,
                "Footer should reference the Terms of Service",
            ).toContainText("Terms of Service");
        },
    );
});
