import { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// types
import { Page } from 'graphql/generated'
import { RankType, StationType } from 'lib/air-pollution-map/types'
// lib functions/queries
import { getHomePage } from 'lib/graphql-api/queries/home'
import {
  fetchPurpleAirStations,
  fetchOpenAQStations,
  fetchAirVisualGlobalStations,
  fetchAirVisualIndoorStations,
  fetchAirVisualOutdoorStations,
} from 'lib/air-pollution-map/api-hooks'
// components
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { MapContextWrapper } from 'components/HomePage/MapComponent/MapContextWrapper'
import {
  MapComponent,
  TakeActionCarousel,
  OurPartners,
  JoinBMSection,
  NewsCarousel,
  OurWorkCarousel,
} from 'components/HomePage'

// TODO: Detect the current language and update fields based on the current language
// TODO: Add a util function to extract the correct image size for the imageUrl

export default function Index({
  page,
  stations,
  globalRanks,
}: {
  page: Page
  stations: StationType[]
  globalRanks: RankType[]
}) {
  const { t } = useTranslation()
  const router = useRouter()
  const { i18n } = useTranslation()

  useEffect(() => {
    // Get the current language from the URL (e.g., "mn" or "en")
    const { locale } = router
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [])
  const getBannerTextRight = bannerTextRight => {
    var text: string = ''
    for (let i = 0; i < bannerTextRight.length; i++) {
      text += bannerTextRight[i].categoryText
      text += bannerTextRight?.length - 1 !== i ? '・' : ''
    }
    return text
  }
  return (
    <div>
      <Head>
        <title>{`Breathe Mongolia - Clean Air Coalition`}</title>
      </Head>
      <div>
        <PageImageBanner
          imageUrls={page.customFields.banners}
          bottomText={{
            left: page.customFields.bannerTextLeft,
            right: getBannerTextRight(page.customFields.bannerTextRight),
          }}
        />
        <div className="container mx-auto flex flex-col gap-20">
          <MapContextWrapper>
            <MapComponent
              title={{
                en: page.customFields.mapTitle,
                mn: page.customFields.mapTitleMn,
              }}
              descriptionHtml={{
                en: page.customFields.mapDescription,
                mn: page.customFields.mapDescriptionMn,
              }}
              stations={stations}
              globalRanks={globalRanks}
            />
          </MapContextWrapper>

          {/* Add other page level components here */}
          <NewsCarousel featuredNews={page.customFields.featuredNews} />
          <TakeActionCarousel takeActionPosts={page.customFields.featuredTakeActions} />
          <OurWorkCarousel
            title={{
              en: page.customFields.campaignAndOurWorkTitle,
              mn: page.customFields.campaignAndOurWorkTitleMn,
            }}
            campaigns={page.customFields.campaignAndOurWorkSlider}
          />
          <JoinBMSection
            title={{
              en: page.customFields.joinBreatheMongoliaTitle,
              mn: page.customFields.joinBreatheMongoliaTitleMn,
            }}
            descriptionHtml={{
              en: page.customFields.joinBreatheMongoliaDescription,
              mn: page.customFields.joinBreatheMongoliaDescriptionMn,
            }}
            slider={page.customFields.joinBreatheMongoliaImageSlider}
            countriesInfoText={page.customFields.countriesInfoText}
          />
          <OurPartners
            title={{
              en: page.customFields.partnersLogosTitle,
              mn: page.customFields.partnersLogosTitleMn,
            }}
            partnerLogos={page.customFields.partnersLogos}
          />
        </div>
      </div>
    </div>
  )
}
// This calls the API first and then loads the page
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')

  const purpleAirStations = await fetchPurpleAirStations()
  const openAQStations = await fetchOpenAQStations()
  const airVisualOutdoorStations = await fetchAirVisualOutdoorStations()
  const airVisualIndoorStations = await fetchAirVisualIndoorStations()
  const airVisualGlobalRanks = await fetchAirVisualGlobalStations()

  const stations = [...purpleAirStations, ...openAQStations, ...airVisualIndoorStations, ...airVisualOutdoorStations]

  console.log('fetched stations => ', stations.length, ' station(s)')
  // this return passes it to the above component

  console.log('fetched ranks', airVisualGlobalRanks.length, 'cities')
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      page,
      stations,
      globalRanks: airVisualGlobalRanks,
    },
    // This tells the page how often to refetch from the API (in seconds)
    revalidate: 60 * 60,
  }
}
