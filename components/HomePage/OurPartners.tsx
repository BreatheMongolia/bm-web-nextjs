import React from 'react'
import { H2 } from 'components/generic/Typography'
import { Page_Customfields_PartnersLogos } from 'graphql/generated'
import Slider from 'react-slick'

export const OurPartners = ({
  title,
  partnerLogos,
}: {
  title: { en: string; mn: string }
  partnerLogos: Page_Customfields_PartnersLogos[]
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
    cssEase: 'linear',
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="our-partners">
      <H2 title={title.mn} />
      <div className="partner-logos-slider-wrapper">
      <Slider {...settings}>
        {partnerLogos.map((x, idx) => (
          <div key={idx}>
            <a href={x.partnersLogosUrls} target="_blank">
              <img className="object-cover h-150" src={x.partnersLogosImage.mediaItemUrl} alt="" loading="lazy" />
            </a>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  )
}
