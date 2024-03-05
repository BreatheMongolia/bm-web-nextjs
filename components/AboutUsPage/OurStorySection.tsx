import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import OurStory from 'assets/images/ourStory.jpg'
import { useTranslation } from 'next-i18next'

export const OurStorySection = () => {
  const { t } = useTranslation('about')

  return (
    <div className="our_stories_container gap-1">
      <div className="container flex mt-8 mb-6">
        <div className="left_container">
          <h1 className="our_stories_title uppercase md:text-lg lg:text-xl">{t('ourStory.title')}</h1>
          <p className="our_stories_content md:text-sm lg:text-base">{t('ourStory.ourStoryDetails')}</p>
          <Link href={'/news/зохион-байгуулалттай-жагсаалаас-ашг'}>
            <button className="btn">
              <div className="btn_text uppercase">{t('ourStory.moreAboutOurStory')}</div>
            </button>
          </Link>
        </div>
        <div className="right_container">
          <Image className="our_stories_img" src={OurStory} alt="Our Stories" />
        </div>
      </div>
    </div>
  )
}

export default OurStorySection
