import { AboutUsHeader, AboutUsSupportUs } from 'components/AboutUsPage'
import { OurPartners } from 'components/HomePage'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getHomePage, getVolunteers } from 'lib/graphql-api/queries/home'
import { getTranslated } from 'lib/utils/getTranslated'
import { getSupportUsSettings } from 'lib/graphql-api/queries/aboutUs'
import { getDonors } from 'lib/graphql-api/queries/donors'

export default function SupportUsPage({ page, volunteers, locale, donorTitle, donorDescription, donors }) {
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
        donors={donors}
        donorsTitle={donorTitle}
        donorDescription={donorDescription}
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

const getTransformedDonors = (donorsData: string | any[], locale: string) => {
  const people = []
  for (let i = 0; i < donorsData.length; i++) {
    people.push({
      name: getTranslated(donorsData[i].node.title, donorsData[i].node.donorFields.nameMn, locale),
      imgSrc: donorsData[i].node.donorFields.image.node.mediaItemUrl,
      description: getTranslated(
        donorsData[i].node.donorFields.description,
        donorsData[i].node.donorFields.descriptionMn,
        locale,
      ),
    })
  }

  return people
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const volunteers = await getVolunteers()
  const data = await getSupportUsSettings()
  const donors = await getDonors()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
      volunteers,
      locale,
      page,
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      image: getTranslated(data.image.node.mediaItemUrl, data.imageMn.node.mediaItemUrl, locale),
      donorTitle: getTranslated(data?.donorTitle, data?.donorTitleMn, locale),
      donorDescription: getTranslated(data.donorDescription, data.donorDescriptionMn, locale),
      donors: getTransformedDonors(donors, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
