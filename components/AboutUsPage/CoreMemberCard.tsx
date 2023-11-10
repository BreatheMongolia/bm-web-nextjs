import Linkedin from 'assets/icons/Linkedin'
import React, { FC } from 'react'

type Props = {
  person: any
}

const CoreMemberCard: FC<Props> = ({ person }) => {
  const truncate = (input: string) => (input?.length > 255 ? `${input.substring(0, 255)}...` : input)

  return (
    <div className="core-member-card text-center">
      <img src={person.imgSrc} alt="member profile image" className="profile_icon core" />
      <div className="core_member_title">
        <h4 className="member_name core">{person.name}</h4>
        <h5 className="member_role core">{person.role}</h5>
        <hr className="core_member_break" />
      </div>
      <div className="core_member_info">
        <p className="member_bio text-left">{truncate(person.description)}</p>
        <div className="social_btns">
          <a href={person.linkedin} target="_blank">
            <Linkedin />
          </a>
        </div>
      </div>
    </div>
  )
}

export default CoreMemberCard
