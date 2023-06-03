import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getNewsFull, getNewsPostSlugs } from 'lib/graphql-api/queries/news'
import { News } from 'graphql/generated'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function NewsPostPage({ post }: { post: News }) {
  const router = useRouter()
  // const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { t } = useTranslation('common')

  // console.log(post)
  // console.log(post.customFields.featuredImage.image.mediaDetails)
  // TODO: Get Image URL from the MediaDetails.sizes object
  return (
    <div>
      {router.isFallback ? (
        // <PostTitle>Loading…</PostTitle>
        <>Loading</>
      ) : (
        <>
          <article>
            <Head>
              <title>{`${post.customFields.title} - Breathe Mongolia Clean Air Coalition`}</title>
              {/* <meta property="og:image" content={post.customFields.featuredImage.image.mediaDetails} /> */}
            </Head>
            <div className="container max-w-screen-lg">
              <h1 className="font-bold text-xl"> {post.customFields.title} </h1>
              <div dangerouslySetInnerHTML={{ __html: post.customFields.body }}></div>
            </div>
          </article>

          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData, locale }) => {
  const post = await getNewsFull(params?.slug)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      preview,
      post: post,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const news = await getNewsPostSlugs()

  return {
    paths: news.map((x, idx) => `/news/${x.desiredSlug || x.slug || x.databaseId}`) || [],
    fallback: true,
  }
}
