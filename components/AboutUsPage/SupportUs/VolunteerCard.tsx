import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { getTranslated } from 'lib/utils/getTranslated'
import parse from 'html-react-parser'
import Link from 'next/link'

export const VolunteerCard = ({
  volunteers,
  countriesInfoText,
  locale,
}: {
  volunteers: any[]
  countriesInfoText: any[]
  locale: string
}) => {
  const { t } = useTranslation('about')
  return (
    <div className="volunteer-count">
      <div className="volunteer-count-section  flex-row">
        {countriesInfoText.map((info, idx) => (
          <div className="country_count_col" key={'support' + idx}>
            <div className="text-center country-text">
              <img src={info.infoIcon.mediaItemUrl} alt="" />
              {info.customTextMn && (
                <div className="text-data-custom">
                  {parse(getTranslated(info.customText, info.customTextMn, locale))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="opportunity-section">
        <p className="title">{t('joinBm.opportunities')}</p>
        <ul className="position-list">
          {volunteers?.map((volunteerPos: any) => (
            <li className="position_list_el" key={volunteerPos?.node?.databaseId}>
              <a className="pos_link_url" href={volunteerPos?.node?.customFields?.link?.url} target="_blank">
                {getTranslated(
                  volunteerPos?.node?.customFields?.position,
                  volunteerPos?.node?.customFields?.positionMn,
                  locale,
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="apply_button_container">
          <Link
            className="apply_now_button"
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=rcJswrNeK0ewIXlMcbu4hPE6s_QwYeRChSapguhJZ8dUMVRFQUpDTzBaMkZLR01YOE5IRDkxSTBKSy4u"
            target="_blank"
          >
            {t('joinBm.applyNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VolunteerCard
