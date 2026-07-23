import { BasePage } from "@/page-objects/base-page";
import type { FrameLocator } from "@playwright/test";

export class Guru99HomePage extends BasePage {
    readonly adImage = this.adFrame().locator("a").first();
    readonly testingMenu = this.page
        .locator("ul.gf-menu > li", { hasText: "Testing" })
        .first();
    readonly seleniumLink = this.testingMenu
        .locator("a", { hasText: "Selenium" })
        .first();

    private adFrame(): FrameLocator {
        return this.page.frameLocator("iframe[name='a077aa5e']");
    }

    async open(): Promise<void> {
        await this.page.goto("https://demo.guru99.com/test/guru99home/", {
            waitUntil: "domcontentloaded",
        });
    }

    async openTestingMenu(): Promise<void> {
        await this.testingMenu.hover();
    }
}
