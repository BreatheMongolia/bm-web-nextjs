import React from 'react'
import { H2 } from 'components/generic/Typography'
import { Page_Customfields_FeaturedTakeActions } from 'graphql/generated'
import Slider from 'react-slick'
import { useTranslation } from 'next-i18next'
import Arrow from 'components/generic/Arrow'
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import SliderLeftArrow from 'assets/icons/SliderLeftArrow'
import SliderRightArrow from 'assets/icons/SliderRightArrow'
import { getTranslated } from 'lib/utils/getTranslated'
import TakeActionTile from '../Cards/TakeActionTile'

export const TakeActionCarousel = ({
  takeActionPosts,
  locale,
}: {
  takeActionPosts: Page_Customfields_FeaturedTakeActions[]
  locale: string
}) => {
  const { t } = useTranslation('home')

  // Styling the settings for take-action-carousel within Slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
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
    <div className="flex flex-col">
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
            {/* <ChevronLeftIcon className="w-8 h-8 text-white" /> */}
            <SliderLeftArrow />
          </Arrow>
        }
        nextArrow={
          <Arrow check={takeActionPosts?.length - 4} classes="next-gray-arrow">
            {/* <ChevronRightIcon className="w-8 h-8 text-white" /> */}
            <SliderRightArrow />
          </Arrow>
        }
      >
        {takeActionPosts.map((takeAction, idx) => (
          <TakeActionTile
            key={'carousel' + idx}
            id={takeAction.databaseId}
            slug={takeAction.slug}
            title={
              getTranslated(takeAction.customFields?.title, takeAction.customFields?.titleMn, locale) !== null
                ? getTranslated(takeAction.customFields?.title, takeAction.customFields?.titleMn, locale)
                : ''
            }
            featuredImage={
              takeAction.featuredImage?.node?.mediaDetails.sizes !== null
                ? takeAction.featuredImage?.node?.mediaDetails?.sizes[0].sourceUrl
                : ''
            }
            index={1}
            pageNumberLimit={5}
          />
        ))}
      </Slider>
    </div>
  )
}
