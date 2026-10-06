import { expect, test } from '@playwright/test';

import { LoginPage } from '../pages/login.page';

test.describe('Authentication Flow', () => {
  test('should display login page and perform successful mock login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page.locator('h1')).toContainText(/Welcome Back|مرحبًا بعودتك/);

    await loginPage.login('admin@template.dev', 'Admin@123');

    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
