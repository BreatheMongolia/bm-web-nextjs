import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Mobile from 'components/Mobile'
import Desktop from 'components/Desktop'
import Collapse from 'rc-collapse'
import parse from 'html-react-parser'
import ChevronDown from 'assets/icons/ChevronDown'
import { getTranslated } from 'lib/utils/getTranslated'
import motion from 'lib/utils/motion'

var Panel = Collapse.Panel
type FAQType = {
  data: any
}

const options = {
  replace: ({ name, attribs }: any) => {
    if (!attribs) {
      return
    }

    if (attribs.hasOwnProperty('data-src')) {
      const width = attribs.hasOwnProperty('width') ? attribs['width'] : 'auto'
      const height = attribs.hasOwnProperty('height') ? attribs['height'] : 'auto'
      const title = attribs.hasOwnProperty('title') ? attribs['title'] : ''

      const media = React.createElement(name, { src: attribs['data-src'], title, width, height }, null)
      return media
    }
  },
}

export const FAQ: FC<FAQType> = ({ data }) => {
  const { t } = useTranslation()
  //   const lang = getLanguage()
  const lang = 'mn'

  const tabTitles: { title: string; key: string }[] = []
  const tabPanels: { content: string; key: string }[] = []

  data.map((tab: { title: string; titleMn: string; body: string; bodyMn: string }, index: any) => {
    tabTitles.push({ title: getTranslated(tab.title, tab.titleMn), key: `tab-${index}` })
    tabPanels.push({ content: getTranslated(tab.body, tab.bodyMn), key: `tab-${index}` })
  })

  const expandIcon = ({ isActive }) => {
    return (
      <i style={{ transition: 'transform .2s', transform: `rotate(${isActive ? -180 : 0}deg)` }}>
        <ChevronDown />
      </i>
    )
  }

  return (
    <>
      <Mobile>
        <p className="faq-mobile-title">{t('faq.mobileTitle')}:</p>
        <Collapse className="faq-collapse" accordion={true} openMotion={motion} expandIcon={expandIcon}>
          {data.map((tab: { title: string; titleMn: string; body: string; bodyMn: string }, index: any) => {
            if (getTranslated(tab.body, tab.bodyMn)) {
              return (
                <Panel key={index} header={<p>{getTranslated(tab.title, tab.titleMn)}</p>}>
                  {parse(getTranslated(tab.body, tab.bodyMn), options)}
                </Panel>
              )
            }
          })}
        </Collapse>
      </Mobile>
      <Desktop>
        <p className="faq-mobile-title">{t('faq.mobileTitle')}:</p>
        <Collapse className="faq-collapse" accordion={true} openMotion={motion} expandIcon={expandIcon}>
          {data.map((tab: { title: string; titleMn: string; body: string; bodyMn: string }, index: any) => {
            if (getTranslated(tab.body, tab.bodyMn)) {
              return (
                <Panel key={index} header={<p>{getTranslated(tab.title, tab.titleMn)}</p>}>
                  {parse(getTranslated(tab.body, tab.bodyMn), options)}
                </Panel>
              )
            }
          })}
        </Collapse>
      </Desktop>
    </>
  )
}
