import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { News } from 'graphql/generated'
import { getImage } from 'lib/utils/getImage'
import { getTranslated } from 'lib/utils/getTranslated'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { TbPointFilled } from 'react-icons/tb'

export const NewsCard = ({
  news,
  cardHeight = 'normal',
  hasDarkOverlay = false,
}: {
  news: News
  cardHeight?: 'normal' | 'fill'
  hasDarkOverlay?: boolean
}) => {
  const { t, i18n } = useTranslation()
  // News Card types can be: blog, external_link, video

  const router = useRouter()

  // transform the data
  const transformedNews = getTransformedNews(news, i18n)
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

  return (
    <div
      className={`relative transition-all bg-slate-300 rounded-md overflow-hidden cursor-pointer bg-cover bg-center group ${
        cardHeight === 'normal' ? 'h-[250px]' : 'h-full'
      }`}
      style={{ backgroundImage: `url(${transformedNews})` }}
      onClick={onCardClick}
    >
      <div className="flex flex-col h-full justify-end">
        {transformedNews.sourceLink && (
          <div className="text-bm-blue text-sm font-semibold pt-2 flex-1 absolute top-1 left-0 z-20">
            <div className="bg-white/95 flex gap-x-1 items-center px-2 py-0.5 rounded-r-md w-fit group-hover:bg-bm-blue group-hover:text-white transition-all group-hover:pl-5">
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

        <div className="h-full top-0 left-0 z-0 text-center">
          <img className="object-cover h-full " src={transformedNews.featuredImageBig} />
        </div>
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

// util function
function getTransformedNews(news: News, locale) {
  return {
    id: news.databaseId,
    desiredSlug: news.desiredSlug,
    slug: news.slug,
    sourceLink: news.customFields?.sourceLink,
    title:
      getTranslated(news.customFields?.title, news.customFields?.titleMn, locale) !== null
        ? getTranslated(news.customFields?.title, news.customFields?.titleMn, locale)
        : '',
    sourceName:
      getTranslated(news.customFields?.sourceName, news.customFields?.sourceNameMn, locale) !== null
        ? getTranslated(news.customFields?.sourceName, news.customFields?.sourceNameMn, locale)
        : '',
    sourceLanguage: news.customFields?.sourceLanguage,
    homePageFeatured: news.customFields?.homePageFeatured,
    categories: news?.categories?.nodes?.map((cat: any) => {
      return {
        name:
          getTranslated(cat.categoryCustomFields?.name, cat.categoryCustomFields?.nameMn, locale) !== null
            ? getTranslated(cat.categoryCustomFields?.name, cat.categoryCustomFields?.nameMn, locale)
            : '',
      }
    }),
    newsContentType: news.customFields?.newsContentType,
    featuredImageSmall: getImage(
      news.customFields?.featuredImage.image?.mediaDetails,
      news.customFields?.featuredImage.imageMn?.mediaDetails,
      news.featuredImage?.node?.mediaDetails,
      'medium_large',
    ),
    featuredImageBig: getImage(
      news.customFields?.featuredImage.image?.mediaDetails,
      news.customFields?.featuredImage.imageMn?.mediaDetails,
      news.featuredImage?.node?.mediaDetails,
      'medium_large',
    ),
  }
}
