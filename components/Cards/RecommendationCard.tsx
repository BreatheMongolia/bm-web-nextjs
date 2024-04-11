import React from 'react'
import Link from 'next/link'
import { getTranslated } from 'lib/utils/getTranslated'
import Image from 'next/image'
import LinkSign from 'assets/img/vectorlink-sign.png'

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
      <Link
        className="flex flex-col md:flex-row rounded-lg p-2 text-center md:text-left gap-1 items-center justify-center relative"
        href={`/action/${slug}`}
      >
        <Image className="mr-1" src={icon.mediaItemUrl} alt="recommendIcon" width={38} height={38} />
        <div className="text-xs font-semibold">{getTranslated(comment, commentMn, locale)}</div>
        <Image
          className="absolute top-2 right-2 text-slate-900"
          src={LinkSign}
          alt="Recommendation Link"
          width={8}
          height={8}
        />
      </Link>
    </>
  )
}

export default RecommendationCard
