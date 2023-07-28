import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { FEEDBACK_MUTATION } from 'lib/graphql-api/mutations/takeAction'
import likeIcon from 'assets/images/yes.png'
import dislikeIcon from 'assets/images/no.png'
import dayjs from 'dayjs'
import Image from 'next/image'
import { fetchAPI } from 'lib/graphql-api/api'

type Props = {
  actionId: number
}

export const UserFeedback: FC<Props> = ({ actionId }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [totalFeedbacks, setTotalFeedbacks] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 })

  const { t, i18n } = useTranslation('faq')
  const now = dayjs()
  const language = i18n.language

  const feedBackAction = (value: string) => {
    fetchAPI(FEEDBACK_MUTATION, {
      variables: {
        id: actionId,
        cid: actionId.toString(),
        language: language,
        date: now.format(),
        value,
      },
    }).then(result => {
      setTotalFeedbacks(result.addUserFeedback.takeAction.totalUserFeedbacks)
      setIsClicked(true)
    })
  }

  return (
    <div className="user-feedback">
      {isClicked ? (
        <>
          <p>{t('thankYou')}</p>
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
          <p>{t('question')}</p>
          <div className="feedback-btns">
            <button onClick={() => feedBackAction('yes')} className="feedback-btn yes">
              {t('yes')}
            </button>
            <button onClick={() => feedBackAction('no')} className="feedback-btn no">
              {t('no')}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
