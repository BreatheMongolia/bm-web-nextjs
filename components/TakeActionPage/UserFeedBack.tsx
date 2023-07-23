import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
// import { FEEDBACK_MUTATION } from './queries/takeAction'
import likeIcon from 'assets/images/yes.png'
import dislikeIcon from 'assets/images/no.png'
import dayjs from 'dayjs'
import Image from 'next/image'

type Props = {
  actionId: number
}

export const UserFeedback: FC<Props> = ({ actionId }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [totalFeedbacks, setTotalFeedbacks] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 })

  const { t, i18n } = useTranslation()
  const now = dayjs()
  const language = 'mn'

  // const [feedBackMutation] = useMutation(FEEDBACK_MUTATION)

  const feedBackAction = (value: string) => {
    // feedBackMutation({
    //   variables: {
    //     id: actionId,
    //     cid: actionId.toString(),
    //     language: language,
    //     date: now.format(),
    //     value,
    //   },
    // }).then(result => {
    //   const { data } = result
    //   setTotalFeedbacks(data.addUserFeedback.takeAction.totalUserFeedbacks)
    //   setIsClicked(true)
    // })
  }

  return (
    <div className="user-feedback">
      {isClicked ? (
        <>
          <p>{t('userFeedback.thankYou')}</p>
          <div className="feedback-btns">
            <button className="feedback-btn yes">
              <Image alt="Yes" src={likeIcon} height={14} width={14} />
              {totalFeedbacks.yes}
            </button>
            <button className="feedback-btn no">
              <Image alt="No" src={dislikeIcon} height={14} width={14} />
              {totalFeedbacks.no}
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{t('userFeedback.question')}</p>
          <div className="feedback-btns">
            <button onClick={() => feedBackAction('yes')} className="feedback-btn yes">
              {t('userFeedback.yes')}
            </button>
            <button onClick={() => feedBackAction('no')} className="feedback-btn no">
              {t('userFeedback.no')}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
