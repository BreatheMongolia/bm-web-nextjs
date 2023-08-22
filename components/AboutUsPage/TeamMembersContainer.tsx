import React, { FC } from 'react'
import TeamMembersMain from './TeamMembersMain'
import { useTranslation } from 'next-i18next'

type Props = {
  people: any[]
}

const TeamMembersContainer: FC<Props> = ({ people }) => {
  const { t, i18n } = useTranslation()

  return <TeamMembersMain people={people} />
}

export default TeamMembersContainer
