import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { News } from 'graphql/generated'
import { getTransformedNews } from 'lib/utils/gql-data-transform/getTransformedNews'
import { TbPointFilled } from 'react-icons/tb'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { videoNewsDialogAtom } from 'lib/consts/atoms'

export const NewsHorizontalCard = ({ news, className }: { news: News; className?: string }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [thumbnailURL, setThumbnailURL] = useState('')
  const [_, setVideoDialogUrl] = useAtom(videoNewsDialogAtom)

  useEffect(() => {
    fetch('https://noembed.com/embed?url=' + news.newsCustomFields.sourceLink)
      .then(res => {
        return res.json()
      })
      .then(response => {
        setThumbnailURL(response.thumbnail_url)
      })
  }, [news])

  const transformedNews = getTransformedNews(news, i18n.language === 'en' ? 'en' : 'mn')

  const onCardClick = () => {
    if (transformedNews.newsContentType) {
      switch (transformedNews.newsContentType.toLowerCase()) {
        case 'external':
          window.open(transformedNews.sourceLink, '_blank')
          return
        case 'video':
          setVideoDialogUrl(transformedNews.sourceLink)
          return
        default:
          router.push(`/news/${transformedNews.desiredSlug || transformedNews.slug || transformedNews.id}`)
          return
      }
    }
  }
  const backgroundImageUrl = () => {
    if (transformedNews.newsContentType === 'video') {
      return thumbnailURL
    }
    return transformedNews.featuredImageSmall ?? transformedNews.featuredImageBig
  }

  return (
    <div
      className={`grid grid-cols-7 group bg-white overflow-hidden shadow-lg rounded cursor-pointer hover:bg-gray-50 ${className}`}
      onClick={onCardClick}
    >
      <div
        className="col-span-2 overflow-hidden max-h-[118px] relative bg-black bg-cover bg-center min-h-[118px]"
        style={{ backgroundImage: `url(${backgroundImageUrl()})` }}
      >
        {/* <img className="min-h-[118px] w-full group-hover:opacity-80" src={transformedNews.featuredImageBig} /> */}
        {transformedNews.newsContentType === 'video' && (
          <div className="flex text-rose-500 items-center justify-center flex-auto absolute right-0 left-0 top-1/3">
            <PlayCircleIcon className="h-11 w-11 group-hover:h-12 group-hover:w-12 transition-all ease-in-out bg-white rounded-full" />
          </div>
        )}
      </div>
      <div className="col-span-5 px-5 py-3 flex flex-col">
        <div className="text-[10px] sm:text-xs flex mb-1">
          {transformedNews.categories &&
            transformedNews.categories.map((x, idx) => {
              if (idx >= 2) {
                return
              }
              return (
                <span className="flex" key={idx}>
                  <TbPointFilled className="w-2 h-2 mr-1 self-center " />
                  <span>{x.name}</span>
                </span>
              )
            })}
        </div>
        <span className="font-semibold grow text-sm">
          <span className="line-clamp-3">{transformedNews.title}</span>
        </span>
        <span className="block text-xs w-full text-right text-gray-500">
          {dayjs(transformedNews.dateGmt).format(i18n.language === 'en' ? 'MM/DD/YYYY' : 'YYYY/MM/DD')}
        </span>
      </div>
    </div>
  )
}
