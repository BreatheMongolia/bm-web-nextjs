import { NewsCard } from 'components/Cards'
import { News } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

export const FeaturedNews = ({ news }: { news: News[] }) => {
  const [t, i18n] = useTranslation('common')

  if (!news || news.length === 0) {
    return <div className="w-full"> {t('emptyState')} </div>
  }

  const bigNews = news.slice(0, 1)[0]
  console.log(news)
  console.log(bigNews)
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <div className="bg-gray-200 h-full">
          <NewsCard news={bigNews} cardHeight="fill" hasDarkOverlay={true} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-gray-100 h-20 w-full"> </div>
        <div className="bg-gray-100 h-20 w-full"> </div>
        <div className="bg-gray-100 h-20 w-full"> </div>
        <div className="bg-gray-100 h-20 w-full"> </div>
        <div className="bg-gray-100 h-20 w-full"> </div>
      </div>
    </div>
  )
}
