import React, { FC } from 'react'
import { scroller } from 'react-scroll'
import Arrow from 'assets/icons/Arrow'

type Props = {
  totalOrgs: number
  paginate: (pageNumber: number) => void
  currentPage: number
  pagesToDisplay: number
  scrollTo: string
}

const Pagination: FC<Props> = ({ totalOrgs, paginate, pagesToDisplay, currentPage, scrollTo }) => {
  // Calculate number of pages required
  const pageCount = Math.ceil(totalOrgs / pagesToDisplay)
  const pageNumbers = [-2, -1, 0, 1, 2].map(v => currentPage + v).filter(page => page > 0 && page <= pageCount)

  if (pageCount <= 1) return null

  // Switch pages and handle out of range numbers
  const pageSwitch = (number: any) => {
    if (number === '...' || number === 0 || number > pageCount) {
      return
    } else {
      paginate(number)
      // smooth scolling back to element after pagination
      scroller.scrollTo(scrollTo, {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart',
      })
    }
  }

  return (
    <nav className="pagination-wrapper">
      <ul className="pagination">
        {currentPage > 1 ? (
          <li className=" paginationButton prev" onClick={() => pageSwitch(currentPage - 1)}>
            <Arrow />
          </li>
        ) : null}

        {!pageNumbers.includes(1) && (
          <>
            <li key={1}>
              <a
                className={currentPage === 1 ? 'pageNumber pagination_active' : 'pageNumber'}
                onClick={() => pageSwitch(1)}
              >
                {1}
              </a>
            </li>
            {!pageNumbers.includes(2) && (
              <li key={'sep'}>
                <a className={'pageNumber'}>...</a>
              </li>
            )}
          </>
        )}

        {pageNumbers.map(number => {
          return (
            <li key={number}>
              <a
                className={currentPage === number ? 'pageNumber pagination_active' : 'pageNumber'}
                onClick={() => pageSwitch(number)}
              >
                {number}
              </a>
            </li>
          )
        })}

        {!pageNumbers.includes(pageCount) && (
          <>
            {!pageNumbers.includes(pageCount - 1) && (
              <li key={'sep'}>
                <a className={'pageNumber'}>...</a>
              </li>
            )}
            <li key={pageCount}>
              <a
                className={currentPage === pageCount ? 'pageNumber pagination_active' : 'pageNumber'}
                onClick={() => pageSwitch(pageCount)}
              >
                {pageCount}
              </a>
            </li>
          </>
        )}

        {currentPage !== pageCount && (
          <li className="paginationButton next" onClick={() => pageSwitch(currentPage + 1)}>
            <Arrow />
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
