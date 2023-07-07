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

interface TakeActionPageProps {
  post: TakeAction
}

export type TakeActionDetail = {
  id: number
  title: string
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

  return (
    <div>
      {router.isFallback ? (
        <>Loading</>
      ) : (
        <>
          <article>
            <Head>
              <title>{`${takeAction.title} - Breathe Mongolia Clean Air Coalition`}</title>
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

const getTransformedData = (takeAction: any): TakeActionDetail => {
  return {
    id: takeAction.databaseId,
    date: takeAction.dateGmt,
    // totalPledges: takeAction.totalPledges,
    title:
      getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn) !== null
        ? getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn)
        : '',
    pledgeTitle:
      getTranslated(takeAction.customFields.pledgeTitle, takeAction.customFields.pledgeTitleMn) !== null
        ? getTranslated(takeAction.customFields.pledgeTitle, takeAction.customFields.pledgeTitleMn)
        : '',
    additionalResources:
      takeAction.customFields.additionalResources !== null
        ? takeAction.customFields.additionalResources.map(
            (resource: { title: string; titleMn: string; url: string; urlMn: string }) => {
              return {
                title: getTranslated(resource.title, resource.titleMn),
                url: getTranslated(resource.url, resource.urlMn),
              }
            },
          )
        : [],
    pledgeContent: getTranslated(takeAction.customFields.pledgeContent, takeAction.customFields.pledgeContentMn),
    introductionText: getTranslated(
      takeAction.customFields.introductionText,
      takeAction.customFields.introductionTextMn,
    ),
    listOfPhotos: takeAction.customFields.listOfPhotos,
    listOfSubSections: takeAction.customFields.listOfSubSections,
    listOfVideos: takeAction.customFields.listOfVideos,
    typeOfAction: takeAction.customFields.typeOfAction?.map(
      (type: { customFields: { name: string; nameMn: string } }) =>
        getTranslated(type.customFields.name, type.customFields.nameMn),
    ),
  }
}

export const getStaticProps = async ({ params, locale }) => {
  const takeAction = await getTakeActionsDetail(params?.slug)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'common'])),
      takeAction: getTransformedData(takeAction),
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
