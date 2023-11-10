import { AboutUsHeader, AboutUsOurStory } from 'components/AboutUsPage'
import { OurPartners } from 'components/HomePage'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getTranslated } from 'lib/utils/getTranslated'
import { getStories } from 'lib/graphql-api/queries/ourStories'

export default function OurStoryPage({ page, stories, locale }) {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFF] overflow-x-hidden">
      <AboutUsHeader />

      {/* Content */}
      <AboutUsOurStory stories={stories} />

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

const getAllStories = (StoriesData: string | any[], locale: string) => {
  const stories = []
  for (let i = 0; i < StoriesData.length; i++) {
    stories.push({
      title: getTranslated(StoriesData[i].node.customFields.title, StoriesData[i].node.customFields.titleMn, locale),
      description: getTranslated(
        StoriesData[i].node.customFields.description,
        StoriesData[i].node.customFields.descriptionMn,
        locale,
      ),
    })
  }
  return stories
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const stories = await getStories()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
      stories: getAllStories(stories, locale),
      locale,
      page,
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
