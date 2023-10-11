import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Menu } from '@headlessui/react'
import { NewsCard } from 'components/Cards'
import { News } from 'graphql/generated'
import { NewsGrid } from '../LandingPage'
import { FunnelIcon } from '@heroicons/react/24/solid'

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

const CategoryButton = ({ name, category, onClick, isActive }) => {
  return (
    <div
      className={` px-4 py-2 cursor-pointer rounded-full text-[15px]
      ${
        isActive
          ? 'bg-[#f09c4f] hover:opacity-80 text-white font-bold'
          : 'bg-zinc-200 hover:bg-[#f09c4f] hover:text-white text-zinc-400 font-semibold'
      }`}
      onClick={() => {
        onClick(category)
      }}
    >
      {name}
    </div>
  )
}

const FullNewsGrid = ({ news }: Props) => {
  const { t, i18n } = useTranslation('news')
  const [activeCategories, setActiveCategories] = useState([])
  const [shownCategories, setShownCategories] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [filteredNews, setFilteredNews] = useState([])

  const uniqueCategories = getUniqueCategories(news)

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

  useEffect(() => {
    if (activeCategories.length === 0) {
      setShowAll(true)
    }
    // load the news
    const fNews = news.filter(x => {
      if (showAll) {
        return true
      }
      // active categories
      const cats = x.categories.nodes.map(ca => ca.id)
      return activeCategories.some(c => cats.indexOf(c.id) >= 0)
    })
    setFilteredNews(fNews)
  }, [activeCategories, showAll])

  const setActiveCategory = category => {
    if (category) {
      if (activeCategories.some(x => x.id === category.id)) {
        setActiveCategories(activeCategories.filter(x => x.id !== category.id))
      } else {
        setActiveCategories([...activeCategories, category])
      }
      setShowAll(false)
    } else {
      setShowAll(true)
      setActiveCategories([])
    }
  }

  return (
    <div>
      <div className="flex pt-5 pb-8 ">
        <div className="flex gap-2 grow">
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
        <div className="relative">
          <Menu>
            <Menu.Button className="bg-[#f09c4f] text-white font-bold text-[15px] py-2 px-4 rounded-full hover:opacity-80 active:opacity-80 flex gap-3 justify-center items-center">
              {t('morefilter')}
              <FunnelIcon className="h-4 w-4" />
            </Menu.Button>
            <Menu.Items className="absolute top-10 right-0 bg-white z-50 rounded border border-[#f09c4f] w-60">
              {uniqueCategories.map((x, idx) => {
                return (
                  <Menu.Item>
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
        {filteredNews.map((x, idx) => {
          return (
            <div key={idx} className={`h-32 sm:h-60 ${idx === 0 && 'md:col-span-2'} ${idx > 3 && 'hidden md:block'}`}>
              <NewsCard key={idx} news={x} cardHeight="fill" />
            </div>
          )
        })}
      </NewsGrid>
    </div>
  )
}

export default FullNewsGrid
