import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import dayjs from 'dayjs'
import { EXTERNAL_URLS } from 'lib/consts/urls'
import Link from 'next/link'

export const Footer = () => {
  const [t, i18n] = useTranslation('footer')

  const FooterLinkSection = () => {
    const linkSections = [
      {
        title: t('titleExplore'),
        urls: [
          { title: t('nav.home'), url: '/' },
          { title: t('nav.news'), url: '/news' },
          { title: t('nav.agaarNeg'), url: EXTERNAL_URLS.AGAAR_NEG, target: '_blank' },
        ],
      },
      {
        title: t('title.getInvolved'),
        urls: [
          { title: t('nav.action'), url: '/take-actions' },
          { title: t('nav.waysToDonate'), url: '/about/supportus' },
          {
            title: t('nav.volunteer'),
            url: EXTERNAL_URLS.VOLUNTEER_FORM,
            target: '_blank',
          },
        ],
      },
      {
        title: t('title.aboutUs'),
        urls: [
          { title: t('nav.ourStory'), url: '/about' },
          { title: t('nav.impact'), url: '/about/impact' },
          { title: t('nav.ourTeam'), url: '/about/ourteam' },
        ],
      },
    ]
    return (
      <div className="border-t-4 border-bm-blue pt-10 pb-5 bg-inherit">
        <div className="container flex flex-col sm:grid sm:grid-cols-5 px-7 gap-2 uppercase tracking-widest text-slate-700 ">
          {linkSections.map((x, idx) => {
            return (
              <div key={idx}>
                <h2 className="font-bold text-lg"> {x.title} </h2>
                <div className="flex flex-col gap-4 text-sm font-semibold my-7">
                  {x.urls.map((url, i) => {
                    return (
                      <Link href={url.url} target={url.target} key={i} className="hover:text-bm-blue">
                        {url.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div className="col-span-2">
            <h2 className="font-bold text-lg mb-4 hidden sm:block"> {t('nav.join')} </h2>
          </div>
        </div>
      </div>
    )
  }
  const BottomFooter = () => {
    return (
      <div className="bg-bm-blue text-white py-5 px-7 sm:px-0">
        <div className="container flex text-xs gap-5">
          <div className="flex gap-1 flex-col sm:flex-row">
            <div className="h-20 w-20 relative bg-gray-300"></div>

            <div className="h-20 w-20 relative">
              <a href="https://www.guidestar.org/profile/83-4376042" target="_blank">
                <Image src="/images/candid-seal-gold-2023.png" alt="candidSeal" fill={true} />
              </a>
            </div>
          </div>
          <div className="text-xsm sm:text-sm font-normal leading-5">
            <p>
              ©2019-{dayjs().year().toString()}
              {t('copyright')} <br></br>
              {t('name')}
            </p>
            <p className="mt-4">{t('responsible')}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <FooterLinkSection />
      <BottomFooter />
    </>
  )
}
