import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { News } from 'graphql/generated'
import { getTransformedNews } from 'lib/utils/gql-data-transform/getTransformedNews'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TbPointFilled } from 'react-icons/tb'

export const NewsCard = ({
  news,
  cardHeight = 'normal',
  className,
}: {
  news: News
  cardHeight?: 'normal' | 'fill'
  className?: string
}) => {
  const { t, i18n } = useTranslation()
  // News Card types can be: blog, external_link, video
  const router = useRouter()

  const [thumbnailURL, setThumbnailURL] = useState('')

  useEffect(() => {
    fetch('https://noembed.com/embed?url=' + news.customFields.sourceLink)
      .then(res => {
        return res.json()
      })
      .then(response => {
        setThumbnailURL(response.thumbnail_url)
      })
  }, [news])

  // transform the data
  const transformedNews = getTransformedNews(news, i18n.language === 'en' ? 'en' : 'mn')
  // handlers
  const onCardClick = () => {
    if (transformedNews.newsContentType) {
      switch (transformedNews.newsContentType.toLowerCase()) {
        case 'external':
          window.open(transformedNews.sourceLink, '_blank')
          return
        case 'video':
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
  if (backgroundImageUrl() === null) {
    console.log(news)
    console.log(transformedNews)
  }
  return (
    <div
      className={`relative bg-slate-300 rounded-md overflow-hidden cursor-pointer bg-cover bg-center group shadow ${
        cardHeight === 'normal' ? 'h-[250px]' : 'h-full'
      } ${className}`}
      style={{ backgroundImage: `url(${backgroundImageUrl()})` }}
      onClick={onCardClick}
    >
      <div className="flex flex-col h-full justify-end pr-10">
        {transformedNews.sourceLink && (
          <div className="text-bm-blue text-xs font-bold pt-1 flex-1 absolute top-0.5 left-0 z-20 right-10">
            <div className="bg-white/95 flex gap-x-1 items-center px-2 py-0.5 rounded-r-md w-fit group-hover:bg-bm-blue group-hover:text-white transition-all group-hover:pl-5 uppercase">
              {transformedNews.sourceName}
              <ArrowTopRightOnSquareIcon className="h-0 w-0 group-hover:h-4 group-hover:w-4" />
            </div>
          </div>
        )}
        {transformedNews.newsContentType === 'video' && (
          <div className="flex text-rose-500 items-center justify-center flex-auto absolute right-0 left-0 top-1/3">
            <PlayCircleIcon className="h-11 w-11 group-hover:h-12 group-hover:w-12 transition-all ease-in-out bg-white rounded-full" />
          </div>
        )}

        <div className="w-full px-5 mb-4 h-20 absolute bottom-0 z-30">
          {transformedNews.categories && (
            <div className="flex border-b-[0.5px] border-white w-fit text-[12px] font-bold my-2">
              {transformedNews.categories?.length > 2
                ? transformedNews.categories?.slice(0, 2).map((cat, idx) => (
                    <div key={idx}>
                      <div className="flex">
                        <TbPointFilled className="w-2 h-2 text-white mr-1 self-center " />
                        <span className=" text-white mr-1">{cat.name}</span>
                      </div>
                    </div>
                  ))
                : transformedNews.categories?.map((cat, idx) => (
                    <div key={idx} className="flex">
                      <TbPointFilled className="w-2 h-2 text-white mr-1 self-center " />
                      <span className=" text-white mr-1">{cat.name}</span>
                    </div>
                  ))}
            </div>
          )}
          <p className="w-full text-white line-clamp-2 text-[16px] leading-[130%]"> {transformedNews.title}</p>
        </div>
        <div className="absolute h-full w-full z-10 bg-gradient-to-t from-black/80 to-black/0 via-black/30 group-hover:from-black/90 group-hover:to-black/20 transition-all"></div>
      </div>
    </div>
  )
}
