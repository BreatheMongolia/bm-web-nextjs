import React from 'react'
import { H2 } from 'components/generic/Typography'
import { TakeAction } from 'graphql/generated'
import Slider from 'react-slick'
import { useTranslation } from 'next-i18next'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import TakeActionTile from '../Cards/TakeActionTile'

export const TakeActionCarousel = ({ takeActionPosts, locale }: { takeActionPosts: TakeAction[]; locale: string }) => {
  const { t } = useTranslation('home')

  // Check if we have fewer than 4 cards
  const hasFewerThanFourCards = takeActionPosts.length < 4

  // Styling the settings for take-action-carousel within Slider
  const settings = {
    dots: false,
    infinite: !hasFewerThanFourCards,
    speed: 600,
    slidesToShow: hasFewerThanFourCards ? takeActionPosts.length : 4,
    slidesToScroll: hasFewerThanFourCards ? 1 : 2,
    arrows: !hasFewerThanFourCards,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: hasFewerThanFourCards ? takeActionPosts.length : 5,
          slidesToScroll: hasFewerThanFourCards ? 1 : 2,
          infinite: !hasFewerThanFourCards,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: hasFewerThanFourCards ? takeActionPosts.length : 3,
          slidesToScroll: 1,
          initialSlide: hasFewerThanFourCards ? 0 : 2,
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
        title={t('takeAction.gridTitle')}
        trailingLineColor="yellow"
        extraButton={{
          title: t('takeAction.seeMore'),
          url: '/take-action',
        }}
      />
      <Slider
        {...settings}
        prevArrow={
          hasFewerThanFourCards ? <></> : (
            <Arrow check={0} classes="prev-gray-arrow">
              <ChevronLeftIcon className="w-8 h-8 text-white" />
            </Arrow>
          )
        }
        nextArrow={
          hasFewerThanFourCards ? <></> : (
            <Arrow check={takeActionPosts?.length - 4} classes="next-gray-arrow">
              <ChevronRightIcon className="w-8 h-8 text-white" />
            </Arrow>
          )
        }
      >
        {takeActionPosts.map((takeAction, idx) => (
          <TakeActionTile
            key={'carousel' + idx}
            id={takeAction.databaseId}
            slug={takeAction.slug}
            title={
              getTranslated(
                takeAction.takeActionCustomFields?.title,
                takeAction.takeActionCustomFields?.titleMn,
                locale,
              ) !== null
                ? getTranslated(
                    takeAction.takeActionCustomFields?.title,
                    takeAction.takeActionCustomFields?.titleMn,
                    locale,
                  )
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
