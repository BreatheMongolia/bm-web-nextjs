import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { News } from 'graphql/generated'
import { getImage } from 'lib/utils/getImage'
import router from 'next/router'
import { TbPointFilled } from 'react-icons/tb'

export const NewsCard = ({ news }: { news: News }) => {
  // News Card types can be: blog, external_link, video

  const featuredImageBig = getImage(
    news.customFields.featuredImage.image?.mediaDetails,
    news.customFields.featuredImage.imageMn?.mediaDetails,
    news.featuredImage?.node?.mediaDetails,
    'medium',
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
          <div className="flex text-rose-500 items-center justify-center flex-auto absolute right-0 left-0 top-1/3">
            <PlayCircleIcon className="h-11 w-11 group-hover:h-12 group-hover:w-12 transition-all ease-in-out bg-white rounded-full" />
          </div>
        )}

        {/* <img className="object-fill max-w-none h-full" src={featuredImageBig} /> */}
        <div className="w-full px-5 mb-4 h-20 absolute bottom-0  ">
          {news.categories && (
            <div className="category flex border-b-[0.5px] border-white w-fit  text-[12px] font-bold my-2">
              {news.categories?.nodes.length > 2
                ? news.categories?.nodes?.slice(0, 2).map((data: any) => (
                    <div key={Math.random()}>
                      <div key={Math.random()}>
                        <TbPointFilled className="w-2 h-2 text-white mr-1 self-center " />
                        <span className=" text-white mr-1">{data.categoryCustomFields.name}</span>
                      </div>
                    </div>
                  ))
                : news.categories?.nodes.map((data: any) => (
                    <div className="flex ">
                      <TbPointFilled className="w-2 h-2 text-white mr-1 self-center " />
                      <span className=" text-white mr-1">{data.categoryCustomFields.name}</span>
                    </div>
                  ))}
            </div>
          )}
          <p className="w-full text-white line-clamp-2 text-[16px] leading-[130%]"> {news.customFields.titleMn}</p>
        </div>
      </div>
    </div>
  )
}
