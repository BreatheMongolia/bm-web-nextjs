import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'

const VolunteerCard: FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="text_description">{t('supportUs.volunteer')}</div>
    </div>
  )
}

export default VolunteerCard
