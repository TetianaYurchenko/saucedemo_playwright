import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;

    // 📍 Centralized Locators
    readonly inventoryContainer: Locator;
    readonly addToCartButtons: Locator;
    readonly removeFromCartButtons: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;
    readonly productNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
        this.removeFromCartButtons = page.locator('[data-test^="remove-"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
    }

    // 🚀 Navigation
    async goto() {
        const baseUrl = process.env.SAUCE_DEMO_BASE_URL || '';
        await this.page.goto(`${baseUrl}/inventory.html`);
    }

    // ⚡ Basic Actions
    async addProductToCart(productName: string) {
        const dataTestName = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="add-to-cart-${dataTestName}"]`).click();
    }

    async selectSortOption(option: string) {
        await this.sortDropdown.selectOption({ label: option });
    }

    // ✅ Assertion Methods
    async expectCartBadgeCount(expectedCount: number) {
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }

    async expectPricesSortedAscending() {
        const prices = await this.productPrices.allTextContents();
        const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));
        for (let i = 1; i < priceNumbers.length; i++) {
            expect(priceNumbers[i]).toBeGreaterThanOrEqual(priceNumbers[i - 1]);
        }
    }

    async expectPricesSortedDescending() {
        const prices = await this.productPrices.allTextContents();
        const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));
        for (let i = 1; i < priceNumbers.length; i++) {
            expect(priceNumbers[i]).toBeLessThanOrEqual(priceNumbers[i - 1]);
        }
    }

    async expectNamesSortedAscending() {
        const names = await this.productNames.allTextContents();
        for (let i = 1; i < names.length; i++) {
            expect(names[i].localeCompare(names[i - 1])).toBeGreaterThanOrEqual(0);
        }
    }

    async expectNamesSortedDescending() {
        const names = await this.productNames.allTextContents();
        for (let i = 1; i < names.length; i++) {
            expect(names[i].localeCompare(names[i - 1])).toBeLessThanOrEqual(0);
        }
    }
}