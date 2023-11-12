import React from 'react'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import FeaturedMemberCard from './FeaturedMemberCard'
import Slider from 'react-slick'
import { useTranslation } from 'next-i18next'

const settings = {
  infinite: false,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  adaptiveHeight: true,
  variableWidth: false,
}

type People = {
  name: string
  imgSrc: string
  role: string
  description: string
  memberSince: string
  featured: boolean
  linkedin: string
}

const FeaturedTeamMembers = ({ people }: { people: People[] }) => {
  const { t } = useTranslation('about')

  return (
    <>
      <div className="flex flex-col justify-center">
        <h1 className="our_team_section_title">{t('ourTeam.featuredMembers')}</h1>
        <Slider
          {...settings}
          prevArrow={
            <Arrow check={0} classes="prev-gray-arrow">
              <ChevronLeftIcon className="w-8 h-8 text-white" />
            </Arrow>
          }
          nextArrow={
            <Arrow check={people?.length - 1} classes="next-gray-arrow">
              <ChevronRightIcon className="w-8 h-8 text-white" />
            </Arrow>
          }
        >
          {people.map(person => (
            <FeaturedMemberCard key={person.linkedin} person={person} />
          ))}
        </Slider>
      </div>
    </>
  )
}

export default FeaturedTeamMembers
