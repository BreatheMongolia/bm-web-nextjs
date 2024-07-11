import { Fragment } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import SearchBar from 'components/SearchBar/SearchBar'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { giveButterDialogAtom } from 'lib/consts/atoms'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { MenuItem } from './navbar/menuItem'
import Image from 'next/image'
import logoWhite from 'assets/images/logoWhiteText.png'
import { getTranslated } from 'lib/utils/getTranslated'

type Option = {
  value: string
  label: string
}

type Options = {
  [key: string]: Option
}

const availableOptions: Options = {
  en: { value: 'en', label: 'ENG' },
  mn: { value: 'mn', label: 'MNG' },
}

export const Mobilebar = ({ projects }) => {
  const { locale } = useRouter()
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

  const getURL = () => {
    const baseUrl = window.location.origin
    let pathname = window.location.pathname
    pathname = pathname.replace(/^\/(en|mn)\b/, '')

    const searchParams = new URLSearchParams(window.location.search)
    const queryParams = searchParams.toString()

    const urlWithParams = `${baseUrl}${pathname}${queryParams ? '?' + queryParams : ''}`

    return urlWithParams
  }

  return (
    <div className="flex justify-between text-white pr-2 uppercase text-xsm tracking-[1px] font-medium">
      <div className="flex gap-x-2">
        <div
          id="mobile-menu"
          className={`bg-white w-full lg:hidden fixed py-10 flex flex-col gap-7 mt-12 h-full z-30 px-10 text-black
        uppercase text-lg font-semibold tracking-widest 
        transition-all ease-in-out duration-200
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <MenuItem title={t('home')} href="/" isActive={path == '/'} />
          <MenuItem title={t('takeAction')} href="/take-action" isActive={path.includes('take-action')} />
          <MenuItem title={t('news')} href="/news" isActive={path.includes('news')} />
          <MenuItem title={t('projects')} href="#" target={'_blank'} isActive={false}> 
            <div>
              {projects.map((project, index) => (
                <div key={index} className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%] font-semibold">
                  <Link href={project.url} target={'_blank'}>{getTranslated(project.title, project.titleMn)}</Link>
                </div>
              ))}
            </div>
          </MenuItem>
          <MenuItem title={t('aboutUs')} href="/about" isActive={path.includes('about')} />

          <hr className="border-slate-400" />
          {/* GiveButter Button */}
          <button
            className="bg-action-red hover:bg-red-300 text-white rounded-md px-6 py-1.5 font-semibold tracking-[1px] cursor-pointer"
            givebutter-element="button"
            givebutter-campaign="donatebreathemongolia"
            givebutter-theme="click-only"
            force-https="true"
            onClick={() => {
              setDialogOpen(true)
            }}
          >
            {t('donate')}
          </button>
        </div>
        <div
          className="lg:hidden flex items-center justify-center pl-1"
          onClick={() => {
            setMenuOpen(!isMenuOpen)
          }}
        >
          {isMenuOpen ? <XMarkIcon className="h-7 w-7 z-30" /> : <Bars3Icon className="h-7 w-7" />}
        </div>
      </div>

      <div className="pt-1">
        <SearchBar />
      </div>

      <Link href="/">
        <Image className="aspect-auto py-1 px-2" src={logoWhite} alt="Breathe Mongolia Header" />
      </Link>

      {/* Language Selector */}
      <Menu as="div" className="relative inline-flex items-center justify-center">
        <Menu.Button className="flex items-center justify-center rounded-md text-xs font-semibold text-white hover:bg-opacity-30">
          <div>{availableOptions[locale].label}</div>
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-40 right-0 mt-2 w-64 origin-top-right rounded-md bg-bm-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {Object.keys(availableOptions)
                .filter(x => x != locale)
                .map(key => {
                  const option: Option = availableOptions[key]

                  return (
                    <Menu.Item key={key}>
                      {({ active }) => (
                        <Link
                          className={`${
                            active ? 'text-white bg-white' : 'text-white'
                          } justify-center w-full group flex items-center rounded-md px-2 py-2 text-xs bg-opacity-10`}
                          href={getURL()}
                          locale={key}
                          scroll={false}
                        >
                          {option.label}
                        </Link>
                      )}
                    </Menu.Item>
                  )
                })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
