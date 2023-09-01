import React, { FC } from 'react'
import quotationMark from '../../assets/images/quotation-mark.png'
import Image from 'next/image'

type Props = {
  name: string
  story: string
}

const AirPollutionStoryCard: FC<Props> = ({ name, story }) => {
  return (
    <div className="my-5 py-3 story_card">
      <Image src={quotationMark} alt="quotation mark" className="quotation_mark" />
      <p className="story_card_story">{story}</p>
      <p className="story_card_name">- {name}</p>
    </div>
  )
}

export default AirPollutionStoryCard
