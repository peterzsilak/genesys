import { BasePage } from "@/page-objects/base-page";
import { InventoryItem } from "@/page-objects/element-containers/inventory-item";

export class InventoryPage extends BasePage {
    readonly root = this.page.getByTestId("inventory-container");
    readonly items = new InventoryItem(this.root.getByTestId("inventory-item"));

    getItemByName(name: string): InventoryItem {
        return this.items.filter({ hasText: name });
    }
}
