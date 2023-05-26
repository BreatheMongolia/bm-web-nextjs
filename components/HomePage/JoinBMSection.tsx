import { H2 } from 'components/generic/Typography';
import React, { FC } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import parse from 'html-react-parser';
import Slider from 'react-slick';



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
            <div className="volunteer-count-section  flex-row">
              {countriesInfoText.map(x => (
                <div className="country_count_col" key={x.infoIcon.databaseId}>
                  <div className="text-center country-text">
                    <img src={x.infoIcon.mediaItemUrl} alt="" />
                    {x.customTextMn && <div className="text-data-custom">{parse(x.customTextMn)}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="opportunity-section">
              {/* <p className="title">{t("home.joinBm.opportunities")}</p> */}
              <ul className="position-list">
                {volunteersTemp.map((x, idx) => (
                  <li className="position_list_el" key={idx}>
                    <a className="pos_link_url" href={x.url} target="_blank">
                      {/* {getTranslated(
                        volunteerPos?.node?.customFields?.position,
                        volunteerPos?.node?.customFields?.positionMn
                      )} */}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="apply_button_container">
                <a className="apply_now_button" href="https://link.breathemongolia.org/volunteer" target="_blank">
                  {/* {t("home.joinBm.applyNow")} */}
                  Apply Now
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}