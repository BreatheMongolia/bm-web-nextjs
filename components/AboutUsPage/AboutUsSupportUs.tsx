import React from 'react'
import Image from 'next/image'
import bg from 'assets/images/giveButterBg.png'
import VolunteerCard from './SupportUs/VolunteerCard'
import DonateThroughEmployerCard from './SupportUs/DonateThroughEmployerCard'
import { useTranslation } from 'next-i18next'
import { H2 } from 'components/generic/Typography'

export type openPositions = {
  position: string
  link: string
}

export const AboutUsSupportUs = ({
  volunteers,
  countriesInfoText,
  locale,
}: {
  volunteers: any[]
  countriesInfoText: any[]
  locale: string
}) => {
  const { t } = useTranslation('about')
  const isMobile = typeof window !== 'undefined' && window.innerWidth

  return (
    <div className="container mx-auto flex flex-col gap-5">
      <H2 className="title" title={t('supportUs.title')} />
      <p className="font-normal text-md md:font-bold md:text-lg">{t('supportUs.subtitle')}</p>
      <div className="relative flex flex-row h-[590px] justify-center md:justify-start giveButterSection">
        {isMobile > 1100 && (
          <Image className="rounded-lg" height={590} src={bg} priority={false} alt="GiveButterSectionBM" />
        )}
        <iframe
          className="relative flex h-[590px] md:w-[650px] lg:absolute lg:top-0 lg:right-0 givebutterForm"
          src="https://givebutter.com/embed/c/donatebreathemongolia"
          name="givebutterBM"
          seamless
        ></iframe>
        <script src="https://givebutter.com/js/widget.js"></script>
      </div>

      <DonateThroughEmployerCard />
      <VolunteerCard volunteers={volunteers} countriesInfoText={countriesInfoText} locale={locale} />
    </div>
  )
}

export default AboutUsSupportUs
