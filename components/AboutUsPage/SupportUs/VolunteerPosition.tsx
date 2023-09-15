import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import parse from 'html-react-parser'
import {
  Page_Customfields_CountriesInfoText,
  Page_Customfields_JoinBreatheMongoliaImageSlider,
} from 'graphql/generated'
import { GET_JOIN_BM_DATA, VOLUNTEER_POSITIONS_DATA } from '../queries/JoinBM'
import { getTranslated } from 'lib/utils/getTranslated'

const getTransformedData = (data: any) => {
  const joinBmNode = data?.page

  return {
    title:
      getTranslated(
        joinBmNode?.customFields?.joinBreatheMongoliaTitle,
        joinBmNode?.customFields?.joinBreatheMongoliaTitleMn,
      ) !== null
        ? getTranslated(
            joinBmNode?.customFields?.joinBreatheMongoliaTitle,
            joinBmNode?.customFields?.joinBreatheMongoliaTitleMn,
          )
        : '',
    description:
      getTranslated(
        joinBmNode?.customFields?.joinBreatheMongoliaDescription,
        joinBmNode?.customFields?.joinBreatheMongoliaDescriptionMn,
      ) !== null
        ? getTranslated(
            joinBmNode?.customFields?.joinBreatheMongoliaDescription,
            joinBmNode?.customFields?.joinBreatheMongoliaDescriptionMn,
          )
        : '',
    sliderImage: joinBmNode?.customFields?.joinBreatheMongoliaImageSlider
      ? joinBmNode?.customFields?.joinBreatheMongoliaImageSlider.map((imageData: any) => {
          return {
            id: imageData?.sliderImage?.databaseId,
            url: imageData?.sliderImageLink,
            image: imageData?.sliderImage?.mediaItemUrl,
          }
        })
      : [],
    countriesInfo: joinBmNode?.customFields?.countriesInfoText
      ? joinBmNode?.customFields?.countriesInfoText.map((info: any) => {
          return {
            textContent: getTranslated(info?.customText, info?.customTextMn),
            iconId: info?.infoIcon?.databaseId,
            icon: info?.infoIcon?.mediaItemUrl,
          }
        })
      : [],
  }
}
type Props = {
  name: string
}

const VolunteerPosition: FC<Props> = ({ name }) => {
  const joinBmResult = useQuery(GET_JOIN_BM_DATA)
  const volunteerPositionsResult: any = useQuery(VOLUNTEER_POSITIONS_DATA)
  const joinBmData: any = joinBmResult.data ? getTransformedData(joinBmResult.data) : {}
  const [t, i18n] = useTranslation()

  // if ( volunteerPositionsResult.loading) {
  //   return <Spinner />
  // }

  return (
    <div className={name}>
      <div className="volunteer-count-section  flex-row">
        {joinBmData?.countriesInfo?.map((info: any) => (
          <div className="country_count_col" key={info?.iconId}>
            <div className="text-center country-text">
              <img src={info?.icon} alt="" />
              {info?.textContent && <div className="text-data-custom">{parse(info?.textContent)}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="opportunity-section">
        <p className="title">{t('home.joinBm.opportunities')}</p>
        <ul className="position-list">
          {volunteerPositionsResult?.data?.volunteerPositions?.edges.map((volunteerPos: any) => (
            <li className="position_list_el" key={volunteerPos?.node?.databaseId}>
              <a className="pos_link_url" href={volunteerPos?.node?.customFields?.link?.url} target="_blank">
                {getTranslated(
                  volunteerPos?.node?.customFields?.position,
                  volunteerPos?.node?.customFields?.positionMn,
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="apply_button_container">
          <a className="apply_now_button" href="https://link.breathemongolia.org/volunteer" target="_blank">
            {t('home.joinBm.applyNow')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default VolunteerPosition
