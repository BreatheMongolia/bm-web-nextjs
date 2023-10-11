import { useTranslation } from 'next-i18next'
import { NewsCard } from 'components/Cards'
import { News } from 'graphql/generated'
import { NewsGrid } from '../LandingPage'
import { useEffect, useState } from 'react'

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
      className={`font-semibold px-4 py-1 cursor-pointer rounded-full text-[15px]
      ${
        isActive
          ? 'bg-[#f09c4f] hover:opacity-80 text-white'
          : 'bg-zinc-200 hover:bg-[#f09c4f] hover:text-white text-zinc-400'
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
    console.log('here')
    if (categoriesToShow.length < 5) {
      for (let i = 0; i < uniqueCategories.length; i++) {
        if (categoriesToShow.length >= 5) {
          break
        }
        const v = uniqueCategories[i]
        if (!categoriesToShow.some(c => c.id === v.id)) {
          categoriesToShow.push(v)
        }
      }
    }
    if (activeCategories.length === 0) {
      setShowAll(true)
    }
    categoriesToShow.sort((a, b) => a.ctId - b.ctId)
    setShownCategories(categoriesToShow)
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
      <div className="flex gap-2 pt-5 pb-8">
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
