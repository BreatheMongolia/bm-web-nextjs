import { PageImageBanner } from 'components/generic/PageImageBanner'
import { TakeAction } from 'graphql/generated'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DonateSection, TakeActionsGrid } from 'components/TakeActionPage'
// import { getTakeActionsPage } from 'lib/graphql-api/queries/takeAction'

type TakeAction = {
  id: number
  title: string
  excerpt: string
  date: any
  totalPledges: number
  additionalResources: []
  introductionText: string
  pledgeContent: string
  listOfPhotos: []
  listOfSubSections: []
  listOfVideos: []
  typeOfAction: []
  featuredImage: string
}

const TakeActionsPage = ({ takeActions }: { takeActions: TakeAction }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { i18n } = useTranslation()

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
        <TakeActionsGrid takeActions={TakeAction} />
        <DonateSection />
      </div>
    </div>
  )
}

export default TakeActionsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // TODO: Call the api for takeactions page
  // const data = await getTakeActionsPage()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['take-actions', 'nav', 'footer'])),
      news: [],
    },
    revalidate: 60,
  }
}
