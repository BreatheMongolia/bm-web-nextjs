import React from 'react'
import DonorCard from './DonorCard'
import Slider from 'react-slick'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import Arrow from 'components/generic/Arrow'
import { H2 } from '../generic/Typography'
import { useMediaQuery } from 'react-responsive'

type Donor = {
  name: string
  imgSrc: string
  role: string
  description: string
  memberSince: string
  featured: boolean
  linkedin: string
}

const DonorGridPage = ({ donors }: { donors: Donor[] }) => {
  const gridPositions = [
    `col-span-2 row-start-1 h-[188px] self-start`,
    `col-start-3 row-start-1 h-[255px]`,
    `col-start-4 row-start-1 h-[255px]`,
    `col-start-1 row-start-2 h-[255px]`,
    `col-start-2 row-start-2 h-[255px]`,
    `col-span-2 col-start-3  h-[188px] self-end`,
  ]

  return (
    <div
      className="grid grid-cols-[330px_330px_330px_330px] gap-[15px]"
      style={{ gridTemplateRows: `repeat(${Math.ceil(donors.length / 6)}, 188px 255px)`, gridAutoFlow: 'dense' }}
    >
      {donors.map((donor, i) => (
        <DonorCard key={i} donor={donor} className={gridPositions[i % 6]} index={i} />
      ))}
    </div>
  )
}

const DonorsMain = ({
  donors,
  donorsTitle,
  donorDescription,
}: {
  donors: Donor[]
  donorsTitle: string
  donorDescription: string
}) => {
  const isMobile = useMediaQuery({ maxWidth: 650 })
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }
    return result
  }

  const pages = chunkArray(donors, 6)
  const settings = {
    dots: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    cssEase: 'ease-in-out',
    adaptiveHeight: true,
    infinite: false,
  }
  return (
    <div className="donor-slider-wrapper">
      <H2 title={donorsTitle} descriptionHtml={donorDescription} />
      <Slider
        {...settings}
        className="donors-slider"
        prevArrow={
          <Arrow check={0} classes="prev-gray-arrow">
            <ChevronLeftIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
        nextArrow={
          <Arrow check={pages?.length - 3} classes="next-gray-arrow">
            <ChevronRightIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
      >
        {isMobile
          ? donors?.map((donor, i) => (
            <div key={i}>
              <DonorCard donor={donor} />
            </div>
          ))
          : pages.map((page, i) => (
            <div key={i}>
              <DonorGridPage donors={page} />
            </div>
          ))}
      </Slider>
    </div>
  )
}

export default DonorsMain
