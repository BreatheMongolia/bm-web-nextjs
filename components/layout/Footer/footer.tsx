import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import dayjs from 'dayjs'
import { EXTERNAL_URLS } from 'lib/consts/urls'
import Link from 'next/link'
import FooterLogo from 'assets/icons/FooterLogo'
import Subscribe from 'components/Subscribe/Subscribe'
import { SocialIcon } from 'react-social-icons'
import { SOCIAL_URLS } from 'lib/consts/urls'

export const Footer = () => {
  const { t } = useTranslation('footer')
  const socialUrls = [
    SOCIAL_URLS.INSTAGRAM,
    SOCIAL_URLS.FACEBOOK,
    SOCIAL_URLS.LINKEDIN,
    SOCIAL_URLS.TWITTER,
    SOCIAL_URLS.YOUTUBE,
    SOCIAL_URLS.SLACK,
  ]
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
          { title: t('nav.ourStory'), url: '/about/info' },
          { title: t('nav.impact'), url: '/about/impact' },
          { title: t('nav.ourTeam'), url: '/about/ourteam' },
        ],
      },
    ]
    return (
      <div className="container">
        <div className="uppercase tracking-widest text-slate-700 mobileRelative">
          <div className="footer_link_section ">
            {linkSections.map((x, idx) => {
              return (
                <div key={'footer' + idx}>
                  <h2 className="font-bold text-lg min-w-max"> {x.title} </h2>
                  <div className="flex flex-col text-sm font-semibold my-7">
                    {x.urls.map((url, i) => {
                      return (
                        <Link href={url.url} target={url.target} key={'url' + i} className="hover:text-bm-blue my-2">
                          {url.title}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div className="contact_section">
              <h2 className="font-bold text-lg mb-4 hidden sm:block"> {t('nav.join')} </h2>
              <div className=" social_icons_div flex justify-between w-[450px] pb-10">
                {socialUrls.map((x, idx) => {
                  return (
                    <div
                      key={'social' + idx}
                      className=" h-11 w-11 border-solid border-[#3174D0] border-2 rounded-full "
                    >
                      <SocialIcon
                        url={x}
                        target="_blank"
                        bgColor="transparent"
                        fgColor="#3174D0"
                        className="hover:bg-black/10 rounded-full"
                        style={{ height: 40, width: 40 }}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="mobile_style">
                <Subscribe languageJson={'footer'} isFooter={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const BottomFooter = () => {
    return (
      <div className="container flex text-xs gap-5">
        <div className="flex gap-1 flex-col sm:flex-row static">
          <div className="h-20 w-20 relative">
            <FooterLogo />
          </div>
          <div className="h-20 w-20 relative">
            <Link href="https://www.guidestar.org/profile/83-4376042" target={'_blank'}>
              <Image src="/images/candid-seal-gold-2023.png" alt="candidSeal" width={77} height={77} />
            </Link>
          </div>
        </div>
        <div className="text-xs font-normal">
          <p>
            ©2019-{dayjs().year().toString()}
            {t('copyright')}
          </p>
          <p className="mt-1">{t('name')}</p>
          <p className="mt-4">{t('responsible')}</p>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="footer_wrapper border-t-4 border-bm-blue pt-10 pb-5 bg-inherit">
        <FooterLinkSection />
      </div>
      <div className="bottom_wrapper bg-bm-blue text-white py-5">
        <BottomFooter />
      </div>
    </>
  )
}
