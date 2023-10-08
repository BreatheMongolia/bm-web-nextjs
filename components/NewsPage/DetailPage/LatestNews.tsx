import React from 'react'
import { useTranslation } from 'next-i18next'
import { NewsBgTile } from './NewsBgTile'

// import { HashLink } from 'react-router-hash-link'
import Link from 'next/link'

export const LatestNews: any = ({ data: newses }) => {
  const [t] = useTranslation('news')

  return (
    <div style={{ paddingTop: '50px' }}>
      <div className="header_text">
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, width: 'max-content' }}>
          <h1 className="title" id="header-text-main">
            {t('latestNews')}
          </h1>
        </div>
        <hr />
        <div className="seemore">
          <Link href={`/news`}>{t('seemore')}</Link>
        </div>
      </div>
      <div className="custom-grid-newspage">
        {newses?.slice(0, 6).map((data: any, index: number) => (
          <NewsBgTile
            key={index}
            index={index}
            id={data.id}
            slug={data.slug}
            sourceLink={data.sourceLink}
            title={data.title}
            sourceName={data.sourceName}
            sourceLanguage={data.sourceLanguage}
            categories={data.categories}
            newsContentType={data.newsContentType}
            newsLandingPageFeatured={data.newsLandingPageFeatured}
            featuredImage={data.featuredImage}
            featuredImageSmall={data.featuredImageSmall}
            featuredImageBig={data.featuredImageBig}
            cName=""
          />
        ))}
      </div>
    </div>
  )
}
