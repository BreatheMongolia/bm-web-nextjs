import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { H2 } from 'components/generic/Typography'
import { urls } from 'lib/utils/urls'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import parse from 'html-react-parser'

export type DonationsText = {
  donationText: string,
  donationTextMn: string,
  donationTitle: string,
  donationTitleMn: string,
  disclaimerText: string,
  disclaimerTextMn: string,
  waysToGive: DonationMethod[],
  waysToGiveMn: DonationMethod[]
}

export type DonationMethod = {
  title: string,
  url: string
}

export const DonateSection = ({ text }: { text: DonationsText }) => {
  const { t } = useTranslation('takeAction')
  const [isNavVisible, setNavVisible] = useState(false)

  const donateLinks = () => {
    return (
      <ul className="list-disc">
        {
          text.waysToGive.map((pair, idx) => {
            return (
              <li key={idx}>
                <Link href={getTranslated(pair.url, text.waysToGiveMn[idx].url)} target={'_blank'} className="text-black hover:text-bm-blue my-2">
                  {getTranslated(pair.title, text.waysToGiveMn[idx].title)}
                </Link>
              </li>
            )
          })
        }
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
      {/* Desktop */}
      <div className="hidden md:flex flex-row ta-section">
        <div className="basis-2/3 ta-content">
          <H2 title={getTranslated(text.donationTitle, text.donationTitleMn)} />
          <p className="pr-5">{parse(getTranslated(text.donationText, text.donationTextMn))}</p>
          {donateBtn()}
        </div>
        <div className="basis-1/3 m-5 ta-sidebar">
          <h2 className="my-5 subheading">{t('donate.sidebarTitle')}</h2>
          {donateLinks()}
        </div>
      </div>
      {/* Mobile */}
      <div className="grid md:hidden ta-mobile-content">
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
      {/* Disclosure */}
      <div className="flex p-5 text-xs md:py-10 md:px-0 md:text-sm">
        <p>{parse(getTranslated(text.disclaimerText, text.disclaimerTextMn))}</p>
      </div>
    </div>
  )
}
