import Head from 'next/head'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const SearchPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Head>
        <title>{`Search Results - Breathe Mongolia`}</title>
      </Head>
      <div>
        <PageImageBanner
          bottomText={{
            left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
            right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
          }}
        />
      </div>
    </div>
  )
}

export default SearchPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'error'])),
  },
})
