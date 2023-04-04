import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import SimpleButton from 'components/generic/SimpleButton'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div className="h-full flex justify-center items-center relative">
      <div>
        <Image src="/images/error.svg" fill={true} alt="404 Not Found Image" />
      </div>
      <div className="text-center z-10">
        <h3 className="text-6xl font-bold">{t('error.oops')}</h3>
        <p className="text-3xl font-medium mb-10">{t('error.text')}</p>
        <Link href="/">
          <SimpleButton text={t('error.return')} />
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
