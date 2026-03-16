import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display login form with email and password fields', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'Articles Hub' })).toBeVisible();
    await expect(page.getByText('Sign in to your account')).toBeVisible();

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
  });

  test('should display OAuth sign-in buttons', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('button', { name: /Google/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /GitHub/ })).toBeVisible();
  });
});
