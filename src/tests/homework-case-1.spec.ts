import { testTags } from "@/config/test-tags";
import { expect, test } from "@/fixtures/page-init.fixture";
import { aCheckoutInfo } from "@/test-data/checkout-info.builder";

const backpackName = "Sauce Labs Backpack";
const fleeceJacketName = "Sauce Labs Fleece Jacket";

test.describe("Case 1 - Automate purchase process", () => {
    test.use({ username: "performance_glitch_user" });

    test(
        "purchases a backpack and a fleece jacket end to end",
        { tag: [testTags.regression, testTags.desktop] },
        async ({
            inventoryPage,
            headerPage,
            cartPage,
            checkoutInfoPage,
            checkoutSummaryPage,
            checkoutCompletePage,
        }) => {
            await inventoryPage.getItemByName(backpackName).addToCart();
            await inventoryPage.getItemByName(fleeceJacketName).addToCart();

            await expect(
                headerPage.cartBadge,
                "Cart badge should reflect both selected products",
            ).toHaveText("2");

            await headerPage.cartButton.click();

            await expect(
                cartPage.getItemByName(backpackName).root,
                "Backpack should appear once in the cart",
            ).toHaveCount(1);
            await expect(
                cartPage.getItemByName(fleeceJacketName).root,
                "Fleece Jacket should appear once in the cart",
            ).toHaveCount(1);

            await cartPage.checkout();
            await checkoutInfoPage.fillInfo(aCheckoutInfo().build());
            await checkoutInfoPage.continue();

            await expect(
                checkoutSummaryPage.getItemByName(backpackName).root,
                "Backpack should appear once in the order summary",
            ).toHaveCount(1);
            await expect(
                checkoutSummaryPage.getItemByName(fleeceJacketName).root,
                "Fleece Jacket should appear once in the order summary",
            ).toHaveCount(1);

            await checkoutSummaryPage.finish();

            await expect(
                checkoutCompletePage.header,
                "Order confirmation header should thank the user for the order",
            ).toHaveText("Thank you for your order!");
        },
    );
});
