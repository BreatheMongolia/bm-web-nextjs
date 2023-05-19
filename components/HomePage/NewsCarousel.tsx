import { H2 } from 'components/generic/Typography'
import { Page_Customfields_FeaturedNews } from 'graphql/generated'
import { useTranslation } from 'react-i18next'

export const NewsCarousel = ({ featuredNews }: { featuredNews: Page_Customfields_FeaturedNews[] }) => {
  const { t } = useTranslation()

  return (
    <div>
      <H2
        title={t('home.news.title')}
        trailingLineColor="blue"
        extraButton={{
          title: t('home.campaignWork.seeMore'),
          url: '/news',
        }}
      />
    </div>
  )
}
