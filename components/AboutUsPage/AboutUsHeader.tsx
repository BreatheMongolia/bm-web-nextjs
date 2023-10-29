import Image from 'next/image'
import teamBreatheMongolia from 'assets/images/teamBreatheMongolia.jpg'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

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

  return (
    <div className="flex flex-col">
      <div className="grid sm:grid-cols-2 sm:grid-rows-1 w-full">
        {/* FIXME: Update the gradient color to match old */}
        <div className="hidden sm:flex sm:justify-center sm:items-center sm:bg-bm-blue sm:bg-gradient-to-r from-bm-blue to-[#61b1ee] text-white">
          <div className="p-5 sm:w-96 text-left">
            <h1 className="text-3xl mb-5 font-bold">{t('header.title')}</h1>
            <h1 className="text-sm">{t('header.description')}</h1>
          </div>
        </div>
        <div className="">
          <Image src={teamBreatheMongolia} alt="teamBreatheMongolia" width={1200} priority={true} />
        </div>
      </div>

      {/* Tab Navbar */}
      <div className="grid grid-cols-5 bg-white tab-nav-container shadow-lg">
        {VALID_ROUTES.map((x, idx) => {
          return (
            <div key={'routes' + idx} className="flex flex-1 text-center w-full">
              <Link href={`/about/${x.route}`} className="w-full hover:bg-gray-100">
                <div className="tab-titles py-5 px-2">{t(x.title)}</div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
