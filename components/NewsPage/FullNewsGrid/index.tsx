import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { ChevronLeftIcon, ChevronRightIcon, FunnelIcon } from '@heroicons/react/24/solid'
import { Menu } from '@headlessui/react'
// data
import { News } from 'graphql/generated'
// custom componnets
import { NewsCard } from 'components/Cards'
import { NewsGrid } from '../LandingPage'
import CategoryButton from './CategoryButton'

type Props = {
  news: News[]
}

const getUniqueCategories = (news: News[]) => {
  const categoryIds = []
  const uniqueCategories = []
  news.map(x => {
    x.categories.nodes.map(c => {
      if (categoryIds.indexOf(c.id) < 0) {
        // for checking unique
        categoryIds.push(c.id)
        // add to unique list
        uniqueCategories.push({
          id: c.id,
          ctId: c.categoryId,
          slug: c.slug,
          name: c.categoryCustomFields.name,
          nameMn: c.categoryCustomFields.nameMn,
        })
      }
    })
  })
  return uniqueCategories
}

const ITEMS_PER_PAGE = 11 // 3 rows

const FullNewsGrid = ({ news }: Props) => {
  const { t, i18n } = useTranslation('news')
  const [activeCategories, setActiveCategories] = useState([])
  const [shownCategories, setShownCategories] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [filteredNews, setFilteredNews] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const uniqueCategories = getUniqueCategories(news)

  // sets what categories to show on the toolbar
  useEffect(() => {
    const categoriesToShow = uniqueCategories.filter(x => activeCategories.some(c => c.slug === x.slug))
    const MIN_NUM_CATEGORIES = 3
    if (categoriesToShow.length < MIN_NUM_CATEGORIES) {
      for (let i = 0; i < uniqueCategories.length; i++) {
        if (categoriesToShow.length >= MIN_NUM_CATEGORIES) {
          break
        }
        const v = uniqueCategories[i]
        if (!categoriesToShow.some(c => c.id === v.id)) {
          categoriesToShow.push(v)
        }
      }
    }

    categoriesToShow.sort((a, b) => a.ctId - b.ctId)
    setShownCategories(categoriesToShow)
  }, [activeCategories])
  // updates what shows on the newsgrid
  useEffect(() => {
    if (activeCategories.length === 0) {
      setShowAll(true)
    }
    // load the news
    const fNews = news.filter(x => {
      if (showAll) {
        return true
      }
      //   // active categories
      const cats = x.categories.nodes.map(ca => ca.id)
      return activeCategories.some(c => cats.indexOf(c.id) >= 0)
    })
    setFilteredNews(fNews)
  }, [activeCategories, showAll])

  const onPageClick = pageNum => {
    if (pageNum < 0) setCurrentPage(0)
    const maxPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE)
    if (pageNum >= maxPages) {
      setCurrentPage(maxPages - 1)
    }
    setCurrentPage(pageNum)
  }
  // on click event function
  const setActiveCategory = category => {
    setCurrentPage(0)
    if (category) {
      if (activeCategories.some(x => x.id === category.id)) {
        setActiveCategories(activeCategories.filter(x => x.id !== category.id))
      } else {
        setActiveCategories([...activeCategories, category])
      }
      setShowAll(false)
    } else {
      setActiveCategories([])
    }
  }

  const pages = []
  const MAX_PAGES = Math.ceil(filteredNews.length / ITEMS_PER_PAGE)
  let repeated = false
  for (let i = 0; i < MAX_PAGES; i++) {
    if (i === 0 || i === MAX_PAGES - 1 || (i < currentPage + 2 && i > currentPage - 2)) {
      pages.push(
        <div
          onClick={() => setCurrentPage(i)}
          className={`cursor-pointer rounded-full w-12 h-12 flex items-center justify-center transition-all hover:bg-[#f09c4f]/80 hover:text-white ${
            currentPage === i && 'bg-[#f09c4f] text-white'
          }`}
        >
          {i + 1}
        </div>,
      )
      repeated = false
    } else {
      if (!repeated) {
        pages.push(<div>...</div>)
        repeated = true
      }
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-5 pt-5 pb-8 sm:flex-row ">
        <div className="flex flex-wrap w-full gap-2 grow">
          <CategoryButton
            name={t('all')}
            category={null}
            isActive={showAll}
            onClick={() => {
              setActiveCategory(null)
            }}
          />
          {shownCategories.map((x, idx) => {
            return (
              <CategoryButton
                name={i18n.language === 'mn' ? x.nameMn : x.name}
                category={x}
                key={idx}
                isActive={activeCategories.some(c => c.id === x.id)}
                onClick={cat => {
                  setActiveCategory(cat)
                }}
              />
            )
          })}
        </div>
        <div className="relative flex place-content-end">
          <Menu>
            <Menu.Button className="bg-[#f09c4f] text-white font-bold text-[15px] py-2 px-4 rounded-full hover:opacity-80 active:opacity-80 flex gap-3 justify-center items-center">
              {t('morefilter')}
              <FunnelIcon className="w-4 h-4" />
            </Menu.Button>
            <Menu.Items className="absolute top-10 right-0 bg-white z-50 rounded border border-[#f09c4f] w-60">
              {uniqueCategories.map((x, idx) => {
                return (
                  <Menu.Item key={idx}>
                    {() => {
                      const isActive = activeCategories.some(c => c.id === x.id)
                      return (
                        <div
                          className={`px-5 py-1 cursor-pointer border-b border-white hover:bg-[#f09c4f]/20 ${
                            isActive ? 'text-[#f09c4f] bg-[#f09c4f]/20 font-semibold' : 'text-zinc-500'
                          }`}
                          onClick={() => {
                            setActiveCategory(x)
                          }}
                        >
                          {i18n.language === 'mn' ? x.nameMn : x.name}
                        </div>
                      )
                    }}
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <NewsGrid>
        {filteredNews
          .slice(ITEMS_PER_PAGE * currentPage, ITEMS_PER_PAGE * currentPage + ITEMS_PER_PAGE)
          .map((x, idx) => {
            return (
              <div key={idx} className={`h-32 sm:h-60 ${idx === 0 && 'md:col-span-2'} ${idx > 3 && 'hidden md:block'}`}>
                <NewsCard key={idx} news={x} cardHeight="fill" />
              </div>
            )
          })}
      </NewsGrid>

      {/* Pagination */}
      <div className="pt-8 pb-3 mx-auto text-lg font-bold sm:text-xl">
        <div className="flex gap-0.5 sm:gap-5 justify-center items-center">
          <div
            className={`transition-all hover:bg-[#f09c4f]/80 hover:text-white rounded-full border-black border hover:border-[#f09c4f]/80 ${
              currentPage === 0 ? 'opacity-0' : 'cursor-pointer'
            }`}
            onClick={() => currentPage !== 0 && onPageClick(currentPage - 1)}
          >
            <span className="block p-3">
              <ChevronLeftIcon className="w-5 h-5" />
            </span>
          </div>
          {pages}
          <div
            className={`transition-all hover:bg-[#f09c4f]/80 hover:text-white border-black border hover:border-[#f09c4f]/80 rounded-full ${
              currentPage === MAX_PAGES - 1 ? 'opacity-0' : 'cursor-pointer'
            }`}
            onClick={() => currentPage !== MAX_PAGES - 1 && onPageClick(currentPage + 1)}
          >
            <span className="block p-3">
              <ChevronRightIcon className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullNewsGrid
