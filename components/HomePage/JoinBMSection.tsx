import { H2 } from 'components/generic/Typography'
import React from 'react'

// import parse from 'html-react-parser'
import Slider from 'react-slick'

import {
  Page_Customfields_CountriesInfoText,
  Page_Customfields_JoinBreatheMongoliaImageSlider,
} from 'graphql/generated'

export const JoinBMSection = ({
  title,
  descriptionHtml,
  slider,
  countriesInfoText,
}: {
  title: { en: string; mn: string }
  descriptionHtml: { en: string; mn: string }
  slider: Page_Customfields_JoinBreatheMongoliaImageSlider[]
  countriesInfoText: Page_Customfields_CountriesInfoText[]
}) => {
  // TODO: Slider for the slider images
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
  // TODO: show countries info section
  const firstCountriesInfo = countriesInfoText[0]
  const secondCountriesInfo = countriesInfoText[1]
  const thirdCountriesInfo = countriesInfoText[2]
  // TODO: Show volunteer positions section
  // - Blocked: By API call for volunteer position, but show the UI for now

  // console.log(`This is in console: ${firstCountriesInfo.infoIcon}`);
  // console.log(`This is in console: ${secondImageLink}`);
  // TEMP: object to test the Volunteers temp section
  const renderSlides = () =>
    slider.map(x => (
      <div>
        <img src={x.sliderImage.mediaItemUrl} />
      </div>
    ))

  return (
    <div className="join-bm">
      <H2 title={title.mn} descriptionHtml={descriptionHtml.mn} />
      <div className="join-bm-section">
        <div className="photo-slider">
          <Slider {...settings}>{renderSlides()}</Slider>
        </div>
        <div className="volunteer-info">
          <div className="volunteer-count">
            {countriesInfoText.map(x => {
              return (
                <div className="country-text">
                  <img className="volunteer-hours" src={x.infoIcon.mediaItemUrl} />
                  {/* {x.customTextMn && <div className="text-data-custom">{parse(x.customTextMn)}</div>} */}
                </div>
              )
            })}
          </div>
          <div className="volunteer-opportunity"></div>
        </div>
      </div>
    </div>
  )
}