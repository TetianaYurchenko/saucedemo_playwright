import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationMessage = page.locator('[data-test="complete-header"]');
  }
  
  async gotoCheckout() {
    await this.shoppingCartLink.click();
    await this.page.waitForURL(/\/cart\.html$/);
    await this.page.locator('[data-test="checkout"]').click();
    await this.page.waitForURL(/\/checkout-step-one\.html$/);
  }

  async completeCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.page.waitForURL(/\/checkout-step-two\.html$/);
    await this.finishButton.click();
    await this.page.waitForURL(/\/checkout-complete\.html$/);
  }

  async expectOrderConfirmation(message: string) {
    await expect(this.confirmationMessage).toHaveText(message);
  }
}
