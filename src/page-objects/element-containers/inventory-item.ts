import { ElementContainer } from "@/page-objects/element-containers/element-container";

export class InventoryItem extends ElementContainer<InventoryItem> {
    readonly name = this.root.getByTestId("inventory-item-name");
    readonly price = this.root.getByTestId("inventory-item-price");
    readonly actionButton = this.root.locator("button.btn_inventory");

    async addToCart(): Promise<void> {
        await this.actionButton.click();
    }
}
