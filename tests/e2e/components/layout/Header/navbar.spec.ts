import { test, expect } from '@playwright/test';

test("donate button should be visible and clickable", async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'domcontentloaded',
        timeout: 0,
    });

    const donateButton = await page.locator('button.bg-action-red').first();
    await expect(donateButton).toBeVisible();

    await donateButton.click();
});