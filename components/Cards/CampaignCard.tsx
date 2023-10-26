import React, { FC } from 'react'
import Link from 'next/link'
import parse from 'html-react-parser'
import dayjs from 'dayjs'

export type Props = {
  id: number
  title: string
  campaignDate: string
  url: string
  description: string
  category: string
  campaignImage: string
}

export const CampaignCard: FC<Props> = ({ id, title, campaignDate, url, description, category, campaignImage }) => {
  const truncate = (input: string) => (input?.length > 170 ? `${input.substring(0, 170)}...` : input)

  function formatMyDate(value: string) {
    if (!value) return <></>
    return dayjs(value).format('DD • MM • YYYY')
  }

  return (
    <div className="our-work-carousel">
      <div key={'campaignCard' + id} className="campaignCard">
        <img className="slider-image" src={campaignImage !== null ? campaignImage : ''} />
        <div className="campaign-content">
          <div className="flex flex-row content-center">
            <div className="mt-2 custom_dot_green"></div>
            <div className="campaignCategory">{category}</div>
          </div>
          <Link href={url} target="_blank">
            <h3 className="campaign-title">{title}</h3>
            {description && <div className="campaign-desc">{parse(truncate(description))}</div>}
            <div className="campaign-date">{campaignDate !== null ? formatMyDate(campaignDate) : ''}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard
