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
    <div>
      <H2 title={t('health.title')} trailingLineColor="yellow" />
      <div className="w-full bg-[#FFEFE5] flex items-center justify-center px-10 py-2 rounded-lg">
        {/* Image */}
        <Image src={imageSourceUrl} alt="health section image" width={350} height={210} />
        {/* Right side */}
        <div className="flex flex-col gap-3 px-5 py-5 xl:gap-5">
          <h4 className="text-2xl font-bold"> {t('health.textTitle')} </h4>
          <p className="text-base">{description}</p>
          <div className="mt-5">
            <Link href="/health">
              <button className="bg-[#f4ac3d] rounded-lg text-base py-3 px-5 font-bold uppercase text-white hover:bg-[#f4ac3d]/80">
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
