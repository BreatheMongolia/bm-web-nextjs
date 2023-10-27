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
    <div>
      <div className="grid sm:grid-cols-2 w-full">
        {/* FIXME: Update the gradient color to match old */}
        <div className="flex justify-center items-center bg-bm-blue bg-gradient-to-r from-bm-blue to-[#61b1ee] text-white">
          <div className="text-left w-96">
            <h1 className="text-3xl mb-5 font-bold">{t('header.title')}</h1>
            <h1 className="text-sm">{t('header.description')}</h1>
          </div>
        </div>
        <div className="relative">
          <Image src={teamBreatheMongolia} alt="teamBreatheMongolia" width={1200} priority={true} />
        </div>
      </div>

      {/* Tab Navbar */}
      <div className="tab-nav-container shadow-lg">
        {VALID_ROUTES.map((x, idx) => {
          return (
            <div key={'routes' + idx} className="flex flex-1 text-center w-full">
              <Link href={`/about/${x.route}`} className="w-full hover:bg-gray-100">
                <div className="tab-titles flex p-5">{t(x.title)}</div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
