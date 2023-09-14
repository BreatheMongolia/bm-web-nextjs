import React from 'react'
import AmazonLogo from '../support_us_icons/AmazonLogo'
import { useTranslation } from 'next-i18next'

const AmazonSmileCard = () => {
  const { t } = useTranslation('about')
  return (
    <div className="amazon_smile_container">
      <AmazonLogo />
      <p className="other_ways_to_donate_description">
        {t('supportUs.addToSmileAmazon')}{' '}
        <a href="https://smile.amazon.com/" target="_blank" className="support_us_link">
          https://smile.amazon.com/
        </a>
        {t('supportUs.wontCostACent')}
      </p>
      <ol className="other_instructions">
        <li>
          <span className="li_instructions">{t('supportUs.amazonSmileStepOne')}</span>
        </li>
        <li>
          <span className="li_instructions">{t('supportUs.amazonSmileStepTwo')}</span>
        </li>
        <li>
          <span className="li_instructions">
            {t('supportUs.amazonSmileStepThreePart1')}
            <a href="https://smile.amazon.com/" target="_blank" className="support_us_link">
              https://smile.amazon.com/
            </a>
            {t('supportUs.amazonSmileStepThreePart2')}
          </span>
        </li>
      </ol>
    </div>
  )
}

export default AmazonSmileCard
