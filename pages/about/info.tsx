import { AboutUsHeader, AboutUsInfoSection } from 'components/AboutUsPage'
import { OurPartners } from 'components/HomePage'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getInfoSettings } from 'lib/graphql-api/queries/aboutUs'
import { getTranslated } from 'lib/utils/getTranslated'

export default function InfoSectionPage({ page, locale }) {
  return (
    <div className="flex flex-col bg-[#FAFAFF]">
      <AboutUsHeader />

      {/* Content */}
      <AboutUsInfoSection />

      <div className="container mx-auto flex flex-col gap-20">
        <OurPartners
          title={{
            en: page?.customFields.partnersLogosTitle,
            mn: page?.customFields.partnersLogosTitleMn,
          }}
          partnerLogos={page?.customFields.partnersLogos}
          locale={locale}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const data = await getInfoSettings()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
      locale,
      page,
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      image: getTranslated(data.image.mediaItemUrl, data.imageMn.mediaItemUrl, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}

