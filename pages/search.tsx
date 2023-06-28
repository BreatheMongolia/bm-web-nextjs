import Head from 'next/head'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { useTranslation } from 'next-i18next'

export default function Index() {
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
