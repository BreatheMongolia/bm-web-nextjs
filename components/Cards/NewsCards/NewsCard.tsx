import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { News } from 'graphql/generated'
import { getImage } from 'lib/utils/getImage'
import router from 'next/router'
import { TbPointFilled } from 'react-icons/tb'

export const NewsCard = ({ news }: { news: any }) => {
  // News Card types can be: blog, external_link, video

  const onCardClick = () => {
    if (news.newsContentType) {
      switch (news.newsContentType.toLowerCase()) {
        case 'external':
          window.open(news.sourceLink, '_blank')
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
      style={{ backgroundImage: `url(${news.featuredImageBig})` }}
      onClick={onCardClick}
    >
      <div className="flex flex-col h-full justify-end bg-gradient-to-t from-black/80 to-black/0 via-black/30 group-hover:from-black/90 group-hover:to-black/20 transition-all">
        {news.sourceLink && (
          <div className="text-bm-blue text-sm font-semibold pt-2 flex-1">
            <div className="bg-white/95 flex gap-x-1 items-center px-2 py-0.5 rounded-r-md w-fit group-hover:bg-bm-blue group-hover:text-white transition-all group-hover:pl-5">
              {news.sourceName}
              <ArrowTopRightOnSquareIcon className="h-0 w-0 group-hover:h-4 group-hover:w-4" />
            </div>
          </div>
        )}
        {news.newsContentType === 'video' && (
          <div className="flex text-rose-500 items-center justify-center flex-auto absolute right-0 left-0 top-1/3">
            <PlayCircleIcon className="h-11 w-11 group-hover:h-12 group-hover:w-12 transition-all ease-in-out bg-white rounded-full" />
          </div>
        )}

        <img className="object-fill max-w-none h-full" src={news.featuredImageBig} />
        <div className="w-full px-5 mb-4 h-20 absolute bottom-0  ">
          {news.categories && (
            <div className="flex border-b-[0.5px] border-white w-fit text-[12px] font-bold my-2">
              {news.categories?.length > 2
                ? news.categories?.slice(0, 2).map((cat, idx) => (
                    <div key={idx}>
                      <div className="flex">
                        <TbPointFilled className="w-2 h-2 text-white mr-1 self-center " />
                        <span className=" text-white mr-1">{cat.name}</span>
                      </div>
                    </div>
                  ))
                : news.categories?.map((cat, idx) => (
                    <div key={idx} className="flex">
                      <TbPointFilled className="w-2 h-2 text-white mr-1 self-center " />
                      <span className=" text-white mr-1">{cat.name}</span>
                    </div>
                  ))}
            </div>
          )}
          <p className="w-full text-white line-clamp-2 text-[16px] leading-[130%]"> {news.title}</p>
        </div>
      </div>
    </div>
  )
}
