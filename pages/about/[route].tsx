import { AboutUsHeader } from 'components/AboutUsPage'
import { GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

const VALID_ROUTES = ['info', 'our-story', 'impact', 'our-team', 'support-us']

export default function AboutPageSection({}) {
  const router = useRouter()

  return (
    <div>
      <AboutUsHeader />
      <div>{router.asPath}</div>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
  },
})

export const getStaticPaths: GetStaticPaths = async ({}) => {
  return {
    paths: VALID_ROUTES.map(x => `/about/${x}`) || [],
    fallback: true,
  }
}
