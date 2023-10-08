import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import SimpleButton from 'components/generic/SimpleButton'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NotFoundPage = () => {
  const { t } = useTranslation('error')
  return (
    <div className="h-full flex justify-center items-center relative">
      <div>
        <Image src="/images/error.svg" fill={true} alt="404 Not Found Image" />
      </div>
      <div className="text-center z-10">
        <h3 className="text-6xl font-bold">{t('oops')}</h3>
        <p className="text-3xl font-medium mb-10">{t('text')}</p>
        <Link href="/">
          <SimpleButton text={t('return')} />
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map', 'error', 'common'])),
  },
})
