import { H2 } from 'components/generic/Typography'
import { Page_Customfields_PartnersLogos } from 'graphql/generated'
import Slider from "react-slick"

export const OurPartners = ({
  title,
  partnerLogos,
}: {
  title: {
    en: string
    mn: string
  }
  partnerLogos: Page_Customfields_PartnersLogos[]
}) => {
  // console.log(title, partnerLogos)
  // TODO: Add <Slider /> component (react-slick)
  // TODO: Div/styling for images within Slider

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div>
      <H2 title={title.mn} />
      {/* <Slider {...settings}> */}
          {partnerLogos.map((x, idx) => {
            return <div key={idx}>{x.partnersLogosImage.mediaItemUrl}</div>
          })}
      {/* </Slider> */}
    </div>
  )
}
