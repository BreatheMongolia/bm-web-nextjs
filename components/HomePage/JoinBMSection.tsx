import { H2 } from 'components/generic/Typography'
import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import {
  Page_Customfields_CountriesInfoText,
  Page_Customfields_JoinBreatheMongoliaImageSlider,
} from 'graphql/generated'
import { getTranslated } from 'lib/utils/getTranslated'
import { useTranslation } from 'next-i18next'
import VolunteerCard from '../Cards/VolunteerCard'

export const JoinBMSection = ({
  title,
  locale,
  descriptionHtml,
  slider,
  countriesInfoText,
  volunteers,
}: {
  locale: string
  title: { en: string; mn: string }
  descriptionHtml: { en: string; mn: string }
  slider: Page_Customfields_JoinBreatheMongoliaImageSlider[]
  countriesInfoText: Page_Customfields_CountriesInfoText[]
  volunteers: any
}) => {
  const { t } = useTranslation('home')
  const settings = {
    dots: true,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 15000,
    cssEase: 'linear',
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
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
    <div className="flex flex-col ">
      <H2
        title={getTranslated(title.en, title.mn, locale)}
        descriptionHtml={getTranslated(descriptionHtml.en, descriptionHtml.mn, locale)}
      />
      <div className="flex flex-row gap-10 justify-center">
        <div className="hidden lg:block lg:w-[50%] join-bm-slider">
          <Slider {...settings}>
            {slider.map(x => (
              <div key={x.sliderImage?.node.databaseId}>
                <img className="slider-image" src={x.sliderImage?.node.mediaItemUrl} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-col gap-5">
          <VolunteerCard
            usedPage={'home'}
            volunteers={volunteers}
            countriesInfoText={countriesInfoText}
            locale={locale}
          />
        </div>
      </div>
    </div>
  )
}
