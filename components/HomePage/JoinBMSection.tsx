import { H2 } from 'components/generic/Typography';
import React, { FC } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import parse from 'html-react-parser';
import Slider from 'react-slick';


import parse from 'html-react-parser'
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
    cssEase: "linear",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }


  const volunteersTemp = [
    {
      title: 'Test Volunteer Position',
      url: 'https://www.notion.so/breathemongolia/Fundraising-Manager-3c5a7d35aaad4b92939eaab909d270e4',
    },
  ]

  const descriptionInMng = descriptionHtml.mn.substring(0, 326) + "." + descriptionHtml.mn.substring(326);

  // TODO: show countries info section
  // TODO: Show volunteer positions section
  // - Blocked: By API call for volunteer position, but show the UI for now


  // console.log(`This is in console: ${descriptionHtml.mn}, ${descriptionHtml.mn.length}`);
  // TEMP: object to test the Volunteers temp section

  return (
    <div className="join-bm-slider-wrapper custom-sections-gap">
      <div className="home-main-content">
      <H2 title={title.mn} descriptionHtml={descriptionInMng} />
        <div className="join_bm_carousel_sec">
            <div className="membersPhoto">
              <Slider {...settings}>
                {slider.map(x => (
                  <div key={x.sliderImage.databaseId}>
                    <img className='slider-image' src={x.sliderImage.mediaItemUrl} />
                  </div>
                ))}
              </Slider>
            </div>
          <div className="volunteer-count">
            {countriesInfoText.map(x => {
              return (
                <div className="country-text">
                  <img className="volunteer-hours" src={x.infoIcon.mediaItemUrl} />
                  {x.customTextMn && <div className="text-data-custom">{parse(x.customTextMn)}</div>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}