import Image from 'next/image'
import BM_WFH_Team from 'assets/images/BM_WFH_Team.jpg'
import { useTranslation } from 'react-i18next'

export const AboutUsHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="grid sm:grid-cols-2 w-full h-48">
      {/* FIXME: Update the gradient color to match old */}
      <div className="flex justify-center items-center bg-bm-blue bg-gradient-to-r from-bm-blue to-[#61b1ee] text-white">
        <div className="text-left w-96">
          <h1 className="text-3xl mb-5 font-bold">{t('header.title')}</h1>
          <h1 className="text-sm">{t('header.description')}</h1>
        </div>
      </div>
      <div className="relative">
        <Image src={BM_WFH_Team} alt="" width={1200} />
      </div>
    </div>
  )
}
