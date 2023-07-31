import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths } from 'next'
import { TakeAction } from 'graphql/generated'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { getTakeActionSlugs, getTakeActionsDetail } from 'lib/graphql-api/queries/takeAction'
import {
  BackBtn,
  ImageCarousel,
  TextBody,
  PledgeBox,
  VideoCarousel,
  AdditionalResources,
  FAQ,
  UserFeedback,
} from 'components/TakeActionPage'
import { getTranslated } from 'lib/utils/getTranslated'
import { getImage } from 'lib/utils/getImage'

interface TakeActionPageProps {
  post: TakeAction
}

export type TakeActionDetail = {
  id: number
  title: string
  featuredImage?: string
  date: any
  totalPledges?: number
  additionalResources: []
  introductionText: string
  pledgeTitle: string
  pledgeContent: string
  listOfPhotos: []
  listOfSubSections: []
  listOfVideos: []
  typeOfAction: []
}

export default function TakeActionPostPage({ takeAction }) {
  const router = useRouter()

  if (!router.isFallback && !takeAction?.id) {
    return <ErrorPage statusCode={404} />
  }

  const { t } = useTranslation('common')
  const featuredImageBig = takeAction?.featuredImage?.node?.mediaItemUrl || takeAction?.listOfPhotos[0].mediaItemUrl

  return (
    <div>
      {router.isFallback ? (
        <>Loading</>
      ) : (
        <>
          <article>
            <Head>
              <title>{`${takeAction.title} - Breathe Mongolia Clean Air Coalition`}</title>
              <meta name="description" content={takeAction.introductionText} />
              <meta property="og:title" content={takeAction.title} />
              <meta property="og:description" content={takeAction.introductionText} />
              {featuredImageBig && <meta property="og:image" content={featuredImageBig} />}
            </Head>
            <div className="container max-w-screen-lg">
              <BackBtn />
              <div>
                <p className="action-title-big">{takeAction.title}</p>
              </div>
              <ImageCarousel images={takeAction.listOfPhotos} />

              <div className="mobile-container">
                <TextBody
                  title={takeAction.title}
                  introText={takeAction.introductionText}
                  typeOfAction={takeAction.typeOfAction}
                />
                <PledgeBox
                  actionId={takeAction.id}
                  title={takeAction.title}
                  content={takeAction.pledgeContent}
                  pledgeTitle={takeAction.pledgeTitle}
                  totalPledges={takeAction.totalPledges}
                />
              </div>
              <VideoCarousel videos={takeAction.listOfVideos} />
              <div className="mobile-container">
                {takeAction.listOfSubSections && <FAQ data={takeAction.listOfSubSections} />}
                {takeAction.additionalResources?.length > 0 && (
                  <AdditionalResources additionalResources={takeAction.additionalResources} />
                )}
                <UserFeedback actionId={takeAction.id} />
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  )
}

const getTransformedData = (takeAction: any, locale: string): TakeActionDetail => {
  return {
    id: takeAction.databaseId,
    date: takeAction.dateGmt,
    totalPledges: takeAction.totalPledges,
    featuredImage: takeAction?.featuredImage?.node?.mediaItemUrl,
    title:
      getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn, locale) !== null
        ? getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn, locale)
        : '',
    pledgeTitle:
      getTranslated(takeAction.customFields.pledgeTitle, takeAction.customFields.pledgeTitleMn, locale) !== null
        ? getTranslated(takeAction.customFields.pledgeTitle, takeAction.customFields.pledgeTitleMn, locale)
        : '',
    additionalResources:
      takeAction.customFields.additionalResources !== null
        ? takeAction.customFields.additionalResources.map(
            (resource: { title: string; titleMn: string; url: string; urlMn: string }) => {
              return {
                title: getTranslated(resource.title, resource.titleMn, locale),
                url: getTranslated(resource.url, resource.urlMn, locale),
              }
            },
          )
        : [],
    pledgeContent: getTranslated(
      takeAction.customFields.pledgeContent,
      takeAction.customFields.pledgeContentMn,
      locale,
    ),
    introductionText: getTranslated(
      takeAction.customFields.introductionText,
      takeAction.customFields.introductionTextMn,
      locale,
    ),
    listOfPhotos: takeAction.customFields.listOfPhotos,
    listOfSubSections: takeAction.customFields.listOfSubSections,
    listOfVideos: takeAction.customFields.listOfVideos,
    typeOfAction: takeAction.customFields.typeOfAction?.map(
      (type: { customFields: { name: string; nameMn: string } }) =>
        getTranslated(type.customFields.name, type.customFields.nameMn, locale),
    ),
  }
}

export const getStaticProps = async ({ params, locale }) => {
  const takeAction = await getTakeActionsDetail(params?.slug)

  if (!takeAction) return { notFound: true }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'home',
        'nav',
        'footer',
        'map',
        'common',
        'pledge',
        'faq',
        'takeAction',
      ])),
      takeAction: getTransformedData(takeAction, locale),
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const takeActions = await getTakeActionSlugs()

  return {
    paths: takeActions.map(x => `/take-actions/${x.slug || x.databaseId}`) || [],
    fallback: true,
  }
}
