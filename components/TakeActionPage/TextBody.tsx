import React, { FC, useState } from 'react'
import parse from 'html-react-parser'
import ActionShare from 'components/ActionShare/ActionShare'

interface IProps {
  title: string
  introText: string
  typeOfAction: []
}

export const TextBody: FC<IProps> = (props: IProps) => {
  const { title, introText, typeOfAction } = props

  return (
    <div className="take-action-text-container">
      <div className="types-share-container">
        <div className="types-container">
          {typeOfAction &&
            typeOfAction.map((item, index) => {
              return (
                <div key={index} className="take-action-type-container">
                  <p>{item}</p>
                </div>
              )
            })}
        </div>
        <div className="actions-share">
          <ActionShare link={''} title={title} />
        </div>
      </div>

      <div className="take-action-intro-text">{introText && parse(introText)}</div>
    </div>
  )
}

export default TextBody
