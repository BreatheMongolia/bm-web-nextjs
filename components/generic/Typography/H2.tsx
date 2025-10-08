import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { StaticImageData } from 'next/image'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

export const H2 = ({
  title,
  iconImage,
  trailingLineColor,
  extraButton,
  agaarnegButton,
  descriptionHtml,
  className,
}: {
  title: string
  iconImage?: StaticImageData | string
  trailingLineColor?: 'blue' | 'yellow'
  agaarnegButton?: {
    title: string
    url: string
  }
  extraButton?: {
    title: string
    url: string
  }
  descriptionHtml?: string
  className?: string
}) => {
  const isMobile = useMediaQuery({ maxWidth: 752 })

  const TrailingLine = () => {
    // Setting state and useEffect removes the hydration error from static generation
    const [borderColor, setBorderColor] = useState('border-amber-400')
    useEffect(() => setBorderColor(trailingLineColor === 'yellow' ? 'border-amber-400' : 'border-bm-blue'), [])
    return <div className={`border-b-2 mt-2 grow ${borderColor}`}></div>
  }
  const ExtraButton = () => {
    const router = useRouter()
    const handleClick = e => {
      e.preventDefault()
      router.push(extraButton.url).then(() => {
        const mainElement = document.getElementById('main-content')
        if (mainElement) {
          mainElement.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
    }
    return (
      <div className="font-bold text-sm">
        <a href={extraButton.url} onClick={handleClick}>
          {extraButton.title}
        </a>
      </div>
    )
  }
  const AgaarNegButton = () => {
    return (
      <div className={`col-span-2 sm:col-span-1 flex  ${isMobile ? 'justify-end' : 'justify-center items-center'}`}>
        <Link href={agaarnegButton.url} target="_blank">
          <div className="bg-[#00aeef] text-white flex px-3 py-1 items-center justify-center gap-2 font-semibold rounded-full shadow-lg group hover:shadow-xl hover:bg-sky-600 transition-all w-full">
            <span className="text-xs">{agaarnegButton.title} </span>
            <h1>AgaarNeg.mn</h1>
            <span>
              <ArrowRightCircleIcon className="h-5 w-5 group-hover:-mr-1 transition-all" />
            </span>
          </div>
        </Link>
      </div>
    )
  }
  const IconImage = () => {
    return <Image src={iconImage} alt={title} className="h-10 w-10" width={40} height={40} />
  }
  return (
    <div className={`mt-2 mb-5 ${className}`}>
      <div className="flex gap-x-3 items-center">
        {iconImage && <IconImage />}
        <h2 className={`${!trailingLineColor && 'grow'} font-bold text-lg sm:text-3xl text-zinc-800 ${className}`}>{title}</h2>
        {/* Trailing line */}
        {trailingLineColor && <TrailingLine />}
        {/* Button */}
        {extraButton && <ExtraButton />}
        {agaarnegButton && !isMobile && <AgaarNegButton />}
      </div>
      {agaarnegButton && isMobile && <AgaarNegButton />}
      {descriptionHtml && (
        <div className="mt-2 pt-4 mb-5 text-zinc-600" dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
      )}
    </div>
  )
}
