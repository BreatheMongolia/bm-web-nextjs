import React from 'react'
import { H2 } from 'components/generic/Typography'
import { Page_Customfields_FeaturedTakeActions } from 'graphql/generated'
import Slider from 'react-slick'
import { TakeActionCard } from '../Cards/TakeActionCard'
import { TakeAction } from 'graphql/generated'
import { useTranslation } from 'next-i18next'
// import { useTranslation } from 'react-i18next'
// import { useHistory } from "react-router-dom"
// import SliderLeftArrow from "../assets/icons/SliderLeftArrow"
// import SliderRightArrow from "../assets/icons/SliderRightArrow"

export const TakeActionCarousel = ({
  title,
  takeActionPosts,
}: {
  title: { en: string; mn: string }
  takeActionPosts: Page_Customfields_FeaturedTakeActions[]
}) => {
  const { t } = useTranslation('home')
  // console.log(takeActionPosts);
  // const { t } = useTranslation()
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
    <div className="custom-sections-gap take-action-carousel-section">
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
        // prevArrow={
        //   <Arrow check={0} classes="prev-gray-arrow">
        //     <SliderLeftArrow />
        //   </Arrow>
        // }
        // nextArrow={
        //   <Arrow check={takeActions?.length - 4} classes="next-gray-arrow">
        //     <SliderRightArrow />
        //   </Arrow>
        // }
      >
        {takeActionPosts.map((x, idx) => (
          <div>{x.featuredImage != null && <TakeActionCard key={idx} takeAction={x} />}</div>
        ))}
      </Slider>
    </div>
  )
}
