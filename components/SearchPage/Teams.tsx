import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Desktop from 'components/Desktop'
import Mobile from 'components/Mobile'
import TeamCard from 'components/Cards/TeamCard'
import Pagination from './Pagination'
import Slider from 'react-slick'
import Arrow from './Arrow'
import SliderLeftArrow from 'assets/icons/SliderLeftArrow'
import SliderRightArrow from 'assets/icons/SliderRightArrow'

type People = {
  name: string
  imgSrc: string
  role: string
  description: string
  memberSince: string
  featured: boolean
  linkedin: string
}

type Props = {
  people: People[]
}

const settings = {
  dots: false,
  infinite: false,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  adaptiveHeight: true,
  centerMode: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        centerMode: false,
        variableWidth: true,
      },
    },
  ],
}

const Teams: FC<Props> = ({ people }) => {
  const [t, i18n] = useTranslation('search')
  if (people.length === 0) return null

  const cardsPerPage = 3
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastOrg = currentPage * cardsPerPage
  const indexOfFirstOrg = indexOfLastOrg - cardsPerPage

  const currentPeople = people.slice(indexOfFirstOrg, indexOfLastOrg)
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="team-container">
      <h1 className="search-title">{t('teamsTitle')}</h1>
      <Desktop>
        <div className="teams-grid">
          {currentPeople.map((data: any, index: number) => (
            <TeamCard
              key={index}
              image={data.imgSrc}
              name={data.name}
              description={data.description}
              role={data.role}
              linkedin={data.linkedin}
            />
          ))}
        </div>
        <div className="pagination">
          <Pagination
            totalOrgs={people.length}
            currentPage={currentPage}
            pagesToDisplay={cardsPerPage}
            paginate={pageNumber => paginate(pageNumber)}
            scrollTo="all-news"
          />
        </div>
      </Desktop>
      <Mobile>
        <Slider
          {...settings}
          prevArrow={
            <Arrow check={0} classes="prev-gray-arrow">
              <SliderLeftArrow />
            </Arrow>
          }
          nextArrow={
            <Arrow check={people?.length - 1} classes="next-gray-arrow">
              <SliderRightArrow />
            </Arrow>
          }
          className="team-carousel"
        >
          {people.map((data: any, index: number) => (
            <TeamCard
              key={index}
              image={data.imgSrc}
              name={data.name}
              description={data.description}
              role={data.role}
              linkedin={data.linkedin}
            />
          ))}
        </Slider>
      </Mobile>
    </div>
  )
}

export default Teams
