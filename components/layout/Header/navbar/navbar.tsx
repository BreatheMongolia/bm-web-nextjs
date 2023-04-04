import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import i18n from 'lib/i18n'
import Image from 'next/image'
import { MenuItem } from './menuItem'

export const Navbar = () => {
  const router = useRouter()
  const path = router.pathname.toLowerCase()
  const { t } = useTranslation()
  const matchUrl = `/${i18n.language}`
  return (
    <div className="w-full flex justify-between px-5 py-1 uppercase text-[13px] tracking-[1px] font-medium bg-white text-black">
      <a className="headerLogo" href={matchUrl}>
        <Image width={300} height={50} src="/images/logo.png" alt="Breathe Mongolia" />
      </a>
      <div className="flex items-center gap-6 ">
        <MenuItem title={t('nav.home')} href="/" isActive={path == '/'} />
        <MenuItem title={t('nav.takeAction')} href="/take-actions" isActive={path.includes('take-action')} />
        <MenuItem title={t('nav.news')} href="/news" isActive={path.includes('news')} />
        <MenuItem title={t('nav.agaarNeg')} href="www.agaarneg.com" target={'_blank'} isActive={false} />
        <MenuItem title={t('nav.aboutUs')} href="/about-us" isActive={path.includes('about-us')} />

        {/* GiveButter Button */}
        <button
          className="bg-action-red hover:bg-red-300 text-white rounded-md px-6 py-1.5 font-semibold tracking-[1px]"
          givebutter-element="button"
          givebutter-campaign="donatebreathemongolia"
          givebutter-theme="click-only"
          force-https="true"
        >
          {t('nav.donate')}
        </button>
      </div>
    </div>
  )
}
