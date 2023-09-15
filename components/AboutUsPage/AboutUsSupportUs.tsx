import React from 'react'
import Image from 'next/image'
import bg from 'assets/images/giveButterBg.png'
import VolunteerCard from './SupportUs/VolunteerCard'
import DonateThroughEmployerCard from './SupportUs/DonateThroughEmployerCard'
import { useTranslation } from 'next-i18next'
import { useMediaQuery } from 'react-responsive'

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
  const isMobile = useMediaQuery({ maxWidth: 1100 })

  return (
    <div className="main_support_us_wrapper support_us_wrapper">
      <h2 className="title">{t('supportUs.title')}</h2>
      <p className="supportSubtitle">{t('supportUs.subtitle')}</p>
      <div className="giveButterSection">
        {!isMobile && <Image src={bg} alt="GiveButterSection" />}
        <iframe
          className="givebutterForm"
          src="https://givebutter.com/embed/c/donatebreathemongolia"
          name="givebutter"
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
