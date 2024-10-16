import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
// generic components
import { H2 } from 'components/generic/Typography'
import { NewsCard, AgaarNegCard } from 'components/Cards'
// news components
import { NewsGrid, FeaturedNews } from 'components/NewsPage/LandingPage'
// api/utils
import { News } from 'graphql/generated'
import {
  getAgaarNegNews,
  getFeaturedNews,
  getNewsLandingPageSettings,
  getNewsPosts,
} from 'lib/graphql-api/queries/news'
import FullNewsGrid from 'components/NewsPage/FullNewsGrid'
import { getTranslated } from 'lib/utils/getTranslated'
import LogoBlue from 'assets/images/logoBlue.png'
import { useMediaQuery } from 'react-responsive'

// FIXME: Featured News not showing up
const NewsPage = ({ news, featuredNews, agaarNegNews }: { news: News[]; featuredNews: News[]; agaarNegNews }) => {
  const { t } = useTranslation('news')
  const isMobile = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })
  const maxNews = isMobile ? 6 : 8

  const filteredNews = [...news]
  // filter to categories for BM related news, slice recent 8
  const bmNews = filteredNews
    .filter(x => {
      return x.categories.nodes.some(c => c.slug === 'about-us' || c.slug === 'press-release')
    })
    .slice(0, maxNews)
  return (
    <div>
      <Head>
        <title> News - Breathe Mongolia - Clean Air Coalition </title>
      </Head>
      <div className="lg:container px-4 w-full mx-auto flex flex-col gap-16 pt-5 md:pt-10 ">
        <div>
          <H2 title={t('featuredNews')} trailingLineColor="blue" />
          <FeaturedNews news={featuredNews} />
        </div>
        <div>
          <H2 title={t('latestNews')} descriptionHtml={t('latestOnAirPollutionText')} trailingLineColor="blue" />
          <FullNewsGrid news={filteredNews} />
        </div>
        <div>
          <H2
            iconImage={'/images/agaar-neg/agaar-neg-icon.png'}
            title={t('agaarNegPlatform')}
            agaarnegButton={{
              title: t('seemoreon'),
              url: 'https://agaarneg.mn/news_stories',
            }}
          />
          <NewsGrid defaultRows={1}>
            {agaarNegNews.map((x, idx) => {
              return <AgaarNegCard className={idx > 3 ? 'hidden md:block' : ''} news={x} key={idx} />
            })}
          </NewsGrid>
        </div>
        <div className="mb-20">
          <H2
            title={t('latestOnBm')}
            trailingLineColor="blue"
            iconImage={LogoBlue}
            extraButton={{
              title: t('seemore'),
              url: '/news/breathemongolia',
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
  const data = await getNewsLandingPageSettings()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common'])),
      news: newsData,
      locale,
      featuredNews,
      agaarNegNews,
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      image: getTranslated(data.image.mediaItemUrl, data.imageMn.mediaItemUrl, locale),
    },
    revalidate: 60 * 5, // every 5 minutes
  }
}
