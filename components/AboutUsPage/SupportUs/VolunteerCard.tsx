import React, { FC } from 'react'
import YourCause from '../support_us_icons/YourCause'
import Brev from '../support_us_icons/Brev'
import { useTranslation } from 'next-i18next'
import VolunteerPosition from './VolunteerPosition'

const VolunteerCard: FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="text_description">{t('supportUs.volunteer')}</div>
      <VolunteerPosition name="volunteerSection" />
    </div>
  )
}

export default VolunteerCard
