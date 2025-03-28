import React from 'react'
import { H2 } from 'components/generic/Typography'
import { Page_Customfields_PartnersLogos } from 'graphql/generated'
import Slider from 'react-slick'
import { getTranslated } from 'lib/utils/getTranslated'

export const OurPartners = ({
  title,
  partnerLogos,
  locale,
}: {
  title: { en: string; mn: string }
  partnerLogos: Page_Customfields_PartnersLogos[]
  locale: string
}) => {
  // Styling the settings for partner-logo images within Slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  }

  return (
    <div className="flex flex-col">
      <H2 title={getTranslated(title.en, title.mn, locale)} />
      <div className="partner-logos-slider-wrapper">
        <Slider {...settings}>
          {partnerLogos.map((x, idx) => (
            <div key={idx}>
              <a href={x.partnersLogosUrls} target="_blank">
                <img src={x.partnersLogosImage.node.mediaItemUrl} alt="ourPartnerLogos" loading="lazy" />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
