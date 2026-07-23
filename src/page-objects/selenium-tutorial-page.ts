import { BasePage } from "@/page-objects/base-page";

export class SeleniumTutorialPage extends BasePage {
    readonly startLearningButton = this.page
        .getByRole("button", { name: "Start Learning" })
        .first();
}
