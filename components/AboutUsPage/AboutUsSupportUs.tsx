import React from 'react'
import DonateOnFacebookCard from './SupportUs/DonateOnFacebookCard'
import DonateCard from './SupportUs/DonateCard'
import FacebookFundraiserCard from './SupportUs/FacebookFundraiserCard'
import AmazonSmileCard from './SupportUs/AmazonSmileCard'
import DonateThroughEmployerCard from './SupportUs/DonateThroughEmployerCard'
import VolunteerIllustration from './support_us_icons/VolunteerIllustration'
// import {  } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

export type openPositions = {
  position: string
  link: string
}

export const AboutUsSupportUs = ({ volunteers }: { volunteers: openPositions[] }) => {
  const { t } = useTranslation('about')
  // const { loading, data } =
  //   language === "mng" ? useQuery(GET_VOLUNTEER_POSITIONS_MN) : useQuery(GET_VOLUNTEER_POSITIONS)
  // if (loading) return <Spinner />

  // const transformedVolPositions = data ? getTransformatedVolPositions(data.volunteerPositions.edges) : []

  return (
    <div className="main_support_us_wrapper">
      <div className="ways_to_donate">
        <div className="donate_title_wrapper">
          <h2 className="ways_to_donate_title">{t('supportUs.waysToDonate')}</h2>
        </div>
        <div className="ways_to_donate_flex_container">
          <DonateOnFacebookCard />
          <DonateCard />
        </div>
      </div>
      <hr className="ways_to_donate_break" />
      <div className="other_ways_to_donate">
        <div className="donate_title_wrapper">
          <h2 className="ways_to_donate_title">{t('supportUs.otherWaysToDonate')}</h2>
        </div>
        <div className="ways_to_donate_flex_container">
          <FacebookFundraiserCard />
          <AmazonSmileCard />
        </div>
      </div>
      <p className="and_spacer">{t('supportUs.andBreak')}</p>
      <DonateThroughEmployerCard />
      <hr className="other_ways_to_donate_break" />
      <div className="vounteer_container">
        <div className="volunteer_flex">
          <VolunteerIllustration />
          <div className="volunteer_right_container">
            <div className="volunteer_for_us">
              <div className="volunteer_title_wrapper">
                <h2 className="ways_to_donate_title_volunteer">{t('supportUs.volunteerForUs')}</h2>
              </div>
              <p className="current_needs_header">{t('supportUs.currentVolunteersNeeded')}</p>
              <div className="current_needs">
                {volunteers.map((v, idx) => {
                  return (
                    <div className="position" key={'volunteer' + idx}>
                      {v.position}
                      <a className="position_link" target="_blank" href={v.link}>
                        {t('supportUs.viewPosition')}
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsSupportUs
