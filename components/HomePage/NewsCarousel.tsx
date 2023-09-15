import { NewsCard } from 'components/Cards'
import { H2 } from 'components/generic/Typography'
import { News, Page_Customfields_FeaturedNews } from 'graphql/generated'
import { useTranslation } from 'next-i18next'
import Slider from 'react-slick'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Arrow from 'components/generic/Arrow'

export const NewsCarousel = ({ featuredNews }: { featuredNews: Page_Customfields_FeaturedNews[] }) => {
  const { t } = useTranslation('home')

  const news = featuredNews
  const settings = {
    dots: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    cssEase: 'ease-in-out',
    adaptiveHeight: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  }
  return (
    <div className="news-carousel-section">
      <H2
        title={t('news.title')}
        trailingLineColor="blue"
        extraButton={{
          title: t('campaignWork.seeMore'),
          url: '/news',
        }}
      />
      <Slider
        {...settings}
        prevArrow={
          <Arrow check={0} classes="prev-gray-arrow">
            <ChevronLeftIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
        nextArrow={
          <Arrow check={featuredNews?.length - 3} classes="next-gray-arrow">
            <ChevronRightIcon className="w-8 h-8 text-white" />
          </Arrow>
        }
      >
        {news.map((data: News, idx) => (
          <NewsCard key={idx} news={data} />
        ))}
      </Slider>
    </div>
  )
}
