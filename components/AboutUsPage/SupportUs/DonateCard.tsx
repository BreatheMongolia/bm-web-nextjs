import React, { FC, useState } from 'react'
import LeavePageIcon from '../support_us_icons/LeavePageIcon'
import GivebutterLogo from '../../../assets/icons/GivebutterLogo'
import { useTranslation } from 'next-i18next'
import { getLanguage } from 'lib/utils/getLanguage'

const DonateCard: FC = () => {
  const { t } = useTranslation('about')
  const [language, setLanguage] = useState(getLanguage())

  return (
    <div className="donate_card">
      <GivebutterLogo height="30" width="30" />
      {language === 'mng' ? (
        <p className="ways_to_donate_description">
          <a href="#" className="support_us_link">
            Givebutter
          </a>
          {` ${t('supportUs.donateDirectlyOn')}`}
        </p>
      ) : (
        <p className="ways_to_donate_description">
          {`${t('supportUs.donateDirectlyOn')} `}
          <a href="#" className="support_us_link">
            Givebutter
          </a>
        </p>
      )}

      <a href="https://givebutter.com/donatebreathemongolia" target="_blank">
        <button className="donate_btn">
          {t('supportUs.donate')} <LeavePageIcon />
        </button>
      </a>
    </div>
  )
}

export default DonateCard
