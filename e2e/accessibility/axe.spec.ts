import AxeBuilder from '@axe-core/playwright';
import { expect, Page, test } from '@playwright/test';

import { LoginPage } from '../pages/login.page';

async function checkAccessibility(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const criticalViolations = results.violations.filter((v) => v.impact === 'critical');

  if (criticalViolations.length > 0) {
    console.error('Critical accessibility violations:', JSON.stringify(criticalViolations, null, 2));
  }
  expect(criticalViolations).toHaveLength(0);
}

test.describe('Accessibility Audits', () => {
  test('login page should have zero critical accessibility violations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForLoadState('networkidle');
    await checkAccessibility(page);
  });

  test('dashboard page should have zero critical accessibility violations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@template.dev', 'Admin@123');
    await page.waitForURL('**/dashboard');
    await page.waitForLoadState('networkidle');
    await checkAccessibility(page);
  });
});
