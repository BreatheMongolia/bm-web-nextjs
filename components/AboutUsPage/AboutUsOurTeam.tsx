import React, { FC } from 'react'
import WhereOurTeamIsLocated from './WhereOurTeamIsLocated'
import TeamMembersContainer from './TeamMembersContainer'

type Props = {
  people: any[]
}

const AboutUsOurTeam: FC<Props> = ({ people }) => {
  return (
    <div className="our_team_wrapper">
      <WhereOurTeamIsLocated />
      <TeamMembersContainer people={people} />
    </div>
  )
}

export default AboutUsOurTeam
