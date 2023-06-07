import { Page_NewsGeneralFields_Banner } from 'graphql/generated'
import Slider from "react-slick"
import {
  Page_Customfields_Banners
} from 'graphql/generated'

  type BannerProps = {
  imageUrls?: Page_Customfields_Banners[ ]
  imageUrl?: {
    en: string
    mn?: string
  }
  bottomText?: {
    left?: string
    right?: string
  }
}
export const PageImageBanner = ({ imageUrls, imageUrl, bottomText }: BannerProps) => {
   const bannerCarouselSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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
  return (
    <div className="banner-slider-wrapper max-[1000px]:hidden">
        <Slider  {...bannerCarouselSettings} >
        {imageUrls?.map((banner: any) => (
          <a key={banner?.bannerImage.id} href={banner?.bannerImage.url} target="_blank">
            <div>
              <img src={banner?.bannerImage.mediaItemUrl} alt="" />
            </div>
          </a>
        ))}
      </Slider>
      <div className="banner_bottom_text_bar ">
          <div className="flex container mx-auto justify-center banner_bottom_text_content">
            <p>{bottomText.left}</p>
            <p>{bottomText.right}</p>
          </div>
      </div>
    </div>
  )
}
