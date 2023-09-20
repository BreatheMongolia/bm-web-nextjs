import React, { FC } from 'react'
import YourCause from '../support_us_icons/YourCause'
import Brev from '../support_us_icons/Brev'
import { useTranslation } from 'next-i18next'

const DonateThroughEmployer: FC = () => {
  const { t } = useTranslation('about')
  return (
    <div className="flex flex-col">
      <div className="font-normal text-md md:font-bold md:text-lg py-5">{t('supportUs.donateThroughEmployer')}</div>
      <div className="flex flex-wrap grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-5 my-5">
        <YourCause />
        <Brev />
      </div>
    </div>
  )
}

export default DonateThroughEmployer
