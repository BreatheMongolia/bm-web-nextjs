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
    <div className="flex flex-col mb-5">
      {/* <div className="font-normal text-md md:font-bold md:text-lg py-5"> */}
      {joinDescription && (
        <div className="mt-2 mb-5 text-zinc-600" dangerouslySetInnerHTML={{ __html: joinDescription }}></div>
      )}
      {/* </div> */}
      <VolunteerCard volunteers={volunteers} countriesInfoText={countriesInfoText} locale={locale} />
    </div>
  )
}

export default VolunteerPosition
