import { BasePage } from "./base-page";

export class HeaderPage extends BasePage {
    readonly root = this.page.getByTestId("header-container");
    readonly cartButton = this.root.getByTestId("shopping-cart-link");
    readonly cartBadge = this.root.getByTestId("shopping-cart-badge");
}
