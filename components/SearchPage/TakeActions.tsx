import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Desktop from 'components/Desktop'
import Mobile from 'components/Mobile'
import Pagination from './Pagination'

type TakeAction = {
  id: number
  title: string
  slug: string
  excerpt: string
  date: any
  // totalPledges: number
  additionalResources: []
  introductionText: string
  pledgeContent: string
  listOfPhotos: []
  listOfSubSections: []
  listOfVideos: []
  typeOfAction: []
  featuredImage: string
}

type Props = {
  takeActions: TakeAction[]
}

const TakeActions: FC<Props> = ({ takeActions }) => {
  const { t } = useTranslation('search')
  if (takeActions?.length === 0) return null
  const cardsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastOrg = currentPage * cardsPerPage
  const indexOfFirstOrg = indexOfLastOrg - cardsPerPage

  const truncateByLength = (input: string, titleLength: number) => input

  const truncate = (input: string) => (input?.length > 95 ? `${input.substring(0, 95)}...` : input)

  const currentTakeActions = takeActions.slice(indexOfFirstOrg, indexOfLastOrg)
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="ta-actions">
      <h2 className="actions-title">{t('takeActionTitle')}</h2>

      <Desktop>
        <div className="actions-grid">
          {currentTakeActions.map((takeAction: any, index: number) => (
            <div
              className={'action-item'}
              key={takeAction.id}
              style={{ backgroundImage: takeAction.featuredImage && `url(${takeAction.featuredImage})` }}
              onClick={() => (window.location.href = '/action/' + takeAction.slug)}
            >
              <div className="action-title">
                <div className="action-title-name">
                  {takeAction.typeOfAction && takeAction.typeOfAction.length > 0 && (
                    <h4>{takeAction.typeOfAction[0]}</h4>
                  )}
                  <h2 title={takeAction.title}>{truncateByLength(takeAction.title, 40)}</h2>
                </div>
                <div className="action-title-button">
                  <Link href={`/action/${takeAction.slug}`}>
                    <button className="circled-arrow-button">{'>'}</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Desktop>
      <Mobile>
        <>
          <div className="actions-grid">
            {currentTakeActions.length > 2 &&
              currentTakeActions.slice(0, 1).map((takeAction: any, index: number) => (
                <div
                  className={'action-item big'}
                  key={takeAction.id}
                  style={{ backgroundImage: takeAction.featuredImage && `url(${takeAction.featuredImage})` }}
                  onClick={() => (window.location.href = '/action/' + takeAction.id)}
                >
                  <div className="action-title">
                    <div className="action-title-name">
                      {takeAction.typeOfAction && takeAction.typeOfAction.length > 0 && (
                        <h4>{takeAction.typeOfAction[0]}</h4>
                      )}
                      <h2 title={takeAction.title}>
                        {index % 9 === 0
                          ? truncateByLength(takeAction.title, 60)
                          : truncateByLength(takeAction.title, 40)}
                      </h2>
                    </div>
                    <div className="action-title-button">
                      <Link href={`/action/${takeAction.slug}`}>
                        <button className="circled-arrow-button">{'>'}</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="scrollSection action-slider-items">
            {currentTakeActions.length > 2 &&
              currentTakeActions.slice(1, currentTakeActions.length).map((takeAction: any, index: number) => (
                <div
                  key={index}
                  className="action-slider-item"
                  onClick={() => (window.location.href = '/action/' + takeAction.slug)}
                >
                  <div className="action-right">
                    <img src={takeAction.featuredImage} />
                  </div>
                  <div className="action-left">
                    {takeAction.typeOfAction && takeAction.typeOfAction.length > 0 && (
                      <h4>{takeAction.typeOfAction[0]}</h4>
                    )}
                    <h2>{takeAction.title}</h2>
                    <p>{truncate(takeAction.excerpt)}</p>
                    <div className="action-button">
                      <Link href={`/action/${takeAction.slug}`}>{t('actionListButton')}</Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      </Mobile>
      <div className="pagination">
        <Pagination
          totalOrgs={takeActions.length}
          currentPage={currentPage}
          pagesToDisplay={cardsPerPage}
          paginate={pageNumber => paginate(pageNumber)}
          scrollTo="all-news"
        />
      </div>
    </div>
  )
}

export default TakeActions
