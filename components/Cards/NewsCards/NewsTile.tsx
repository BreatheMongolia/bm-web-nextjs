import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import cx from 'classnames'
import { useRouter } from 'next/router'
import CloseIcon from 'assets/icons/CloseIcon'
import { useMediaQuery } from 'react-responsive'
import PlayButton from 'assets/icons/PlayButton'
import Modal from 'react-modal'
import { ShareButton } from 'components/NewsPage/DetailPage'

Modal.setAppElement('#__next')

type Props = {
  id: number
  sourceLink: string
  slug: string
  title: string
  sourceName: string
  sourceLanguage: string
  newsLandingPageFeatured?: string
  landingPageFeatured?: string
  categories?: Array<{}>
  newsContentType: string
  cName?: string
  index?: number
  homePage?: string
  mobile?: string
  featuredImageSmall?: string
  featuredImageBig?: string
  featured?: string
}

const NewsBgTile: FC<Props> = ({
  id,
  slug,
  sourceLink,
  title,
  sourceName,
  sourceLanguage,
  categories,
  newsContentType,
  cName,
  index,
  homePage,
  featuredImageSmall,
  featuredImageBig,
  mobile,
  featured,
}) => {
  const [t, i18n] = useTranslation()
  const isMobile = useMediaQuery({ maxWidth: 912 })
  const [isOpen, setOpen] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const router = useRouter()

  const spinner = () => {
    setVideoLoading(!videoLoading)
  }
  const matchUrl = `/${i18n.language}`
  const handleClick = (slug: string) => {
    if (sourceLink) {
      window.open(sourceLink, '_blank')
    } else {
      router.push(`${matchUrl}/news/` + slug)
    }
  }
  const [thumbnailURL, setThumbnailURL] = useState('')

  useEffect(() => {
    fetch('https://noembed.com/embed?url=' + sourceLink)
      .then(res => {
        return res.json()
      })
      .then(response => {
        setThumbnailURL(response.thumbnail_url)
      })
  }, [sourceLink])

  function getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? match[2] : null
  }

  const replaceEmbed = (sourceLink: string) => {
    const videoId = getId(sourceLink)
    return `https://www.youtube.com/embed/${videoId}`
  }
  return (
    <>
      <div
        className={
          featured === 'featuredSmall'
            ? cx(homePage, mobile, featured)
            : cx('news-item', cName ? index == 0 && cName : '', homePage, mobile, featured)
        }
        onClick={() => {
          newsContentType === 'video' ? setOpen(true) : handleClick(slug)
        }}
        key={id}
      >
        {featured === 'featuredSmall' && sourceLink && (
          <div className="topic">
            <span className="custom_blue_span ">{sourceName}</span>
          </div>
        )}

        {newsContentType !== 'video' ? (
          <>
            {cName && index == 0 ? (
              <img src={featuredImageBig} alt={title} />
            ) : (
              <img src={featuredImageSmall} alt={title} />
            )}
          </>
        ) : (
          <div className="playButtonForSmallTile">
            {featured === 'featuredSmall' && <PlayButton />}
            <img src={thumbnailURL} alt={title} />
          </div>
        )}

        <div className={cx(featured === 'featuredSmall' ? 'news-body' : 'card-img-overlay news-body')}>
          {featured !== 'featuredSmall' && sourceLink && (
            <div className="topic" key={id}>
              <span className="custom_blue_span ">{sourceName}</span>
            </div>
          )}
          {featured !== 'featuredSmall' && newsContentType === 'video' && <PlayButton />}
          <div className="news-info">
            {categories && (
              <div className="category">
                {categories?.length > 2
                  ? categories?.slice(0, 2).map((data: any) => (
                      <div key={Math.random()}>
                        <span
                          className={cx(featured === 'featuredSmall' ? 'custom_dot_green' : 'custom_dot_white')}
                        ></span>
                        <span className={cx(featured === 'featuredSmall' ? 'custom_green_span' : 'custom_white_span')}>
                          {data.name}
                        </span>
                      </div>
                    ))
                  : categories?.map((data: any) => (
                      <div key={Math.random()}>
                        <span
                          className={cx(featured === 'featuredSmall' ? 'custom_dot_green' : 'custom_dot_white')}
                        ></span>
                        <span className={cx(featured === 'featuredSmall' ? 'custom_green_span' : 'custom_white_span')}>
                          {data.name}
                        </span>
                      </div>
                    ))}
              </div>
            )}
            <p>{title}</p>
          </div>
        </div>
      </div>

      {newsContentType === 'video' && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setOpen(false)}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              backgroundColor: 'transparent',
            },
            content: {
              inset: 0,
              width: isMobile ? 310 : 625,
              padding: 0,
              border: 'none',
              position: 'relative',
              backgroundColor: '#61b1ee',
              borderRadius: 20,
              textAlign: 'center',
            },
          }}
        >
          <section className="modal__bg" onClick={() => setOpen(false)}>
            <div className="modal__align">
              <div className="modal__content">
                <div className="modal__header">
                  <div className="modal__close" onClick={() => setOpen(false)}>
                    <CloseIcon />
                  </div>
                  <div className="modal__share">
                    <ShareButton url={'https://v2.breathemongolia.org/news/' + id} title={title} bottom={false} />
                  </div>
                </div>

                <div className="modal__video-align">
                  {videoLoading ? (
                    <div className="modal__spinner">
                      <div className="modal__spinner-style" />
                    </div>
                  ) : null}
                  <iframe
                    className="modal__video-style"
                    onLoad={spinner}
                    loading="lazy"
                    width="800"
                    height="500"
                    src={replaceEmbed(sourceLink)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        </Modal>
      )}
    </>
  )
}

export default NewsBgTile
