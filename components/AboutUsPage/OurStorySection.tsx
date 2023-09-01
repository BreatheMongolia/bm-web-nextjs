import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import OurStory from 'assets/images/ourStory.jpg'
import { useTranslation } from 'next-i18next'

export const OurStorySection = () => {
  const { t } = useTranslation('about')

  return (
    <div className="our_stories_container">
      <div className="left_container">
        <h1 className="our_stories_title">{t('ourStory.title')}</h1>
        <p className="our_stories_content">{t('ourStory.ourStoryDetails')}</p>
        <Link href={'/news/зохион-байгуулалттай-жагсаалаас-ашг'}>
          <button className="btn">
            <div className="btn_text desktop">{t('ourStory.moreAboutOurStory')}</div>
            <div className="btn_text mobile">{t('ourStory.moreAboutOurStory')}</div>
          </button>
        </Link>
      </div>
      <div className="right_container">
        <Image className="our_stories_img" src={OurStory} alt="Our Stories" />
      </div>
    </div>
  )
}

export default OurStorySection
