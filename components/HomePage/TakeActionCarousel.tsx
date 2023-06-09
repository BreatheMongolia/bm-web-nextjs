import React from 'react'
import { H2 } from 'components/generic/Typography'
import { TakeAction, Page_Customfields_FeaturedTakeActions } from 'graphql/generated'
import Slider from 'react-slick'
import { useTranslation } from 'next-i18next'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
// import { TakeActionCard } from '../Cards/TakeActionCard'
// import { TakeAction } from 'graphql/generated'
// import { useHistory } from "react-router-dom"

export type TakeActionArray = {
  title: string
  typeOfAction: []
  featuredImage: string
}

export const TakeActionCarousel = ({
  title,
  takeActionPosts,
}: {
  title: { en: string; mn: string }
  takeActionPosts: Page_Customfields_FeaturedTakeActions[]
}) => {
  const { t } = useTranslation('home')
  console.log(takeActionPosts);

  // const featuredImageBox = getImage(
  //   takeAction.featuredImage.node?.mediaDetails,
  //   takeAction.featuredImage.node?.mediaItemUrl,
  //   takeAction.featuredImage.node?.mediaDetails,
  //   'medium_large',
  // )
  // const getTransformedData = (takeActionPosts: Page_Customfields_FeaturedTakeActions[]) => {
  //   if (takeActionPosts.length === 0) {
  //     return []
  //   }  
  //   const takeActions: TakeActionArray[] = []
  //   takeActionPosts.map((x: TakeAction) => {
  //     takeActions.push({
  //       title: x?.customFields?.titleMn,
  //         // getTranslated(x?.customFields?.title, x?.customFields?.titleMn) !== null
  //         //   ? getTranslated(x?.customFields?.title, x?.customFields?.titleMn)
  //         //   : "",
  //       typeOfAction: x?.customFields?.typeOfAction?.map(
  //         (type: {
  //           // databaseId: number
  //           // actionTypeId: number
  //           // name: string
  //           // link: string
  //           customFields: { name: string; nameMn: string }
  //         }) => {
  //           return {
  //             ...type,
  //             name: type?.customFields?.nameMn
  //             // getTranslated(type?.customFields?.name, type?.customFields?.nameMn)
  //           }
  //         }
  //       ),
  //       featuredImage:
  //         x?.featuredImage?.node?.mediaDetails.sizes !== null
  //           ? x?.featuredImage?.node?.mediaDetails.sizes[0].sourceUrl
  //           : ""
  //     })
  //   }
  //   return takeActions
  // }

  // Styling the settings for take-action-carousel within Slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
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
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
          title: t('campaignWork.seeMore'),
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
          <Arrow check={takeActionPosts?.length - 3} classes="next-gray-arrow">
            <ChevronRightIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
      >
        {takeActionPosts.map((x, idx) => (
          <React.Fragment>
            <div
              key={idx}
              className="relative transition-all bg-slate-300 rounded-md overflow-hidden cursor-pointer h-52 bg-cover bg-center group "
              onClick={() => window.open(x.featuredImage.node?.mediaItemUrl, '_blank')}
            >
              <div className="flex flex-col h-full justify-end bg-gradient-to-t from-black/80 to-black/0 via-black/30 group-hover:from-black/90 group-hover:to-black/20 transition-all">
                <img
                  className="object-fill max-w-none h-full"
                  src={x?.featuredImage?.node?.mediaDetails.sizes !== null
                    ? x?.featuredImage?.node?.mediaDetails.sizes[0].sourceUrl
                    : ''}
                />
                <div className="w-full p-4 ">
                  <div className="w-full text-white line-clamp-2">
                    {' '}
                    {x.customFields.typeOfAction[0].customFields.nameMn}{' '}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </Slider>
    </div>
  )
}
