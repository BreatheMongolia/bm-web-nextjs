import { AboutUsHeader, AboutUsInfoSection } from 'components/AboutUsPage'
import { GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const VALID_ROUTES = [
  {
    route: 'info',
    title: 'subNavigationTabs.aboutUs',
  },
  {
    route: 'our-story',
    title: 'subNavigationTabs.aboutUs',
  },
  {
    route: 'impact',
    title: 'subNavigationTabs.aboutUs',
  },
  {
    route: 'our-team',
    title: 'subNavigationTabs.aboutUs',
  },
  {
    route: 'support-us',
    title: 'subNavigationTabs.aboutUs',
  },
]

export default function AboutPageSection({}) {
  const router = useRouter()
  const { t, i18n } = useTranslation('about')

  const getAboutSectionByRoute = (route: string) => {
    console.log(route)
    switch (route) {
      case '/about/info':
        return <AboutUsInfoSection />
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
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
  },
})

export const getStaticPaths: GetStaticPaths = async ({}) => {
  return {
    paths: VALID_ROUTES.map(x => `/about/${x.route}`) || [],
    fallback: true,
  }
}
