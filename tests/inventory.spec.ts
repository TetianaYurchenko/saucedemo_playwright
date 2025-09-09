import { test, expect } from "../fixtures/pages";
import { products } from "../data/products";
import { sortingOptions } from "../data/sortingOptions";

// Only these two tests per user request

test.beforeEach(async ({ loginPage, inventoryPage }) => {
  await loginPage.login();
});
test.describe("Add to Cart Tests", () => {
  test("should add two random products to cart", async ({ inventoryPage }) => {
    // Pick two random products from factory
    const shuffled = products.slice().sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);
    await inventoryPage.addProductToCart(selected[0].name);
    await inventoryPage.addProductToCart(selected[1].name);
    // Verify the cart badge shows the correct item count
    await inventoryPage.expectCartBadgeCount(2);
  });
});

test.describe("Product Sorting Tests", () => {
  for (const option of sortingOptions) {
    test(`should sort products by ${option}`, async ({ inventoryPage }) => {
      await inventoryPage.selectSortOption(option);
      if (option === "Price (low to high)") {
        await inventoryPage.expectPricesSortedAscending();
      } else if (option === "Price (high to low)") {
        await inventoryPage.expectPricesSortedDescending();
      } else if (option === "Name (A to Z)") {
        await inventoryPage.expectNamesSortedAscending();
      } else if (option === "Name (Z to A)") {
        await inventoryPage.expectNamesSortedDescending();
      }
    });
  }
});
