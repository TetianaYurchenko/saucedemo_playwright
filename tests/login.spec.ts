
import { test, expect } from '../fixtures/pages';
import { faker } from '@faker-js/faker';

test.describe('Login Test', () => {
  test('should login with valid credentials and navigate to inventory page', async ({ loginPage, inventoryPage }) => {
    // Perform login with default credentials
    await loginPage.login();

    // Verify navigation to inventory page
    await expect(loginPage.page).toHaveURL(/\/inventory\.html$/);

    // Assert inventory container is visible
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Assert login form is no longer visible
    await expect(loginPage.loginContainer).not.toBeVisible();
  });

  test('should show error when logging in with invalid credentials', async ({ loginPage, inventoryPage }) => {
    Promise.all([
      await loginPage.login(faker.internet.username(), faker.internet.password()),

      // Assert error message is visible and inventory page is not loaded
      await loginPage.page.waitForResponse(response => response.url().includes('TOKEN') && (response.status() === 401 || response.status() === 503) && response.request().method() === 'POST'),
      expect(loginPage.loginError).toBeVisible(),
      expect(inventoryPage.inventoryContainer).not.toBeVisible()
    ]);

  });
});
