import Image from 'next/image'
import teamBreatheMongolia from 'assets/images/teamBreatheMongolia.jpg'
import { useTranslation } from 'next-i18next'

export const AboutUsBanner = () => {
  const { t } = useTranslation('about')

  return (
    <div className="grid sm:grid-cols-2 sm:grid-rows-1 w-full">
      {/* FIXME: Update the gradient color to match old */}
      <div className="hidden sm:flex sm:justify-center sm:items-center sm:bg-bm-blue sm:bg-gradient-to-r from-bm-blue to-[#61b1ee] text-white">
        <div className="p-5 sm:w-96 text-left">
          <h1 className="text-lg md:text-3xl mb-5 font-bold">{t('header.title')}</h1>
          <h1 className="text-sm">{t('header.description')}</h1>
        </div>
      </div>
      <div className="">
        <Image src={teamBreatheMongolia} alt="teamBreatheMongolia" width={1200} priority={true} />
      </div>
    </div>
  )
}
