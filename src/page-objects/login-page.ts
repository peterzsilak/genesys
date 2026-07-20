import type { Credential } from "../config/credential";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    readonly root = this.page.getByTestId("login-container");
    readonly usernameInput = this.root.getByTestId("username");
    readonly passwordInput = this.root.getByTestId("password");
    readonly loginButton = this.root.getByTestId("login-button");
    readonly errorMessage = this.page.getByTestId("error");

    async authenticate(credential: Credential): Promise<void> {
        await this.usernameInput.fill(credential.username);
        await this.passwordInput.fill(credential.password);
        await this.loginButton.click();
    }
}
