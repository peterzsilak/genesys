import type { Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class RichTextEditorPage extends BasePage {
    readonly editor = this.page.locator(".ck-editor__editable_inline").first();
    private readonly boldButton = this.page.locator(
        '.ck-toolbar button.ck-button[data-cke-tooltip-text^="Bold"]',
    );
    private readonly underlineButton = this.page.locator(
        '.ck-toolbar button.ck-button[data-cke-tooltip-text^="Underline"]',
    );

    async open(): Promise<void> {
        await this.page.goto("https://onlinehtmleditor.dev", {
            waitUntil: "domcontentloaded",
        });
        await this.editor.waitFor({ state: "visible" });
        await this.editor.click();
        await this.clear();
    }

    async typeBold(text: string): Promise<void> {
        await this.boldButton.click();
        await this.page.keyboard.type(text);
        await this.boldButton.click();
    }

    async typeUnderline(text: string): Promise<void> {
        await this.underlineButton.click();
        await this.page.keyboard.type(text);
        await this.underlineButton.click();
    }

    async type(text: string): Promise<void> {
        await this.page.keyboard.type(text);
    }

    boldSegment(text: string): Locator {
        return this.editor.locator("strong", { hasText: text });
    }

    underlineSegment(text: string): Locator {
        return this.editor.locator("u", { hasText: text });
    }

    private async clear(): Promise<void> {
        await this.page.keyboard.press("ControlOrMeta+a");
        await this.page.keyboard.press("Delete");
    }
}
