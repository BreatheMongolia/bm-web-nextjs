import { PageImageBanner } from 'components/generic/PageImageBanner'
import { Page } from 'graphql/generated'
import { getTakeActionsPage } from 'lib/graphql-api/queries/takeAction'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DonateSection, TakeActionsGrid } from 'components/TakeActionPage'

const TakeActionsPage = ({ posts }: { posts: Page[] }) => {
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

  console.log(posts);

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
  const posts = await getTakeActionsPage('/')

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['takeAction', 'nav', 'footer'])),
      posts
    },
    revalidate: 60,
  }
}
