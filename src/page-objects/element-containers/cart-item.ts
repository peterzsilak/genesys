import { ElementContainer } from "./element-container";

export class CartItem extends ElementContainer<CartItem> {
    readonly name = this.root.getByTestId("inventory-item-name");
    readonly removeButton = this.root.getByRole("button", { name: "Remove" });

    async remove(): Promise<void> {
        await this.removeButton.click();
    }
}
