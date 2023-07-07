import React from 'react'
import { H2 } from 'components/generic/Typography'
import { Page_Customfields_FeaturedTakeActions } from 'graphql/generated'
import Slider from 'react-slick'
import { useTranslation } from 'next-i18next'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import Link from 'next/link'
// import { useHistory } from "react-router-dom"

export const TakeActionCarousel = ({
  takeActionPosts,
}: {
  takeActionPosts: Page_Customfields_FeaturedTakeActions[]
}) => {
  const { t } = useTranslation('home')
  // takeActionPosts.filter((value, index, self) => self.map(takeAction => takeAction.id).indexOf(value.id) == index)

  // Styling the settings for take-action-carousel within Slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
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
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="take-action-carousel-section">
      <H2
        title={t('takeAction.title')}
        trailingLineColor="yellow"
        extraButton={{
          title: t('takeAction.seeMore'),
          url: '/take-actions',
        }}
      />
      <Slider
        {...settings}
        prevArrow={
          <Arrow check={0} classes="prev-gray-arrow">
            <ChevronLeftIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
        nextArrow={
          <Arrow check={takeActionPosts?.length - 4} classes="next-gray-arrow">
            <ChevronRightIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
      >
        {takeActionPosts.map((x, idx) => (
          <div key={idx}>
            {x?.featuredImage?.node?.mediaDetails.sizes !== null && (
              <React.Fragment>
                <div
                  className="relative flex flex-col m-1.5 take-action-carousel"
                  onClick={() =>
                    //window.open('/action/' + x.databaseId)}
                    console.log('')
                  }
                >
                  <img
                    className="card-img-top take-action-img"
                    src={
                      x?.featuredImage?.node?.mediaDetails.sizes !== null
                        ? x?.featuredImage?.node?.mediaDetails.sizes[0].sourceUrl
                        : ''
                    }
                  />
                  <div className="take-action-info">
                    <div className="take-action-title">
                      {getTranslated(x?.customFields?.title, x?.customFields?.titleMn) !== null
                        ? getTranslated(x?.customFields?.title, x?.customFields?.titleMn)
                        : ''}
                    </div>
                    <div className="read-more-arrow ">
                      <Link href={`/action/${x.databaseId}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="12" fill="#F4AC3D" />
                          <path
                            d="M15.6674 12.6249L16.334 12L11.0005 7L9.66732 8.24978L13.6668 12L9.66732 15.7502L11.0005 17L15.6674 12.6249Z"
                            fill="#FAFAFF"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        ))}
      </Slider>
    </div>
  )
}
