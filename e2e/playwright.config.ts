import path from 'path';

import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file (optional - for local dev).
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* 45 second timeout per test */
  timeout: process.env.CI ? 45000 : 30000,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Run 4 tests in parallel on CI, all workers locally */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for cross-browser testing (run locally only) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests. */
  webServer: {
    reuseExistingServer: !process.env.CI,
    command: process.env.CI ? 'npm run build && npm run start' : 'next dev --webpack',
    url: 'http://localhost:3000',
    cwd: path.resolve(__dirname, '..'),
    timeout: process.env.CI ? 60 * 1000 : 30 * 1000,
    /* Pass environment variables to the Next.js server process */
    env: {
      MONGO_URI: process.env.MONGO_URI || '',
      SECRET: process.env.SECRET || '',
      NEXT_PUBLIC_STRIPE_API: process.env.NEXT_PUBLIC_STRIPE_API || '',
      NEXT_PUBLIC_STRIPE_SECRET: process.env.NEXT_PUBLIC_STRIPE_SECRET || '',
      API_URI: process.env.API_URI || 'http://localhost:3000',
    },
  },
});