import React, { FC } from 'react'
import CoreTeamMembers from './CoreTeamMembers'
import FeaturedTeamMembers from './FeaturedTeamMembers'
import People from './TeamMembersContainer'

type Props = {
  people: People[]
}

type People = {
  name: string
  imgSrc: string
  role: string
  description: string
  memberSince: string
  featured: boolean
  linkedin: string
}

const TeamMembers: FC<Props> = ({ people }) => {
  return (
    <div>
      <FeaturedTeamMembers people={people.filter(person => person.featured)} />
      <CoreTeamMembers people={people.filter(person => !person.featured)} />
    </div>
  )
}

export default TeamMembers
