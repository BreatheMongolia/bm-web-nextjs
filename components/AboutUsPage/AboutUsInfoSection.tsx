import { useTranslation } from 'next-i18next'
import BuildingIcon from './about_us_icons/Building'
import EducationIcon from './about_us_icons/Education'
import MonitoringIcon from './about_us_icons/Monitoring'
import PollutionParticlesBackground from './about_us_icons/PollutionParticlesBackground'

export const AboutUsInfoSection = () => {
  const { t } = useTranslation('about')
  const GOALS = [
    {
      title: '#6',
      goalKeyWord: t('goal6KeyWord'),
      firstParagraph: t('improveEnvironment'),
      secondParagraph: t('improveEnvironmentDetails'),
    },
    {
      title: '#8',
      goalKeyWord: t('goal8KeyWord'),
      firstParagraph: t('preserveBalance'),
      secondParagraph: t('preserveBalanceDetails'),
    },
    {
      title: '#10',
      goalKeyWord: t('goal10KeyWord'),
      firstParagraph: t('buildGovernance'),
      secondParagraph: t('buildGovernanceDetails'),
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
        <br />
        <p className="what_we_do_paragraph">{t('whatWeDoDescription')}</p>
        <br />

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
      <div className="why_container">
        <h1 className="why">{t('why')}</h1>
        <br />
        <p className="why_details">{t('whyDescription')}</p>
        <br />
        <h1 className="alignment">{t('ourAlignment')}</h1>
        <br />
        <p className="alignment_details">{t('ourAlignmentDescription')}</p>
        <br />
        <div className="goal_images_container">
          <div className="goal_images_one">
            <img src="/images/Goal 3.png" width={130} height={130} />
            <img src="/images/Goal 4.png" width={130} height={130} />
            <img src="/images/Goal 5.png" width={130} height={130} />
            <img src="/images/Goal 6.png" width={130} height={130} />
          </div>
          <div className="goal_images_two">
            <img src="/images/Goal 7.png" width={130} height={130} />
            <img src="/images/Goal 8.png" width={130} height={130} />
            <img src="/images/Goal 9.png" width={130} height={130} />
          </div>
          <br />
        </div>
        <h1 className="vision">{t('vision')}</h1>
        <br />
        <p className="vision_details">{t('visionDescription')}</p>
      </div>
    </div>
  )
}
