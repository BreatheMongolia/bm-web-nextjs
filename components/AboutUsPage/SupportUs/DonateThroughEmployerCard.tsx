import React, { FC } from 'react'
import YourCause from '../support_us_icons/YourCause'
import Brev from '../support_us_icons/Brev'
import { useTranslation } from 'next-i18next'

const DonateThroughEmployer: FC = () => {
  const { t } = useTranslation('about')
  return (
    <div className="through_employer_flex">
      <div className="through_employer_icons">
        <YourCause />
        <Brev />
      </div>
      <div className="through_employer_description">{t('supportUs.donateThroughEmployer')}</div>
    </div>
  )
}

export default DonateThroughEmployer
