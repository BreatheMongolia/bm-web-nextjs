import { H2 } from 'components/generic/Typography'
import React, { FC } from 'react'
import { Page_Customfields_CampaignAndOurWorkSlider } from 'graphql/generated'
import { useTranslation } from 'next-i18next'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import parse from 'html-react-parser'
import dayjs from 'dayjs'
import Arrow from 'components/generic/Arrow'
import SliderLeftArrow from 'assets/icons/SliderLeftArrow'
import SliderRightArrow from 'assets/icons/SliderRightArrow'
import { getTranslated } from 'lib/utils/getTranslated'
export const OurWorkCarousel = ({
  title,
  campaigns,
}: {
  title: { en: string; mn: string }
  campaigns: Page_Customfields_CampaignAndOurWorkSlider[]
}) => {
  const { t } = useTranslation('home')

  function formatMyDate(value: string) {
    if (!value) return <></>
    return dayjs(value).format('DD • MM • YYYY')
  }

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
          variableWidth: true,
        },
      },
    ],
  }

  const sortedCampaigns = campaigns.sort(
    (a: Page_Customfields_CampaignAndOurWorkSlider, b: Page_Customfields_CampaignAndOurWorkSlider) =>
      dayjs(a.campaignDate).isBefore(dayjs(b.campaignDate)) ? 1 : -1,
  )
  return (
    <div className="campaign-slider-wrapper custom-sections-gap">
      <H2
        title={getTranslated(title.en, title.mn)}
        trailingLineColor="yellow"
        extraButton={{
          title: t('campaignWork.seeMore'),
          url: '/news',
        }}
      />
      <Slider
        {...settings}
        prevArrow={
          <Arrow check={0} classes="prev-gray-arrow">
            <SliderLeftArrow />
          </Arrow>
        }
        nextArrow={
          <Arrow check={sortedCampaigns.length - 1} classes="next-gray-arrow">
            <SliderRightArrow />
          </Arrow>
        }
      >
        {sortedCampaigns.map(campaign => (
          <React.Fragment key={campaign.volunteerImage.id}>
            <div
              key={campaign.volunteerImage.id}
              className="campaignCard"
              onClick={() => window.open(campaign.campaignCatgeoryUrl, '_blank')}
            >
              <img
                className="slider-image"
                src={
                  campaign.volunteerImage?.mediaDetails.sizes !== null
                    ? campaign?.volunteerImage?.mediaDetails.sizes[0].sourceUrl
                    : ''
                }
              />
              <div className="campaign-content">
                <div className="campaignCategory">
                  <span className="custom_dot_green"></span>
                  <span className="custom_green_span"> {campaign.campaignCategoryTextMn}</span>
                </div>
                {/* FIXME: there is a hydration error below */}
                <h3 className="campaign-title">{campaign.campaignTitleMn}</h3>
                {campaign?.campaignDescription && (
                  <div className="campaign-desc">{parse(campaign.campaignDescriptionMn)}</div>
                )}
                <div className="campaign-date">
                  <span>{formatMyDate(campaign.campaignDate)} </span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </Slider>
    </div>
  )
}
