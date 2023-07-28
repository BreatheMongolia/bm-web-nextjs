import React from 'react'

const Banner: any = ({ bannerImages, bannerText }) => {
  return (
    <div className="banner-wrapper">
      <div>
        <img src={bannerImages?.mediaItemUrl} alt="" />
      </div>
      <div className="banner_bottom_text_bar">
        <div className="flex container mx-auto justify-center banner_bottom_text_content">
          <p>{bannerText?.bannerTextLeft}</p>
          <p>{bannerText?.bannerTextRight?.join('・')}</p>
        </div>
      </div>
    </div>
  )
}

export default Banner
