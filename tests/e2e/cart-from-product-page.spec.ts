import { expect, test } from '@playwright/test';

const PRODUCT_ID = '1e371509-c0bd-48de-a58c-b50a66ee0536';
const PRODUCT_NAME = 'Jeans # 2';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
});

test('adds a product to cart from the product page', async ({ page }) => {
  await page.goto(`/product/${PRODUCT_ID}`);

  await expect(page.getByRole('heading', { name: PRODUCT_NAME })).toBeVisible();
  await page.getByTestId('product-page-add-to-cart').click();

  await expect(page.getByTestId('navbar-cart-count')).toHaveText('1');

  await page.getByTestId('navbar-cart-button').click();

  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
  await expect(page.getByText(PRODUCT_NAME)).toBeVisible();
});
