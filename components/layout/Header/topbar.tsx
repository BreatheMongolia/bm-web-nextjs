import { ArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { SOCIAL_URLS } from 'lib/consts/urls'

export const Topbar = () => {
  const socialUrls = [
    {
      url: SOCIAL_URLS.FACEBOOK,
      title: 'Breathe Mongolia Facebook Page',
      icon: <ArrowUpIcon className="w-6 h-6" />,
    },
    {
      url: SOCIAL_URLS.INSTAGRAM,
      title: 'Follow our Breathe Mongolia Instagram',
      icon: <ArrowUpIcon className="w-6 h-6" />,
    },
    {
      url: SOCIAL_URLS.SLACK,
      title: 'Join our Slack Community',
      icon: <ArrowUpIcon className="w-6 h-6" />,
    },
  ]
  return (
    <div className="w-full bg-bm-blue text-white px-5 py-2">
      <div className="flex justify-end gap-x-2">
        {/* TODO: Replace with search bar */}
        <a href="#" target="_blank"></a>
        {/* Social URLS */}
        {socialUrls.map((x, idx) => {
          return (
            <a
              href={x.url}
              target="_blank"
              className="hover:bg-black/20 p-1 rounded transition-all ease-in-out"
              key={idx}
              title={x.title}
            >
              {x.icon}
            </a>
          )
        })}
        {/* Language Selector */}
      </div>
    </div>
  )
}

const IconButton = () => {}
