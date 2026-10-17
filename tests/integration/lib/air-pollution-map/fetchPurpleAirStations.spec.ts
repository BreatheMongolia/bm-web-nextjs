import { describe, expect, it } from 'vitest'
import { fetchPurpleAirStations } from '@bm-web-nextjs/lib/air-pollution-map/api-hooks/fetchPurpleAirStations'

describe('fetchPurpleAirStations integration', () => {
  it.runIf(Boolean(process.env.PURPLE_AIR_API_KEY))('fetches and transforms live PurpleAir sensors', async () => {
    const stations = await fetchPurpleAirStations()

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
          type: expect.stringMatching(/^(outdoor|indoor)$/),
          sponsoredBy: 'Purple Air',
          color: expect.any(String),
        }),
      ]),
    )
  })
})
