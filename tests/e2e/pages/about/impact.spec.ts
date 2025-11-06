import { test, expect } from '@playwright/test';

test("that page has title", async ({ page }) => {
    await page.goto('/en/about/impact', {
        waitUntil: 'domcontentloaded',
        timeout: 0,
    });

    const title = await page.locator('.our_accomplishment_title').innerText();
    await expect(title).toBe("Our Accomplishments");
});

test("that page renders images correctly", async ({ page }) => {
    await page.goto('/en/about/impact', {
        waitUntil: 'domcontentloaded',
        timeout: 0,
    });
    const images = await page.locator('.timeline .our-work-carousel img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
        const src = await images.nth(i).getAttribute('src');
        await expect(src).not.toBeNull();
        await expect(src).not.toBe('');
    }
});
