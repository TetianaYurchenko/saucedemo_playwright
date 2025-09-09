# Saucedemo Playwright E2E Tests

This project automates end-to-end tests for the [Sauce Demo](https://www.saucedemo.com/) web application using [Playwright](https://playwright.dev/) and the Page Object Model (POM) pattern.

## Features

- Login test with credentials from `.env`
- Page Object Model for maintainable test code
- Test results and reports

## Folder Structure

- `pages/` — Page Object classes (LoginPage, InventoryPage, CheckoutPage)
- `fixtures/` — Custom Playwright fixtures
- `data/` — Test data factories (products, sorting options)
- `tests/` — Test specs (E2E scenarios)
- `monocart-report/` — Monocart HTML report output
- `test-results/` — Playwright default HTML report output

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Install browsers:**
   ```bash
   npm run install:browsers
   ```
3. **Configure environment:**
   Create a `.env` file with:
   ```env
   SAUCE_DEMO_USERNAME=your_username
   SAUCE_DEMO_PASSWORD=your_password
   SAUCE_DEMO_BASE_URL=https://www.saucedemo.com/
   ```
4. **Run tests:**
   ```bash
   npx playwright test
   ```

## Reporting

### Monocart Report

This project uses [monocart-reporter](https://github.com/cenfun/monocart-reporter) for advanced HTML reporting. After running tests, open `monocart-report/index.html` for a detailed, interactive report:

```bash
npx monocart show-report monocart-report/index.html
```

The Monocart report includes:

- Test results and statistics
- Step-by-step details
- Screenshots and traces (if enabled)
- Filtering and search

### Playwright HTML Report

The default Playwright report is saved in `test-results/` and should open automatically. Otherwise use:

```bash
npx playwright show-report test-results
```

## Test Explorer

To run and debug tests in VS Code, install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension.

## Formatting

This project uses Prettier for consistent code formatting.

Prettier Commands
Format all files:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## License

MIT
