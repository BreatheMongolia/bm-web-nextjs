import { getTransformedDataFromOpenAQ } from './utils'

describe('getTransformedDataFromOpenAQ', () => {
  const mockDate = new Date('2025-10-06T12:00:00Z')
  const realDate = Date

  beforeAll(() => {
    global.Date = class extends Date {
      constructor() {
        super()
        return mockDate
      }
      static now() {
        return mockDate.getTime()
      }
    } as unknown as DateConstructor
  })

  afterAll(() => {
    global.Date = realDate
  })

  it.skip('should transform valid OpenAQ data correctly', () => {
    const mockResponse = {
      results: [
        {
          id: 19,
          name: 'MNB',
          locality: null,
          timezone: 'Asia/Ulaanbaatar',
          country: {
            id: 47,
            code: 'MN',
            name: 'Mongolia',
          },
          owner: {
            id: 4,
            name: 'Unknown Governmental Organization',
          },
          provider: {
            id: 116,
            name: 'Agaar.mn',
          },
          isMobile: false,
          isMonitor: true,
          instruments: [
            {
              id: 2,
              name: 'Government Monitor',
            },
          ],
          sensors: [
            {
              id: 5139,
              name: 'pm25 µg/m³',
              parameter: {
                id: 2,
                name: 'pm25',
                units: 'µg/m³',
                displayName: 'PM2.5',
              },
            },
          ],
          coordinates: {
            latitude: 47.929732,
            longitude: 106.888629,
          },
          licenses: null,
          bounds: [106.888629, 47.929732, 106.888629, 47.929732],
          distance: null,
          datetimeFirst: {
            utc: '2016-01-30T00:30:00Z',
            local: '2016-01-30T08:30:00+08:00',
          },
          datetimeLast: {
            utc: '2019-03-13T22:30:00Z',
            local: '2019-03-14T06:30:00+08:00',
          },
        },
      ],
    }

    const result = getTransformedDataFromOpenAQ(mockResponse)
    // SHOULD FAIL
    expect(result).toBeTruthy()

    // const station = result['Test Station']
    // expect(station).toBeDefined()
    // expect(station.name).toBe('Test Station')
    // expect(station.sponsoredBy).toBe('Test Manufacturer')
    // expect(station.location.coordinates).toEqual([106.888629, 47.929732])
    // expect(station.pollution.p2).toBe(35)
    // expect(station.type).toBe('outdoor')
    // expect(station.color).toBe('yellow')
  })
  /*
  it('should skip stations with negative PM2.5 readings', () => {
    const mockResponse = {
      results: [
        {
          name: 'Negative Station',
          coordinates: {
            latitude: 47.123,
            longitude: 106.456,
          },
          manufacturers: [
            {
              manufacturerName: 'Test Manufacturer',
            },
          ],
          parameters: [
            {
              id: 2,
              lastValue: -5,
              lastUpdated: '2025-10-05T12:00:00Z',
            },
          ],
        },
      ],
    }

    const result = getTransformedDataFromOpenAQ(mockResponse)
    expect(result).toBeTruthy()
    expect(Object.keys(result)).toHaveLength(0)
  })

  it('should skip outdated stations', () => {
    const mockResponse = {
      results: [
        {
          name: 'Old Station',
          coordinates: {
            latitude: 47.123,
            longitude: 106.456,
          },
          manufacturers: [
            {
              manufacturerName: 'Test Manufacturer',
            },
          ],
          parameters: [
            {
              id: 2,
              lastValue: 35,
              lastUpdated: '2025-09-01T12:00:00Z', // More than a week old
            },
          ],
        },
      ],
    }

    const result = getTransformedDataFromOpenAQ(mockResponse)
    expect(result).toBeTruthy()
    expect(Object.keys(result)).toHaveLength(0)
  })

  it('should handle empty results', () => {
    const mockResponse = {
      results: [],
    }

    const result = getTransformedDataFromOpenAQ(mockResponse)
    expect(result).toBe(false)
  })

  it('should update existing station with newer data', () => {
    const mockResponse = {
      results: [
        {
          name: 'Duplicate Station',
          coordinates: {
            latitude: 47.123,
            longitude: 106.456,
          },
          manufacturers: [
            {
              manufacturerName: 'Test Manufacturer',
            },
          ],
          parameters: [
            {
              id: 2,
              lastValue: 35,
              lastUpdated: '2025-10-05T11:00:00Z',
            },
          ],
        },
        {
          name: 'Duplicate Station',
          coordinates: {
            latitude: 47.123,
            longitude: 106.456,
          },
          manufacturers: [
            {
              manufacturerName: 'Test Manufacturer',
            },
          ],
          parameters: [
            {
              id: 2,
              lastValue: 50,
              lastUpdated: '2025-10-05T12:00:00Z',
            },
          ],
        },
      ],
    }

    const result = getTransformedDataFromOpenAQ(mockResponse)
    expect(result).toBeTruthy()
    expect(Object.keys(result)).toHaveLength(1)

    const station = result['Duplicate Station']
    expect(station.pollution.p2).toBe(50)
    expect(station.date).toBe('2025-10-05T12:00:00Z')
    expect(station.pollution.ts).toBe(Date.parse('2025-10-05T12:00:00Z'))
  })

  it('should handle stations without manufacturers', () => {
    const mockResponse = {
      results: [
        {
          name: 'Unknown Station',
          coordinates: {
            latitude: 47.123,
            longitude: 106.456,
          },
          manufacturers: [],
          parameters: [
            {
              id: 2,
              lastValue: 35,
              lastUpdated: '2025-10-05T12:00:00Z',
            },
          ],
        },
      ],
    }

    const result = getTransformedDataFromOpenAQ(mockResponse)
    expect(result).toBeTruthy()

    const station = result['Unknown Station']
    expect(station).toBeDefined()
    expect(station.sponsoredBy).toBe('OpenAQ Unknown')
  })
*/
})
