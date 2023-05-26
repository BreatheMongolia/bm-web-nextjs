import React, { FC, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import cx from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/solid'
import InfoPinIcon from './InfoPinIcon'

const InfoPopup = () => {
  const [hidden, setHidden] = useState(false)

  return (
    <div
      className={`
      flex flex-row justify-center absolute right-80 gap-x-2
      w-[290px] rounded-md p-2 bg-slate-200
      border-[0.5px] border-black/10 text-xs backdrop-blur-xl	
      ${hidden && 'hidden'}
      `}
    >
      <div className="info_icon">
        <InfoPinIcon />
      </div>
      <div className="info-content">
        <div className="info_popup_description">
          <Trans i18nKey="map.pinDesc">
            <strong></strong>
          </Trans>
        </div>
      </div>

      <div onClick={() => setHidden(true)}>
        <XMarkIcon className="h-5 w-5" />
      </div>
    </div>
  )
}
InfoPopup.displayName = 'Info Popup'

export { InfoPopup }
