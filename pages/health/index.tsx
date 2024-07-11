import { H2 } from 'components/generic/Typography'
import { NewsCarousel, TakeActionCarousel } from 'components/HomePage'
import { parse } from 'date-fns'
import { getHealthPage } from 'lib/graphql-api/queries/health'
import { getTranslated } from 'lib/utils/getTranslated'
import { GetStaticProps } from 'next'
import React from 'react'
import { text } from 'stream/consumers'

const HealthPage = (props) => {
  const { page, locale } = props
  return (
    <div className="container mx-auto flex flex-col px-[1rem] lg:px-[6rem] xl:px-[9rem] 2xl:px-[16rem]">
      <H2 title={"Air pollution affects all body systems"} />
      <p>
      Air pollution affects all body systems. It can affect your health. 
      It can affect your health. It can affect your health. It can affect your health.
      Air pollution affects all body systems. It can affect your health. 
      It can affect your health. It can affect your health. It can affect your health.
      </p>
      <p className=''>
      Interact below to see causal health effects of air pollution.
      </p>
      <div>
        iframe goes here
      </div>
      <NewsCarousel featuredNews={page.customFields.featuredNews} />
      <TakeActionCarousel takeActionPosts={page.customFields.featuredTakeActions} locale={locale} />
    </div>
  )
}
export default HealthPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHealthPage()

  return {
    props: {
      locale,
      page,
      title: {},
      description: {},
      image: {},
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}