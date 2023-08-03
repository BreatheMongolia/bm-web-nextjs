import { PageImageBanner } from 'components/generic/PageImageBanner'
import { getFeaturedTakeActions, getTakeActionsLatest } from 'lib/graphql-api/queries/takeAction'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { getTranslated } from 'lib/utils/getTranslated'
import { DonateSection, TakeActionsGrid } from 'components/TakeActionPage'
import { TakeAction } from 'graphql/generated'

export type TakeActionAll = {
  id: number
  slug: string
  title: string
  date: any
  typeOfAction: []
  featuredImage: string
}

const getTransformedData = (featured: TakeAction[]) => {
  const takeActions: TakeActionAll[] = []

  featured.map((takeAction: any) =>
    takeActions.push({
      id: takeAction.databaseId,
      slug: takeAction?.slug,
      date: takeAction.dateGmt,
      title:
        getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn) !== null
          ? getTranslated(takeAction.customFields.title, takeAction.customFields.titleMn)
          : "",
      typeOfAction: takeAction.customFields.typeOfAction?.map(
        (type: { customFields: { name: string; nameMn: string } }) =>
          getTranslated(type.customFields.name, type.customFields.nameMn)
      ),
      featuredImage: takeAction.featuredImage?.node.mediaItemUrl
    })
  )
  return takeActions
}

const getLatestTakeActions = (latest: TakeAction[]) => {
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
        getTranslated(takeAction?.node.customFields?.title, takeAction?.node.customFields?.titleMn) !== null
          ? getTranslated(takeAction?.node.customFields?.title, takeAction?.node.customFields?.titleMn)
          : "",
      typeOfAction: takeAction?.node.customFields.typeOfAction?.map(
        (type: { customFields: { name: string; nameMn: string } }) =>
          getTranslated(type.customFields.name, type.customFields.nameMn)
      ),
      featuredImage:
        takeAction?.node?.featuredImage?.node?.mediaDetails.sizes !== null
          ? takeAction?.node?.featuredImage?.node?.mediaDetails?.sizes[0].sourceUrl
          : ""
    })
  })
  return takeActions
}

const TakeActionsPage = ({ latest, featured }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { i18n } = useTranslation()

  // console.log(latest)
  // console.log(featured)

  const featuredTakeActions = getTransformedData(featured)
  const latestTakeActions = getLatestTakeActions(latest)
  var takeActions = [...featuredTakeActions, ...latestTakeActions]
  takeActions = takeActions.filter(
    (value, index, self) => self.map((takeAction) => takeAction.id).indexOf(value.id) == index
  )

  useEffect(() => {
    // Get the current language from the URL (e.g., "mn" or "en")
    const { locale } = router
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [])

  return (
    <div>
      <PageImageBanner
        bottomText={{
          left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
          right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
        }}
      />
      <div className="container mx-auto flex flex-col gap-20">
        <TakeActionsGrid takeAction={takeActions} />

        <DonateSection />
      </div>
    </div>
  )
}

export default TakeActionsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const featured = await getFeaturedTakeActions('/')
  const latest = await getTakeActionsLatest()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['nav', 'footer', 'takeAction'])),
      featured,
      latest,
    },
    revalidate: 60,
  }
}
