import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import likeIcon from 'assets/images/yes.png'
import dislikeIcon from 'assets/images/no.png'
import dayjs from 'dayjs'
import Image from 'next/image'

type Props = {
  actionId: number
}

export const UserFeedback: FC<Props> = ({ actionId }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorKey, setErrorKey] = useState<'' | 'feedbackError' | 'rateLimitError'>('')
  const [totalFeedbacks, setTotalFeedbacks] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 })

  const { t, i18n } = useTranslation('faq')
  const now = dayjs()
  const language = i18n.language

  const feedBackAction = (value: string) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setErrorKey('')

    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: actionId,
        language: language,
        date: now.format(),
        value,
      }),
    })
      .then(async res => {
        if (res.status === 429) {
          throw Object.assign(new Error('Rate limited'), { isRateLimit: true })
        }
        if (!res.ok) {
          throw new Error(`Feedback failed: ${res.status}`)
        }
        return res.json()
      })
      .then(result => {
        setTotalFeedbacks({
          yes: result?.totalUserFeedbacks?.yes ?? 0,
          no: result?.totalUserFeedbacks?.no ?? 0,
        })
        setIsClicked(true)
      })
      .catch((err: Error & { isRateLimit?: boolean }) => {
        setErrorKey(err.isRateLimit ? 'rateLimitError' : 'feedbackError')
      })
      .finally(() => {
        setIsSubmitting(false)
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
            <button onClick={() => feedBackAction('yes')} className="feedback-btn yes" disabled={isSubmitting}>
              {t('yes')}
            </button>
            <button onClick={() => feedBackAction('no')} className="feedback-btn no" disabled={isSubmitting}>
              {t('no')}
            </button>
          </div>
          {errorKey && (
            <p role="alert">{t(errorKey)}</p>
          )}
        </>
      )}
    </div>
  )
}
