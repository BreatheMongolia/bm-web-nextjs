import React from 'react'
import VolunteerCard from '../../Cards/VolunteerCard'

export const VolunteerPosition = ({
  joinDescription,
  volunteers,
  countriesInfoText,
  locale,
}: {
  joinDescription: string
  volunteers: any[]
  countriesInfoText: any[]
  locale: string
}) => {
  return (
    <div className="flex flex-col gap-5 mb-5 font-normal text-md md:font-bold md:text-lg">
      {joinDescription && <div dangerouslySetInnerHTML={{ __html: joinDescription }}></div>}
      <VolunteerCard usedPage={'about'} volunteers={volunteers} countriesInfoText={countriesInfoText} locale={locale} />
    </div>
  )
}

export default VolunteerPosition
