import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useFormFields, useMailChimpForm } from 'use-mailchimp-form'
import { HiPaperAirplane } from 'react-icons/hi'

type Props = {
  languageJson?: string
  isFooter?: boolean
  className?: string
}

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
}

const Subscribe: FC<Props> = ({ languageJson, isFooter, className }) => {
  const bmUrl =
    'https://breathemongolia.us19.list-manage.com/subscribe/post?u=d20df36438b159bbb8b7252df&id=69af699988&f_id=00ba81e4f0'
  const { t } = useTranslation(languageJson)
  const { loading, error, success, message, handleSubmit } = useMailChimpForm(bmUrl)
  const { fields, handleFieldChange } = useFormFields({
    EMAIL: '',
  })

  const isMobileSub = useMediaQuery({ maxWidth: 600 })
  let placeholderText = isFooter ? t('subscribe.footerPlaceHolder') : t('subscribe.placeholder')

  return (
    <div>
      <form
        className="h-[44px] w-[450px] relative"
        onSubmit={event => {
          event.preventDefault()
        }}
      >
        <input
          id="EMAIL"
          type="email"
          placeholder={placeholderText}
          className="subscribeInput h-[44px] rounded-xl border-solid border-[#6a6a6a] border-[0.5px] border-r-0 rounded-r-none px-3"
          value={fields.EMAIL}
          onChange={handleFieldChange}
        />
        {isFooter && isMobileSub ? (
          <button
            className=" bg-orange-400 text-white absolute h-[44px] rounded-xl border-none  border-l-0 rounded-l-none w-[45px] align-text-top self-start justify-self-start text-start "
            onClick={() => {
              if (!validateEmail(fields.EMAIL)) {
                alert(t('subscribe.validEmail'))
              } else {
                handleSubmit(fields)
              }
            }}
          >
            <HiPaperAirplane className="h-4 w-4 m-3 rotate-45" />
          </button>
        ) : (
          <button
            className=" bg-orange-400 uppercase text-white absolute h-[44px] rounded-xl border-none border-l-0 rounded-l-none px-3"
            onClick={() => {
              if (!validateEmail(fields.EMAIL)) {
                alert(t('subscribe.validEmail'))
              } else {
                handleSubmit(fields)
              }
            }}
          >
            {success && !error ? t('subscribe.subscribed') : t('subscribe.btn')}
          </button>
        )}
      </form>
    </div>
  )
}

export default Subscribe
