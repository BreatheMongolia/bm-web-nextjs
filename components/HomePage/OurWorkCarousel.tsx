import React from 'react'
import { H2 } from 'components/generic/Typography'
import { useTranslation } from 'next-i18next'
import Slider from 'react-slick'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import CampaignCard from 'components/Cards/CampaignCard'
import { HomePageCampaignAndOurWorkSlider } from 'graphql/generated'

export const OurWorkCarousel = ({
  campaigns,
  locale,
}: {
  campaigns: HomePageCampaignAndOurWorkSlider[]
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
            <ChevronLeftIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
        nextArrow={
          <Arrow check={campaigns.length - 1} classes="next-gray-arrow">
            <ChevronRightIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
      >
        {campaigns.map((campaign, idx) => (
          <CampaignCard
            key={'campaign' + idx}
            id={idx}
            isTruncate={true}
            title={getTranslated(campaign.campaignTitle, campaign.campaignTitleMn, locale)}
            campaignDate={campaign.campaignDate}
            url={campaign.campaignCatgeoryUrl}
            description={getTranslated(campaign.campaignDescription, campaign.campaignDescriptionMn, locale)}
            category={getTranslated(campaign.campaignCategoryText, campaign.campaignCategoryTextMn, locale)}
            campaignImage={campaign.volunteerImage?.node.mediaItemUrl !== null ? campaign?.volunteerImage?.node.mediaItemUrl : ''}
          />
        ))}
      </Slider>
    </div>
  )
}
