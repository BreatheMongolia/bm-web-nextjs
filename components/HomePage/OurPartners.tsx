import { H2 } from 'components/generic/Typography'
import { Page_Customfields_PartnersLogos } from 'graphql/generated'

export const OurPartners = ({
  title,
  partnerLogos,
}: {
  title: {
    en: string
    mn: string
  }
  partnerLogos: Page_Customfields_PartnersLogos[]
}) => {
  // console.log(title, partnerLogos)
  // TODO: Add <Slider /> component (react-slick)
  // TODO: Div/styling for images within Slider
  return (
    <div>
      <H2 title={title.mn} />
      <div>
        {partnerLogos.map((x, idx) => {
          return <div key={idx}>{x.partnersLogosUrls}</div>
        })}
      </div>
    </div>
  )
}
