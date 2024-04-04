import React from 'react'
import Link from 'next/link'
import { RecommendationType } from 'lib/air-pollution-map/types'
import { getTranslated } from 'lib/utils/getTranslated'

export const RecommendationCard = ({
  slug,
  icon,
  comment,
  commentMn,
  locale,
}: {
  slug: string
  icon: any
  comment: string
  commentMn: string
  locale: string
}) => {
  return (
    <>
      <div
      // className={`${bgColors.otherBox} rounded p-1 md:p-3 flex flex-col md:flex-row text-center md:text-left gap-2 items-center justify-center`}
      >
        <Link href={`/action/${slug}`}>
          <div className={`recommend_icon ${icon}`}></div>
          <div className="text-xs font-semibold">{getTranslated(comment, commentMn, locale)}</div>
        </Link>
      </div>
    </>
  )
}

export default RecommendationCard
