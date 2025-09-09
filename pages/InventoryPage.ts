import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page
    readonly inventoryContainer: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    }   
}