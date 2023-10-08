import React, { FC } from 'react'
import CakeIllustration from '../support_us_icons/CakeIllustration'
import { useTranslation } from 'next-i18next'

const FacebookFundraiserCard: FC = () => {
  const { t } = useTranslation('about')
  return (
    <div className="facebook_fundraiser_container">
      <CakeIllustration />
      <p className="other_ways_to_donate_description">{t('supportUs.startBirthdayFundraiser')} </p>
      <ol className="other_instructions">
        <li>
          <span className="li_instructions">
            {t('supportUs.facebookStepOnePart1')}
            <a href="https://www.facebook.com/breathemongolia/fundraisers/?ref=page_internal" target="_blank">
              {' '}
              "Fundraiser"{' '}
            </a>
            {t('supportUs.facebookStepOnePart2')}
          </span>
        </li>
        <li>
          <span className="li_instructions">{t('supportUs.facebookStepTwo')}</span>
        </li>
        <li>
          <span className="li_instructions">{t('supportUs.facebookStepThree')}</span>
        </li>
      </ol>
    </div>
  )
}

export default FacebookFundraiserCard
