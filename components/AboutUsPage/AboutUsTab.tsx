import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export const AboutUsTab = () => {
  const { t } = useTranslation('about')
  const pathname = usePathname()

  return (
    <div className="flex flex-col overflow-y-hidden md:overflow-visible">
      <div className="grid grid-cols-5 w-[800px] md:w-full md:justify-center bg-white shadow-lg uppercase text-sm">
        {VALID_ROUTES.map((x, idx) => {
          return (
            <div
              key={'routes' + idx}
              className={
                pathname === `/about/${x.route}` ? 'font-medium text-bm-blue border-b border-solid border-bm-blue' : ''
              }
            >
              <Link href={`/about/${x.route}`} className="flex flex-1 w-auto my-5 justify-center">
                <div className="">{t(x.title)}</div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
