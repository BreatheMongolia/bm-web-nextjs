import Image from 'next/image'
import teamBreatheMongolia from 'assets/images/teamBreatheMongolia.jpg'
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

export const AboutUsHeader = () => {
  const { t } = useTranslation('about')
  const pathname = usePathname()

  return (
    <div className="flex flex-col">
      <div className="grid sm:grid-cols-2 sm:grid-rows-1 w-full">
        {/* FIXME: Update the gradient color to match old */}
        <div className="hidden sm:flex sm:justify-center sm:items-center sm:bg-bm-blue sm:bg-gradient-to-r from-bm-blue to-[#61b1ee] text-white">
          <div className="p-5 sm:w-96 text-left">
            <h1 className="text-lg md:text-3xl mb-5 font-bold">{t('header.title')}</h1>
            <h1 className="text-sm">{t('header.description')}</h1>
          </div>
        </div>
        <div className="">
          <Image src={teamBreatheMongolia} alt="teamBreatheMongolia" width={1200} priority={true} />
        </div>
      </div>

      {/* Tab Navbar */}
      <div className="grid grid-cols-5 w-[800px] justify-evenly md:w-full md:justify-center bg-white shadow-lg uppercase text-sm">
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
