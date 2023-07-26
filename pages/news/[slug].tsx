import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getNewsFull, getNewsPostSlugs } from 'lib/graphql-api/queries/news'
import { News } from 'graphql/generated'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

interface NewsPostPageProps {
  post: News
}

export default function NewsPostPage({ post }: NewsPostPageProps) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { t, i18n } = useTranslation('common')

  const title = {
    mn: post.customFields.titleMn,
    en: post.customFields.title,
  }

  const body = {
    mn: post.customFields.bodyMn,
    en: post.customFields.body,
  }

  return (
    <div>
      {router.isFallback ? (
        <>Loading</>
      ) : (
        <>
          <article>
            <Head>
              <title>{`${post.customFields.title} - Breathe Mongolia Clean Air Coalition`}</title>
            </Head>
            <div className="container max-w-screen-lg">
              <h1 className="font-bold text-xl">{title[i18n.language]}</h1>
              <div dangerouslySetInnerHTML={{ __html: body[i18n.language] }}></div>
            </div>
          </article>
        </>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<NewsPostPageProps> = async ({ params, locale }) => {
  const post = await getNewsFull(params?.slug)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      post: post,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const news = await getNewsPostSlugs()

  return {
    paths: news.map(x => `/news/${x.desiredSlug || x.slug || x.databaseId}`) || [],
    fallback: true,
  }
}
