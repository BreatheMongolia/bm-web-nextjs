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
  return (
    <div className="mt-2 mb-5">
      <h2 className="font-bold text-3xl text-zinc-800 mt-2 mb-1"> {title} </h2>

      {descriptionHtml && (
        <p className="mt-2 mb-5 text-zinc-600" dangerouslySetInnerHTML={{ __html: descriptionHtml }}></p>
      )}
    </div>
  )
}
