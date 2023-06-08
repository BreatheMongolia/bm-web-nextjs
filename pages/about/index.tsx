import { AboutUsHeader } from 'components/AboutUsPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const AboutPage = () => {
  return (
    <div>
      <AboutUsHeader />
    </div>
  )
}

export default AboutPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
  },
})
