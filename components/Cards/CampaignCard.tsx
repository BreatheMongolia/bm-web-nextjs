import React, { FC } from 'react'
import Link from 'next/link'
import parse from 'html-react-parser'
import dayjs from 'dayjs'

export type Props = {
  id: number
  title: string
  campaignDate: string
  url?: string
  description: string
  category: string
  campaignImage: string
  isTruncate?: boolean
}

export const CampaignCard: FC<Props> = ({
  id,
  title,
  campaignDate,
  url,
  description,
  category,
  campaignImage,
  isTruncate,
}) => {
  const truncate = (input: string) => (isTruncate && input?.length > 170 ? `${input.substring(0, 170)}...` : input)

  function formatMyDate(value: string) {
    if (!value) return <></>
    return dayjs(value).format('DD • MM • YYYY')
  }

  return (
    <div className="our-work-carousel">
      <div key={'campaignCard' + id} className="campaignCard">
        <img className="slider-image" src={campaignImage !== null ? campaignImage : ''} />
        <div className="campaign-content">
          {category && (
            <div className="flex flex-row content-center">
              <div className="mt-2 custom_dot_green"></div>
              <div className="campaignCategory">{category}</div>
            </div>
          )}
          {url ? (
            <Link href={url} target="_blank">
              <h3 className="campaign-title">{title}</h3>
              {description && <div className="campaign-desc">{parse(truncate(description))}</div>}
              <div className="campaign-date">{campaignDate !== null ? formatMyDate(campaignDate) : ''}</div>
            </Link>
          ) : (
            <>
              <h3 className="campaign-title">{title}</h3>
              {description && <div className="campaign-desc">{parse(truncate(description))}</div>}
              <div className="campaign-date">{campaignDate !== null ? formatMyDate(campaignDate) : ''}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CampaignCard
