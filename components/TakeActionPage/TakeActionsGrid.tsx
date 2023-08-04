import React, { useEffect, useState, useRef } from 'react'
import { H2 } from 'components/generic/Typography'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import PaginationComponent from "../generic/PaginationComponent"
import Desktop from "../Desktop/index"
import Mobile from "../Mobile/index"
import TakeActionTile from "../Cards/TakeActionTile"

export type TakeActionAll = {
  id: number
  slug: string
  title: string
  date: any
  typeOfAction: []
  featuredImage: string
}

export const TakeActionsGrid = ({ takeAction }: { takeAction: TakeActionAll[] }) => {
  const { t } = useTranslation('takeAction')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageNumberLimit, setPageNumberLimit] = useState(18)
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])

  const getActionCategories = () => {
    const newActionCategories: any = []
    takeAction.map(ta => {
      ta.typeOfAction.map((action: string) => {
        if (!newActionCategories.includes(action)) newActionCategories.push(action)
      })
    })

    return newActionCategories
  }

  useEffect(() => {
    getFilteredTakeActions()
  }, [filteredCategories])

  const updateCategoryFilter = (category: string) => {
    let newActionCategories: any = []
    if (filteredCategories.includes(category)) {
      newActionCategories = filteredCategories.filter(actionCategory => actionCategory !== category)
    } else {
      newActionCategories.push(...filteredCategories, category)
    }
    setFilteredCategories(newActionCategories)
  }

  const showAll = () => {
    setFilteredCategories([])
  }

  const getFilteredTakeActions = () => {
    if (filteredCategories.length) {
      const newFilteredTakeActions = takeAction.filter(ta => {
        const matched = ta.typeOfAction.filter((category: string) => {
          return filteredCategories.includes(category)
        })
        return matched.length
      })
      return newFilteredTakeActions
    } else {
      return takeAction
    }
  }

  const getCurrentPost = () => {
    //Get current posts
    const indexOfLastPost = currentPage * pageNumberLimit
    const indexOfFirstPost = indexOfLastPost - pageNumberLimit
    const currentPosts = getFilteredTakeActions().slice(indexOfFirstPost, indexOfLastPost)

    return currentPosts
  }

  return (
    <div className="container mx-auto flex flex-col px-30 ta-actions">
      <H2 title={t('actionList.title')} />

      <div className="ta-categories">
        <span className={'ta-category ' + (!filteredCategories.length ? 'selected' : '')} onClick={() => showAll()}>
          {t('actionList.categoryAll')}
        </span>
        {getActionCategories().map((category: string) => (
          <span
            className={'ta-category ' + (filteredCategories.includes(category) ? 'selected' : '')}
            key={category}
            onClick={() => updateCategoryFilter(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <Desktop>
        <div className="actions-grid">
          {getCurrentPost().map((takeAction, idx) => (
            <TakeActionTile
              key={idx}
              id={takeAction.id}
              slug={takeAction.slug}
              title={takeAction.title}
              featuredImage={takeAction.featuredImage}
              index={idx}
              pageNumberLimit={pageNumberLimit}
            />
          ))}
        </div>
        {takeAction.length > 19 && (
          <div className="parent-pagination">
            <PaginationComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageNumberLimit={pageNumberLimit}
              totalPosts={getFilteredTakeActions().length}
            />
          </div>
        )}
      </Desktop>
      <Mobile>
        <div className="action-slider-items">
          {getCurrentPost().map((takeAction, idx) => (
            <div key={idx} className="action-slider-item">
              <Link href={`/take-actions/${takeAction.slug}`}>
                <div className="action-right">
                  <img src={takeAction.featuredImage} />
                </div>
                <div className="action-left">
                  {takeAction.typeOfAction && takeAction.typeOfAction.length > 0 && <h4>{takeAction.typeOfAction}</h4>}
                  <h2>{takeAction.title}</h2>
                  {/* <p>{truncate(takeAction.excerpt)}</p> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="parent-pagination">
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumberLimit={pageNumberLimit}
            totalPosts={getFilteredTakeActions().length}
          />
        </div>
      </Mobile>
    </div>
  )
}
