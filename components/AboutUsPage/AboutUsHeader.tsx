import React from 'react'
import { AboutUsBanner } from './AboutUsBanner'
import { AboutUsTab } from './AboutUsTab'

export const AboutUsHeader = () => {
  return (
    <div className="flex flex-col">
      <AboutUsBanner />
      <AboutUsTab />
    </div>
  )
}
