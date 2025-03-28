import { AboutUsHeader, AboutUsSupportUs } from 'components/AboutUsPage'
import { OurPartners } from 'components/HomePage'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getHomePage, getVolunteers } from 'lib/graphql-api/queries/home'
import { getTranslated } from 'lib/utils/getTranslated'
import { getSupportUsSettings } from 'lib/graphql-api/queries/aboutUs'

export default function SupportUsPage({ page, volunteers, locale }) {
  return (
    <div className="flex flex-col bg-[#FAFAFF]">
      <AboutUsHeader />

      {/* Content */}
      <AboutUsSupportUs
        descriptionHtml={getTranslated(
          page.homePage.joinBreatheMongoliaDescription,
          page.homePage.joinBreatheMongoliaDescriptionMn,
          locale,
        )}
        volunteers={volunteers}
        countriesInfoText={page.homePage.countriesInfoText}
        locale={locale}
      />

      <div className="container mx-auto flex flex-col gap-20">
        <OurPartners
          title={{
            en: page?.homePage.partnersLogosTitle,
            mn: page?.homePage.partnersLogosTitleMn,
          }}
          partnerLogos={page?.homePage.partnersLogos}
          locale={locale}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const volunteers = await getVolunteers()
  const data = await getSupportUsSettings()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
      volunteers,
      locale,
      page,
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      image: getTranslated(data.image.node.mediaItemUrl, data.imageMn.node.mediaItemUrl, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
