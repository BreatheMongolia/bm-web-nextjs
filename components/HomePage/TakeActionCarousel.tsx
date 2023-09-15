import React from 'react'
import { H2 } from 'components/generic/Typography'
import { Page_Customfields_FeaturedTakeActions } from 'graphql/generated'
import Slider from 'react-slick'
import { useTranslation } from 'next-i18next'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import TakeActionTile from '../Cards/TakeActionTile'

export type TakeActionAll = {
  id: number
  slug: string
  title: string
  excerpt?: string
  date: any
  typeOfAction: string[]
  featuredImage: string
}

const getFeaturedTakeActions = (featured: Page_Customfields_FeaturedTakeActions[], locale: string) => {
  if (featured.length === 0) {
    return []
  }
  const takeActions: TakeActionAll[] = []
  featured.map((takeAction: any) => {
    takeActions.push({
      id: takeAction?.databaseId,
      date: takeAction?.dateGmt,
      slug: takeAction?.slug,
      title:
        getTranslated(takeAction?.customFields?.title, takeAction?.customFields?.titleMn, locale) !== null
          ? getTranslated(takeAction?.customFields?.title, takeAction?.customFields?.titleMn, locale)
          : '',
      excerpt: '',
      typeOfAction: takeAction?.customFields.typeOfAction?.map(
        (type: { customFields: { name: string; nameMn: string } }) =>
          getTranslated(type.customFields.name, type.customFields.nameMn, locale),
      ),
      featuredImage:
        takeAction?.featuredImage?.node?.mediaDetails.sizes !== null
          ? takeAction?.featuredImage?.node?.mediaDetails?.sizes[0].sourceUrl
          : '',
    })
  })
  return takeActions
}

export const TakeActionCarousel = ({
  takeActionPosts,
  locale,
}: {
  takeActionPosts: Page_Customfields_FeaturedTakeActions[]
  locale: string
}) => {
  const { t, i18n } = useTranslation('home')

  // Styling the settings for take-action-carousel within Slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  var featuredTakeActions = getFeaturedTakeActions(takeActionPosts, locale)
  featuredTakeActions = featuredTakeActions.filter(
    (value, index, self) => self.map(takeAction => takeAction.id).indexOf(value.id) == index,
  )

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
        {featuredTakeActions.map((takeAction, idx) => (
          <TakeActionTile
            key={idx}
            id={takeAction.id}
            slug={takeAction.slug}
            title={takeAction.title}
            featuredImage={takeAction.featuredImage}
            index={1}
            pageNumberLimit={5}
          />
        ))}
      </Slider>
    </div>
  )
}
