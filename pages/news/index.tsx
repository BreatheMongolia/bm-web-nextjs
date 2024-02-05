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
// images
import agaarNegIcon from 'public/images/agaar-neg/agaar-neg-icon.png'
import bmLogoBlueIcon from 'public/images/logoBlue.png'
// api/utils
import { News } from 'graphql/generated'
import { getAgaarNegNews, getFeaturedNews, getNewsLandingPageSettings, getNewsPosts } from 'lib/graphql-api/queries/news'
import FullNewsGrid from 'components/NewsPage/FullNewsGrid'
import { getTranslated } from 'lib/utils/getTranslated'

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
  return (
    <div>
      <Head>
        <title> News - Breathe Mongolia - Clean Air Coalition </title>
      </Head>
      <div className="lg:container px-4 w-full mx-auto flex flex-col gap-16">
        <div>
          <H2 title={t('featuredNews')} trailingLineColor="blue" />
          <FeaturedNews news={featuredNews} />
        </div>
        <div>
          <H2 title={t('latestNews')} descriptionHtml={t('latestOnAirPollutionText')} trailingLineColor="blue" />
          <FullNewsGrid news={filteredNews} />
        </div>
        <div>
          <H2 iconImage={agaarNegIcon} title={t('agaarNegPlatform')} />
          <NewsGrid defaultRows={1}>
            {agaarNegNews.map((x, idx) => {
              return <AgaarNegCard className={idx > 3 ? 'hidden md:block' : ''} news={x} key={idx} />
            })}
            <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
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
        <div className="mb-20">
          <H2
            title={t('latestOnBm')}
            trailingLineColor="blue"
            iconImage={bmLogoBlueIcon}
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
      image: getTranslated(data.image.mediaItemUrl, data.imageMn.mediaItemUrl, locale)
    },
    revalidate: 60 * 5, // every 5 minutes
  }
}
