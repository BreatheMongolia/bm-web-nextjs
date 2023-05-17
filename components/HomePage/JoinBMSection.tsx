import { H2 } from 'components/generic/Typography'
import {
  Page_Customfields_CountriesInfoText,
  Page_Customfields_JoinBreatheMongoliaImageSlider,
} from 'graphql/generated'

export const JoinBMSection = ({
  title,
  descriptionHtml,
  slider,
  countriesInfoText,
}: {
  title: { en: string; mn: string }
  descriptionHtml: { en: string; mn: string }
  slider: Page_Customfields_JoinBreatheMongoliaImageSlider[]
  countriesInfoText: Page_Customfields_CountriesInfoText[]
}) => {
  // TODO: Slider for the slider images
  // TODO: show countries info section
  // TODO: Show volunteer positions section
  // - Blocked: By API call for volunteer position, but show the UI for now

  // TEMP: object to test the Volunteers temp section

  // git
  const volunteersTemp = [
    {
      title: 'Test Volunteer Position',
      url: 'https://www.notion.so/breathemongolia/Fundraising-Manager-3c5a7d35aaad4b92939eaab909d270e4',
    },
  ]
  return (
    <div>
      <H2 title={title.mn} descriptionHtml={descriptionHtml.mn} />
      {/* {volunteersTemp.map(x)} */}
    </div>
  )
}
