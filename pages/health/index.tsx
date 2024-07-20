import { H2 } from 'components/generic/Typography'
import { NewsCarousel, TakeActionCarousel } from 'components/HomePage'
import { parse } from 'date-fns'
import { getHealthPage } from 'lib/graphql-api/queries/health'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getNewsPosts } from 'lib/graphql-api/queries/news'
import { getTranslated } from 'lib/utils/getTranslated'
import { GetStaticProps } from 'next'
import React from 'react'
import { text } from 'stream/consumers'

const HealthPage = ({ featuredNews, featuredTakeActions, locale }) => {
  return (
    <div className="container mx-auto flex flex-col px-[1rem] lg:px-[6rem] xl:px-[9rem] 2xl:px-[16rem] pt-14">
      <H2 title={"Air pollution affects all body systems"} />
      <p className='text-base text-zinc-800'>
      facilisis leo vel. Massa sapien faucibus et molestie ac feugiat. 
      Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. 
      Aliquet enim tortor at auctor urna nunc id cursus metus. Libero enim sed faucibus turpis in eu. 
      </p>
      <p className='text-zinc-500 mt-5 mb-5 '>
      Interact below to see causal health effects of air pollution.
      </p>
      <div className='h-[800px] w-[100%] bg-gray-500'>
        iframe goes here
      </div>
      
      <div className='flex flex-col gap-20'>
        <p className='font-semibold text-base text-zinc-800 mt-5'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Vestibulum morbi blandit cursus risus at ultrices. Suscipit tellus mauris a diam maecenas sed enim ut sem. Suspendisse in est ante in nibh mauris cursus mattis. Elit ullamcorper dignissim cras tincidunt. Non enim praesent elementum facilisis leo vel. Massa sapien faucibus et molestie ac feugiat. t
        </p>
        <TakeActionCarousel takeActionPosts={featuredTakeActions} locale={locale} />
        <NewsCarousel featuredNews={featuredNews} />
        <div className='h-[800px] w-[100%] bg-gray-500'>
          Poster goes here
        </div>
      </div>
      

    </div>
  )
}
export default HealthPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHealthPage()
  const news = await getNewsPosts()
  const homePage = await getHomePage("/")
  const featuredNews = news
  const featuredTakeActions = homePage.customFields.featuredTakeActions
  console.log(featuredNews)

  return {
    props: {
      locale,
      featuredNews,
      featuredTakeActions
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}