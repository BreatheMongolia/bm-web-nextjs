import React from 'react'
import CoreTeamMembers from './CoreTeamMembers'
import FeaturedTeamMembers from './FeaturedTeamMembers'

type People = {
  name: string
  imgSrc: string
  role: string
  description: string
  memberSince: string
  featured: boolean
  linkedin: string
}

const TeamMembersMain = ({ people }: { people: People[] }) => {
  return (
    <div>
      <FeaturedTeamMembers people={people.filter(person => person.featured)} />
      <CoreTeamMembers people={people.filter(person => !person.featured)} />
    </div>
  )
}

export default TeamMembersMain
