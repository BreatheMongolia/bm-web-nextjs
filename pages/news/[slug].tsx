import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { News } from 'graphql/generated'
import { getTranslated } from 'lib/utils/getTranslated'
import Desktop from 'components/Desktop'
import { H2 } from 'components/generic/Typography'
import { removeTags } from 'lib/utils/htmlParser'

import { getImage } from 'lib/utils/getImage'
import { getNewsBannerImages, getNewsFull, getNewsPostSlugs, getLastThree } from 'lib/graphql-api/queries/news'
import { BreadCrumb, ShareButton, LatestNews, Banner } from 'components/NewsPage/DetailPage'

interface NewsPostPageProps {
  post: any
  bannerImage: any
  bannerText: any
  getLatest: any
}

export default function NewsPostPage({ post, bannerImage, bannerText, getLatest }: NewsPostPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <div> Loading... </div>
  }

  if (!post || !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { t } = useTranslation('news')

  const breadCrumbItems = [
    { id: 1, item: t('title') },
    { id: 2, item: post.title },
  ]

  return (
    <div>
      {router.isFallback ? (
        <>Loading</>
      ) : (
        <>
          <article>
            <Desktop>{/* <Banner bannerImages={bannerImage} bannerText={bannerText} /> */}</Desktop>
            <BreadCrumb breadCrumbItems={breadCrumbItems} />
            <div className="container">
              <div className="news-main-content">
                <div className="article_news">
                  {post.categories && (
                    <div className="category_news mb-5">
                      {post.categories?.map((data: any) => (
                        <div key={Math.random()}>
                          <span className="custom_dot_green"></span>
                          <span className="custom_green_span">{data.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <H2 title={post.title} />
                  <div className="subSection">
                    <div className="authorAndDate">
                      <div className="authorsSection">
                        {/* {post?.authors && (
                          <>
                            {post?.authors?.map((author: any) => (
                              <a key={Math.random()} className="authors" href={author.authorLink} target="_blank">
                                {' '}
                                {author.name}
                                <span className="custom_comma">,</span>
                              </a>
                            ))}
                          </>
                        )} */}
                      </div>
                      <span> {formatMyDate(post.date)} </span>
                    </div>
                    <ShareButton
                      url={'https://v2.breathemongolia.org/news/' + post.id}
                      title={post.title}
                      bottom={false}
                    />
                  </div>
                  <div className="featuredImage">
                    <img src={post.featuredImageBig} />
                    <span className="caption">{post.caption}</span>
                  </div>

                  <div className="articleBody" dangerouslySetInnerHTML={{ __html: post.body }}></div>
                  <div className="subSection">
                    <ShareButton
                      url={'https://v2.breathemongolia.org/news/' + post.id}
                      title={post.title}
                      bottom={true}
                    />
                  </div>
                </div>
                <LatestNews data={getLatest} />
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<NewsPostPageProps> = async ({ params, locale }) => {
  const post = await getNewsFull(params?.slug)
  const bannerImage = await getNewsBannerImages('/news')
  // const bannerText = await getBanner('/')
  const getLatest = await getLastThree()
  const transformedPost = getNews(post, locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common'])),
      post: transformedPost,
      bannerImage: getTransformedData(bannerImage, locale),
      bannerText: null, //getTransformedDataText(bannerText, locale),
      getLatest: getLatestNews(getLatest, locale),
      title: transformedPost.title,
      description: removeTags(transformedPost?.excerpt),
      image: transformedPost?.featuredImageBig,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const news = await getNewsPostSlugs()
  const paths = []
  news.map(x => {
    if (x.desiredSlug || x.slug) {
      paths.push(`/news/${x.desiredSlug || x.slug}`)
    }
  })

  return {
    paths,
    fallback: true,
  }
}

const getTransformedDataText = (bannersNode: any, locale: string) => {
  return {
    bannerTextLeft: getTranslated(bannersNode?.bannerTextLeft, bannersNode?.bannerTextLeftMn, locale),
    bannerTextRight: bannersNode?.bannerTextRight.map((text: any) => {
      return getTranslated(text?.categoryText, text?.categoryTextMn, locale)
    }),
  }
}

const getTransformedData = (banner: any, locale: string) => {
  return {
    mediaItemUrl:
      getTranslated(
        banner?.news_general_fields.banner?.bannerImage?.mediaItemUrl,
        banner?.news_general_fields.banner?.bannerImageMn?.mediaItemUrl,
        locale,
      ) !== null
        ? getTranslated(
            banner?.news_general_fields.banner?.bannerImage?.mediaItemUrl,
            banner?.news_general_fields.banner?.bannerImageMn?.mediaItemUrl,
            locale,
          )
        : '',
  }
}

const getNews = (news: News, locale: string): any => {
  return {
    id: news.databaseId,
    date: news.dateGmt,
    slug: news.slug,
    desiredSlug: news.desiredSlug,
    body: getTranslated(news.customFields.body, news.customFields.bodyMn, locale),
    sourceLink: '',
    title:
      getTranslated(news.customFields.title, news.customFields.titleMn, locale) !== null
        ? getTranslated(news.customFields.title, news.customFields.titleMn, locale)
        : '',
    sourceName: '',
    sourceLanguage: '',
    newsLandingPageFeatured: '',
    excerpt:
      getTranslated(news.customFields.excerpt, news.customFields.excerptMn, locale) !== null
        ? getTranslated(news.customFields.excerpt, news.customFields.titleMn, locale)
        : '',
    authors:
      news?.customFields.authors !== null
        ? news?.customFields.authors?.map((author: any) => {
            return {
              name:
                getTranslated(author.authorName, author.authorNameMn, locale) !== null
                  ? getTranslated(author.authorName, author.authorNameMn, locale)
                  : '',
              authorLink: author.authorLink,
            }
          })
        : null,
    categories: news?.categories?.nodes.map((cat: any) => {
      return {
        name:
          getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn, locale) !== null
            ? getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn, locale)
            : '',
      }
    }),
    newsContentType: '',
    featuredImageBig: getImage(
      news.customFields.featuredImage.image?.mediaDetails,
      news.customFields.featuredImage.imageMn?.mediaDetails,
      news.featuredImage?.node?.mediaDetails,
      'large',
    ),
    caption: getTranslated(news.customFields.featuredImage.caption, news.customFields.featuredImage.captionMn, locale),
  }
}

function getLatestNews(data: any[], locale: string) {
  if (data.length === 0) {
    return []
  }
  const breathMongoliaNews: any[] = []

  data.map((news: any) => {
    breathMongoliaNews.push({
      id: news.databaseId,
      slug: news.slug,
      sourceLink: news.customFields.sourceLink,
      title:
        getTranslated(news.customFields.title, news.customFields.titleMn, locale) !== null
          ? getTranslated(news.customFields.title, news.customFields.titleMn, locale)
          : '',
      sourceName:
        getTranslated(news.customFields.sourceName, news.customFields.sourceNameMn, locale) !== null
          ? getTranslated(news.customFields.sourceName, news.customFields.sourceNameMn, locale)
          : '',
      sourceLanguage: news.customFields.sourceLanguage,
      newsLandingPageFeatured: '',
      // newsLandingPageFeatured: news.customFields.newsLandingPageFeatured || '',
      categories: news?.categories?.nodes.map((cat: any) => {
        return {
          name:
            getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn, locale) !== null
              ? getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn, locale)
              : '',
        }
      }),
      newsContentType: news.customFields.newsContentType,
      featuredImageSmall:
        getImage(
          news.customFields.featuredImage.image?.mediaDetails,
          news.customFields.featuredImage.imageMn?.mediaDetails,
          news.featuredImage?.node?.mediaDetails,
          'medium',
        ) || '',
      featuredImageBig:
        getImage(
          news.customFields.featuredImage.image?.mediaDetails,
          news.customFields.featuredImage.imageMn?.mediaDetails,
          news.featuredImage?.node?.mediaDetails,
          'large',
        ) || '',
    })
  })

  return breathMongoliaNews
}

function formatMyDate(value: any, locale = 'fr-Fr') {
  const year = new Date(value).toLocaleDateString(locale, { year: 'numeric' })
  const month = new Date(value).toLocaleDateString(locale, { month: 'numeric' })
  const day = new Date(value).toLocaleDateString(locale, { day: 'numeric' })
  return day + ' • ' + month + ' • ' + year
}
