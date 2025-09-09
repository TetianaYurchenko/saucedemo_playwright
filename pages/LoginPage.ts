import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginContainer: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.loginContainer = page.locator('[data-test="login-container"]');
    this.loginError = page.locator('[data-test="error"]');
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    const baseUrl = process.env.SAUCE_DEMO_BASE_URL || "";
    await this.page.goto(baseUrl, {
      waitUntil: "domcontentloaded",
      timeout: 6000,
    });
  }

  /**
   * Perform login with provided credentials
   */
  async login(username?: string, password?: string) {
    // Ensure login container is visible
    await this.loginContainer.waitFor({ state: "visible" });

    // Use default credentials from env if not specified
    const user = username ?? process.env.SAUCE_DEMO_USERNAME ?? "";
    const pass = password ?? process.env.SAUCE_DEMO_PASSWORD ?? "";

    // Ensure elements are visible and enabled before interaction
    await this.usernameInput.waitFor({ state: "visible" });
    await this.passwordInput.waitFor({ state: "visible" });
    await this.loginButton.waitFor({ state: "visible" });

    // Enter credentials
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);

    // Click the login button
    await this.loginButton.click();

    // Wait for navigation to complete
    await this.page.waitForLoadState("networkidle");
  }
}
