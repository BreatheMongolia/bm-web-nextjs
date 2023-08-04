import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Desktop from "../Desktop/index"
import Mobile from "../Mobile/index"
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { urls } from "lib/utils/urls"

export const DonateSection = () => {
  const { t } = useTranslation()
  const [isNavVisible, setNavVisible] = useState(false)
  const donateLinks = () => {
    return (
      <ul>
        <li>
          <a href={urls.givebutter} target="_blank">
            {t("donate.donateOnetime")}
          </a>
        </li>
        <li>
          <a href={urls.yourCause} target="_blank">
            {t("donate.donateYourcause")}
          </a>
        </li>
        <li>
          <a href={urls.benevity} target="_blank">
            {t("donate.donateBenevity")}
          </a>
        </li>
      </ul>
    )
  }
  const donateBtn = () => {
    return (
      <a href={urls.givebutter} target="_blank" className="donate">
        {t("donate.button")}
      </a>
    )
  }
  const nav = () => {
    return <div className="ta-mobile-donate-nav">{donateLinks()}</div>
  }

  const btnSeeMore = () => {
    return (
      <div className="ta-mobile-seemore">
        {t("donate.sidebarTitleMobile")}
        <ChevronDownIcon />
      </div>
    )
  }
  const btnSeeLess = () => {
    return (
      <div className="ta-mobile-seeless">
        {t("donate.seeLess")}
        <ChevronUpIcon />
      </div>
    )
  }

  return (
    <div className="ta-section" id="donate-section">
      <Desktop>
        <div className="ta-content">
          <h2 className="heading">{t("donate.title")}</h2>
          <p>{t("donate.description")}</p>
          {donateBtn()}
        </div>
        <div className="ta-sidebar">
          <h2 className="subheading">{t("donate.sidebarTitle")}</h2>
          {donateLinks()}
        </div>
      </Desktop>
      <Mobile>
        <div className="ta-mobile-content">
          <h2 className="heading">{t("donate.mobileTitle")}</h2>
          <p>{t("donate.description")}</p>
          {donateBtn()}
          <div className="ta-mobile-sidebar">
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
      </Mobile>
    </div>
  )
}