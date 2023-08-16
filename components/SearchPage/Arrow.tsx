import React, { FC } from 'react'

type Props = {
  className?: string
  check?: any
  style?: any
  onClick?: any
  currentSlide?: number
  children?: React.ReactNode
  classes?: string
}

const Arrow: FC<Props> = props => {
  const { className, check, style, onClick, currentSlide, children, classes } = props

  if (currentSlide === check) return null

  return (
    <div className={`${className} ${classes}`} style={{ ...style }} onClick={onClick}>
      {children}
    </div>
  )
}

export default Arrow
