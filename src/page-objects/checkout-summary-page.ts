import { BasePage } from "./base-page";
import { CartItem } from "./element-containers/cart-item";

export class CheckoutSummaryPage extends BasePage {
    readonly root = this.page.getByTestId("checkout-summary-container");
    readonly items = new CartItem(this.root.getByTestId("inventory-item"));
    readonly finishButton = this.root.getByTestId("finish");

    getItemByName(name: string): CartItem {
        return this.items.filter({ hasText: name });
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }
}
