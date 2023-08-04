import { H2 } from 'components/generic/Typography'
import React, { FC } from 'react'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import parse from 'html-react-parser'
import Slider from 'react-slick'

import {
  Page_Customfields_CountriesInfoText,
  Page_Customfields_JoinBreatheMongoliaImageSlider,
} from 'graphql/generated'
import { getTranslated } from 'lib/utils/getTranslated'
import { useTranslation } from 'next-i18next'

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
    <div className="join-bm-slider-wrapper custom-sections-gap">
      <div className="home-main-content">
        <H2
          title={getTranslated(title.en, title.mn, locale)}
          descriptionHtml={getTranslated(descriptionHtml.en, descriptionHtml.mn, locale)}
        />
        <div className="join_bm_carousel_sec">
          <div className="membersPhoto">
            <Slider {...settings}>
              {slider.map(x => (
                <div key={x.sliderImage.databaseId}>
                  <img className="slider-image" src={x.sliderImage.mediaItemUrl} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="volunteer-count">
            <div className="volunteer-count-section  flex-row">
              {countriesInfoText.map(x => (
                <div className="country_count_col" key={x.infoIcon.databaseId}>
                  <div className="text-center country-text">
                    <img src={x.infoIcon.mediaItemUrl} alt="" />
                    {x.customTextMn && (
                      <div className="text-data-custom">
                        {parse(getTranslated(x.customText, x.customTextMn, locale))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="opportunity-section">
              <p className="title">{t('joinBm.opportunities')}</p>
              <ul className="position-list">
                {volunteers?.map((volunteerPos: any) => (
                  <li className="position_list_el" key={volunteerPos?.node?.databaseId}>
                    <a className="pos_link_url" href={volunteerPos?.node?.customFields?.link?.url} target="_blank">
                      {getTranslated(
                        volunteerPos?.node?.customFields?.position,
                        volunteerPos?.node?.customFields?.positionMn,
                        locale,
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="apply_button_container">
                <a
                  className="apply_now_button"
                  href="https://forms.office.com/Pages/ResponsePage.aspx?id=rcJswrNeK0ewIXlMcbu4hPE6s_QwYeRChSapguhJZ8dUMVRFQUpDTzBaMkZLR01YOE5IRDkxSTBKSy4u"
                  target="_blank"
                >
                  {t('joinBm.applyNow')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
