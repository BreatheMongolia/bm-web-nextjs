import React from 'react'
import Image from 'next/image'
import bg from 'assets/images/giveButterBg.png'
import VolunteerPosition from './SupportUs/VolunteerPosition'
import DonateThroughEmployerCard from './SupportUs/DonateThroughEmployerCard'
import { useTranslation } from 'next-i18next'
import { H2 } from 'components/generic/Typography'
import DonorsMain from './DonorsMain'

export type openPositions = {
  position: string
  link: string
}

const FORM_URL = 'https://givebutter.com/embed/c/donatebreathemongolia'

export const AboutUsSupportUs = ({
  descriptionHtml,
  volunteers,
  countriesInfoText,
  locale,
  donors,
  donorsTitle,
  donorDescription,
}: {
  descriptionHtml: string
  volunteers: any[]
  countriesInfoText: any[]
  locale: string
  donors: any[]
  donorsTitle: string
  donorDescription: string
}) => {
  const { t } = useTranslation('about')

  return (
    <div className="container mx-auto mt-10 flex flex-col gap-5">
      <H2 className="title" title={t('supportUs.title')} />
      <p className="font-normal text-md md:font-bold md:text-lg">{t('supportUs.subtitle')}</p>
      <div className="relative flex flex-row h-[590px] justify-center md:justify-start">
        <Image className="rounded-lg hidden lg:block" height={590} src={bg} priority={false} alt="giveButterImage" />
        <iframe
          className="flex h-[590px] w-full md:w-[650px] lg:absolute lg:top-0 lg:right-0 bg-white rounded-lg border-inherit border-2"
          src={FORM_URL}
          name="givebutterFrame"
          seamless
        ></iframe>
        <script src="https://givebutter.com/js/widget.js"></script>
      </div>

      <DonorsMain donors={donors} donorsTitle={donorsTitle} donorDescription={donorDescription} />
      <DonateThroughEmployerCard />
      <VolunteerPosition
        joinDescription={descriptionHtml}
        volunteers={volunteers}
        countriesInfoText={countriesInfoText}
        locale={locale}
      />
    </div>
  )
}

export default AboutUsSupportUs
