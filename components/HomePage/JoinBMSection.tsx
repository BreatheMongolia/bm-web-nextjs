import { H2 } from 'components/generic/Typography'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import parse from "html-react-parser";

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
  const firstImageLink = slider[0].sliderImageLink;
  const secondImageLink = slider[1].sliderImageLink;
  
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
  // TODO: show countries info section
  const firstCountriesInfo = countriesInfoText[0];
  const secondCountriesInfo = countriesInfoText[1];
  const thirdCountriesInfo = countriesInfoText[2];
  // TODO: Show volunteer positions section
  // - Blocked: By API call for volunteer position, but show the UI for now

  // console.log(`This is in console: ${firstCountriesInfo.infoIcon}`);
  
  // console.log(`This is in console: ${secondImageLink}`);
  // TEMP: object to test the Volunteers temp section
  const volunteersTemp = [
    {
      title: 'Test Volunteer Position',
      url: 'https://www.notion.so/breathemongolia/Fundraising-Manager-3c5a7d35aaad4b92939eaab909d270e4',
    },
  ]
  return (
    <div>
      <H2 title={title.mn} descriptionHtml={descriptionHtml.mn} />
      {/* {volunteersTemp.map(x)} */}
      <Slider {...settings}>
        <div>
          <img src={firstImageLink} alt="Photo 1" />
        </div>
        <div>
          <img src={secondImageLink} alt="Photo 2" />
        </div>
      </Slider>
      <div className="first text">
        <img src={firstCountriesInfo.infoIcon} alt="" />
        {parse(firstCountriesInfo.customTextMn)}
        {firstCountriesInfo.fieldGroupName}
      </div>
      <div className="second text">
        <img src={secondCountriesInfo.infoIcon} alt="" />
        {parse(secondCountriesInfo.customTextMn)}
        {secondCountriesInfo.fieldGroupName}
      </div>
      <div className="third text">
        <img src={thirdCountriesInfo.infoIcon} alt="" />
        {parse(thirdCountriesInfo.customTextMn)}
        {thirdCountriesInfo.fieldGroupName}
      </div>
    </div>
  )
}