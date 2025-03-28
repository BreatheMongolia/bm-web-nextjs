import { AboutUsHeader } from 'components/AboutUsPage'
import AboutUsOurTeam from 'components/AboutUsPage/AboutUsOurTeam'
import { OurPartners } from 'components/HomePage'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getTranslated } from 'lib/utils/getTranslated'
import { getPeople } from 'lib/graphql-api/queries/people'
import { getOurTeamSettings } from 'lib/graphql-api/queries/aboutUs'

export default function OurTeamPage({ page, people, locale }) {
  return (
    <div className="flex flex-col bg-[#FAFAFF]">
      <AboutUsHeader />

      {/* Content */}
      <AboutUsOurTeam people={people} />

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

const getTransformedPeople = (PplData: string | any[], locale: string) => {
  const people = []
  for (let i = 0; i < PplData.length; i++) {
    people.push({
      name: getTranslated(PplData[i].node.title, PplData[i].node.personCustomFields.nameMn, locale),
      imgSrc: PplData[i].node.featuredImage.node.mediaItemUrl,
      role: getTranslated(PplData[i].node.personCustomFields.role, PplData[i].node.personCustomFields.roleMn, locale),
      description: getTranslated(
        PplData[i].node.personCustomFields.description,
        PplData[i].node.personCustomFields.descriptionMn,
        locale,
      ),
      memberSince: getTranslated(
        PplData[i].node.personCustomFields.memberSince,
        PplData[i].node.personCustomFields.memberSinceMn,
        locale,
      ),
      featured: PplData[i].node.personCustomFields.featured,
      linkedin: PplData[i].node.personCustomFields.linkedin,
      sortBy: PplData[i].node.personCustomFields.memberSince,
    })
  }

  return people
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const people = await getPeople()
  const data = await getOurTeamSettings()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
      people: getTransformedPeople(people, locale),
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
