import React, { FC } from 'react'
import YourCause from '../support_us_icons/YourCause'
import Brev from '../support_us_icons/Brev'
import { useTranslation } from 'next-i18next'

const DonateThroughEmployer = () => {
  const { t } = useTranslation('about')
  return (
    <div className="flex flex-col">
      <div className="font-normal text-md md:font-bold md:text-lg py-5">{t('supportUs.donateThroughEmployer')}</div>
      <div className="flex flex-wrap grid grid-cols-1 justify-items-start sm:grid-cols-2 sm:justify-items-center gap-10 m-5">
        <YourCause />
        <Brev />
      </div>
    </div>
  )
}

export default DonateThroughEmployer
