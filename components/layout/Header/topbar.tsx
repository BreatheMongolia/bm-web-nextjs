import { Fragment } from 'react'
import { SOCIAL_URLS } from 'lib/consts/urls'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import SearchBar from 'components/SearchBar/SearchBar'

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

const socialUrls: string[] = [SOCIAL_URLS.FACEBOOK, SOCIAL_URLS.INSTAGRAM, SOCIAL_URLS.SLACK, SOCIAL_URLS.TWITTER]
const socialUrlsDesktop: string[] = [SOCIAL_URLS.LINKEDIN, SOCIAL_URLS.YOUTUBE]

export const Topbar = () => {
  const { locale } = useRouter()

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
    <div className="w-full bg-bm-blue text-white px-5 py-1">
      <div className="flex justify-end gap-x-2">
        <SearchBar />

        {/* Social URLS */}
        {socialUrls.map((x, idx) => {
          return (
            <SocialIcon
              url={x}
              target="_blank"
              key={idx}
              bgColor="transparent"
              fgColor="#ffffff"
              className={`hover:bg-black/10 rounded`}
              style={{ height: 40, width: 40 }}
            />
          )
        })}
        {socialUrlsDesktop.map((x, idx) => {
          return (
            <SocialIcon
              url={x}
              target="_blank"
              key={idx}
              bgColor="transparent"
              fgColor="#ffffff"
              className={`hover:bg-black/10 rounded hidden md:block`}
              style={{ height: 40, width: 40 }}
            />
          )
        })}
        {/* Language Selector */}
        <Menu as="div" className="relative inline-flex items-center justify-center">
          <Menu.Button className="flex w-full items-center justify-center rounded-md text-xs font-semibold text-white hover:bg-opacity-30">
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
    </div>
  )
}
