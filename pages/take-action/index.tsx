import React from 'react'
import { getFeaturedTakeActions, getTakeActionLandingPageSettings, getTakeActionsLatest, getTakeActionText } from 'lib/graphql-api/queries/takeAction'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getTranslated } from 'lib/utils/getTranslated'
import { DonateSection, TakeActionsGrid } from 'components/TakeActionPage'
import { TakeAction } from 'graphql/generated'

export type TakeActionAll = {
  id: number
  slug: string
  title: string
  excerpt?: string
  date: any
  typeOfAction: string[]
  featuredImage: string
}

const getTransformedData = (featured: TakeAction[], locale: string) => {
  if (featured.length === 0) {
    return []
  }
  const takeActions: TakeActionAll[] = []
  featured.map((takeAction: any) =>
    takeActions.push({
      id: takeAction.databaseId,
      slug: takeAction?.slug,
      date: takeAction.dateGmt,
      title:
        getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn, locale) !== null
          ? getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn, locale)
          : '',
      excerpt:
        getTranslated(takeAction.customFields.excerpt, takeAction.customFields.excerptMn, locale) !== null
          ? getTranslated(takeAction.customFields.excerpt, takeAction.customFields.excerptMn, locale)
          : '',
      typeOfAction: takeAction.customFields.typeOfAction?.map(
        (type: { customFields: { name: string; nameMn: string } }) =>
          getTranslated(type.customFields.name, type.customFields.nameMn, locale),
      ),
      featuredImage: takeAction.featuredImage?.node.mediaItemUrl,
    }),
  )
  return takeActions
}

const getLatestTakeActions = (latest: TakeAction[], locale: string) => {
  if (latest.length === 0) {
    return []
  }
  const takeActions: TakeActionAll[] = []
  latest.map((takeAction: any) => {
    takeActions.push({
      id: takeAction?.node.databaseId,
      slug: takeAction?.node.slug,
      date: takeAction?.node.dateGmt,
      title:
        getTranslated(takeAction?.node.customFields?.title, takeAction?.node.customFields?.titleMn, locale) !== null
          ? getTranslated(takeAction?.node.customFields?.title, takeAction?.node.customFields?.titleMn, locale)
          : '',
      excerpt: '',
      typeOfAction: takeAction?.node.customFields.typeOfAction?.map(
        (type: { customFields: { name: string; nameMn: string } }) =>
          getTranslated(type.customFields.name, type.customFields.nameMn, locale),
      ),
      featuredImage:
        takeAction?.node?.featuredImage?.node?.mediaDetails.sizes !== null
          ? takeAction?.node?.featuredImage?.node?.mediaDetails?.sizes[0].sourceUrl
          : '',
    })
  })
  return takeActions
}

const TakeActionsPage = ({ latest, featured, locale, takeActionText }) => {
  const featuredTakeActions = getTransformedData(featured, locale)
  const latestTakeActions = getLatestTakeActions(latest, locale)
  var takeActions = [...featuredTakeActions, ...latestTakeActions]
  const { whatYouCanDo, whatYouCanDoMn, whatYouCanDoText, whatYouCanDoTextMn, ...donationsText } = takeActionText;
  const { donationText, donationTextMn, donationTitle, donationTitleMn, disclaimerText, disclaimerTextMn, waysToGive, waysToGiveMn, ...actionText } = takeActionText;

  takeActions = takeActions.filter(
    (value, index, self) => self.map(takeAction => takeAction.id).indexOf(value.id) == index,
  )

  const getActionCategories = () => {
    let newActionCategories: any = []
    takeActions.map(ta => {
      ta.typeOfAction.map((action: string) => {
        if (!newActionCategories.includes(action)) newActionCategories.push(action)
      })
    })
    return newActionCategories
  }

  const actionCategories = getActionCategories()

  return (
    <div>
      <div className="container mx-auto flex flex-col px-[1rem] lg:px-[6rem] xl:px-[9rem] 2xl:px-[16rem]">
        <TakeActionsGrid takeAction={takeActions} categories={actionCategories} text={actionText}/>

        <DonateSection text={donationsText}/>
      </div>
    </div>
  )
}

export default TakeActionsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const featured: any = await getFeaturedTakeActions('/')
  const latest = await getTakeActionsLatest()
  const takeActionText = await getTakeActionText()
  const data = await getTakeActionLandingPageSettings()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['nav', 'footer', 'takeAction', 'common'])),
      featured: featured.featuredTakeActionsLanding,
      latest,
      locale,
      takeActionText
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      image: getTranslated(data.landingPageImage.mediaItemUrl, data.landingPageImageMn.mediaItemUrl, locale)
    },
    revalidate: 60,
  }
}
