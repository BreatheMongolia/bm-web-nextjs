import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import footerLogoBM from 'assets/images/footerLogo.png'
import dayjs from 'dayjs'
import { EXTERNAL_URLS, SOCIAL_URLS } from 'lib/consts/urls'
import Link from 'next/link'
import Subscribe from 'components/Subscribe/Subscribe'
import { SocialIcon } from 'react-social-icons'

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
          { title: t('nav.action'), url: '/take-action' },
          { title: t('nav.waysToDonate'), url: '/about/support-us' },
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
          { title: t('nav.ourStory'), url: '/about/our-story' },
          { title: t('nav.impact'), url: '/about/impact' },
          { title: t('nav.ourTeam'), url: '/about/our-team' },
        ],
      },
    ]
    return (
      <div className="container flex flex-col uppercase tracking-widest text-slate-700">
        {/* Desktop */}
        <div className="hidden sm:grid md:grid-row-2 lg:grid-cols-2 lg:gap-5 xl:gap-20">
          <div className="flex flex-row justify-between">
            {linkSections.map((x, idx) => {
              return (
                <div key={'footer' + idx}>
                  <h2 className="font-bold text-lg min-w-max">{x.title}</h2>
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
          </div>
          <div className="flex md:flex-row lg:flex-col gap-5">
            <h2 className="font-bold text-lg">{t('nav.join')} </h2>
            <div className="flex flex-col grow">
              <div className="flex gap-7 pb-5">
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
              <div className="block">
                <Subscribe />
              </div>
            </div>
          </div>
        </div>
        {/* Mobile */}
        <div className="flex flex-col sm:hidden w-[100%]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-5">
              {linkSections.map((x, idx) => {
                return (
                  <div key={'footer' + idx}>
                    <h2 className="font-bold text-lg min-w-max">{x.title}</h2>
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
            </div>
            <div className="flex flex-col w-[50px] gap-16">
              {socialUrls.map((x, idx) => {
                return (
                  <div key={'social' + idx} className=" h-11 w-11 border-solid border-[#3174D0] border-2 rounded-full ">
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
          </div>
          <Subscribe />
        </div>
      </div>
    )
  }

  const BottomFooter = () => {
    return (
      <div className="container flex flex-row gap-5">
        <div className="flex gap-1 flex-col sm:flex-row static">
          <div className="h-20 w-20 relative">
            <Image src={footerLogoBM} alt="footerLogoBM" />
          </div>
          <div className="h-20 w-20 relative">
            <Link href="https://www.guidestar.org/profile/83-4376042" target={'_blank'}>
              <Image src="/images/candid-seal-gold-2023.png" alt="candidSeal" width={77} height={77} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-xs font-normal">
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
      <div className="flex flex-row border-t-4 border-bm-blue pt-10 pb-5 bg-inherit">
        <FooterLinkSection />
      </div>
      <div className="flex flex-row bg-bm-blue text-white py-5">
        <BottomFooter />
      </div>
    </>
  )
}
