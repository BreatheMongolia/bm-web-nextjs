import React, { FC } from 'react'
import Desktop from '../../components/Desktop'
import Mobile from '../../components/Mobile'

import { useTranslation } from 'next-i18next'

interface IProps {
  image?: any
  date?: string
  description?: string
}
const AccomplishmentCard: FC<IProps> = ({ description, date, image }) => {
  const { t, i18n } = useTranslation()
  return (
    <>
      <Desktop>
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
      </Desktop>
      <Mobile>
        <div className="accomplishment_card_mobile">
          <div className="accomplishment_card_left">
            <img className="accomplishment_image_card_mobile" src={image} alt={t('impact.accomplishment')} />
          </div>
          <div className="accomplishment_content_card_mobile">
            <h1 className="title_mobile">{date}</h1>
            <p className="body_mobile">
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </p>
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default AccomplishmentCard
