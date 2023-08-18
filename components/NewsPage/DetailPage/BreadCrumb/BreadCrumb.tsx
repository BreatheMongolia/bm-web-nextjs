import React, { FC } from 'react'
import BreadCrumbItem from './BreadCrumbItem'

type BreadCrumbItem = { id: number; item: string }

interface IProps {
  breadCrumbItems: BreadCrumbItem[]
}

export const BreadCrumb: FC<IProps> = ({ breadCrumbItems }) => {
  return (
    <div className="breadCrumbs">
      {breadCrumbItems.map((breadCrumbItem, idx) => {
        return (
          <div className="breadCrumbItems" key={idx}>
            <BreadCrumbItem item={breadCrumbItem.item} />
            {breadCrumbItem.id !== breadCrumbItems.length ? <span> / </span> : null}
          </div>
        )
      })}
    </div>
  )
}
