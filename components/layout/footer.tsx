import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export const Footer = () => {
  const [t, i18n] = useTranslation()

  return (
    <div className="bg-bm-blue text-white py-5">
      <div className="container flex text-xs gap-5">
        <div className="flex gap-1">
          <div className="h-20 w-20 relative bg-gray-300"></div>

          <div className="h-20 w-20 relative">
            <a href="https://www.guidestar.org/profile/83-4376042" target="_blank">
              <Image src="/images/candid-seal-gold-2023.png" alt="candidSeal" fill={true} />
            </a>
          </div>
        </div>
        <div className="text-sm font-normal leading-5">
          <p>
            ©2019-{2023}
            {t('footer.copyright')} <br></br>
            {t('footer.name')}
          </p>
          <p className="mt-4">{t('footer.responsible')}</p>
        </div>
      </div>
    </div>
  )
}
