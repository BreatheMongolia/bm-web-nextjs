import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { News } from 'graphql/generated'
import { getTransformedNews } from 'lib/utils/gql-data-transform/getTransformedNews'
import { TbPointFilled } from 'react-icons/tb'
import { PlayCircleIcon } from '@heroicons/react/24/solid'

export const NewsHorizontalCard = ({ news, className }: { news: News; className?: string }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const transformedNews = getTransformedNews(news, i18n.language === 'en' ? 'en' : 'mn')

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
  return (
    <div
      className={`grid grid-cols-7 bg-white overflow-hidden shadow-lg rounded cursor-pointer ${className}`}
      onClick={onCardClick}
    >
      <div className="col-span-2 overflow-hidden max-h-[118px] relative">
        <img className="min-h-[118px] w-full" src={transformedNews.featuredImageBig} />
        {transformedNews.newsContentType === 'video' && (
          <div className="flex text-rose-500 items-center justify-center flex-auto absolute right-0 left-0 top-1/3">
            <PlayCircleIcon className="h-11 w-11 group-hover:h-12 group-hover:w-12 transition-all ease-in-out bg-white rounded-full" />
          </div>
        )}
      </div>
      <div className="col-span-5 px-5 py-3">
        <div className="text-xs flex mb-1">
          {transformedNews.categories &&
            transformedNews.categories.map((x, idx) => {
              console.log(x)
              return (
                <span className="flex" key={idx}>
                  <TbPointFilled className="w-2 h-2 mr-1 self-center " />
                  <span>{x.name}</span>
                </span>
              )
            })}
        </div>
        <span className="font-semibold">{transformedNews.title}</span>
      </div>
    </div>
  )
}
