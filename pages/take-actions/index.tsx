import { PageImageBanner } from 'components/generic/PageImageBanner'
import { Page } from 'graphql/generated'
import { getFeaturedTakeActions, getTakeActionsLatest } from 'lib/graphql-api/queries/takeAction'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DonateSection, TakeActionsGrid } from 'components/TakeActionPage'

const TakeActionsPage = ({ latest, featured }) => {
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

  console.log(latest)
  console.log(featured)

  return (
    <div>
      <PageImageBanner
        bottomText={{
          left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
          right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
        }}
      />
      <div className="container mx-auto flex flex-col gap-20">
        {/* <TakeActionsGrid takeAction={takeActions} /> */}

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
      ...(await serverSideTranslations(locale ?? 'en', ['takeAction', 'nav', 'footer'])),
      featured,
      latest,
    },
    revalidate: 60,
  }
}
