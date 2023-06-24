import { PageImageBanner } from 'components/generic/PageImageBanner'
import { News } from 'graphql/generated'
// import { getNewsPosts } from '../api'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DonateSection, TakeActionsGrid } from 'components/TakeActionPage'
import { getTakeActionsPage } from 'lib/graphql-api/queries/takeAction'

const TakeActionsPage = ({ news }: { news: News[] }) => {
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
        imageUrl={{
          en: 'https://breathemon2.wpengine.com/wp-content/uploads/2022/12/banner2.png',
          mn: 'https://breathemon2.wpengine.com/wp-content/uploads/2022/12/banner2.png',
        }}
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
  // TODO: Call the api for takeactions page
  // const data = await getTakeActionsPage()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      news: [],
    },
    revalidate: 60,
  }
}
