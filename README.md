# Saucedemo Playwright E2E Tests

This project automates end-to-end tests for the [Sauce Demo](https://www.saucedemo.com/) web application using [Playwright](https://playwright.dev/) and the Page Object Model (POM) pattern.

## Features
- Login test with credentials from `.env`
- Page Object Model for maintainable test code
- Test results and reports

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
5. **View HTML report:**
    After running tests the HTML report should open automatically. If it doesn't please run:
    ```bash
    npx playwright show-report
    ```

## Folder Structure
- `pages/` — Page Object classes
- `fixtures/` — Custom Playwright fixtures
- `tests/` — Test specs

## Test Explorer
To run and debug tests in VS Code, install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension.

## License
MIT