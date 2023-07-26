import { PageImageBanner } from 'components/generic/PageImageBanner'
import { News } from 'graphql/generated'
// import { getNewsPosts } from '../api'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DonateSection, TakeActionsGrid } from 'components/TakeActionPage'
import { getFeaturedTakeActions, getTakeActionsLatest } from 'lib/graphql-api/queries/takeAction'

const TakeActionsPage = ({ latest, featured }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { i18n } = useTranslation()

  // console.log(latest)
  // console.log(featured)

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
      <TakeActionsGrid />
      <DonateSection />
    </div>
  )
}

export default TakeActionsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const featured = await getFeaturedTakeActions('/')
  const latest = await getTakeActionsLatest()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      featured,
      latest,
    },
    revalidate: 60,
  }
}
