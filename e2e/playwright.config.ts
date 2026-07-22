import path from 'path';

import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file (optional - for local dev).
 * https://github.com/motdotla/dotenv
 */
// Uncomment below to load .env.local for local development
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
  /* timeout: 60 seconds for all tests */
  timeout: 60000,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
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

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev-server',
      use: {
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      dependencies: ['dev-server'],
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      dependencies: ['dev-server'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://localhost:3000',
      },
      dependencies: ['dev-server'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'http://localhost:3000',
      },
      dependencies: ['dev-server'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests. */
  webServer: {
    reuseExistingServer: false,
    command: process.env.CI ? 'npm run build && npm run start' : 'next dev --webpack',
    url: 'http://localhost:3000',
    cwd: path.resolve(__dirname, '..'),
    timeout: 120 * 1000,
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