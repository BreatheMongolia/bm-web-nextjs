import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticPaths } from 'next'
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
import { removeTags } from 'lib/utils/htmlParser'
import LoadingPage from 'components/generic/LoadingPage'

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

  return (
    <div>
      {router.isFallback ? (
        <LoadingPage />
      ) : (
        <>
          <article>
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

  const transformedTakeAction: any = getTransformedData(takeAction, locale)

  const featuredImageBig =
    transformedTakeAction?.featuredImage?.node?.mediaItemUrl || transformedTakeAction?.listOfPhotos[0].mediaItemUrl
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'home',
        'nav',
        'footer',
        'map',
        'pledge',
        'faq',
        'takeAction',
        'common',
      ])),
      takeAction: transformedTakeAction,
      title: transformedTakeAction.title,
      description: removeTags(transformedTakeAction?.introductionText),
      image: featuredImageBig,
    },
    revalidate: 60 * 10, // 10 minutes
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const takeActions = await getTakeActionSlugs()
  const paths = []
  locales.map(loc => {
    takeActions.map(x => {
      paths.push({
        params: {
          slug: `${x.slug || x.databaseId}`,
        },
        locale: loc,
      })
    })
  })
  return {
    paths,
    fallback: true,
  }
}
