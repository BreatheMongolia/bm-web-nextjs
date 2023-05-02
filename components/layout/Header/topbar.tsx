import { ArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { SOCIAL_URLS } from 'lib/consts/urls'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { SocialIcon } from 'react-social-icons'

type Option = {
  value: string
  label: any // react-dropdown Dropdown Option's label is React.ReactNode
}
const availableOptions: Option[] = [
  { value: 'en', label: 'ENG' },
  { value: 'mn', label: 'MNG' },
]

export const Topbar = () => {
  const socialUrls = [
    SOCIAL_URLS.FACEBOOK,
    SOCIAL_URLS.INSTAGRAM,
    SOCIAL_URLS.SLACK,
    SOCIAL_URLS.TWITTER,
    SOCIAL_URLS.LINKEDIN,
    SOCIAL_URLS.YOUTUBE,
  ]
  return (
    <div className="w-full bg-bm-blue text-white px-5 py-1">
      <div className="flex justify-end gap-x-2">
        {/* TODO: Replace with search bar */}
        <Link href="/search">
          <div className="h-[40px] w-[40px] hover:bg-black/10 rounded flex items-center justify-center">
            <MagnifyingGlassIcon className="h-6 w-6 -scale-x-100" />
          </div>
        </Link>
        {/* Social URLS */}
        {socialUrls.map((x, idx) => {
          return (
            <SocialIcon
              url={x}
              key={idx}
              target="_blank"
              bgColor="transparent"
              fgColor="#ffffff"
              className="hover:bg-black/10 rounded"
              style={{ height: 40, width: 40 }}
            />
          )
        })}
        {/* Language Selector */}
        {availableOptions.map((x, idx) => {
          return (
            <Link href="/" locale={x.value} key={idx}>
              {x.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
