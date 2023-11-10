import React from 'react'
import CoreMemberCard from './CoreMemberCard'
import { useTranslation } from 'next-i18next'

type People = {
  name: string
  imgSrc: string
  role: string
  description: string
  memberSince: string
  featured: boolean
  linkedin: string
}

const CoreTeamMembers = ({ people }: { people: People[] }) => {
  const { t } = useTranslation('about')

  // Order core members by oldest to newest
  // @ts-ignore
  people.sort((a, b) => new Date(a.sortBy) - new Date(b.sortBy))

  return (
    <div className="flex flex-col">
      <h1 className="our_team_section_title">{t('ourTeam.ourTeam')}</h1>
      <div className="core-team-members-grid">
        {people.map(person => (
          <CoreMemberCard key={person.linkedin} person={person} />
        ))}
      </div>
    </div>
  )
}

export default CoreTeamMembers
