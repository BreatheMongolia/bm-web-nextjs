import { News } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

export const NewsHorizontalCard = ({ news }: { news: News }) => {
  const { t, i18n } = useTranslation()

  const transformedNews = getTransformedNews(news, i18n.language === 'en' ? 'en' : 'mn')

  return (
    <div className="flex bg-white rounded overflow-hidden cursor-pointer">
      <div>Image</div>
      <div className="p-5">
        <span className="font-medium"> </span>
      </div>
    </div>
  )
}
