import { AboutUsHeader } from 'components/AboutUsPage'
import AboutUsOurTeam from 'components/AboutUsPage/AboutUsOurTeam'
import { OurPartners } from 'components/HomePage'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getTranslated } from 'lib/utils/getTranslated'
import { getPeople } from 'lib/graphql-api/queries/people'

export default function OurTeamPage({ page, people, locale }) {
  return (
    <div className="flex flex-col bg-[#FAFAFF]">
      <AboutUsHeader />

      {/* Content */}
      <AboutUsOurTeam people={people} />

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

const getTransformedPeople = (PplData: string | any[], locale: string) => {
  const people = []
  for (let i = 0; i < PplData.length; i++) {
    people.push({
      name: getTranslated(PplData[i].node.title, PplData[i].node.customFields.nameMn, locale),
      imgSrc: PplData[i].node.featuredImage.node.mediaItemUrl,
      role: getTranslated(PplData[i].node.customFields.role, PplData[i].node.customFields.roleMn, locale),
      description: getTranslated(
        PplData[i].node.customFields.description,
        PplData[i].node.customFields.descriptionMn,
        locale,
      ),
      memberSince: getTranslated(
        PplData[i].node.customFields.memberSince,
        PplData[i].node.customFields.memberSinceMn,
        locale,
      ),
      featured: PplData[i].node.customFields.featured,
      linkedin: PplData[i].node.customFields.linkedin,
      sortBy: PplData[i].node.customFields.memberSince,
    })
  }

  return people
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const people = await getPeople()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
      people: getTransformedPeople(people, locale),
      locale,
      page,
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
