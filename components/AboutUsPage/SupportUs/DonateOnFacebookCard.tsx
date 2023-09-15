import React, { FC, useState } from 'react'
import LeavePageIcon from '../support_us_icons/LeavePageIcon'
import FacebookLogo from '../support_us_icons/FacebookLogo'
import { useTranslation } from 'next-i18next'
import { getLanguage } from 'lib/utils/getLanguage'

const DonateOnFacebookCard: FC = () => {
  const { t } = useTranslation('about')
  const [language, setLanguage] = useState(getLanguage())

  return (
    <div className="donate_card donate_on_facebook">
      <FacebookLogo />
      {language === 'mng' ? (
        <p className="ways_to_donate_description">
          <a href="#" className="support_us_link">
            Facebook
          </a>
          {` ${t('supportUs.donateDirectlyOn')}`}
        </p>
      ) : (
        <p className="ways_to_donate_description">
          {`${t('supportUs.donateDirectlyOn')} `}
          <a href="#" className="support_us_link">
            Facebook
          </a>
        </p>
      )}

      <a target="_blank" href="https://www.facebook.com/breathemongolia">
        <button className="donate_btn">
          {t('supportUs.donate')} <LeavePageIcon />
        </button>
      </a>
    </div>
  )
}

export default DonateOnFacebookCard
