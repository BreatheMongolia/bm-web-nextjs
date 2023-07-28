import React, { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

interface Props {
  currentSlide: number
  videoUrl: string
}

const VideoPlayer: FC<Props> = ({ currentSlide, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(false)
  }, [currentSlide])

  return (
    <>
      <div className="video-overlay" onClick={() => setIsPlaying(!isPlaying)}></div>
      <ReactPlayer playsinline={true} playing={isPlaying} url={videoUrl} />
    </>
  )
}

export default VideoPlayer
