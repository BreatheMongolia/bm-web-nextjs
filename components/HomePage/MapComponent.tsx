import { H2 } from 'components/generic/Typography'

export const MapComponent = ({
  title,
  descriptionHtml,
}: {
  title: { en: string; mn: string }
  descriptionHtml: { en: string; mn: string }
}) => {
  return (
    <div>
      <H2 title={title.mn} descriptionHtml={descriptionHtml.mn} />
      <div className="w-full h-96 bg-gray-200"></div>
    </div>
  )
}
