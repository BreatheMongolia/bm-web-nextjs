import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// generic components
import { H2 } from 'components/generic/Typography'
import { NewsCard } from 'components/Cards'
import { AgaarNegCard } from 'components/Cards/NewsCards/AgaarNegCard'
// news components
import { NewsGrid, FeaturedNews } from 'components/NewsPage/LandingPage'

// api/utils
import { News, Page_Customfields, Page_NewsGeneralFields_Banner } from 'graphql/generated'
import { getFeaturedNews, getNewsPosts } from 'lib/graphql-api/queries/news'

const NewsPage = ({
  news,
  banner,
  featuredNews,
}: {
  news: News[]
  featuredNews: News[]
  banner: Page_NewsGeneralFields_Banner & Page_Customfields
}) => {
  const { t } = useTranslation('news')

  const filteredNews = [...news]
  return (
    <div>
      <div className="container mx-auto flex flex-col gap-20">
        <div>
          <H2 title={t('featuredNews')} descriptionHtml={''} trailingLineColor="blue" />
          <FeaturedNews news={featuredNews} />
        </div>
        <div>
          <H2 title={t('latestNews')} descriptionHtml={''} trailingLineColor="blue" />
          <NewsGrid>
            <div className="h-48 bg-gray-200 col-span-2"></div>
            <div className="h-48 bg-gray-200"></div>
            <div className="h-48 bg-gray-200"></div>
            <div className="h-48 bg-gray-200"></div>
            <div className="h-48 bg-gray-200"></div>
            <div className="h-48 bg-gray-200"></div>
            <div className="h-48 bg-gray-200"></div>
          </NewsGrid>
        </div>
        <div>
          <H2 title={t('agaarNegPlatform')} descriptionHtml={''} />
          <div className="flex gap-5">
            <AgaarNegCard />
            <AgaarNegCard />
            <AgaarNegCard />
            <AgaarNegCard />
          </div>
        </div>
        <div>
          <H2 title={t('latestOnBm')} descriptionHtml={''} trailingLineColor="blue" />
          <NewsGrid>
            {filteredNews.map((x, idx) => {
              return <NewsCard key={idx} news={x} />
            })}
          </NewsGrid>
        </div>
      </div>
    </div>
  )
}

export default NewsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // fetch the data
  const newsData = await getNewsPosts()
  const featuredNews = await getFeaturedNews()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common'])),
      news: newsData,
      featuredNews,
      title: 'News - Breathe Mongolia - Clean Air Coalition',
    },
    revalidate: 60 * 5, // every 5 minutes
  }
}
