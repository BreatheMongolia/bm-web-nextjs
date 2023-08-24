import React, { FC } from 'react'
import AirPollutionStoryCard from './AirPollutionStoryCard'
import { useTranslation } from 'next-i18next'
// import { Spinner } from "../../../components"

export type OurStoriesAll = {
  title: string
  description: string
}

export const StoriesAboutAirPollution = ({ stories, locale }: { stories: OurStoriesAll[]; locale: string }) => {
  const { t } = useTranslation('about')
  // const { loading, data } = language === 'mng' ? useQuery(GET_STORIES_MN) : useQuery(GET_STORIES)
  // if (loading) return <Spinner />

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
