import { H2 } from 'components/generic/Typography'
import { TakeAction } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

export const TakeActionCarousel = ({ takeActionPosts }: { takeActionPosts: TakeAction[] }) => {
  const { t } = useTranslation('home')

  return (
    <div>
      <H2
        title={t('takeAction.title')}
        trailingLineColor="yellow"
        extraButton={{
          title: t('campaignWork.seeMore'),
          url: '/take-actions',
        }}
      />
    </div>
  )
}
