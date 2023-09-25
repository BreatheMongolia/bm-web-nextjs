import React, { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { H2 } from 'components/generic/Typography'
import Desktop from '../Desktop/index'
import Mobile from '../Mobile/index'
import { urls } from 'lib/utils/urls'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { useWidth } from 'lib/utils/useWidth'

export const DonateSection = () => {
  const { t } = useTranslation('takeAction')
  const [isNavVisible, setNavVisible] = useState(false)
  let isMobile = useWidth()

  useEffect(() => {
    // refreshWidth()
  }, [isMobile])

  // const refreshWidth = () => {
  //   if (isMobile <= 600) setPageNumberLimit(6)
  //   else setPageNumberLimit(18)
  // }

  const donateLinks = () => {
    return (
      <ul className="list-disc">
        <li>
          <Link href={urls.givebutter} target={'_blank'} className="text-black hover:text-bm-blue my-2">
            {t('donate.donateOnetime')}
          </Link>
        </li>
        <li>
          <Link href={urls.yourCause} target={'_blank'} className="hover:text-bm-blue my-2">
            {t('donate.donateYourcause')}
          </Link>
        </li>
        <li>
          <Link href={urls.benevity} target={'_blank'} className="hover:text-bm-blue my-2">
            {t('donate.donateBenevity')}
          </Link>
        </li>
      </ul>
    )
  }
  const donateBtn = () => {
    return (
      <a href={urls.givebutter} target="_blank" className="donate">
        {t('donate.button')}
      </a>
    )
  }
  const nav = () => {
    return <div className="my-5 ta-mobile-donate-nav">{donateLinks()}</div>
  }

  const btnSeeMore = () => {
    return (
      <div className="static ta-mobile-seemore">
        {t('donate.sidebarTitleMobile')}
        <ChevronDownIcon className="inline-block w-5 h-5 text-black" />
      </div>
    )
  }
  const btnSeeLess = () => {
    return (
      <div className="static ta-mobile-seeless">
        {t('donate.seeLess')}
        <ChevronUpIcon className="inline-block w-5 h-5 text-black" />
      </div>
    )
  }

  return (
    <div>
      {isMobile > 600 ? (
        <div className="flex flex-row ta-section">
          <div className="basis-2/3 ta-content">
            <H2 title={t('donate.title')} />
            <p>{t('donate.description')}</p>
            {donateBtn()}
          </div>
          <div className="basis-1/3 my-5 ta-sidebar">
            <h2 className="my-5 subheading">{t('donate.sidebarTitle')}</h2>
            {donateLinks()}
          </div>
        </div>
      ) : (
        <div className="ta-mobile-content">
          <H2 title={t('donate.mobileTitle')} />
          <p className="mb-5">{t('donate.description')}</p>
          {donateBtn()}
          <div className="my-5 ta-mobile-sidebar">
            <a
              className="subheading"
              onClick={() => {
                setNavVisible(!isNavVisible)
              }}
            >
              {isNavVisible ? btnSeeLess() : btnSeeMore()}
            </a>
            {isNavVisible ? nav() : null}
          </div>
        </div>
      )}
      <div className="flex py-10 text-sm ta-section md:p-5 md:text-xs">
        <p>{t('donate.disclosure')}</p>
      </div>
    </div>
  )
}
