import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'

interface IProps {
  image?: any
  date?: string
  description?: string
}
const AccomplishmentMobileCard: FC<IProps> = ({ description, date, image }) => {
  const { t } = useTranslation()

  return (
    <div className="accomplishment_card_mobile">
      <div className="accomplishment_card_left">
        <img className="accomplishment_image_card_mobile" src={image} alt={t('impact.accomplishment')} />
      </div>
      <div className="accomplishment_content_card_mobile">
        <h1 className="title_mobile">{date}</h1>
        {description && <div className="body_mobile" dangerouslySetInnerHTML={{ __html: description }}></div>}
      </div>
    </div>
  )
}

export default AccomplishmentMobileCard
