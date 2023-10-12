import React, { FC } from 'react'
import AccomplishmentCard from './AccomplishmentCard'
import { useTranslation } from 'next-i18next'
import Report from './Report'
import Slider from 'react-slick'
import SliderLeftArrow from 'assets/icons/SliderLeftArrow'
import SliderRightArrow from 'assets/icons/SliderRightArrow'
import Arrow from 'components/generic/Arrow'
import { useMediaQuery } from 'react-responsive'
import AccomplishmentMobileCard from './AccomplishmentMobileCard'

interface Impact {
  accomplishments: any[]
  reports: any[]
}

const Impact: FC<Impact> = ({ accomplishments, reports }) => {
  const { t, i18n } = useTranslation('about')
  const isMobile = useMediaQuery({ maxWidth: 950 })

  // Sort accomplishments by newest to oldest
  //   @ts-ignore
  accomplishments.sort((a, b) => new Date(b.sortBy) - new Date(a.sortBy))

  return (
    <>
      <div className="impact-container sm:mb-100">
        <p className="our_accomplishment_title">{t('impact.ourAccomplishments')}</p>
        <div className="timeline hidden sm:block">
          {accomplishments.map((acc, id) => (
            <AccomplishmentCard key={id} {...acc} />
          ))}
        </div>
        <div className="timeline sm:hidden">
          {accomplishments.map((acc, id) => (
            <AccomplishmentMobileCard key={id} {...acc} />
          ))}
        </div>
      </div>
      <div className="report-container">
        <h2>{t('reports.title')}</h2>
        <div className="report-grid">
          {isMobile ? (
            <Slider
              {...settings}
              prevArrow={
                <Arrow check={0} classes="prev-gray-arrow">
                  <SliderLeftArrow />
                </Arrow>
              }
              nextArrow={
                <Arrow check={reports.length - 3} classes="prev-gray-arrow">
                  <SliderRightArrow />
                </Arrow>
              }
            >
              {reports.map((data: any, index: number) => (
                <Report key={index} id={data.id} title={data.title} urlMn={data.urlMn} urlEng={data.urlEng} />
              ))}
            </Slider>
          ) : (
            <>
              {reports.map((data: any, index: number) => (
                <Report key={index} id={data.id} title={data.title} urlMn={data.urlMn} urlEng={data.urlEng} />
              ))}
            </>
          )}
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
  slidesToShow: 1,
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
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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
