import { H2 } from 'components/generic/Typography'
import { NewsCarousel, TakeActionCarousel } from 'components/HomePage'
import { parse } from 'date-fns'
import { getHealthNews, getHealthPage } from 'lib/graphql-api/queries/health'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getNewsPosts } from 'lib/graphql-api/queries/news'
import { getTranslated } from 'lib/utils/getTranslated'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { text } from 'stream/consumers'

const HealthPage = ({ featuredNews, featuredTakeActions, page, locale }) => {
  // TODO: fix news carousel initial position
  return (
    <div className="container mx-auto flex flex-col pt-14">
      <H2 title={getTranslated(page?.title, page?.titleMn, locale)} />
      <p className='text-base text-zinc-800'>
      {getTranslated(page?.body, page?.bodyMn, locale)}
      </p>
      <p className='text-zinc-500 mt-5 mb-5 '>
      {getTranslated(page?.diagramTextTop, page?.diagramTextTopMn, locale)}
      </p>

      <iframe className="info-graphik-iframe" frameBorder="0" height="1375" id="serviceFrameSend" src="https://health-effects.swisstph.ch/index.html?a_lang=mn"></iframe>

      
      <div className='flex flex-col gap-20'>
        <p className='font-semibold text-base text-zinc-800 mt-5 hidden lg:block'>
        {getTranslated(page?.diagramTextBottom, page?.diagramTextBottomMn, locale)}
        </p>
        <TakeActionCarousel takeActionPosts={featuredTakeActions} locale={locale} />
        <NewsCarousel featuredNews={featuredNews} />
      </div>
      

    </div>
  )
}
export default HealthPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHealthPage()
  const homePage = await getHomePage("/")
  const featuredNews = await getHealthNews()
  const featuredTakeActions = homePage.customFields.featuredTakeActions

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map', 'common'])),
      locale,
      featuredNews,
      featuredTakeActions,
      page: page,
      title: getTranslated(page.healthSocialMediaShare.title, page.healthSocialMediaShare.titleMn, locale),
      image: getTranslated(page.healthSocialMediaShare.image.mediaItemUrl, page.healthSocialMediaShare.imageMn.mediaItemUrl, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}