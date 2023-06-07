import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { News } from 'graphql/generated'
import { getImage } from 'lib/utils/getImage'
import router from 'next/router'

export const NewsCard = ({ news }: { news: News }) => {
  // News Card types can be: blog, external_link, video

  const featuredImageBig = getImage(
    news.customFields.featuredImage.image?.mediaDetails,
    news.customFields.featuredImage.imageMn?.mediaDetails,
    news.featuredImage?.node?.mediaDetails,
    'medium_large',
  )
  const onCardClick = () => {
    if (news.customFields.newsContentType) {
      switch (news.customFields.newsContentType.toLowerCase()) {
        case 'external':
          window.open(news.customFields.sourceLink, '_blank')
          return
        case 'video':
          return
        default:
          router.push(`/news/${news.desiredSlug || news.slug || news.databaseId}`)
          return
      }
    }
  }
  return (
    <div
      className="relative transition-all bg-slate-300 rounded-md overflow-hidden cursor-pointer  bg-cover bg-center group w-[330px] h-[250px] "
      style={{ backgroundImage: `url(${featuredImageBig})` }}
      onClick={onCardClick}
    >
      <div className="flex flex-col h-full justify-end bg-gradient-to-t from-black/80 to-black/0 via-black/30 group-hover:from-black/90 group-hover:to-black/20 transition-all">
        {news.customFields.sourceLink && (
          <div className="text-bm-blue text-sm font-semibold pt-2 flex-1">
            <div className="bg-white/95 flex gap-x-1 items-center px-2 py-0.5 rounded-r-md w-fit group-hover:bg-bm-blue group-hover:text-white transition-all group-hover:pl-5">
              {news.customFields.sourceNameMn}
              <ArrowTopRightOnSquareIcon className="h-0 w-0 group-hover:h-4 group-hover:w-4" />
            </div>
          </div>
        )}
        {news.customFields.newsContentType === 'video' && (
          <div className="flex text-rose-500 items-center justify-center flex-auto">
            <PlayCircleIcon className="h-11 w-11 group-hover:h-12 group-hover:w-12 transition-all ease-in-out bg-white rounded-full" />
          </div>
        )}

        {/* <img className="object-fill max-w-none h-full" src={featuredImageBig} /> */}
        <div className="w-full p-4 ">
          <div className="w-full text-white line-clamp-2 top-0"> {news.customFields.titleMn} </div>
        </div>
      </div>
    </div>
  )
}
