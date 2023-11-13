import React, { FC } from 'react'
import Linkedin from 'assets/icons/Linkedin'

type Props = {
  person: any
}

const FeaturedMemberCard: FC<Props> = ({ person }) => {
  const truncate = (input: string) => (input?.length > 225 ? `${input.substring(0, 225)}...` : input)

  return (
    <div className="member_card">
      <div className="member_card_left">
        <img src={person.imgSrc} className="member_img" />
      </div>
      <div className="member_card_right">
        <div className="member_info">
          <h4 className="member_name">{person.name}</h4>
          <h5 className="member_role">{person.role}</h5>
          <p className="hidden lg:block member_bio">{person.description}</p>
          <p className="lg:hidden member_bio">{truncate(person.description)}</p>
          <p className="member_since">{person.memberSince}</p>
        </div>
        <div className="social_btns">
          <a href={person.linkedin} target="_blank">
            <Linkedin />
          </a>
        </div>
      </div>
    </div>
  )
}

export default FeaturedMemberCard
