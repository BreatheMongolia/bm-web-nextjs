import React, { FC } from 'react'
import Twitter from 'assets/icons/Twitter'
import Linkedin from 'assets/icons/Linkedin'
import Facebook from 'assets/icons/Facebook'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'

type Props = {
  link: string
  title: string
}

const SocialShare: FC<Props> = ({ link, title }) => {
  return (
    <div className={'social-share'}>
      <ul className={'social-items'}>
        <li>
          <FacebookShareButton resetButtonStyle={false} url={link} quote={title} className="btn-share social-item-1">
            <Facebook />
          </FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton resetButtonStyle={false} url={link} title={title} className="btn-share social-item-2">
            <Twitter />
          </TwitterShareButton>
        </li>
        <li>
          <LinkedinShareButton resetButtonStyle={false} url={link} title={title} className="btn-share social-item-3">
            <Linkedin />
          </LinkedinShareButton>
        </li>
      </ul>
    </div>
  )
}

export default SocialShare
