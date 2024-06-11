import { H2 } from 'components/generic/Typography'
import { parse } from 'date-fns'
import { getTranslated } from 'lib/utils/getTranslated'
import React from 'react'
import { text } from 'stream/consumers'

const HealthPage = () => {
  return (
    <div className="container mx-auto flex flex-col px-[1rem] lg:px-[6rem] xl:px-[9rem] 2xl:px-[16rem]">
      <H2 title={"Health Page"} className="ta-mobile-header" />
      <h3 className="mb-5 font-semibold text-base sm:text-xl text-zinc-800 mx-3 sm:mx-0">
        {"Welcome to the health page"}
      </h3>
    </div>
  )
}

export default HealthPage