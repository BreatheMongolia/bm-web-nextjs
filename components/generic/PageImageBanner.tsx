import Slider from 'react-slick'

type BannerProps = {
  imageUrls?: {
    mediaItemUrl: string
    url?: string
  }[]
  bottomText?: {
    left?: string
    right?: string
  }
}
export const PageImageBanner = ({ imageUrls, bottomText }: BannerProps) => {
  const bannerCarouselSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className="banner-slider-wrapper max-[1000px]:hidden">
      <Slider {...bannerCarouselSettings}>
        {imageUrls?.map((banner, idx: number) => (
          <a key={idx} href={banner?.url} target="_blank">
            <div>
              <img src={banner?.mediaItemUrl} alt="" className="max-h-96" />
            </div>
          </a>
        ))}
      </Slider>
      <div className="banner_bottom_text_bar ">
        <div className="flex container banner_bottom_text_content gap-8">
          <p>{bottomText.left}</p>
          <p>{bottomText.right}</p>
        </div>
      </div>
    </div>
  )
}
