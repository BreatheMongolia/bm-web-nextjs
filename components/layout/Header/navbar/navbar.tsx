import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MenuItem } from './menuItem'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { giveButterDialogAtom } from 'lib/consts/atoms'
import { getTranslated } from 'lib/utils/getTranslated'

export const Navbar = ({ projects }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const path = router.pathname.toLowerCase()
  const { t } = useTranslation('nav')
  const [_, setDialogOpen] = useAtom(giveButterDialogAtom)

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(false)
    }
  }, [router.asPath])

  return (
    <div className="">
      <div className="w-full uppercase text-xsm tracking-[1px] font-medium bg-white text-black">
        <div className="container flex justify-between items-center py-1 h-[80px] font-[Rubik]">
          <Link href="/" className="flex items-center">
            <img
              className="aspect-auto max-h-14 sm:max-h-16"
              src="/images/logo.png"
              width={255}
              height={55}
              alt="Breathe Mongolia"
            />
          </Link>
          <div className="items-center hidden gap-10 ml-8 lg:flex">
            <MenuItem title={t('home')} href="/" isActive={path == '/'} />
            <MenuItem title={t('takeAction')} href="/take-action" isActive={path.includes('action')} />
            <MenuItem title={t('policy')} href="/policy" isActive={path.includes('policy')} />
            <MenuItem title={t('health')} href="/health" isActive={path.includes('health')} />
            <MenuItem title={t('projects')} href="#" target={'_blank'} isActive={false}>
              <div>
                {projects.map((project, index) => (
                  <Link key={index} href={project.url} target={'_blank'}>
                    <div className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%] font-semibold">
                      {getTranslated(project.title, project.titleMn)}
                    </div>
                  </Link>
                ))}
              </div>
            </MenuItem>
            <MenuItem title={t('news')} href="/news" isActive={path.includes('news')} />
            <MenuItem title={t('aboutUs')} href="/about/info" isActive={path.includes('about')} />

            {/* GiveButter Button */}
            <button
              className="bg-action-red hover:bg-red-300 text-white rounded-md px-6 py-1.5 font-semibold tracking-[1px] cursor-pointer uppercase"
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              {t('donate')}
            </button>
          </div>
          {/* Added the pl-1 to make the div more clickable */}
          <div
            className="flex items-center justify-center pl-1 lg:hidden"
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
        transition-all ease-in-out duration-200 overflow-x-hidden
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <MenuItem title={t('home')} href="/" isActive={path == '/'} />
          <MenuItem title={t('takeAction')} href="/take-action" isActive={path.includes('take-action')} />
          <MenuItem title={t('policy')} href="/policy" isActive={path.includes('policy')} />
          <MenuItem title={t('health')} href="/health" isActive={path.includes('health')} />
          <MenuItem title={t('projects')} isActive={false}>
            <div>
              {projects.map((project, index) => (
                <Link key={index} href={project.url} target={'_blank'}>
                  <div className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%] font-semibold">
                    {getTranslated(project.title, project.titleMn)}
                  </div>
                </Link>
              ))}
            </div>
          </MenuItem>
          <MenuItem title={t('news')} href="/news" isActive={path.includes('news')} />
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
    </div>
  )
}
