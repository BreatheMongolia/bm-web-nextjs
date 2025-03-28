import React, { FC, useState } from 'react'
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

const ITEMS_PER_PAGE = 5

const Impact: FC<Impact> = ({ accomplishments, reports, locale }) => {
  const { t } = useTranslation('about')
  const [currentPage, setCurrentPage] = useState(0)

  // Sort accomplishments by newest to oldest
  //   @ts-ignore
  accomplishments.sort((a, b) => new Date(b.sortBy) - new Date(a.sortBy))
  const onPageClick = pageNum => {
    if (pageNum < 0) setCurrentPage(0)
    const maxPages = Math.ceil(accomplishments.length / ITEMS_PER_PAGE)
    if (pageNum >= maxPages) {
      setCurrentPage(maxPages - 1)
    }
    setCurrentPage(pageNum)
  }
  const pages = []
  const MAX_PAGES = Math.ceil(accomplishments.length / ITEMS_PER_PAGE)
  for (let i = 0; i < MAX_PAGES; i++) {
    if (i === 0 || i === MAX_PAGES - 1 || (i < currentPage + 2 && i > currentPage - 2)) {
      pages.push(
        <div
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`cursor-pointer rounded-full w-12 h-12 flex items-center justify-center transition-all hover:bg-[#2C2D41]/80 hover:text-white ${currentPage === i && 'bg-[#2C2D41] text-white'
            }`}
        >
          {i + 1}
        </div>,
      )
    }
  }

  return (
    <>
      <div className="impact-container sm:mb-100">
        <h1 className="our_accomplishment_title">{t('impact.ourAccomplishments')}</h1>

        <div className="timeline">
          {accomplishments
            .slice(ITEMS_PER_PAGE * currentPage, ITEMS_PER_PAGE * currentPage + ITEMS_PER_PAGE)
            .map((acc, id) => {
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
          {/* Pagination */}
          <div className="pt-8 pb-3 mx-auto text-lg font-bold sm:text-xl">
            <div className="flex gap-0.5 sm:gap-5 justify-center items-center">
              <div
                className={`transition-all hover:bg-[#2C2D41] hover:text-white rounded-full border-black border hover:border-[#f09c4f]/80 ${currentPage === 0 ? 'opacity-0' : 'cursor-pointer'
                  }`}
                onClick={() => currentPage !== 0 && onPageClick(currentPage - 1)}
              >
                <span className="block p-3">
                  <ChevronLeftIcon className="w-5 h-5" />
                </span>
              </div>
              {pages}
              <div
                className={`transition-all hover:bg-[#2C2D41] hover:text-white border-black border hover:border-[#f09c4f]/80 rounded-full ${currentPage === MAX_PAGES - 1 ? 'opacity-0' : 'cursor-pointer'
                  }`}
                onClick={() => currentPage !== MAX_PAGES - 1 && onPageClick(currentPage + 1)}
              >
                <span className="block p-3">
                  <ChevronRightIcon className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col mb-20">
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
