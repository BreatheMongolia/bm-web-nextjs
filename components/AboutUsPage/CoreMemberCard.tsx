import Linkedin from 'assets/icons/Linkedin'
import React, { FC } from 'react'

type Props = {
  person: any
}

const CoreMemberCard: FC<Props> = ({ person }) => {
  return (
    <div className="core-member-card">
      <img src={person.imgSrc} alt="Member profile image" className="profile_icon core" />
      <h4 className="member_name core">{person.name}</h4>
      <h5 className="member_role core">{person.role}</h5>
      <hr className="core-member-break" />
      <p className="member_bio core">{person.description}</p>
      <div className="social_btns">
        <a href={person.linkedin} target="_blank">
          <Linkedin />
        </a>
      </div>
    </div>
  )
}

export default CoreMemberCard
