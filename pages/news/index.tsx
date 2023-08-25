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
import { News, Page_Customfields, Page_NewsGeneralFields_Banner } from 'graphql/generated'
import { getFeaturedNews, getNewsBannerImages, getNewsPosts } from 'lib/graphql-api/queries/news'
import { getImage } from 'lib/utils/getImage'
import { getBannerText } from 'lib/graphql-api/queries/home'
import { getBannerTextRight } from 'lib/utils/getBannerTextRight'

const NewsPage = ({
  news,
  banner,
  featuredNews,
}: {
  news: News[]
  featuredNews: News[]
  banner: Page_NewsGeneralFields_Banner & Page_Customfields
}) => {
  const { t, i18n } = useTranslation('news')

  const filteredNews = [...news]
  // get banner image by language
  const pageBanner =
    i18n.language === 'en'
      ? {
          imageUrl: banner.bannerImage.mediaItemUrl,
          leftText: banner.bannerTextLeft,
          rightText: getBannerTextRight(banner.bannerTextRight, 'categoryText'),
        }
      : {
          imageUrl: banner.bannerImageMn.mediaItemUrl,
          leftText: banner.bannerTextLeftMn,
          rightText: getBannerTextRight(banner.bannerTextRight, 'categoryTextMn'),
        }
  return (
    <div>
      <Head>
        <title> News - Breathe Mongolia - Clean Air Coalition </title>
      </Head>
      <PageImageBanner
        imageUrls={[{ mediaItemUrl: pageBanner.imageUrl }]}
        bottomText={{
          left: pageBanner.leftText,
          right: pageBanner.rightText,
        }}
      />
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
  const bannerImageData = await getNewsBannerImages('/news')
  const bannerTextData = await getBannerText()
  const featuredNews = await getFeaturedNews()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common'])),
      news: newsData,
      featuredNews,
      banner: {
        ...bannerImageData.news_general_fields.banner,
        ...bannerTextData,
      },
    },
    revalidate: 60 * 5, // every 5 minutes
  }
}
