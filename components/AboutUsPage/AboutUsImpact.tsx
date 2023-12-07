import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Report from './Report'
import Slider from 'react-slick'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { H2 } from 'components/generic/Typography'
import CampaignCard from 'components/Cards/CampaignCard'

interface Impact {
  accomplishments: any[]
  reports: any[]
  locale: string
}

const Impact: FC<Impact> = ({ accomplishments, reports, locale }) => {
  const { t } = useTranslation('about')

  // Sort accomplishments by newest to oldest
  //   @ts-ignore
  accomplishments.sort((a, b) => new Date(b.sortBy) - new Date(a.sortBy))

  return (
    <>
      <div className="impact-container sm:mb-100">
        <h1 className="our_accomplishment_title">{t('impact.ourAccomplishments')}</h1>

        <div className="timeline">
          {accomplishments.map((acc, id) => {
            return (
              <CampaignCard
                key={'accomplishment' + id}
                id={id}
                title={acc.title}
                campaignDate={acc.date}
                description={acc.description}
                category={acc.category}
                campaignImage={acc.image}
              />
            )
          })}
        </div>
      </div>
      <div className="container mx-auto flex flex-col">
        <H2 title={t('reports.title')} />
        {/* Desktop */}
        <div className="hidden sm:report-grid">
          <Slider
            {...settings}
            prevArrow={
              <Arrow check={0} classes="prev-gray-arrow">
                <ChevronLeftIcon className="w-8 h-8 text-white" />
              </Arrow>
            }
            nextArrow={
              <Arrow check={reports.length - 1} classes="prev-gray-arrow">
                <ChevronRightIcon className="w-8 h-8 text-white" />
              </Arrow>
            }
          >
            {reports.map((data: any, index: number) => (
              <Report
                key={'report-mobile' + index}
                id={data.id}
                title={data.title}
                urlMn={data.urlMn}
                urlEng={data.urlEng}
              />
            ))}
          </Slider>
        </div>
        {/* Mobile */}
        <div className="sm:hidden report-grid">
          <Slider
            {...settings}
            prevArrow={
              <Arrow check={0} classes="prev-gray-arrow">
                <ChevronLeftIcon className="w-8 h-8 text-white" />
              </Arrow>
            }
            nextArrow={
              <Arrow check={reports.length - 4} classes="prev-gray-arrow">
                <ChevronRightIcon className="w-8 h-8 text-white" />
              </Arrow>
            }
          >
            {reports.map((data, index) => (
              <Report
                key={'report-desktop' + index}
                id={data.id}
                title={data.title}
                urlMn={data.urlMn}
                urlEng={data.urlEng}
              />
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Impact

const settings = {
  dots: false,
  infinite: false,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  adaptiveHeight: true,
  centerMode: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        centerMode: false,
      },
    },
  ],
}
