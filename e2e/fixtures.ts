import { test as base, Browser, BrowserContext, Page } from '@playwright/test';
export { expect } from '@playwright/test';

/**
 * Extended test fixture with custom setup.
 * Provides shared state across all tests including authentication support.
 */
export type Fixtures = {
  adminPage: Page;
  regularUserPage: Page;
  ctx: BrowserContext;
};

// Create extended test with custom fixtures
export const test = base.extend<Fixtures>({
  // Admin user page (logged in as admin)
  adminPage: async ({ page }, use) => {
    await setupAuthenticatedPage(page, 'admin');
    await use(page);
  },

  // Regular user page (logged in as regular user)
  regularUserPage: async ({ page }, use) => {
    await setupAuthenticatedPage(page, 'user');
    await use(page);
  },

  // Browser context for storage state management
  ctx: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
});

/**
 * Helper to set up an authenticated page context.
 * Uses storageState to save/restore authentication state.
 * This is the most reliable way to test protected routes in Playwright.
 */
async function setupAuthenticatedPage(page: Page, role: 'admin' | 'user'): Promise<void> {
  // Navigate to login page
  await page.goto('/user/login');

  // Fill in credentials based on role
  const usernameInput = page.getByTestId('register-username-input').first();
  const passwordInput = page.getByLabel(/password/i).first();

  // Check if we're on the register page instead
  const isRegisterPage = await page.getByTestId('register-password-input').isVisible().catch(() => false);

  if (isRegisterPage) {
    await page.goto('/user/login');
  }

  // TODO: Implement actual login credentials
  // For admin: use admin credentials
  // For regular user: use regular user credentials
  // Then submit the form and wait for navigation to dashboard
}

/**
 * Helper to save browser storage state for reuse across tests.
 * Call this after successful login, then restore in test setup.
 */
export async function saveStorageState(context: BrowserContext, path: string): Promise<void> {
  await context.storageState({ path });
}

/**
 * Helper to create a new page with restored storage state.
 */
export async function createContextWithAuth(
  browser: Browser,
  statePath: string
): Promise<BrowserContext> {
  return browser.newContext({
    storageState: statePath,
  });
}