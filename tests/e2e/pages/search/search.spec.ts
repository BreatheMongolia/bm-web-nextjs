import { test, expect } from '@playwright/test'

test.describe('Search Page', () => {
  test('should load the search page without errors', async ({ page }) => {
    const response = await page.goto('/en/search', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    expect(response?.status()).toBe(200)
  })

  test('should display the search bar', async ({ page }) => {
    await page.goto('/en/search', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    const searchInput = page.locator('.search-form input[type="text"]')
    await expect(searchInput).toBeVisible()
  })

  test('should display search results when a query is provided', async ({ page }) => {
    await page.goto('/en/search?s=air', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    const searchResult = page.locator('.search-result')
    await expect(searchResult).toBeVisible()
    await expect(searchResult).toContainText('search results for')
    await expect(searchResult).toContainText('"air"')
  })

  test('should show result count when searching', async ({ page }) => {
    await page.goto('/en/search?s=air', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    const resultCount = page.locator('.search-result b').first()
    await expect(resultCount).toBeVisible()

    const countText = await resultCount.innerText()
    const count = parseInt(countText)
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('should navigate to search results when pressing Enter', async ({ page }) => {
    await page.goto('/en/search', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    const searchInput = page.locator('.search-form input[type="text"]')
    await searchInput.fill('Mongolia')
    await searchInput.press('Enter')

    await page.waitForURL(/\/search\?s=Mongolia/)
    await expect(page.locator('.search-result')).toContainText('"Mongolia"')
  })

  test('should navigate to search results when clicking the search button', async ({ page }) => {
    await page.goto('/en/search', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    const searchInput = page.locator('.search-form input[type="text"]')
    await searchInput.fill('pollution')

    const searchButton = page.locator('.search-btn')
    await searchButton.click()

    await page.waitForURL(/\/search\?s=pollution/)
    await expect(page.locator('.search-result')).toContainText('"pollution"')
  })

  test('should not show results section when search query is empty', async ({ page }) => {
    await page.goto('/en/search', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    const searchResult = page.locator('.search-result')
    await expect(searchResult).toBeEmpty()
  })

  test('should work in Mongolian locale', async ({ page }) => {
    const response = await page.goto('/mn/search?s=агаар', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    expect(response?.status()).toBe(200)

    const searchResult = page.locator('.search-result')
    await expect(searchResult).toBeVisible()
    await expect(searchResult).toContainText('"агаар"')
  })

  test('should have correct page title', async ({ page }) => {
    await page.goto('/en/search?s=test', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    })

    await expect(page).toHaveTitle('Search Results - Breathe Mongolia')
  })
})
