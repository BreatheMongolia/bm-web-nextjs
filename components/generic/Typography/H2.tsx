import Link from 'next/link'
import { useEffect, useState } from 'react'

export const H2 = ({
  title,
  iconImageUrl,
  trailingLineColor,
  extraButton,
  descriptionHtml,
  className,
}: {
  title: string
  iconImageUrl?: string
  trailingLineColor?: 'blue' | 'yellow'
  extraButton?: {
    title: string
    url: string
  }
  descriptionHtml?: string
  className: string
}) => {
  const TrailingLine = () => {
    // Setting state and useEffect removes the hydration error from static generation
    const [borderColor, setBorderColor] = useState('border-amber-400')
    useEffect(() => setBorderColor(trailingLineColor === 'yellow' ? 'border-amber-400' : 'border-bm-blue'), [])
    return <div className={`border-b-2 grow ${borderColor}`}></div>
  }
  const ExtraButton = () => {
    return (
      <div className="font-bold text-sm">
        <Link href={extraButton.url}>{extraButton.title}</Link>
      </div>
    )
  }
  return (
    <div className={`mt-2 mb-5 ${className}`}>
      <div className="flex items-center gap-x-10">
        <div>
          <h2 className="font-bold text-lg sm:text-3xl text-zinc-800 mt-2 mb-1"> {title} </h2>
        </div>
        {/* Trailing line */}
        {trailingLineColor && <TrailingLine />}
        {/* Button */}
        {extraButton && <ExtraButton />}
      </div>

      {descriptionHtml && (
        <div className="mt-2 mb-5 text-zinc-600" dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
      )}
    </div>
  )
}
