import React, { FC } from 'react'
import ActionTwitter from 'assets/icons/ActionTwitter'
import ActionLinkedin from 'assets/icons/ActionLinkedin'
import ActionFacebook from 'assets/icons/ActionFacebook'
import ActionEmail from 'assets/icons/ActionEmail'
import ActionLink from 'assets/icons/ActionLink'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton } from 'react-share'
import { useTranslation } from 'next-i18next'

type Props = {
  link: string
  title: string
}

const ActionShare: FC<Props> = ({ link, title }) => {
  const [t, i18n] = useTranslation('common')
  const emailText =
    i18n.language === 'eng'
      ? ` ${t('actionShare.bodyPart1')} ${title}. ${t('actionShare.bodyPart2')}
${link}${t('actionShare.bodyPart3')}
`
      : ` ${t('actionShare.bodyPart1')}
${link}

${t('actionShare.bodyPart3')}
`

  return (
    <div className={'social-share'}>
      <ul className={'social-items'}>
        <li>
          <TwitterShareButton resetButtonStyle={true} url={link} title={title} className="btn-share social-item-2">
            <ActionTwitter />
          </TwitterShareButton>
        </li>
        <li>
          <LinkedinShareButton resetButtonStyle={true} url={link} title={title} className="btn-share social-item-3">
            <ActionLinkedin />
          </LinkedinShareButton>
        </li>
        <li>
          <FacebookShareButton resetButtonStyle={true} url={link} quote={title}>
            <ActionFacebook />
          </FacebookShareButton>
        </li>
        <li>
          <button
            onClick={() => {
              navigator.clipboard.writeText(link)
            }}
          >
            <ActionLink />
          </button>
        </li>
        <li>
          <EmailShareButton
            resetButtonStyle={true}
            subject={t('actionShare.subject')}
            body={emailText}
            url={''}
            className="btn-share social-item-3"
          >
            <ActionEmail />
          </EmailShareButton>
        </li>
      </ul>
    </div>
  )
}

export default ActionShare
