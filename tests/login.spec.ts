
import { test, expect } from '../fixtures/pages';
import { faker } from '@faker-js/faker';

test.describe('Login Test', () => {
  test('Login with valid credentials navigates to inventory page', async ({ loginPage, inventoryPage }) => {
    // Perform login with default credentials
    await loginPage.login();

    // Verify navigation to inventory page using Playwright baseURL
    await expect(loginPage.page).toHaveURL(/\/inventory\.html$/);

    // Assert inventory container is visible (robust selector)
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Assert login form is no longer visible (if login form has a data-test attribute)
    await expect(loginPage.loginContainer).not.toBeVisible();
  });

  test('Login with invalid credentials shows error', async ({ loginPage, inventoryPage }) => {
    Promise.all([
      await loginPage.login(faker.internet.username(), faker.internet.password()),

      // Assert error message is visible
      await loginPage.page.waitForResponse(response => response.url().includes('TOKEN') && (response.status() === 401 || response.status() === 503) && response.request().method() === 'POST'),
      expect(loginPage.loginError).toBeVisible(),
      expect(inventoryPage.inventoryContainer).not.toBeVisible()
    ]);

  });
});
