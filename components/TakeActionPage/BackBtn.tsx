import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export const BackBtn: FC<any> = () => {
  const router = useRouter()

  const { t } = useTranslation('common')
  return (
    <div className="back-button">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="svgBack"
      >
        <circle cx="18" cy="18" r="18" transform="rotate(90 18 18)" fill="#61B1EE" />
        <path
          d="M21 10.7144L11.5714 18.3878L21 26.1429"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div onClick={() => router.back()} className="backBtnText">
        {t('backBtnText')}
      </div>
    </div>
  )
}
