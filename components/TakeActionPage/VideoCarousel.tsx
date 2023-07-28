import React, { FC, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import RightArrow from 'assets/icons/RightArrow'
import LeftArrow from 'assets/icons/LeftArrow'
import { useMediaQuery } from 'react-responsive'
import Desktop from 'components/Desktop'
import VideoPlayer from './VideoPlayer'

interface IProps {
  videos: { videoLink: string }[]
}

export const VideoCarousel: FC<IProps> = (props: IProps) => {
  const { videos } = props
  const isMobile = useMediaQuery({ maxWidth: 912 })
  const [currentSlide, setCurrentSlide] = useState(0)

  const next = () => {
    if (currentSlide + 1 < videos.length) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(0)
    }
  }

  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(videos.length - 1)
    }
  }

  const renderVideo = (videoUrl: string, index: number) => {
    return (
      <div className="carousel-item" key={index}>
        <VideoPlayer currentSlide={currentSlide} videoUrl={videoUrl} />
      </div>
    )
  }

  const renderedVideos = videos && videos.map((item, index) => renderVideo(item.videoLink, index))

  return (
    <div>
      {videos && (
        <>
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
              infiniteLoop
              centerMode={isMobile}
              emulateTouch={isMobile}
              onChange={index => {
                setCurrentSlide(index)
              }}
            >
              {renderedVideos}
            </Carousel>
          </div>
          <div className="take-action-carousel-bottom">
            <span>{`${currentSlide + 1} of ${videos.length}`}</span>
          </div>
        </>
      )}
    </div>
  )
}
