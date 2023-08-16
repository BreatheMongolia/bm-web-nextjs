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
import { getHomePage, getVolunteers } from 'lib/graphql-api/queries/home'
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
import { getTranslated } from 'lib/utils/getTranslated'
import { getBannerTextRight } from 'lib/utils/getBannerTextRight'

// TODO: Detect the current language and update fields based on the current language
// TODO: Add a util function to extract the correct image size for the imageUrl

export default function Index({
  page,
  stations,
  volunteers,
  globalRanks,
  locale,
}: {
  page: Page
  stations: StationType[]
  globalRanks: RankType[]
  volunteers: any
  locale: string
}) {
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
            right: getBannerTextRight(page.customFields.bannerTextRight, 'categoryText'),
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
            title={getTranslated(
              page.customFields.campaignAndOurWorkTitle,
              page.customFields.campaignAndOurWorkTitleMn,
              locale,
            )}
            campaigns={page.customFields.campaignAndOurWorkSlider}
            locale={locale}
          />
          <JoinBMSection
            title={{
              en: page.customFields.joinBreatheMongoliaTitle,
              mn: page.customFields.joinBreatheMongoliaTitleMn,
            }}
            locale={locale}
            descriptionHtml={{
              en: page.customFields.joinBreatheMongoliaDescription,
              mn: page.customFields.joinBreatheMongoliaDescriptionMn,
            }}
            slider={page.customFields.joinBreatheMongoliaImageSlider}
            countriesInfoText={page.customFields.countriesInfoText}
            volunteers={volunteers}
          />
          <OurPartners
            title={{
              en: page.customFields.partnersLogosTitle,
              mn: page.customFields.partnersLogosTitleMn,
            }}
            partnerLogos={page.customFields.partnersLogos}
            locale={locale}
          />
        </div>
      </div>
    </div>
  )
}

// This calls the API first and then loads the page
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const volunteers = await getVolunteers()

  const purpleAirStations = await fetchPurpleAirStations()
  const openAQStations = await fetchOpenAQStations()

  // adding a isNotDev check to disable api calls locally as it consumes api credits
  const isNotDev = process.env.NODE_ENV !== 'development'
  const airVisualOutdoorStations = isNotDev ? await fetchAirVisualOutdoorStations() : []
  const airVisualIndoorStations = isNotDev ? await fetchAirVisualIndoorStations() : []
  const airVisualGlobalRanks = isNotDev ? await fetchAirVisualGlobalStations() : []

  const stations = [...purpleAirStations, ...openAQStations, ...airVisualIndoorStations, ...airVisualOutdoorStations]

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      locale,
      page,
      volunteers,
      stations,
      globalRanks: airVisualGlobalRanks,
    },
    // This tells the page how often to refetch from the API (in seconds)
    revalidate: 60 * 60,
  }
}
