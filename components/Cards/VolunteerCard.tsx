import React from 'react'
import { useTranslation } from 'next-i18next'
import { getTranslated } from 'lib/utils/getTranslated'
import parse from 'html-react-parser'
import Link from 'next/link'

export const VolunteerCard = ({
  usedPage,
  volunteers,
  countriesInfoText,
  locale,
}: {
  usedPage: string
  volunteers: any[]
  countriesInfoText: any[]
  locale: string
}) => {
  const { t } = useTranslation(usedPage)
  const APPLY_URL =
    'https://forms.office.com/Pages/ResponsePage.aspx?id=rcJswrNeK0ewIXlMcbu4hPE6s_QwYeRChSapguhJZ8dUMVRFQUpDTzBaMkZLR01YOE5IRDkxSTBKSy4u'
  let cssText = ''

  switch (usedPage) {
    case 'home':
      cssText =
        'grid grid-cols-1 justify-items-start md:grid-cols-2 md:justify-items-center lg:grid-cols-1 lg:justify-items-start gap-5'
      break
    case 'about':
      cssText = 'grid grid-cols-1 justify-items-start sm:grid-cols-2 sm:justify-items-center gap-5'
      break
    default:
      cssText = 'grid grid-cols-2 justify-items-center gap-5'
      break
  }

  return (
    <>
      <div className={cssText}>
        {/* BreatheMongolia Volunteers */}
        <div className="grid grid-cols-3 gap-5 my-5">
          {countriesInfoText.map((info, idx) => (
            <div className="inline-block" key={'support' + idx}>
              <img className="w-5 h-5 mb-2 ml-8" src={info.infoIcon.node.mediaItemUrl} alt="Join Us" />
              {info.customTextMn && (
                <div className="place-items-center text-data-custom">
                  {parse(getTranslated(info.customText, info.customTextMn, locale))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Job Opportunity */}
        <div className="flex flex-col gap-5 m-5">
          <p className="font-bold text-lg text-slate-700">{t('joinBm.opportunities')}</p>
          <ul className="list-disc pl-5 text-black">
            {volunteers?.map((volunteerPos: any) => (
              <li className="" key={volunteerPos?.databaseId}>
                <Link
                  className="hover:text-[#3174d0]"
                  href={volunteerPos?.volunteerCustomFields?.link?.url}
                  target="_blank"
                >
                  {getTranslated(
                    volunteerPos?.volunteerCustomFields?.position,
                    volunteerPos?.volunteerCustomFields?.positionMn,
                    locale,
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex-start">
            <button className="bg-[#f4ac3d] rounded-lg p-2 ">
              <Link className="apply_now_button font-bold text-md text-white p-5" href={APPLY_URL} target="_blank">
                {t('joinBm.applyNow')}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VolunteerCard
