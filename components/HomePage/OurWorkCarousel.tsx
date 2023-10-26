import React from 'react'
import { H2 } from 'components/generic/Typography'
import { useTranslation } from 'next-i18next'
import Slider from 'react-slick'
import Arrow from 'components/generic/Arrow'
import SliderLeftArrow from 'assets/icons/SliderLeftArrow'
import SliderRightArrow from 'assets/icons/SliderRightArrow'
import { getTranslated } from 'lib/utils/getTranslated'
import CampaignCard from 'components/Cards/CampaignCard'
import { Page_Customfields_CampaignAndOurWorkSlider } from 'graphql/generated'

export const OurWorkCarousel = ({
  campaigns,
  locale,
}: {
  campaigns: Page_Customfields_CampaignAndOurWorkSlider[]
  locale: string
}) => {
  const { t } = useTranslation('home')

  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 2,
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
          slidesToShow: 2,
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

  return (
    <div className="flex flex-col our-work-carousel">
      <H2
        title={t('campaignWork.title')}
        trailingLineColor="yellow"
        extraButton={{
          title: t('campaignWork.seeMore'),
          url: '/about/impact',
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
          <Arrow check={campaigns.length - 1} classes="next-gray-arrow">
            <SliderRightArrow />
          </Arrow>
        }
      >
        {campaigns.map((campaign, idx) => (
          <CampaignCard
            key={'campaign' + idx}
            id={idx}
            title={getTranslated(campaign.campaignTitle, campaign.campaignTitleMn, locale)}
            campaignDate={campaign.campaignDate}
            url={campaign.campaignCatgeoryUrl}
            description={getTranslated(campaign.campaignDescription, campaign.campaignDescriptionMn, locale)}
            category={getTranslated(campaign.campaignCategoryText, campaign.campaignCategoryTextMn, locale)}
            campaignImage={campaign.volunteerImage?.mediaItemUrl !== null ? campaign?.volunteerImage?.mediaItemUrl : ''}
          />
        ))}
      </Slider>
    </div>
  )
}
