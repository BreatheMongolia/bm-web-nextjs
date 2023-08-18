import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Linkedin from 'assets/icons/Linkedin'

type Props = {
  name: string
  description: string
  linkedin: string
  image: string
  role: string
}

const TeamCard: FC<Props> = ({ name, description, linkedin, image, role }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={'team-card'}>
        <div className="card-header">
          <img className="avatar" src={image} />
          <h2>{name}</h2>
          <span>{role}</span>
        </div>
        <div className="card-body">
          <p>{description}</p>
          <a href={linkedin} target="_blank">
            <Linkedin />
          </a>
        </div>
      </div>
    </>
  )
}

export default TeamCard
