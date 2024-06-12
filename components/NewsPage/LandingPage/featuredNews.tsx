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
    <div className="grid grid-col-2 lg:grid-cols-2 h-[660px] lg:h-[460px] gap-5 featuredNewsMargin">
      <div className="bg-gray-200 h-full">
        <NewsCard news={bigNews} cardHeight="fill" idx={0} />
      </div>
      <div className="flex overflow-hidden h-full relative">
        <div className="overflow-y-auto pr-4 pb-4 absolute top-0 bottom-0 right-0 left-0 gap-3 flex flex-col">
          {otherNews.map((x, idx) => {
            return (
              <div className="flex-1 w-full" key={idx}>
                <NewsHorizontalCard news={x} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
