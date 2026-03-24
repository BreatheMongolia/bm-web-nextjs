import { test, expect } from '@playwright/test'

test('donate button should be visible and clickable', async ({ page }) => {
  await page.goto('/en/news', {
    waitUntil: 'domcontentloaded',
    timeout: 0,
  })

  await page.addStyleTag({
    content: 'nextjs-portal { display: none !important; pointer-events: none !important; }',
  })

  const donateButton = page.locator('button.bg-action-red').first()
  await expect(donateButton).toBeVisible({ timeout: 15000 })
  await donateButton.click({ force: true })
})
