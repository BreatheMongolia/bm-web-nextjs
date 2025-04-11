import { H2 } from 'components/generic/Typography'
import { NewsCarousel, TakeActionCarousel } from 'components/HomePage'
import { getHealthNews, getHealthPage } from 'lib/graphql-api/queries/health'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getTranslated } from 'lib/utils/getTranslated'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const HealthPage = ({ featuredNews, featuredTakeActions, page, locale }) => {
  return (
    <div className="container mx-auto flex flex-col pt-14">
      <H2 title={getTranslated(page?.title, page?.titleMn, locale)} />
      <p className="text-base text-zinc-800">{getTranslated(page?.body, page?.bodyMn, locale)}</p>
      <p className="text-zinc-500 mt-5 mb-5 ">{getTranslated(page?.diagramTextTop, page?.diagramTextTopMn, locale)}</p>

      <iframe
        name="info-graphik-iframe"
        className="w-full h-[1002px] xl:w-full lg:w-screen lg:h-[1375px]"
        id="serviceFrameSend"
        src={`https://health-effects.swisstph.ch/index.html?a_lang=` + locale}
      ></iframe>

      <div className="flex flex-col gap-20">
        <p className="font-semibold text-base text-zinc-800 mt-5 lg:block">
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
  const homePage = await getHomePage('/')
  const featuredNews = await getHealthNews()
  const featuredTakeActions = homePage.homePage.featuredTakeActions.nodes || []

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map', 'common'])),
      locale,
      featuredNews,
      featuredTakeActions,
      page: page,
      title: getTranslated(page.healthSocialMediaShare.title, page.healthSocialMediaShare.titleMn, locale),
      image: getTranslated(
        page.healthSocialMediaShare.image?.node?.mediaItemUrl,
        page.healthSocialMediaShare.imageMn?.node?.mediaItemUrl,
        locale,
      ),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
