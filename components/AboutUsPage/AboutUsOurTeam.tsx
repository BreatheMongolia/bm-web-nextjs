import React from 'react'
import WhereOurTeamIsLocated from './WhereOurTeamIsLocated'
import TeamMembersContainer from './TeamMembersContainer'

const AboutUsOurTeam = ({ people }) => {
  return (
    <div className="our_team_wrapper">
      <WhereOurTeamIsLocated />
      <TeamMembersContainer people={people} />
    </div>
  )
}

export default AboutUsOurTeam
