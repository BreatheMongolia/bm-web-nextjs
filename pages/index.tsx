import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// types
import { Page } from 'graphql/generated'
import { RankType, StationType, RecommendationType } from 'lib/air-pollution-map/types'
// lib functions/queries
import {
  getHomeLandingPageSettings,
  getHomePage,
  getProjectUrls,
  getRecommendationSettings,
  getVolunteers,
} from 'lib/graphql-api/queries/home'
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
import { getBannerTextRight } from 'lib/utils/getBannerTextRight'
import dayjs from 'dayjs'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getTranslated } from 'lib/utils/getTranslated'

export default function Index({
  page,
  stations,
  recommendationActions,
  volunteers,
  globalRanks,
  locale,
}: {
  page: Page
  stations: StationType[]
  recommendationActions: RecommendationType[]
  volunteers: any
  globalRanks: RankType[]
  locale: string
}) {
  const { i18n } = useTranslation()

  // OurWorkCarousel
  const campaigns = [...page?.customFields?.campaignAndOurWorkSlider]
  const sortedCampaigns = campaigns.sort((a: any, b: any) =>
    dayjs(a?.campaignDate).isBefore(dayjs(b?.campaignDate)) ? 1 : -1,
  )

  // get banner image by language
  const pageBanner =
    i18n.language === 'en'
      ? {
        leftText: page.customFields.bannerTextLeft,
        rightText: getBannerTextRight(page.customFields.bannerTextRight, 'categoryText'),
      }
      : {
        leftText: page.customFields.bannerTextLeftMn,
        rightText: getBannerTextRight(page.customFields.bannerTextRight, 'categoryTextMn'),
      }

  return (
    <div>
      <Head>
        <title>{`Breathe Mongolia - Clean Air Coalition`}</title>
      </Head>
      <div>
        <PageImageBanner
          imageUrls={page.customFields.banners.map(x => {
            return {
              mediaItemUrl: x.bannerImage.mediaItemUrl,
              url: x.bannerImageUrl,
            }
          })}
          bottomText={{
            left: pageBanner.leftText,
            right: pageBanner.rightText,
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
              recommendations={recommendationActions}
              globalRanks={globalRanks}
              locale={locale}
            />
          </MapContextWrapper>

          {/* Add other page level components here */}
          <NewsCarousel featuredNews={page.customFields.featuredNews} />
          <TakeActionCarousel takeActionPosts={page.customFields.featuredTakeActions} locale={locale} />
          <OurWorkCarousel campaigns={sortedCampaigns} locale={locale} />
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
      <GoogleAnalytics gaId="G-Z26ZSKR6S9" />
    </div>
  )
}

// This calls the API first and then loads the page
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const volunteers = await getVolunteers()
  const recommendationActions = await getRecommendationSettings()

  const purpleAirStations = await fetchPurpleAirStations()
  const openAQStations = await fetchOpenAQStations()

  // adding a isNotDev check to disable api calls locally as it consumes api credits
  const isNotDev = process.env.NODE_ENV !== 'development'
  const airVisualOutdoorStations = isNotDev ? await fetchAirVisualOutdoorStations() : []
  const airVisualIndoorStations = isNotDev ? await fetchAirVisualIndoorStations() : []
  // const airVisualGlobalRanks = isNotDev ? await fetchAirVisualGlobalStations() : []

  const stations = [...purpleAirStations, ...openAQStations, ...airVisualIndoorStations, ...airVisualOutdoorStations]
  const data = await getHomeLandingPageSettings()
  
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map', 'common'])),
      locale,
      page,
      volunteers,
      stations,
      recommendationActions,
      globalRanks: [],
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      image: getTranslated(data.image.mediaItemUrl, data.imageMn.mediaItemUrl, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
