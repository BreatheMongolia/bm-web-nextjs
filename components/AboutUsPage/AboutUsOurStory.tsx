import React from 'react'
import OurStorySection from './OurStorySection'
import StoriesAboutAirPollution from './StoriesAboutAirPollution'

export type OurStoriesAll = {
  title: string
  description: string
}

export const AboutUsOurStory = ({ stories, locale }: { stories: OurStoriesAll[]; locale: string }) => {
  return (
    <div className="OurStory_StoriesAboutAirPollution_container">
      <OurStorySection />
      <StoriesAboutAirPollution stories={stories} locale={locale} />
    </div>
  )
}

export default AboutUsOurStory
