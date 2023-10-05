import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
// generic components
import { H2 } from 'components/generic/Typography'
import { NewsCard } from 'components/Cards'
import { AgaarNegCard } from 'components/Cards/NewsCards/AgaarNegCard'
// news components
import { NewsGrid, FeaturedNews } from 'components/NewsPage/LandingPage'
import agaarNegIcon from 'public/images/agaar-neg/agaar-neg-icon.png'
// api/utils
import { News, Page_Customfields, Page_NewsGeneralFields_Banner } from 'graphql/generated'
import { getAgaarNegNews, getFeaturedNews, getNewsPosts } from 'lib/graphql-api/queries/news'

const NewsPage = ({ news, featuredNews, agaarNegNews }: { news: News[]; featuredNews: News[]; agaarNegNews }) => {
  const { t } = useTranslation('news')

  const filteredNews = [...news]
  return (
    <div>
      <Head>
        <title> News - Breathe Mongolia - Clean Air Coalition </title>
      </Head>
      <div className="container mx-auto flex flex-col gap-16">
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
          <H2 iconImage={agaarNegIcon} title={t('agaarNegPlatform')} descriptionHtml={''} />
          <div className="gap-5 grid grid-cols-4">
            {agaarNegNews.map((x, idx) => {
              console.log(x)
              return <AgaarNegCard news={x} key={idx} />
            })}
            <div className="flex justify-center items-center">
              <Link href="https://agaarneg.mn/news_stories" target="_blank">
                <div className="bg-[#00aeef] text-white flex px-6 py-4 items-center justify-center gap-2 font-semibold rounded-full shadow-lg group hover:shadow-xl hover:bg-sky-600 transition-all">
                  <span className="text-xs">{t('seemoreon')} </span>
                  <h1>AgaarNeg.mn</h1>
                  <span>
                    <ArrowRightCircleIcon className="h-5 w-5 group-hover:-mr-1 transition-all" />
                  </span>
                </div>
              </Link>
            </div>
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

  const agaarNegNews = await getAgaarNegNews()
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common'])),
      news: newsData,
      featuredNews,
      agaarNegNews,
    },
    revalidate: 60 * 5, // every 5 minutes
  }
}
