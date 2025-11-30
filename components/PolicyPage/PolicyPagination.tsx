import React, { useState, useEffect } from 'react'

function PolicyPagination({ currentPage, setCurrentPage, pageNumberLimit, totalPolicies }) {
  const numberOfPages: Array<number> = []
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])
  const numberOfPagesToDisplay = Math.ceil(totalPolicies / pageNumberLimit)

  useEffect(() => {
    for (let i = 1; i <= numberOfPagesToDisplay; i++) {
      numberOfPages.push(i)
    }
    let tempNumberOfPages: any[] = [...arrOfCurrButtons]

    let dotsInitial = <div id="three-dots">{'...'}</div>

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    } else if (currentPage === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    } else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentPage - 2, currentPage)
      const sliced2 = numberOfPages.slice(currentPage, currentPage + 1)
      tempNumberOfPages = [1, dotsInitial, ...sliced1, ...sliced2, dotsInitial, numberOfPages.length]
    } else if (currentPage > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4)
      tempNumberOfPages = [1, dotsInitial, ...sliced]
    } else if (currentPage === isNaN) {
      currentPage = numberOfPages.slice(currentPage - 2, currentPage)
    }

    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentPage)
  }, [totalPolicies, currentPage])

  const renderPageNumbers = arrOfCurrButtons.map((number, index) => {
    return (
      <li
        key={index}
        // id={number}
        className={currentPage === number ? 'active' : ''}
        onClick={() => (!isNaN(number) ? setCurrentPage(number) : '')}
      >
        {number}
      </li>
    )
  })

  return (
    <div className="landing-page-pagination">
      <ul className="page-numbers">
        <li>
          <button
            className={`${currentPage === 1 ? 'disabled' : ''}`}
            key="previousButton"
            onClick={() => setCurrentPage(prev => (prev === 1 ? prev : prev - 1))}
          >
            {'<'}
          </button>
        </li>
        {renderPageNumbers}
        <li>
          <button
            // className='arrows'
            key="nextButton"
            className={`${currentPage === numberOfPagesToDisplay ? 'disabled' : ''}`}
            onClick={() => setCurrentPage(prev => (prev === numberOfPagesToDisplay ? prev : prev + 1))}
          >
            {'>'}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default PolicyPagination
