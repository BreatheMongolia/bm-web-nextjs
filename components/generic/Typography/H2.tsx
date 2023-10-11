import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { StaticImageData } from 'next/image'

export const H2 = ({
  title,
  iconImage,
  trailingLineColor,
  extraButton,
  descriptionHtml,
  className,
}: {
  title: string
  iconImage?: StaticImageData | string
  trailingLineColor?: 'blue' | 'yellow'
  extraButton?: {
    title: string
    url: string
  }
  descriptionHtml?: string
  className?: string
}) => {
  const TrailingLine = () => {
    // Setting state and useEffect removes the hydration error from static generation
    const [borderColor, setBorderColor] = useState('border-amber-400')
    useEffect(() => setBorderColor(trailingLineColor === 'yellow' ? 'border-amber-400' : 'border-bm-blue'), [])
    return <div className={`border-b-2 mt-2 grow ${borderColor}`}></div>
  }
  const ExtraButton = () => {
    return (
      <div className="font-bold text-sm">
        <Link href={extraButton.url}>{extraButton.title}</Link>
      </div>
    )
  }
  const IconImage = () => {
    return <Image src={iconImage} alt={title} className="h-10 w-10" />
  }
  return (
    <div className={`mt-2 mb-5 ${className}`}>
      <div className="flex items-center gap-x-3">
        {iconImage && <IconImage />}
        <h2 className={`${!trailingLineColor && 'grow'} font-bold text-lg sm:text-3xl text-zinc-800`}>{title}</h2>
        {/* Trailing line */}
        {trailingLineColor && <TrailingLine />}
        {/* Button */}
        {extraButton && <ExtraButton />}
      </div>

      {descriptionHtml && (
        <div className="mt-2 pt-4 mb-5 text-zinc-600" dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
      )}
    </div>
  )
}
