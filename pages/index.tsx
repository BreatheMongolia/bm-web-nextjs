import Head from 'next/head'
import { GetStaticProps } from 'next'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { MapComponent, TakeActionCarousel, OurPartners, JoinBMSection, NewsCarousel } from 'components/HomePage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Page } from 'graphql/generated'
import { MapContextWrapper } from 'components/HomePage/MapComponent/MapContextWrapper'
import { useEffect } from 'react'

// TODO: Detect the current language and update fields based on the current language
// TODO: Add a util function to extract the correct image size for the imageUrl

export default function Index({ page }: { page: Page }) {
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
  // You can get the inner objects from the page object - it has all the content needed for the Components needed for the page.
  return (
    <div>
      <Head>
        <title>{`Breathe Mongolia - Clean Air Coalition`}</title>
      </Head>
      <div>
        <PageImageBanner
          imageUrl={{
            en: 'https://breathemon2.wpengine.com/wp-content/uploads/2022/12/banner2.png',
            mn: 'https://breathemon2.wpengine.com/wp-content/uploads/2022/12/banner2.png',
          }}
          bottomText={{
            left: page.customFields.bannerTextLeft,
            right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
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
            />
          </MapContextWrapper>

          {/* Add other page level components here */}
          <NewsCarousel featuredNews={page.customFields.featuredNews} />
          <TakeActionCarousel takeActionPosts={page.customFields.featuredTakeActions} />
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
export const getStaticProps: GetStaticProps = async ({ preview = false, locale }) => {
  const page = await getHomePage('/')
  // this return passes it to the above component
  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])), page },
    // This tells the page how often to refetch from the API (in seconds)
    revalidate: 60,
  }
}
