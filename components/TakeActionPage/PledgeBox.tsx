import React, { FC, useState, useEffect } from 'react'
import parse from 'html-react-parser'
import { useTranslation, Trans } from 'react-i18next'
import handImage from '../../../assets/images/hand.png'
import mobileHandImage from '../../../assets/images/mobile-hand.png'
import closeIcon from '../../../assets/images/close.png'
import closeBlackIcon from '../../../assets/images/close-black.png'
import SocialShare from 'components/SocialShare'
import Desktop from 'components/Desktop'
import Mobile from 'components/Mobile'
import { useMutation } from '@apollo/client'
// import { PLEDGE_MUTATION } from './queries/takeAction'
// import { getLanguage } from '../../../utils/getLanguage'
import { useMediaQuery } from 'react-responsive'
import cx from 'classnames'
import Modal from 'react-modal'
import dayjs from 'dayjs'

type Props = {
  title: string
  content: string
  pledgeTitle: string
  actionId: number
  totalPledges: number
}

Modal.setAppElement('#__next')

export const PledgeBox: FC<Props> = ({ title, actionId, pledgeTitle, content, totalPledges }) => {
  const isMobile = useMediaQuery({ maxWidth: 912 })
  const [isPledged, setIsPledged] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [totalPledge, setTotalPledge] = useState(totalPledges)

  const { t, i18n } = useTranslation()
  const now = dayjs()
  // const language = getLanguage()
  const language = 'mn'

  // const [pledgeMutation] = useMutation(PLEDGE_MUTATION, {
  //   variables: {
  //     id: actionId,
  //     cid: actionId.toString(),
  //     language: language,
  //     date: now.format(),
  //   },
  // })
  const pledgeMutation = () => {}

  const pledgeAction = () => {
    if (isPledged) {
      setShowModal(true)
      return
    }

    // pledgeMutation().then(result => {
    //   const { data } = result
    //   setTotalPledge(data.addPledge.takeAction.totalPledges)
    //   setIsPledged(true)
    //   setShowModal(true)
    // })
  }

  return (
    <>
      <Mobile>
        <p className="mobile-pledge-title">{t('pledge.mobileTitle')}</p>
      </Mobile>
      <Mobile>
        <div className="pledge-hand">{/* <img src={mobileHandImage} /> */}</div>
      </Mobile>
      <div className="pledge-box">
        <div className="pledge-title">
          <h2>
            <Trans i18nKey="pledge.pledgeTo" values={{ title: pledgeTitle }}>
              {/* I pledge to <span>{{ pledgeTitle }}</span> */}
            </Trans>
          </h2>
        </div>

        <div className="pledge-body">
          <div className="pledge-row">
            <div className="pledge-content">
              {content && parse(content)}
              <div className={cx('pledge-button', isPledged && 'disabled')}>
                <button onClick={() => pledgeAction()}>{isPledged ? t('pledge.pledged') : t('pledge.button')}</button>
              </div>
            </div>
            <Desktop>
              <div className="pledge-hand">{/* <img src={handImage} /> */}</div>
            </Desktop>
          </div>
        </div>
      </div>

      <Mobile>
        <div className="mobile-share">
          <SocialShare title={title} link={''} />
        </div>
      </Mobile>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: isMobile ? 'rgba(248, 248, 248, 0.65)' : 'rgba(44, 45, 65, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            inset: 0,
            width: isMobile ? 310 : 625,
            padding: 0,
            border: 'none',
            position: 'relative',
            backgroundColor: '#61b1ee',
            borderRadius: 20,
            textAlign: 'center',
          },
        }}
      >
        <div className="pledge-modal">
          <button className="close-modal" onClick={() => setShowModal(false)}>
            {/* <img src={isMobile ? closeBlackIcon : closeIcon} /> */}
          </button>
          <h2 className="heading">{t('pledge.congrats')}</h2>
          <h2 className="action-title">{pledgeTitle}</h2>
          <div className="pledge-hands">
            {/* <img src={handImage} />
            <img src={handImage} />
            <img src={handImage} /> */}
          </div>
          <p className="pledge-joined">{t('pledge.joined', { totalPledge })}</p>
          <div className="pledge-share">
            <h3>{t('pledge.share')}</h3>
            <SocialShare title={title} link={''} />
          </div>
        </div>
      </Modal>
    </>
  )
}
