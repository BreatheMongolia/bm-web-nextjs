import { H2 } from 'components/generic/Typography'
import { News } from 'graphql/generated'
import { getNewsPosts } from 'lib/graphql-api/queries/news'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import bmLogoBlueIcon from 'public/images/logoBlue.png'
import FullNewsGrid from 'components/NewsPage/FullNewsGrid'
import { BreadCrumb } from 'components/NewsPage/DetailPage'

const BreatheMongoliaNewsPage = ({ news }: { news: News[] }) => {
  const { t } = useTranslation('news')
  const bmNews = news.filter(x => {
    return x.categories.nodes.some(c => c.slug === 'about-us' || c.slug === 'press-release')
  })

  const breadCrumbItems = [
    { id: 1, item: t('title') },
    { id: 2, item: t('latestOnBm') },
  ]

  return (
    <div className="pt-10">
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="container">
        <H2 title={t('latestOnBm')} trailingLineColor="blue" iconImage={bmLogoBlueIcon} />
        <FullNewsGrid news={bmNews} />
      </div>
    </div>
  )
}

export default BreatheMongoliaNewsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // fetch the data
  const newsData = await getNewsPosts()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common'])),
      locale,
      news: newsData,
      title: 'Breathe Mongolia News - Breathe Mongolia - Clean Air Coalition',
    },
    revalidate: 60 * 5, // every 5 minutes
  }
}
