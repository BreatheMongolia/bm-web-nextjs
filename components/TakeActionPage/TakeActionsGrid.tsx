import React, { useEffect, useState, useRef} from 'react'
import { Page_Customfields_FeaturedTakeActionsLanding } from 'graphql/generated'
import { useTranslation } from 'next-i18next'
import { getTranslated } from 'lib/utils/getTranslated'
import Link from 'next/link'
import PaginationComponent from './PaginationComponent'
import Desktop from '../generic/Desktop'
import Mobile from '../generic/Mobile'

type TakeAction = {
  id: number
  title: string
  excerpt: string
  date: any
  totalPledges: number
  additionalResources: []
  introductionText: string
  pledgeContent: string
  listOfPhotos: []
  listOfSubSections: []
  listOfVideos: []
  typeOfAction: []
  featuredImage: string
}

export const TakeActionsGrid = ({
  takeActions
} : {
  takeActions: TakeAction[]
}) => {
  const { t } = useTranslation('take-actions')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageNumberLimit, setPageNumberLimit] = useState(18)
  const [width, setWidth] = useState(window.innerWidth)
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])
  const willMount = useRef(true)

  if (willMount.current) {
    if (window.innerWidth >= 768 && window.innerWidth <= 1063) {
      setPageNumberLimit(12)
    } else if (window.innerWidth <= 767) {
      setPageNumberLimit(4)
    } else {
      setPageNumberLimit(18)
    }
    willMount.current = false
  }

  const truncateByLength = (input: string, titleLength: number) => input

  const truncate = (input: string) => (input?.length > 95 ? `${input.substring(0, 95)}...` : input)

  const getActionCategories = () => {
    const newActionCategories: any = []
    takeActions.map((takeAction: any, index: number) => {
      takeAction.typeOfAction.map((action: string) => {
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
      newActionCategories = filteredCategories.filter((actionCategory) => actionCategory !== category)
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
      const newFilteredTakeActions = takeActions.filter((takeAction) => {
        const matched = takeAction.typeOfAction.filter((category: string) => {
          return filteredCategories.includes(category)
        })

        return matched.length
      })

      return newFilteredTakeActions
    } else {
      return takeActions
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
      <h2 className="actions-title">{t("actionList.title")}</h2>

      <div className="ta-categories">
        <span className={"ta-category " + (!filteredCategories.length ? "selected" : "")} onClick={() => showAll()}>
          All
        </span>
        {getActionCategories().map((category: any) => (
          <span
            className={"ta-category " + (filteredCategories.includes(category) ? "selected" : "")}
            key={category}
            onClick={() => updateCategoryFilter(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <Desktop>
        <div className="actions-grid">
          {getCurrentPost().map((takeAction: any, index: number) => (
            <TakeActionTile
              key={takeAction.id}
              id={takeAction.id}
              title={takeAction.title}
              date={takeAction.date}
              typeOfAction={takeAction.typeOfAction}
              featuredImage={takeAction.featuredImage}
              index={index}
              pageNumberLimit={pageNumberLimit}
            />
          ))}

          {/* <div className={"action-item more"}>
            <div className="action-title">
              <h2>{t("actionList.soon")}</h2>
            </div>
          </div> */}
        </div>
        {takeActions.length > 19 && (
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
              onClick={() => (window.location.href = "/action/" + takeAction.id)}
            >
              <div className="action-right">
                <img src={takeAction.featuredImage} />
              </div>
              <div className="action-left">
                {takeAction.typeOfAction && takeAction.typeOfAction.length > 0 && <h4>{takeAction.typeOfAction[0]}</h4>}
                <h2>{takeAction.title}</h2>
                <p>{truncate(takeAction.excerpt)}</p>
                <div className="action-button">
                  <Link href={`/action/${takeAction.id}`}>{t("actionList.button")}</Link>
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
