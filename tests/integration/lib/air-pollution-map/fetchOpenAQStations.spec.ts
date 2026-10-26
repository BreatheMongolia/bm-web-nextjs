import { describe, expect, it } from 'vitest'
import { fetchOpenAQStations } from '@bm-web-nextjs/lib/air-pollution-map/api-hooks/fetchOpenAQStations'

describe('fetchOpenAQStations integration', () => {
  it.runIf(Boolean(process.env.OPENAQ_API_KEY))('fetches and transforms live OpenAQ stations', async () => {
    const stations = await fetchOpenAQStations()

    expect(stations.length).toBeGreaterThan(0)
    expect(stations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          pollution: expect.objectContaining({
            aqius: expect.any(Number),
            p2: expect.any(Number),
            ts: expect.any(Number),
          }),
          location: {
            coordinates: [expect.any(Number), expect.any(Number)],
          },
          type: 'outdoor',
          sponsoredBy: expect.any(String),
          color: expect.any(String),
        }),
      ]),
    )
  })
})
