import { test, expect } from '@playwright/test'

test.describe('News Detail Page', () => {
  test('should render latest news images on news detail page', async ({ page }) => {
    await page.goto('/en/news', { waitUntil: 'domcontentloaded', timeout: 0 })

    const slug = await page.evaluate(() => {
      try {
        const news = (window as any).__NEXT_DATA__?.props?.pageProps?.news
        if (!Array.isArray(news) || news.length === 0) return null
        const post =
          news.find((n: any) => (n.newsCustomFields?.newsContentType ?? '').toLowerCase() === 'internal') || news[0]
        return post?.desiredSlug || post?.slug || null
      } catch {
        return null
      }
    })

    expect(slug).toBeTruthy()

    await page.goto(`/en/news/${slug}`, { waitUntil: 'domcontentloaded', timeout: 0 })
    const latestNewsSection = page.locator('.custom-grid-newspage')
    await expect(latestNewsSection).toBeVisible({ timeout: 10000 })

    // Check that at least one image in Latest news is rendered
    const latestNewsImages = latestNewsSection.locator('img')
    await expect(latestNewsImages.first()).toBeVisible()
    const src = await latestNewsImages.first().getAttribute('src')
    expect(src).toBeTruthy()
    expect(src).not.toContain('undefined')
    expect(src).not.toContain('null')
  })
})
