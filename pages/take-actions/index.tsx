import { PageImageBanner } from 'components/generic/PageImageBanner'
import { News } from 'graphql/generated'
// import { getNewsPosts } from '../api'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
      <div className="container grid sm:grid-cols-4 gap-5 py-5">
        {news.map((x, idx) => {
          return (
            <div key={idx}>
              <div
                className="cursor-pointer hover:opacity-50"
                onClick={() => {
                  // TODO: source link, target=_blank or history.push()
                  router.push(`/news/${x.desiredSlug || x.slug || x.databaseId}`)
                }}
              >
                <div className="bg-zinc-300 rounded-md h-full">{x.customFields.title}</div>{' '}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TakeActionsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // const data = await getNewsPosts()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      news: [],
    },
    revalidate: 60,
  }
}
