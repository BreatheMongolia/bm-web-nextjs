import React, { FC, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import RightArrow from 'assets/icons/RightArrow'
import LeftArrow from 'assets/icons/LeftArrow'
import { useMediaQuery } from 'react-responsive'
import Desktop from 'components/Desktop'
import parse from 'html-react-parser'

interface IProps {
  images: {
    mediaItemUrl: string
    caption: string
  }[]
}

export const ImageCarousel: FC<IProps> = (props: IProps) => {
  const { images } = props
  const isMobile = useMediaQuery({ maxWidth: 912 })
  const [currentSlide, setCurrentSlide] = useState(0)

  const next = () => {
    if (currentSlide + 1 < images.length) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(0)
    }
  }

  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(images.length - 1)
    }
  }

  const renderImage = (imageUrl: string, index: number) => {
    return (
      <div className="carousel-item image-carousel" key={index}>
        <img src={imageUrl} alt="take-action-img" />
      </div>
    )
  }

  const renderedImages = images ? images.map((item, index) => renderImage(item.mediaItemUrl, index)) : []

  if (!images) return null

  if (images.length === 1)
    return (
      <div className="take-action-single-image">
        <img src={images[0].mediaItemUrl} alt="take-action-img" />
      </div>
    )

  return (
    <div>
      <div className="carousel-container">
        <Desktop>
          <div onClick={next} className={'carousel-next-btn'}>
            <RightArrow />
          </div>
          <div onClick={prev} className={'carousel-prev-btn'}>
            <LeftArrow />
          </div>
        </Desktop>
        <Carousel
          showThumbs={false}
          showIndicators={false}
          selectedItem={currentSlide}
          showArrows={false}
          showStatus={false}
          infiniteLoop={true}
          centerMode={isMobile}
          emulateTouch={isMobile}
          onChange={index => {
            setCurrentSlide(index)
          }}
        >
          {renderedImages}
        </Carousel>
      </div>
      <div className="take-action-carousel-bottom">
        {images[currentSlide].caption && parse(images[currentSlide].caption)}
        <Desktop>
          <span>{`${currentSlide + 1} of ${images.length}`}</span>
        </Desktop>
      </div>
    </div>
  )
}

export default ImageCarousel
