import type { CheckoutInfo } from "../test-data/checkout-info";
import { BasePage } from "./base-page";

export class CheckoutInfoPage extends BasePage {
    readonly root = this.page.getByTestId("checkout-info-container");
    readonly firstNameInput = this.root.getByTestId("firstName");
    readonly lastNameInput = this.root.getByTestId("lastName");
    readonly postalCodeInput = this.root.getByTestId("postalCode");
    readonly continueButton = this.root.getByTestId("continue");

    async fillInfo(info: CheckoutInfo): Promise<void> {
        await this.firstNameInput.fill(info.firstName);
        await this.lastNameInput.fill(info.lastName);
        await this.postalCodeInput.fill(info.postalCode);
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }
}
