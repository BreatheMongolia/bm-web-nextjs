import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { News, NewsIdType } from 'graphql/generated'
import { getTranslated } from 'lib/utils/getTranslated'
import Desktop from 'components/Desktop'
import { H2 } from 'components/generic/Typography'
import { removeTags } from 'lib/utils/htmlParser'

import { getImage } from 'lib/utils/getImage'
import {
  getNewsBannerImages,
  getNewsFull,
  getNewsPostSlugs,
  getLastThree,
} from 'lib/graphql-api/queries/news'
import { BreadCrumb, ShareButton, LatestNews, Banner } from 'components/NewsPage/DetailPage'
import LoadingPage from 'components/generic/LoadingPage'

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
        <LoadingPage />
      ) : (
        <>
          <article>
            <Desktop>
              <div className="pt-14"></div>
              {/* <Banner bannerImages={bannerImage} bannerText={bannerText} /> */}
            </Desktop>
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
                <div className="article_news">
                  <LatestNews data={getLatest} />
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<NewsPostPageProps> = async ({ params, locale }) => {
  // check if it is slug or post-id
  const slug = params?.slug as string
  // this shouldn't happen, but base case
  // if (!slug || slug.length === 0) {
  //   return {
  //     redirect: {
  //       destination: '/news',
  //       permanent: false,
  //     },
  //   }
  // }
  // check if it is trying to come in with a postid
  const isPostId = slug.match(/^[0-9]+$/)
  // if (isPostId) {
  //   const res = await getNewsSlugByPostID(slug)
  //   if (res.desiredSlug || res.slug) {
  //     return {
  //       redirect: {
  //         destination: '/news/' + (res.desiredSlug || res.slug),
  //         permanent: true,
  //       },
  //     }
  //   }
  // }
  const post = await getNewsFull(slug, isPostId ? NewsIdType.DatabaseId : NewsIdType.Slug)
  if (!post) {
    return {
      notFound: true,
    }
  }
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const news = await getNewsPostSlugs()
  const paths = []
  locales.map(loc => {
    news.map(x => {
      if (x.desiredSlug || x.slug) {
        paths.push({ params: { slug: `${x.desiredSlug || x.slug}` }, locale: loc })
      }
    })
  })

  return {
    paths,
    fallback: true,
  }
}

const getTransformedData = (banner: any, locale: string) => {
  return {
    mediaItemUrl:
      getTranslated(
        banner?.newsGeneralFields.banner?.bannerImage?.node?.mediaItemUrl,
        banner?.newsGeneralFields.banner?.bannerImageMn?.node?.mediaItemUrl,
        locale,
      ) !== null
        ? getTranslated(
          banner?.newsGeneralFields.banner?.bannerImage?.node?.mediaItemUrl,
          banner?.newsGeneralFields.banner?.bannerImageMn?.node?.mediaItemUrl,
          locale,
        )
        : '',
  }
}

const getNews = (news: News, locale: string): any => {
  if (!news) {
    return
  }
  return {
    id: news.databaseId,
    date: news.dateGmt,
    slug: news.slug,
    desiredSlug: news.desiredSlug,
    body: getTranslated(news.newsCustomFields.body, news.newsCustomFields.bodyMn, locale),
    sourceLink: '',
    title:
      getTranslated(news.newsCustomFields.title, news.newsCustomFields.titleMn, locale) !== null
        ? getTranslated(news.newsCustomFields.title, news.newsCustomFields.titleMn, locale)
        : '',
    sourceName: '',
    sourceLanguage: '',
    newsLandingPageFeatured: '',
    excerpt:
      getTranslated(news.newsCustomFields.excerpt, news.newsCustomFields.excerptMn, locale) !== null
        ? getTranslated(news.newsCustomFields.excerpt, news.newsCustomFields.titleMn, locale)
        : '',
    authors:
      news?.newsCustomFields.authors !== null
        ? news?.newsCustomFields.authors?.map((author: any) => {
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
      news.newsCustomFields.featuredImage.image?.node?.mediaDetails,
      news.newsCustomFields.featuredImage.imageMn?.node?.mediaDetails,
      news.featuredImage?.node?.mediaDetails,
      'large',
    ),
    caption: getTranslated(news.newsCustomFields.featuredImage.caption, news.newsCustomFields.featuredImage.captionMn, locale),
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
      sourceLink: news.newsCustomFields.sourceLink,
      title:
        getTranslated(news.newsCustomFields.title, news.newsCustomFields.titleMn, locale) !== null
          ? getTranslated(news.newsCustomFields.title, news.newsCustomFields.titleMn, locale)
          : '',
      sourceName:
        getTranslated(news.newsCustomFields.sourceName, news.newsCustomFields.sourceNameMn, locale) !== null
          ? getTranslated(news.newsCustomFields.sourceName, news.newsCustomFields.sourceNameMn, locale)
          : '',
      sourceLanguage: news.newsCustomFields.sourceLanguage,
      newsLandingPageFeatured: '',
      // newsLandingPageFeatured: news.newsCustomFields.newsLandingPageFeatured || '',
      categories: news?.categories?.nodes.map((cat: any) => {
        return {
          name:
            getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn, locale) !== null
              ? getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn, locale)
              : '',
        }
      }),
      newsContentType: news.newsCustomFields.newsContentType,
      featuredImageSmall:
        getImage(
          news.newsCustomFields.featuredImage.image?.mediaDetails,
          news.newsCustomFields.featuredImage.imageMn?.mediaDetails,
          news.featuredImage?.node?.mediaDetails,
          'medium',
        ) || '',
      featuredImageBig:
        getImage(
          news.newsCustomFields.featuredImage.image?.mediaDetails,
          news.newsCustomFields.featuredImage.imageMn?.mediaDetails,
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
