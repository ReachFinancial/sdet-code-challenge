const { test, expect, beforeEach } = require('@playwright/test');

beforeEach(async ({ page }) => {
  await page.goto('examples/react/dist/');
});

test('Create new todo items and ensure the latest is last', async ({ page }) => {

})
