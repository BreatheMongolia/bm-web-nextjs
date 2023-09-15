import ErrorPage from 'next/error'
import { AboutUsHeader, AboutUsInfoSection } from 'components/AboutUsPage'
import { GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPeople } from 'lib/graphql-api/queries/people'
import { getStories } from 'lib/graphql-api/queries/ourStories'
import { getTranslated } from 'lib/utils/getTranslated'
import AboutUsOurTeam from 'components/AboutUsPage/AboutUsOurTeam'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { OurPartners } from 'components/HomePage'
import AboutUsOurStory from 'components/AboutUsPage/AboutUsOurStory'

const VALID_ROUTES = [
  {
    route: 'info',
    title: 'subNavigationTabs.aboutUs',
  },
  {
    route: 'our-story',
    title: 'subNavigationTabs.ourStory',
  },
  {
    route: 'impact',
    title: 'subNavigationTabs.impact',
  },
  {
    route: 'our-team',
    title: 'subNavigationTabs.ourTeam',
  },
  {
    route: 'support-us',
    title: 'subNavigationTabs.supportUs',
  },
]

export default function AboutPageSection({ people, stories, page, locale }) {
  const router = useRouter()
  const { t, i18n } = useTranslation('about')

  if (router.isFallback) {
    return <div> Loading... </div>
  }

  if (!page || !page?.customFields) {
    return <ErrorPage statusCode={404} />
  }

  const getAboutSectionByRoute = (route: string) => {
    switch (route) {
      case '/about/info':
        return <AboutUsInfoSection />
      case '/about/our-story':
        return <AboutUsOurStory stories={stories} />
      case '/about/our-team':
        return <AboutUsOurTeam people={people} />
      case '/about/impact':
        return
      default:
        return <div> Not Found</div>
    }
  }
  return (
    <div>
      <AboutUsHeader />
      {/* Tab Navbar */}
      <div className="flex p-5 gap-4">
        {VALID_ROUTES.map((x, idx) => {
          return (
            <div key={idx} className="flex flex-1 text-center w-full">
              <Link href={`/about/${x.route}`} className="w-full hover:bg-gray-200 bg-gray-100">
                <div className="w-full p-5">{t(x.title)}</div>
              </Link>
            </div>
          )
        })}
      </div>
      {/* Content */}
      <div>{getAboutSectionByRoute(router.asPath)}</div>

      {router.asPath !== 'support-us' && (
        <div className="container mx-auto flex flex-col gap-20">
          <OurPartners
            title={{
              en: page.customFields.partnersLogosTitle,
              mn: page.customFields.partnersLogosTitleMn,
            }}
            partnerLogos={page.customFields.partnersLogos}
            locale={locale}
          />
        </div>
      )}
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

export const getStaticProps = async ({ locale }) => {
  const people = await getPeople()
  const stories = await getStories()
  const page = await getHomePage('/')

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about', 'common'])),
      people: getTransformedPeople(people, locale),
      stories: getAllStories(stories, locale),
      page,
      locale,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  return {
    paths: VALID_ROUTES.map(x => `/about/${x.route}`) || [],
    fallback: true,
  }
}
