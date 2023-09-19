import React from 'react'
import DonateThroughEmployerCard from './SupportUs/DonateThroughEmployerCard'
import { useTranslation } from 'next-i18next'
import VolunteerCard from './SupportUs/VolunteerCard'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'

export type openPositions = {
  position: string
  link: string
}

export const AboutUsSupportUs = ({ volunteers }: { volunteers: openPositions[] }) => {
  const { t } = useTranslation('about')
  const isMobile = useMediaQuery({ maxWidth: 1100 })

  return (
    <div className="main_support_us_wrapper support_us_wrapper">
      <h2 className="title">{t('supportUs.title')}</h2>
      <p className="supportSubtitle">{t('supportUs.subtitle')}</p>
      <div className="giveButterSection">
        <iframe
          className="givebutterForm"
          src="https://givebutter.com/embed/c/donatebreathemongolia"
          name="givebutter"
          seamless
        ></iframe>
        <script src="https://givebutter.com/js/widget.js"></script>
      </div>

      <DonateThroughEmployerCard />
      <VolunteerCard />
    </div>
  )
}

export default AboutUsSupportUs
