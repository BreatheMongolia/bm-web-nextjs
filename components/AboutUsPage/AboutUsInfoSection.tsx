import { useTranslation } from 'next-i18next'
import BuildingIcon from './about_us_icons/Building'
import EducationIcon from './about_us_icons/Education'
import MonitoringIcon from './about_us_icons/Monitoring'
import PollutionParticlesBackground from './about_us_icons/PollutionParticlesBackground'
export const AboutUsInfoSection = () => {
  const { t, i18n } = useTranslation('about')
  const GOALS = [
    {
      title: '#6',
      goalKeyWord: t('aboutUs.goal6KeyWord'),
      firstParagraph: t('aboutUs.improveEnvironment'),
      secondParagraph: t('aboutUs.improveEnvironmentDetails'),
    },
    {
      title: '#8',
      goalKeyWord: t('aboutUs.goal8KeyWord'),
      firstParagraph: t('aboutUs.preserveBalance'),
      secondParagraph: t('aboutUs.preserveBalanceDetails'),
    },
    {
      title: '#10',
      goalKeyWord: t('aboutUs.goal10KeyWord'),
      firstParagraph: t('aboutUs.buildGovernance'),
      secondParagraph: t('aboutUs.buildGovernanceDetails'),
    },
  ]

  return (
    <div>
      <div className="our_mission_container">
        <div className="our_mission_background">
          <PollutionParticlesBackground />
          <div className="mission_vision_wrapper">
            <p className="our_mission">
              <span className="our_mission_title">{t('ourMission')}</span>
              <br />
              <span className="mission_paragraph">{t('missionStatement')}</span>{' '}
            </p>
            <p className="our_mission">
              <span className="our_mission_title">{t('ourVision')}</span>
              <br />
              <span className="mission_paragraph">{t('visionStatement')}</span>{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="what_we_do_container">
        <h1 className="what_we_do_title">{t('whatWeDo')}</h1>
        <p className="what_we_do_paragraph">{t('whatWeDoDescription')}</p>

        <div className="details_container">
          <div className="education_container">
            <EducationIcon />

            <h3 className="what_we_do">{t('education')}</h3>
            <p className="what_we_do_desc">{t('educationDescription')}</p>
          </div>

          <div className="building_container">
            <BuildingIcon />
            <h3 className="what_we_do">{t('building')}</h3>
            <p className="what_we_do_desc">{t('buildingDescription')}</p>
          </div>

          <div className="monitoring_container">
            <MonitoringIcon />
            <h3 className="what_we_do">{t('monitoring')}</h3>
            <p className="what_we_do_desc">{t('monitoringDescription')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
