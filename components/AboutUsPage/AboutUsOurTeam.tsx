import React from 'react'
import WhereOurTeamIsLocated from './WhereOurTeamIsLocated'
import TeamMembersContainer from './TeamMembersContainer'

const AboutUsOurTeam = ({ people }) => {
  return (
    <div className="container mx-auto flex flex-col">
      <WhereOurTeamIsLocated />
      <TeamMembersContainer people={people} />
    </div>
  )
}

export default AboutUsOurTeam
