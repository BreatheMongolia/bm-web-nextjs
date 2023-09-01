import React from 'react'
import AirPollutionStoryCard from './AirPollutionStoryCard'
import { useTranslation } from 'next-i18next'

export type OurStoriesAll = {
  title: string
  description: string
}

export const StoriesAboutAirPollution = ({ stories }: { stories: OurStoriesAll[] }) => {
  const { t } = useTranslation('about')
  return (
    <div className="mb-8 stories_air_pollution">
      <h1 className="air_pollution_title">{t('ourStory.storiesAirPollution')}</h1>
      <div className="stories_wrapper">
        {stories.map((story, idx) => (
          <AirPollutionStoryCard key={'our-stories' + idx} name={story.title} story={story.description} />
        ))}
      </div>
    </div>
  )
}

export default StoriesAboutAirPollution
