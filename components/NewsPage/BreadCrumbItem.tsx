import React, { FC } from 'react'
import Link from 'next/link'

interface IProps {
  item: string
}

const BreadCrumbItem: FC<IProps> = ({ item }) => {
  const getItem = (item: string) => {
    switch (item) {
      case 'News':
        return (
          <Link className="breadCrumbItem" href={`/news`}>
            {item}
          </Link>
        )
      case 'Мэдээ':
        return (
          <Link className="breadCrumbItem" href={`/news`}>
            {item}
          </Link>
        )
      case 'Breathe Mongolia-н мэдээ':
        return (
          <Link className="breadCrumbItem" href={`/news/breathemongolia`}>
            {item}
          </Link>
        )
      case 'Latest on Breathe Mongolia':
        return (
          <Link className="breadCrumbItem" href={`/news/breathemongolia`}>
            {item}
          </Link>
        )
      default:
        return <div className="breadCrumbItem">{item}</div>
    }
  }
  return <div className="breadCrumbItem">{getItem(item)}</div>
}

export default BreadCrumbItem
