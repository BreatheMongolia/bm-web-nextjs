import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import LogoBlue from 'assets/images/logoBlue.png'

const LoadingPage = () => {
  const { t } = useTranslation('common')

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-white z-50">
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div className="flex gap-5 items-center">
          <div className="animate-bounce h-8 w-8 rounded-full bg-bm-blue"></div>
          <div className="animate-bounce delay-150 h-8 w-8 rounded-full bg-action-red"></div>
          <div className=" h-32 w-32 relative">
            <Image src={LogoBlue} alt="Breathe Mongolia Logo" width={100} height={100} />
          </div>
          <div className="animate-bounce delay-150 h-8 w-8 rounded-full bg-[#f4ac3d]"></div>
          <div className="animate-bounce h-8 w-8 rounded-full bg-bm-blue"></div>
        </div>

        <div className="animate-pulse uppercase text-xl font-semibold text-gray-400 text-center mt-2">
          {t('loading')}
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
