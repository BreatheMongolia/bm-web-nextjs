import { H2 } from 'components/generic/Typography'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

const HealthSection = () => {
  const { t } = useTranslation('home')

  return (
    <div>
      <H2 title={t('health.title')} trailingLineColor="yellow" />
      <div className="w-full bg-[#FFEFE5] flex items-center justify-center px-10 py-2 rounded-lg">
        {/* Image */}
        <Image src="/images/health-body.png" alt="health section image" width={350} height={210} />
        {/* Right side */}
        <div className="px-5 flex flex-col gap-3 xl:gap-5 py-5">
          <h4 className="text-2xl font-bold"> Агаарын бохирдол ба эрүүл мэнд </h4>
          <p className="text-base">
            Агаарын бохирдол хүний ​​амьдралын бүхий л үе шатанд, бүхий л эрхтэн тогтолцоонд сөргөөр нөлөөлж байна.{' '}
          </p>
          <div className="mt-5">
            <Link href="/health">
              <button className="bg-[#f4ac3d] rounded-lg text-base py-3 px-5 font-bold uppercase text-white hover:bg-[#f4ac3d]/80">
                Дэлгэрэнгүй
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { HealthSection }
