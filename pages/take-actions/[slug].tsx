import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getNewsFull, getNewsPostSlugs } from 'lib/graphql-api/queries/news'
import { TakeAction } from 'graphql/generated'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { getTakeActionSlugs, getTakeActionsDetail } from 'lib/graphql-api/queries/takeAction'

interface TakeActionPageProps {
  post: TakeAction
}

export default function TakeActionPostPage({ takeAction }) {
  const router = useRouter()

  if (!router.isFallback && !takeAction?.databaseId) {
    return <ErrorPage statusCode={404} />
  }

  const { t } = useTranslation('common')

  return (
    <div>
      {router.isFallback ? (
        <>Loading</>
      ) : (
        <>
          <article>
            <Head>
              <title>{`${takeAction.customFields.title} - Breathe Mongolia Clean Air Coalition`}</title>
              <meta property="og:title" content={takeAction.customFields.title} key="title" />
              <meta name="description" content={takeAction.customFields.introductionText} />
            </Head>
            <div className="container max-w-screen-lg">
              <h2>{takeAction.customFields.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: takeAction.customFields.introductionText }}></div>
            </div>
          </article>
        </>
      )}
    </div>
  )
}

export const getStaticProps = async ({ params, locale }) => {
  const takeAction = await getTakeActionsDetail(params?.slug)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map'])),
      takeAction,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const takeActions = await getTakeActionSlugs()

  return {
    paths: takeActions.map((x, idx) => `/take-actions/${x.slug || x.databaseId}`) || [],
    fallback: true,
  }
}
