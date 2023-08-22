import dayjs from 'dayjs'
import Head from 'next/head'
import { getTranslated } from 'lib/utils/getTranslated'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// generic components
import { H2 } from 'components/generic/Typography'
import { NewsCard } from 'components/Cards'
import { AgaarNegCard } from 'components/Cards/NewsCards/AgaarNegCard'
import { PageImageBanner } from 'components/generic/PageImageBanner'
// news components
import { NewsGrid, FeaturedNews } from 'components/NewsPage/LandingPage'

// api/utils
import { News } from 'graphql/generated'
import { getNewsPosts } from 'lib/graphql-api/queries/news'
import { getImage } from 'lib/utils/getImage'

const NewsPage = ({ news }: { news: News[] }) => {
  const { t } = useTranslation('news')

  const filteredNews = [...news]
  return (
    <div>
      <Head>
        <title> News - Breathe Mongolia - Clean Air Coalition </title>
      </Head>
      <PageImageBanner
        bottomText={{
          left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
          right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
        }}
      />
      <div className="container mx-auto flex flex-col gap-20">
        <div>
          <H2 title={t('featuredNews')} descriptionHtml={''} trailingLineColor="blue" />
          <FeaturedNews />
        </div>
        <div>
          <H2 title={t('latestNews')} descriptionHtml={''} trailingLineColor="blue" />
          <NewsGrid numCols={4}>
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
          <NewsGrid numCols={4}>
            {filteredNews
              .sort((a, b) => {
                return dayjs(b.dateGmt ?? '').unix() - dayjs(a.dateGmt ?? '').unix()
              })
              .filter((_, idx) => idx < 8) // Move 8 to const MAX_NEWS when in separate component
              .map((x, idx) => {
                return <NewsCard key={idx} news={x} />
              })}
          </NewsGrid>
        </div>
      </div>
    </div>
  )
}

export default NewsPage

const getTransformedData = (data: News[]) => {
  if (data.length === 0) {
    return []
  }
  const allNews: any[] = []

  data.map((news: any) => {
    allNews.push({
      id: news.node.databaseId,
      sourceLink: news.node.customFields.sourceLink,
      title:
        getTranslated(news.node.customFields.title, news.node.customFields.titleMn) !== null
          ? getTranslated(news.node.customFields.title, news.node.customFields.titleMn)
          : '',
      sourceName:
        getTranslated(news.node.customFields.sourceName, news.node.customFields.sourceNameMn) !== null
          ? getTranslated(news.node.customFields.sourceName, news.node.customFields.sourceNameMn)
          : '',
      sourceLanguage: news.node.customFields.sourceLanguage,
      newsLandingPageFeatured: news.node.customFields.newsLandingPageFeatured,
      categories: news?.node?.categories?.nodes.map((cat: any) => {
        return {
          id: cat.categoryId,
          idString: cat.id,
          name:
            getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn) !== null
              ? getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn)
              : '',
          slug: cat.slug,
        }
      }),
      newsContentType: news.node.customFields.newsContentType,
      featuredImageSmall: getImage(
        news.node.customFields.featuredImage?.image?.mediaDetails,
        news.node.customFields.featuredImage?.imageMn?.mediaDetails,
        news.node.featuredImage?.node?.mediaDetails,
        'medium',
      ),
      featuredImageBig: getImage(
        news.node.customFields.featuredImage?.image?.mediaDetails,
        news.node.customFields.featuredImage?.imageMn?.mediaDetails,
        news.node.featuredImage?.node?.mediaDetails,
        'medium_large',
      ),
    })
  })
  return allNews
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await getNewsPosts()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news'])),
      news: getTransformedData(data),
    },
    revalidate: 60,
  }
}
