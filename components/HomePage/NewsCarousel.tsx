import { H2 } from 'components/generic/Typography'
import { Page_Customfields_FeaturedNews } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

export const NewsCarousel = ({ featuredNews }: { featuredNews: Page_Customfields_FeaturedNews[] }) => {
  const { t } = useTranslation('home')

  return (
    <div>
      <H2
        title={t('news.title')}
        trailingLineColor="blue"
        extraButton={{
          title: t('campaignWork.seeMore'),
          url: '/news',
        }}
      />
    </div>
  )
}
