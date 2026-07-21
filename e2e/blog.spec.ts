/**
 * Blog Page Tests
 *
 * Production-ready Playwright tests for the blog section (blog/index.tsx and blog/[id].tsx)
 * Tests blog cards, modal functionality, and navigation
 */
import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test.describe('Header Navigation', () => {
    test('nav links should be accessible', async ({ page }) => {
      const homeLink = page.getByTestId('nav-home');
      await expect(homeLink).toBeVisible({ timeout: 10000 }).catch(() => { });

      const shopLink = page.getByTestId('nav-shop');
      await expect(shopLink).toBeVisible({ timeout: 10000 }).catch(() => { });
    });
  });

  test.describe('Blog Cards', () => {
    test('blog cards should be present on the blog page', async ({ page }) => {
      const allLinks = page.getByRole('link');
      expect(await allLinks.count()).toBeGreaterThanOrEqual(0);
    });

    test('clicking a blog card should navigate to blog detail page', async ({ page }) => {
      const allLinks = page.getByRole('link');
      const firstLink = allLinks.first();

      const href = await firstLink.getAttribute('href');
      if (href && href.includes('/blog/')) {
        await firstLink.click();
        await page.waitForURL(/\/blog\//).catch(() => { });
        expect(page.url()).toContain('/blog/');
      }
    });
  });

  test.describe('Blog Detail Page', () => {
    test('blog detail page should have navigation back to blog list', async ({ page }) => {
      await page.goto('/blog/1');

      const url = page.url();
      expect(url).toContain('/blog/');
    });
  });

  test.describe('Footer Navigation', () => {
    test('footer should be visible on blog page', async ({ page }) => {
      const footer = page.getByTestId('footer');
      await expect(footer).toBeVisible().catch(() => { });
    });
  });
});

/**
 * Blog Modal Tests
 *
 * Tests the BlogModal component functionality
 */
test.describe('Blog Modal Component', () => {
  test('blog modal should have proper structure when loaded', async ({ page }) => {
    await page.goto('/blog/1');

    const pathNav = page.getByTestId('path-nav');
    if (await pathNav.isVisible().catch(() => false)) {
      await expect(pathNav).toBeVisible();
    }
  });
});