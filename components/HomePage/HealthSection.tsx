import { H2 } from 'components/generic/Typography'
import { HomePageHealthSection } from 'graphql/generated'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  healthSection: HomePageHealthSection
}

const HealthSection = ({ healthSection }: Props) => {
  const { t, i18n } = useTranslation('home')
  const description = i18n.language === 'mn' ? healthSection?.healthDescriptionMn : healthSection?.healthDescriptionEn
  const image = i18n.language === 'mn' ? healthSection?.healthImageMn : healthSection?.healthImageEn
  const imageSourceUrl = image?.node?.mediaDetails.sizes !== null ? image?.node?.mediaDetails?.sizes[0].sourceUrl : ''
  return (
    <div className="flex flex-col">
      <H2 title={t('health.title')} trailingLineColor="yellow" />
      <div className="w-full h-full bg-[#FFEFE5] flex items-center justify-center md:px-10 py-2 rounded-lg overflow-hidden">
        {/* Image */}
        <img src={imageSourceUrl} alt="health section image" className="ml-3 md:ml-0 max-h-72" />
        {/* Right side */}
        <div className="flex flex-col gap-3 px-3 md:px-5 py-5 xl:gap-5">
          <h4 className="text-lg font-bold md:text-2xl"> {t('health.textTitle')} </h4>
          <p className="text-sm md:text-base">{description}</p>
          <div className="mt-5">
            <Link href="/health">
              <button className="bg-[#f4ac3d] rounded-lg text-sm md:text-base py-3 px-5 font-bold uppercase text-white hover:bg-[#f4ac3d]/80">
                {t('health.learnMore')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { HealthSection }
