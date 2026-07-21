import { test as base, expect } from "@playwright/test";

import { Guru99HomePage } from "../page-objects/guru99-home-page";
import { RichTextEditorPage } from "../page-objects/rich-text-editor-page";
import { SeleniumTutorialPage } from "../page-objects/selenium-tutorial-page";

export interface WebFixtures {
    guru99HomePage: Guru99HomePage;
    seleniumTutorialPage: SeleniumTutorialPage;
    richTextEditorPage: RichTextEditorPage;
}

export const test = base.extend<WebFixtures>({
    guru99HomePage: async ({ page }, use) => {
        await use(new Guru99HomePage(page));
    },
    seleniumTutorialPage: async ({ page }, use) => {
        await use(new SeleniumTutorialPage(page));
    },
    richTextEditorPage: async ({ page }, use) => {
        await use(new RichTextEditorPage(page));
    },
});

export { expect };
