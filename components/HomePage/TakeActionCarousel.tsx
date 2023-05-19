import { H2 } from 'components/generic/Typography'
import { TakeAction } from 'graphql/generated'
import { useTranslation } from 'react-i18next'

export const TakeActionCarousel = ({ takeActionPosts }: { takeActionPosts: TakeAction[] }) => {
  const { t } = useTranslation()

  return (
    <div>
      <H2
        title={t('home.takeAction.title')}
        trailingLineColor="yellow"
        extraButton={{
          title: t('home.campaignWork.seeMore'),
          url: '/take-actions',
        }}
      />
    </div>
  )
}
