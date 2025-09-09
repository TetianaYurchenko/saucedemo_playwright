import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['list'],
    ['html', 
      { 
        name: "Sauce Demo Playwright Report",
        outputFile: './playwright-report/index.html', 
        attachmentsDir: "test-results/attachments", 
        open: 'always', 
      }],
    [
      "monocart-reporter",
      {
        name: "Sauce Demo Monocart Report",
        outputFile: "./monocart-report/monocart-index.html",
        attachmentsDir: "test-results/attachments",
      },
    ],
  ],
  use: {
    baseURL: process.env.SAUCE_DEMO_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
