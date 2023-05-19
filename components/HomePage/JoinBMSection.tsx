import { H2 } from 'components/generic/Typography'
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  const ImageSlider = () => {
    const sliderRef = useRef<Slider>(null);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (sliderRef.current) {
          const currentSlide = sliderRef.current.innerSlider.state.currentSlide;
          if (currentSlide === 0) {
            sliderRef.current.slickGoTo(1);
          }
        }
      }, 15000);
  
      return () => clearInterval(interval);
    }, []);
  
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    };
  
    return (
      <Slider {...settings} ref={sliderRef}>
        <div>
          <img src={firstImageLink} alt="Photo 1" />
        </div>
        <div>
          <img src={secondImageLink} alt="Photo 2" />
        </div>
      </Slider>
    );
  };
  

  // TODO: show countries info section
  // TODO: Show volunteer positions section
  // - Blocked: By API call for volunteer position, but show the UI for now
  console.log(`This is in console: ${firstImageLink}`);
  console.log(`This is in console: ${secondImageLink}`);
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
      <ImageSlider />
    </div>
  )
}
