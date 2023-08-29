import { NewsCard, NewsHorizontalCard } from 'components/Cards'
import { News } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

export const FeaturedNews = ({ news }: { news: News[] }) => {
  const [t, i18n] = useTranslation('common')

  if (!news || news.length === 0) {
    return <div className="w-full"> {t('emptyState')} </div>
  }

  const bigNews = news.slice(0, 1)[0]
  const otherNews = news.slice(1)

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <div className="bg-gray-200 h-full">
          <NewsCard news={bigNews} cardHeight="fill" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {otherNews.map((x, idx) => {
          return <NewsHorizontalCard news={x} key={idx} />
        })}
      </div>
    </div>
  )
}
