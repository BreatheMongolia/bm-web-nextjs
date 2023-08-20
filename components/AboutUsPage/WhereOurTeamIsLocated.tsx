import React, { FC } from 'react'
import WorldMap from 'assets/images/WorldMap'
import Desktop from '../../components/Desktop'
import Mobile from '../../components/Mobile'
import UsFlag from 'assets/icons/Flags/US'
import MongoliaFlag from 'assets/icons/Flags/Mongolia'
import IndiaFlag from 'assets/icons/Flags/India'
import UKFlag from 'assets/icons/Flags/UKFlag'
import CanadaFlag from 'assets/icons/Flags/Canada'
import JapanFlag from 'assets/icons/Flags/Japan'
import EUFlag from 'assets/icons/Flags/EUFlag'
import InnerMongoliaFlag from 'assets/icons/Flags/InnerMongolia'
import TurkeyFlag from 'assets/icons/Flags/Turkey'
import AustraliaFlag from 'assets/icons/Flags/Australia'
import KoreaFlag from 'assets/icons/Flags/Korea'
import ChinaFlag from 'assets/icons/Flags/China'
import { useTranslation } from 'next-i18next'

const WhereOurTeamIsLocated: FC = () => {
  const { t, i18n } = useTranslation('about')

  return (
    <>
      <Desktop>
        <div className="flex flex-col items-center justify-center">
          <h1 className="where_our_team_title">{t('ourTeam.whereOurTeamIsLocated')}</h1>
          <WorldMap />
        </div>
      </Desktop>
      <Mobile>
        <div className="flex flex-col items-center justify-center">
          <h1 className="where_our_team_title">{t('ourTeam.whereOurTeamIsLocated')}</h1>
          <div className="flex flex-row items-center justify-center">
            <MongoliaFlag />
            <UsFlag />
            <EUFlag />
          </div>
          <div className="flex flex-row items-center justify-center">
            <InnerMongoliaFlag />
            <CanadaFlag />
            <UKFlag />
          </div>
          <div className="flex flex-row items-center justify-center">
            <IndiaFlag />
            <JapanFlag />
            <TurkeyFlag />
          </div>
          <div className="flex flex-row items-center justify-center">
            <AustraliaFlag />
            <KoreaFlag />
            <ChinaFlag />
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default WhereOurTeamIsLocated
