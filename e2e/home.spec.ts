import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the main heading and CTA buttons', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Articles Hub' })).toBeVisible();
    await expect(page.getByText('Browse, create, and manage')).toBeVisible();

    const browseLink = page.getByRole('link', { name: 'Browse Articles' });
    await expect(browseLink).toBeVisible();
    await expect(browseLink).toHaveAttribute('href', '/articles');

    const createLink = page.getByRole('link', { name: 'Create Article' });
    await expect(createLink).toBeVisible();
    await expect(createLink).toHaveAttribute('href', '/articles/create');
  });
});
