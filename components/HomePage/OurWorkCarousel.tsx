import { H2 } from 'components/generic/Typography'
import { Page_Customfields_CampaignAndOurWorkSlider } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

export const OurWorkCarousel = ({
  title,
  campaigns,
}: {
  title: { en: string; mn: string }
  campaigns: Page_Customfields_CampaignAndOurWorkSlider[]
}) => {
  const { t } = useTranslation('home')
  return (
    <div>
      <H2
        title={title.mn}
        trailingLineColor="yellow"
        extraButton={{
          title: t('campaignWork.seeMore'),
          url: '/news',
        }}
      />
    </div>
  )
}
