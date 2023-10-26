import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { MenuItem } from './menuItem'
import SimpleButton from 'components/generic/SimpleButton'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const path = router.pathname.toLowerCase()
  const { t } = useTranslation('nav')

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(false)
    }
  }, [router.asPath])

  return (
    <div className="">
      <div className="w-full flex justify-between px-2 sm:px-5 py-1 uppercase text-xsm tracking-[1px] font-medium bg-white text-black">
        <Link href="/">
          <img className="aspect-auto max-h-14 sm:max-h-16 mb-2" src="/images/logo.png" alt="Breathe Mongolia" />
        </Link>
        <div className="items-center gap-10 hidden lg:flex">
          <MenuItem title={t('home')} href="/" isActive={path == '/'} />
          <MenuItem title={t('takeAction')} href="/take-actions" isActive={path.includes('take-action')} />
          <MenuItem title={t('news')} href="/news" isActive={path.includes('news')} />
          <MenuItem title={t('agaarNeg')} href="http://www.agaarneg.mn" target={'_blank'} isActive={false} />
          <MenuItem title={t('aboutUs')} href="/about/info" isActive={path.includes('about/info')} />

          {/* GiveButter Button */}
          <button
            className="bg-action-red hover:bg-red-300 text-white rounded-md px-6 py-1.5 font-semibold tracking-[1px] cursor-pointer"
            givebutter-element="button"
            givebutter-campaign="donatebreathemongolia"
            givebutter-theme="click-only"
            force-https="true"
          >
            {t('donate')}
          </button>
        </div>
        {/* Added the pl-1 to make the div more clickable */}
        <div
          className="lg:hidden flex items-center justify-center pl-1"
          onClick={() => {
            setMenuOpen(!isMenuOpen)
          }}
        >
          {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`bg-white w-full lg:hidden fixed py-10 flex flex-col gap-7 h-full z-30 px-10 
        uppercase text-lg font-semibold tracking-widest
        transition-all ease-in-out duration-200
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <MenuItem title={t('home')} href="/" isActive={path == '/'} />
        <MenuItem title={t('takeAction')} href="/take-actions" isActive={path.includes('take-action')} />
        <MenuItem title={t('news')} href="/news" isActive={path.includes('news')} />
        <MenuItem title={t('agaarNeg')} href="http://www.agaarneg.mn" target={'_blank'} isActive={false} />
        <MenuItem title={t('aboutUs')} href="/about" isActive={path.includes('about')} />

        <hr className="border-slate-400" />
        {/* GiveButter Button */}
        <button
          className="bg-action-red hover:bg-red-300 text-white rounded-md px-6 py-1.5 font-semibold tracking-[1px] cursor-pointer"
          givebutter-element="button"
          givebutter-campaign="donatebreathemongolia"
          givebutter-theme="click-only"
          force-https="true"
        >
          {t('donate')}
        </button>
      </div>
    </div>
  )
}
