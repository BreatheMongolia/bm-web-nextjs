import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import NewsBgTile from 'components/Cards/NewsCards/NewsTile'
import Pagination from './Pagination'
import Desktop from 'components/Desktop'
import Mobile from 'components/Mobile'

const News: FC<{ data: any[] }> = ({ data: newsData }) => {
  const [t, i18n] = useTranslation('search')
  if (newsData.length === 0) return null

  const cardsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastOrg = currentPage * cardsPerPage
  const indexOfFirstOrg = indexOfLastOrg - cardsPerPage

  const currentNews = newsData.slice(indexOfFirstOrg, indexOfLastOrg)
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="news-section">
      <h1 className="search-title">{t('newsTitle')}</h1>
      <Desktop>
        <div className="news-grid">
          {currentNews.map((data: any, index: number) => (
            <NewsBgTile
              key={index}
              id={data.id}
              slug={data.slug}
              sourceLink={data.sourceLink}
              title={data.title}
              sourceName={data.sourceName}
              sourceLanguage={data.sourceLanguage}
              categories={data.categories}
              newsContentType={data.newsContentType}
              newsLandingPageFeatured={data.newsLandingPageFeatured}
              featuredImageSmall={data.featuredImage}
              cName=""
            />
          ))}
        </div>
        <div className="pagination">
          <Pagination
            totalOrgs={newsData.length}
            currentPage={currentPage}
            pagesToDisplay={cardsPerPage}
            paginate={pageNumber => paginate(pageNumber)}
            scrollTo="all-news"
          />
        </div>
      </Desktop>
      <Mobile>
        <div className="latest-news">
          {newsData.length > 2 &&
            newsData?.slice(0, 1).map((data: any, index: number) => (
              <div key={Math.random()}>
                <NewsBgTile
                  slug={data.slug}
                  index={index}
                  id={data.id}
                  sourceLink={data.sourceLink}
                  title={data.title}
                  sourceName={data.sourceName}
                  sourceLanguage={data.sourceLanguage}
                  categories={data.categories}
                  newsContentType={data.newsContentType}
                  newsLandingPageFeatured={data.newsLandingPageFeatured}
                  cName=""
                />
              </div>
            ))}
        </div>
        <div className="scrollSection">
          {newsData.length > 2 &&
            newsData.slice(1, currentNews.length).map((data: any) => (
              <div key={Math.random()}>
                <NewsBgTile
                  slug={data.slug}
                  id={data.id}
                  sourceLink={data.sourceLink}
                  title={data.title}
                  sourceName={data.sourceName}
                  sourceLanguage={data.sourceLanguage}
                  categories={data.categories}
                  newsContentType={data.newsContentType}
                  newsLandingPageFeatured={data.newsLandingPageFeatured}
                  mobile="small"
                />
              </div>
            ))}
        </div>
      </Mobile>
    </div>
  )
}

export default News
