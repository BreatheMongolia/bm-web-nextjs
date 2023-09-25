import React, { useEffect, useState, useRef } from 'react'
import { H2 } from 'components/generic/Typography'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import PaginationComponent from '../generic/PaginationComponent'
import TakeActionTile from '../Cards/TakeActionTile'
import { useWidth } from 'lib/utils/useWidth'

export type TakeActionAll = {
  id: number
  slug: string
  title: string
  excerpt?: string
  date: any
  typeOfAction: string[]
  featuredImage: string
}

export const TakeActionsGrid = ({ takeAction, categories }: { takeAction: TakeActionAll[]; categories: string[] }) => {
  const { t } = useTranslation('takeAction')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageNumberLimit, setPageNumberLimit] = useState(18)
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])
  let isMobile = useWidth()

  useEffect(() => {
    getFilteredTakeActions()
    refreshPageNumberLimit()
  }, [filteredCategories, isMobile])

  const truncate = (input: string) => (input?.length > 95 ? `${input.substring(0, 95)}...` : input)

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

  const refreshPageNumberLimit = () => {
    if (isMobile <= 600) setPageNumberLimit(6)
    else setPageNumberLimit(18)
  }

  const getFilteredTakeActions = () => {
    if (filteredCategories.length) {
      const newFilteredTakeActions = takeAction.filter(ta => {
        const matched = ta.typeOfAction.filter((category: string) => {
          return filteredCategories.includes(category)
        })
        return matched.length
      })
      if (newFilteredTakeActions.length) {
        return newFilteredTakeActions
      } else {
        setFilteredCategories([])
        return takeAction
      }
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
    <div className="ta-actions">
      <H2 title={t('actionList.title')} className="ta-mobile-header" />

      <div className="ta-categories">
        <div className={'ta-category ' + (!filteredCategories.length ? 'selected' : '')} onClick={() => showAll()}>
          {t('actionList.categoryAll')}
        </div>
        {categories.map((category: string) => (
          <div
            className={'ta-category ' + (filteredCategories.includes(category) ? 'selected' : '')}
            key={category}
            onClick={() => updateCategoryFilter(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {isMobile > 600 ? (
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
      ) : (
        <div className="action-slider-items">
          {getCurrentPost().map((takeAction, idx) => (
            <div key={idx} className="flex flex-row action-slider-item">
              <Link href={`/take-actions/${takeAction.slug}`} className="grid grid-cols-3">
                <div className="action-right">
                  <img src={takeAction.featuredImage} />
                </div>
                <div className="col-span-2 action-left">
                  {takeAction.typeOfAction && takeAction.typeOfAction.length > 0 && <h4>{takeAction.typeOfAction}</h4>}
                  <h2>{takeAction.title}</h2>
                  <p>{truncate(takeAction.excerpt)}</p>
                  <h6 className="mt-2 text-[8px] font-bold underline text-sky-400">{t('actionList.button')}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      {takeAction.length > pageNumberLimit && (
        <div className="parent-pagination">
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumberLimit={pageNumberLimit}
            totalPosts={getFilteredTakeActions().length}
          />
        </div>
      )}
    </div>
  )
}
