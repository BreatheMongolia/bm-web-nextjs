import React from 'react'
import OurStorySection from './OurStorySection'
import StoriesAboutAirPollution from './StoriesAboutAirPollution'

export type OurStoriesAll = {
  title: string
  description: string
}

export const AboutUsOurStory = ({ stories }: { stories: OurStoriesAll[] }) => {
  return (
    <div className="flex flex-col">
      <OurStorySection />
      <StoriesAboutAirPollution stories={stories} />
    </div>
  )
}

export default AboutUsOurStory
