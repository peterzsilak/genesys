import { BasePage } from "./base-page";

export class FooterPage extends BasePage {
    readonly root = this.page.getByTestId("footer");
    readonly copyright = this.root.getByTestId("footer-copy");

    async scrollIntoView(): Promise<void> {
        await this.root.scrollIntoViewIfNeeded();
    }
}
