import React, { FC } from 'react'
import cx from 'classnames'
import Link from 'next/link'

export type Props = {
  id: number
  slug: string
  title: string
  featuredImage: string
  index: number
  pageNumberLimit?: number
}

export const TakeActionTile: FC<Props> = ({ id, slug, title, featuredImage, index, pageNumberLimit }) => {
  return (
    <>
      <div
        className={cx('card take-action-carousel', index % (pageNumberLimit == 18 ? 9 : 6) === 0 && 'big')}
        key={index}
      >
        {featuredImage !== null && (
          <Link href={`/take-actions/${slug}`}>
            <img className="card-img-top take-action-img" src={featuredImage !== null ? featuredImage : ''} />
            <div className="take-action-info">
              <div className="take-action-title">{title !== null ? title : ''}</div>
              <div className="read-more-arrow ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#F4AC3D" />
                  <path
                    d="M15.6674 12.6249L16.334 12L11.0005 7L9.66732 8.24978L13.6668 12L9.66732 15.7502L11.0005 17L15.6674 12.6249Z"
                    fill="#FAFAFF"
                  />
                </svg>
              </div>
            </div>
          </Link>
        )}
      </div>
    </>
  )
}

export default TakeActionTile
