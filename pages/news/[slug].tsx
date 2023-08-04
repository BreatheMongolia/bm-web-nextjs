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
  if (router.isFallback) {
    return <div> Loading... </div>
  }
  if (!post || !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { t, i18n } = useTranslation('common')

  const title = {
    mn: post.customFields?.titleMn,
    en: post.customFields?.title,
  }

  const body = {
    mn: post.customFields?.bodyMn,
    en: post.customFields?.body,
  }

  return (
    <div>
      <article>
        <Head>
          <title>{`${title[i18n.language]} - Breathe Mongolia Clean Air Coalition`}</title>
        </Head>
        <div className="container max-w-screen-lg">
          <h1 className="font-bold text-xl">{title[i18n.language]}</h1>
          <div dangerouslySetInnerHTML={{ __html: body[i18n.language] }}></div>
        </div>
      </article>
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
