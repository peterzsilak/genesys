import { BasePage } from "@/page-objects/base-page";

export class CheckoutCompletePage extends BasePage {
    readonly root = this.page.getByTestId("checkout-complete-container");
    readonly header = this.root.getByTestId("complete-header");
}
