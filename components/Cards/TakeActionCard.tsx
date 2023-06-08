import { ArrowLeftCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { TakeAction } from 'graphql/generated'
import { getImage } from 'lib/utils/getImage'
import router from 'next/router'

export const TakeActionCard = ({ takeAction }: { takeAction: TakeAction }) => {
  // console.log(takeAction);
  if (takeAction.featuredImage.node==null) {
    return
  }
  
  const featuredImageBox = getImage(
    takeAction.featuredImage.node?.mediaDetails,
    takeAction.featuredImage.node?.mediaItemUrl,
    takeAction.featuredImage.node?.mediaDetails,
    'medium_large',
  )
  const onCardClick = () => {
    if (takeAction.featuredImage.node) {
      window.open(takeAction.featuredImage.node?.mediaItemUrl, '_blank')
    // } else {
    //   router.push(`/take-actions/${takeAction.desiredSlug || takeAction.slug || takeAction.databaseId}`)
    }
  }
  return (
    <div
      className="relative transition-all bg-slate-300 rounded-md overflow-hidden cursor-pointer h-52 bg-cover bg-center group "
      style={takeAction.featuredImage.node!=null && { backgroundImage: `url(${featuredImageBox})` }}
      onClick={onCardClick}
    >
      <div className="flex flex-col h-full justify-end bg-gradient-to-t from-black/80 to-black/0 via-black/30 group-hover:from-black/90 group-hover:to-black/20 transition-all">
        {takeAction.featuredImage.node?.mediaItemUrl && (
          <div className="text-bm-blue text-sm font-semibold pt-2 flex-1">
            <div className="bg-white/95 flex gap-x-1 items-center px-2 py-0.5 rounded-r-md w-fit group-hover:bg-bm-blue group-hover:text-white transition-all group-hover:pl-5">
              {takeAction.customFields.typeOfAction[0].customFields.name}
              <ArrowLeftCircleIcon className="h-0 w-0 group-hover:h-4 group-hover:w-4" />
            </div>
          </div>
        )}

        <img className="object-fill max-w-none h-full" src={featuredImageBox} />
        <div className="w-full p-4 ">
          <div className="w-full text-white line-clamp-2"> {takeAction.customFields.title} </div>
        </div>
      </div>
    </div>
  )
}
