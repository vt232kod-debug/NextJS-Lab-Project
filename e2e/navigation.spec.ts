import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should redirect unauthenticated user to login when accessing /articles', async ({ page }) => {
    await page.goto('/articles');

    // Should be redirected to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('should navigate from home page to login via Browse Articles', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Browse Articles' }).click();

    // Unauthenticated user should be redirected to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('should show test credentials on login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByText('admin@example.com')).toBeVisible();
    await expect(page.getByText('password123')).toBeVisible();
  });
});
