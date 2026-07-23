import { BasePage } from "@/page-objects/base-page";
import { CartItem } from "@/page-objects/element-containers/cart-item";

export class CartPage extends BasePage {
    readonly root = this.page.getByTestId("cart-contents-container");
    readonly items = new CartItem(this.root.getByTestId("inventory-item"));
    readonly checkoutButton = this.root.getByTestId("checkout");

    getItemByName(name: string): CartItem {
        return this.items.filter({ hasText: name });
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
