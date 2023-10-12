import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'

interface IProps {
  image?: any
  date?: string
  description?: string
}
const AccomplishmentCard: FC<IProps> = ({ description, date, image }) => {
  const { t, i18n } = useTranslation()

  return (
    <div className="accomplishment_card">
      <div>
        <img className="accomplishment_image_card" src={image} alt={t('impact.accomplishment')} />
      </div>
      <div className="accomplishment_content_card">
        <h1 className="title">{date}</h1>
        <p className="body">
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </p>
      </div>
    </div>
  )
}

export default AccomplishmentCard
