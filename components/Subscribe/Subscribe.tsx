import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useWidth } from 'lib/utils/useWidth'
import { useFormFields, useMailChimpForm } from 'use-mailchimp-form'
import { HiPaperAirplane } from 'react-icons/hi'

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
}

const Subscribe = () => {
  const bmUrl =
    'https://breathemongolia.us19.list-manage.com/subscribe/post?u=d20df36438b159bbb8b7252df&id=69af699988&f_id=00ba81e4f0'
  const { t } = useTranslation('footer')
  const { loading, error, success, message, handleSubmit } = useMailChimpForm(bmUrl)
  const { fields, handleFieldChange } = useFormFields({
    EMAIL: '',
  })
  const [buttonText, setButtonText] = useState('')
  const buttonStates = {
    active: 'subscribe.btn',
    subscribed: 'subscribe.subscribed',
  }
  let isMobile = useWidth()

  useEffect(() => {
    if (success && !error) {
      setButtonText(buttonStates.subscribed)
    } else {
      setButtonText(buttonStates.active)
    }
  }, [success, error, isMobile])

  return (
    <div>
      <form
        className="relative flex justify-center items-center"
        onSubmit={event => {
          event.preventDefault()
        }}
      >
        <input
          id="EMAIL"
          type="email"
          placeholder={isMobile > 600 ? t('subscribe.footerPlaceHolder') : t('subscribe.placeholder')}
          className="grow h-11 rounded-xl border-solid border-[#6a6a6a] border-[0.5px] border-r-0 rounded-r-none px-4"
          value={fields.EMAIL}
          onChange={handleFieldChange}
        />
        <button
          className="bg-orange-400 h-11 text-white rounded-xl rounded-l-none px-1 hover:bg-orange-500"
          onClick={() => {
            if (!validateEmail(fields.EMAIL)) {
              alert(t('subscribe.validEmail'))
            } else {
              handleSubmit(fields)
            }
          }}
        >
          {isMobile > 600 ? (
            <div className="block">{t(buttonText)}</div>
          ) : (
            <HiPaperAirplane className="h-4 w-4 m-3 rotate-45" />
          )}
        </button>
      </form>
    </div>
  )
}

export default Subscribe
