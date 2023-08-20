import React, { FC } from 'react'
import CoreMemberCard from './CoreMemberCard'
import { useTranslation } from 'next-i18next'

type Props = {
  people: any[]
}

const CoreTeamMembers: FC<Props> = ({ people }) => {
  const { t, i18n } = useTranslation('about')

  // Order core members by oldest to newest
  // @ts-ignore
  people.sort((a, b) => new Date(a.sortBy) - new Date(b.sortBy))

  return (
    <div className="core-team-members-component">
      <h1 className="our_team_title">{t('ourTeam.ourTeam')}</h1>
      <div className="core-team-members-grid">
        {people.map(person => (
          <CoreMemberCard key={person.linkedin} person={person} />
        ))}
      </div>
    </div>
  )
}

export default CoreTeamMembers
