import React, { FC, useEffect, useState } from 'react'
import parse from 'html-react-parser'
import ActionShare from 'components/ActionShare/ActionShare'

interface IProps {
  title: string
  introText: string
  typeOfAction: []
}

export const TextBody: FC<IProps> = (props: IProps) => {
  const { title, introText, typeOfAction } = props
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.origin)
  }, [])

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
          <ActionShare link={currentUrl} title={title} />
        </div>
      </div>

      <div className="take-action-intro-text">{introText && parse(introText)}</div>
    </div>
  )
}

export default TextBody
