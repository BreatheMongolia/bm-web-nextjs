import Link from 'next/link'

export const H2 = ({
  title,
  iconImageUrl,
  trailingLineColor,
  extraButton,
  descriptionHtml,
}: {
  title: string
  iconImageUrl?: string
  trailingLineColor?: 'blue' | 'yellow'
  extraButton?: {
    title: string
    url: string
  }
  descriptionHtml?: string
}) => {
  const TrailingLine = () => {
    const borderColor = trailingLineColor === 'yellow' ? 'border-amber-400' : 'border-bm-blue'
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
    <div className="mt-2 mb-5">
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
        <p className="mt-2 mb-5 text-zinc-600" dangerouslySetInnerHTML={{ __html: descriptionHtml }}></p>
      )}
    </div>
  )
}
