import React, { FC } from 'react'
import Arrow from 'components/generic/Arrow'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import FeaturedMemberCard from './FeaturedMemberCard'
import Desktop from '../../components/Desktop'
import Mobile from '../../components/Mobile'
import Slider from 'react-slick'
import { useTranslation } from 'next-i18next'

type Props = {
  people: any[]
}

const settings = {
  dots: true,
  infinite: false,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  adaptiveHeight: true,
  centerMode: true,
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
        centerMode: true,
      },
    },
  ],
}

const FeaturedTeamMembers: FC<Props> = ({ people }) => {
  const { t, i18n } = useTranslation('about')

  return (
    <>
      <Desktop>
        <div className="FeaturedTeamMembers_component">
          <h1 className="featured_team_title">{t('ourTeam.featuredMembers')}</h1>
          <div className="carousel_container">
            <Slider
              {...settings}
              prevArrow={
                <Arrow check={0} classes="prev-gray-arrow">
                  <ChevronLeftIcon className="w-8 h-8 text-white" />
                </Arrow>
              }
              nextArrow={
                <Arrow check={people?.length - 3} classes="next-gray-arrow">
                  <ChevronRightIcon className="w-8 h-8 text-white" />
                </Arrow>
              }
            >
              {people.map(person => (
                <FeaturedMemberCard key={person.linkedin} person={person} />
              ))}
            </Slider>
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="FeaturedTeamMembers_component">
          <h1 className="featured_team_title">{t('ourTeam.featuredMembers')}</h1>
          <div className="carousel_container">
            <Slider
              {...settings}
              prevArrow={
                <Arrow check={0} classes="prev-gray-arrow">
                  <ChevronLeftIcon className="w-8 h-8 text-white" />
                </Arrow>
              }
              nextArrow={
                <Arrow check={people?.length - 3} classes="next-gray-arrow">
                  <ChevronRightIcon className="w-8 h-8 text-white" />
                </Arrow>
              }
            >
              {people.map(person => (
                <FeaturedMemberCard key={person.linkedin} person={person} />
              ))}
            </Slider>
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default FeaturedTeamMembers
