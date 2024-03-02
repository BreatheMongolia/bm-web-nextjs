import { useTranslation } from 'next-i18next'
import GoalsCard from './GoalsCard'
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
      <div className=" flex flex-col">
        <div className="sm:hidden flex justify-center items-center bg-bm-blue bg-gradient-to-r from-bm-blue to-[#61b1ee] text-white">
          <div className="p-5 sm:w-96 text-center">
            <h1 className="text-xl mb-5 font-bold">{t('header.title')}</h1>
            <h1 className="text-sm">{t('header.description')}</h1>
          </div>
        </div>
        <div className="our_mission_background">
          <PollutionParticlesBackground />
          <div className=" mission_vision_wrapper">
            <div className="our_mission_title sm:mb-2">{t('ourMission')}</div>
            <div className="mission_paragraph sm:mb-5">{t('missionStatement')}</div>
            <div className="our_mission_title sm:mb-2">{t('ourVision')}</div>
            <div className="mission_paragraph sm:mb-5">{t('visionStatement')}</div>
          </div>
        </div>
      </div>
      <div className="what_we_do_container py-5">
        <h1 className="what_we_do_title text-xl sm:text-3xl">{t('whatWeDo')}</h1>
        <p className="what_we_do_paragraph my-5">{t('whatWeDoDescription')}</p>
        <div className=" container details_container">
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
      <div className="flex flex-col mt-20 mb-10 gap-8 mx-[5%] md:mx-[10%] lg:mx-[25%] text-center justify-center">
        <h1 className="font-bold text-xl md:text-3xl text-[#528fec]">{t('why')}</h1>
        <p className="text-base text-[#2c2d41]">{t('whyDescription')}</p>
        <h1 className="font-bold text-xl md:text-3xl text-[#528fec]">{t('ourAlignment')}</h1>
        <p className="text-base text-[#2c2d41]">{t('ourAlignmentDescription')}</p>
        <div className="place-self-center">
          <div className="flex flex-wrap p-5 justify-center gap-5 w-[350px] sm:w-[650px]">
            <img src="/images/Goal 3.png" width={130} height={130} />
            <img src="/images/Goal 4.png" width={130} height={130} />
            <img src="/images/Goal 5.png" width={130} height={130} />
            <img src="/images/Goal 6.png" width={130} height={130} />
            <img src="/images/Goal 7.png" width={130} height={130} />
            <img src="/images/Goal 8.png" width={130} height={130} />
            <img src="/images/Goal 9.png" width={130} height={130} />
          </div>
        </div>
        <h1 className="font-bold text-xl md:text-3xl text-[#528fec]">{t('vision')}</h1>
        <p className="text-base text-[#2c2d41]">{t('visionDescription')}</p>
      </div>
      <div className=" container flex flex-wrap justify-between mb-10 gap-10">
        {GOALS.map((goal, idx) => (
          <GoalsCard
            key={'goals' + idx}
            title={goal.title}
            goalKeyWord={goal.goalKeyWord}
            firstParagraph={goal.firstParagraph}
            secondParagraph={goal.secondParagraph}
          />
        ))}
      </div>
    </div>
  )
}
