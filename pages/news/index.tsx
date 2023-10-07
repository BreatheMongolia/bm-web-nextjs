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

// FIXME: Featured News not showing up
const NewsPage = ({ news, featuredNews, agaarNegNews }: { news: News[]; featuredNews: News[]; agaarNegNews }) => {
  const { t } = useTranslation('news')
  const filteredNews = [...news]
  // filter to categories for BM related news, slice recent 8
  const bmNews = filteredNews
    .filter(x => {
      return x.categories.nodes.some(c => c.slug === 'about-us' || c.slug === 'press-release')
    })
    .slice(0, 8)
  console.log(featuredNews.length)
  return (
    <div>
      <Head>
        <title> News - Breathe Mongolia - Clean Air Coalition </title>
      </Head>
      <div className="lg:container px-4 w-full mx-auto flex flex-col gap-16">
        <div>
          <H2 title={t('featuredNews')} descriptionHtml={''} trailingLineColor="blue" />
          <FeaturedNews news={featuredNews} />
        </div>
        <div>
          <H2 title={t('latestNews')} descriptionHtml={''} trailingLineColor="blue" />
          <NewsGrid>
            {filteredNews.slice(0, 11).map((x, idx) => {
              return (
                <div
                  key={idx}
                  className={`h-32 sm:h-60 ${idx === 0 && 'md:col-span-2'} ${idx > 3 && 'hidden md:block'}`}
                >
                  <NewsCard key={idx} news={x} cardHeight="fill" />
                </div>
              )
            })}
          </NewsGrid>
        </div>
        <div>
          <H2 iconImage={agaarNegIcon} title={t('agaarNegPlatform')} descriptionHtml={''} />
          <NewsGrid defaultRows={2}>
            {agaarNegNews.map((x, idx) => {
              return <AgaarNegCard className={idx > 3 ? 'hidden md:block' : ''} news={x} key={idx} />
            })}
            <div className="flex justify-center items-center">
              <Link href="https://agaarneg.mn/news_stories" target="_blank">
                <div className="bg-[#00aeef] text-white flex px-6 py-4 items-center justify-center gap-2 font-semibold rounded-full shadow-lg group hover:shadow-xl hover:bg-sky-600 transition-all w-full">
                  <span className="text-xs">{t('seemoreon')} </span>
                  <h1>AgaarNeg.mn</h1>
                  <span>
                    <ArrowRightCircleIcon className="h-5 w-5 group-hover:-mr-1 transition-all" />
                  </span>
                </div>
              </Link>
            </div>
          </NewsGrid>
        </div>
        <div>
          <H2
            title={t('latestOnBm')}
            descriptionHtml={''}
            trailingLineColor="blue"
            extraButton={{
              title: t('seeMore'),
              url: '/news',
            }}
          />
          <NewsGrid>
            {bmNews.map((x, idx) => {
              return <NewsCard key={idx} news={x} className={idx > 1 ? 'hidden md:block' : ''} />
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
