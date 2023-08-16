import { NewsCard } from 'components/Cards'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { News } from 'graphql/generated'
import { getNewsPosts } from 'lib/graphql-api/queries/news'
import { getImage } from 'lib/utils/getImage'
import { getTranslated } from 'lib/utils/getTranslated'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NewsPage = ({ news }: { news: News[] }) => {
  return (
    <div>
      <PageImageBanner
        bottomText={{
          left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
          right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
        }}
      />
      <div className="container flex flex-row flex-wrap gap-5 py-5 justify-evenly">
        {news.map((x, idx) => {
          return <NewsCard key={idx} news={x} />
        })}
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
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map'])),
      news: getTransformedData(data),
    },
    revalidate: 60,
  }
}
