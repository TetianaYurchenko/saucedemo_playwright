import { test, expect } from '../fixtures/pages';
import { faker } from '@faker-js/faker';
import { products } from '../data/products';

test.beforeEach(async ({ loginPage }) => {
	await loginPage.login();
});

test.describe('Checkout Flow Test', () => {
	test('should complete checkout with valid details and verify order confirmation', async ({ inventoryPage, checkoutPage }) => {
        // Add a random product to cart
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        await inventoryPage.addProductToCart(randomProduct.name);

		// Go to checkout page
        await checkoutPage.gotoCheckout();

		// Complete checkout information
		await checkoutPage.completeCheckoutInformation(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode());
		
        // Verify order confirmation message
		await checkoutPage.expectOrderConfirmation('Thank you for your order!');
	});
});
