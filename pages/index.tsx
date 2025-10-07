import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// types
import { HomePageHealthSection, News, Page, TakeAction } from 'graphql/generated'
import { RankType, StationType, RecommendationType } from 'lib/air-pollution-map/types'
// lib functions/queries
import {
  getHomeLandingPageSettings,
  getHomePage,
  getRecommendationSettings,
  getVolunteers,
} from 'lib/graphql-api/queries/home'
import {
  fetchPurpleAirStations,
  fetchOpenAQStations,
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
  TakeActionGrid,
  HomePagePolicySection,
} from '@/components/HomePage'
import { getBannerTextRight } from 'lib/utils/getBannerTextRight'
import dayjs from 'dayjs'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getTranslated } from 'lib/utils/getTranslated'
import { HealthSection } from '@/components/HomePage/HealthSection'

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
  const campaigns = [...page?.homePage?.campaignAndOurWorkSlider]
  const sortedCampaigns = campaigns.sort((a: any, b: any) =>
    dayjs(a?.campaignDate).isBefore(dayjs(b?.campaignDate)) ? 1 : -1,
  )

  // get banner image by language
  const pageBanner =
    i18n.language === 'en'
      ? {
          leftText: page.homePage.bannerTextLeft,
          rightText: getBannerTextRight(page.homePage.bannerTextRight, 'categoryText'),
        }
      : {
          leftText: page.homePage.bannerTextLeftMn,
          rightText: getBannerTextRight(page.homePage.bannerTextRight, 'categoryTextMn'),
        }

  return (
    <div>
      <Head>
        <title>{`Breathe Mongolia - Clean Air Coalition`}</title>
      </Head>
      <div>
        <PageImageBanner
          imageUrls={page.homePage.banners.map(x => {
            return {
              mediaItemUrl: x.bannerImage.node.mediaItemUrl,
              url: x.bannerImageUrl,
            }
          })}
          bottomText={{
            left: pageBanner.leftText,
            right: pageBanner.rightText,
          }}
        />
        <div className="container flex flex-col gap-20 mx-auto">
          <MapContextWrapper>
            <MapComponent
              title={{
                en: page.homePage.mapTitle,
                mn: page.homePage.mapTitleMn,
              }}
              descriptionHtml={{
                en: page.homePage.mapDescription,
                mn: page.homePage.mapDescriptionMn,
              }}
              stations={stations}
              recommendations={recommendationActions}
              globalRanks={globalRanks}
              locale={locale}
            />
          </MapContextWrapper>

          {/* Add other page level components here */}
          <HomePagePolicySection policySection={page.homePage.policySection} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="hidden lg:block">
              <TakeActionGrid
                takeActionPosts={page.homePage.featuredTakeActions.nodes as TakeAction[]}
                locale={locale}
              />
            </div>
            <div className="lg:hidden">
              <TakeActionCarousel
                takeActionPosts={page.homePage.featuredTakeActions.nodes as TakeAction[]}
                locale={locale}
              />
            </div>
            <HealthSection healthSection={page.homePage.healthSection as HomePageHealthSection} />
          </div>
          <NewsCarousel featuredNews={page.homePage.featuredNews.nodes as News[]} />
          <OurWorkCarousel campaigns={sortedCampaigns} locale={locale} />
          <JoinBMSection
            title={{
              en: page.homePage.joinBreatheMongoliaTitle,
              mn: page.homePage.joinBreatheMongoliaTitleMn,
            }}
            locale={locale}
            descriptionHtml={{
              en: page.homePage.joinBreatheMongoliaDescription,
              mn: page.homePage.joinBreatheMongoliaDescriptionMn,
            }}
            slider={page.homePage.joinBreatheMongoliaImageSlider}
            countriesInfoText={page.homePage.countriesInfoText}
            volunteers={volunteers}
          />
          <OurPartners
            title={{
              en: page.homePage.partnersLogosTitle,
              mn: page.homePage.partnersLogosTitleMn,
            }}
            partnerLogos={page.homePage.partnersLogos}
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
  const isNotDev = process.env.NODE_ENV !== 'development'

  const purpleAirStations = isNotDev ? await fetchPurpleAirStations() : []
  const openAQStations = isNotDev ? await fetchOpenAQStations() : []

  // adding a isNotDev check to disable api calls locally as it consumes api credits
  const airVisualOutdoorStations = isNotDev ? await fetchAirVisualOutdoorStations() : []
  const airVisualIndoorStations = isNotDev ? await fetchAirVisualIndoorStations() : []
  // const airVisualGlobalRanks = isNotDev ? await fetchAirVisualGlobalStations() : []

  const stations = [...purpleAirStations, ...openAQStations, ...airVisualIndoorStations, ...airVisualOutdoorStations]
  const data = await getHomeLandingPageSettings()

  console.log(page)
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
      image: getTranslated(data.image?.node.mediaItemUrl, data.imageMn?.node.mediaItemUrl, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
