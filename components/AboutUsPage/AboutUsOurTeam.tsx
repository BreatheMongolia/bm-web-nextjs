import React from 'react'
import WhereOurTeamIsLocated from './WhereOurTeamIsLocated'
import TeamMembersMain from './TeamMembersMain'

const AboutUsOurTeam = ({ people }) => {
  return (
    <div className="container mx-auto flex flex-col gap-10">
      <WhereOurTeamIsLocated />
      <TeamMembersMain people={people} />
    </div>
  )
}

export default AboutUsOurTeam
