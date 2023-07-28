import React, { useEffect, useState, useRef } from 'react'
import { H2 } from 'components/generic/Typography'
import { useTranslation } from 'next-i18next'
import { getTranslated } from 'lib/utils/getTranslated'
import Link from 'next/link'
import PaginationComponent from '../generic/PaginationComponent'
import Desktop from '../generic/Desktop'
import Mobile from '../generic/Mobile'

export type TakeActionAll = {
  id: number
  title: string
  date: any
  typeOfAction: []
  featuredImage: string
}

export const TakeActionsGrid = ({ takeAction }: { takeAction: TakeActionAll[] }) => {
  // console.log(takeAction)

  const { t } = useTranslation('takeAction')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageNumberLimit, setPageNumberLimit] = useState(18)
  // const [width, setWidth] = useState(window.innerWidth)
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])

  // if (willMount.current) {
  //   if (window.innerWidth >= 768 && window.innerWidth <= 1063) {
  //     setPageNumberLimit(12)
  //   } else if (window.innerWidth <= 767) {
  //     setPageNumberLimit(4)
  //   } else {
  //     setPageNumberLimit(18)
  //   }
  //   willMount.current = false
  // }

  const truncateByLength = (input: string, titleLength: number) => input

  const truncate = (input: string) => (input?.length > 95 ? `${input.substring(0, 95)}...` : input)

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
    <div className="container mx-auto flex flex-col px-30">

      <H2
        title={t('actionList.title')}
      />

      <div className="flex flex-wrap flex-row items-start py-4">
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
        <div className="grid grid-cols-4 gap-4 col-start-1 col-span-2 row-span-2">
          {getCurrentPost().map((x, idx) => (
            <div key={idx}>
              {x?.featuredImage !== null && (
                <React.Fragment>
                  <div
                    className="take-action-carousel"
                    onClick={() => window.open('/action/' + x.id)}
                  >
                    <img
                      className="card-img-top take-action-img"
                      src={
                        x?.featuredImage !== null
                          ? x?.featuredImage
                          : ''
                      }
                    />
                    <div className="take-action-info">
                      <div className="take-action-title">
                        {x.title !== null ? x.title : ''}
                      </div>
                      <div className="read-more-arrow ">
                        <Link href={`/action/${x.id}`}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="24" height="24" rx="12" fill="#F4AC3D" />
                            <path
                              d="M15.6674 12.6249L16.334 12L11.0005 7L9.66732 8.24978L13.6668 12L9.66732 15.7502L11.0005 17L15.6674 12.6249Z"
                              fill="#FAFAFF"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          ))}
          {/* <div className={'action-item more'}>
            <div className="action-title">
              <h2>{t('actionList.soon')}</h2>
            </div>
          </div> */}
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
          {getCurrentPost().map((takeAction: any, index: number) => (
            <div
              key={index}
              className="action-slider-item"
              onClick={() => (<Link href={'/action/' + takeAction.id}></Link>)}
            >
              <div className="action-right">
                <img src={takeAction.featuredImage} />
              </div>
              <div className="action-left">
                {takeAction.typeOfAction && takeAction.typeOfAction.length > 0 && <h4>{takeAction.typeOfAction[0]}</h4>}
                <h2>{takeAction.title}</h2>
                <p>{truncate(takeAction.excerpt)}</p>
                <div className="action-button">
                  <Link href={`/action/${takeAction.id}`}>{t('actionList.button')}</Link>
                </div>
              </div>
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
