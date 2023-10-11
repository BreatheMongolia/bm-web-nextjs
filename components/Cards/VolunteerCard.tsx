import React from 'react'
import { useTranslation } from 'next-i18next'
import { getTranslated } from 'lib/utils/getTranslated'
import parse from 'html-react-parser'
import Link from 'next/link'

export const VolunteerCard = ({
  volunteers,
  countriesInfoText,
  locale,
}: {
  volunteers: any[]
  countriesInfoText: any[]
  locale: string
}) => {
  const { t } = useTranslation('about')
  const APPLY_URL =
    'https://forms.office.com/Pages/ResponsePage.aspx?id=rcJswrNeK0ewIXlMcbu4hPE6s_QwYeRChSapguhJZ8dUMVRFQUpDTzBaMkZLR01YOE5IRDkxSTBKSy4u'
  return (
    <div className="flex flex-col mb-5">
      <div className="flex flex-wrap grid grid-cols-1 justify-items-start sm:grid-cols-2 sm:justify-items-center gap-5">
        {/* BreatheMongolia Volunteers */}
        <div className="grid grid-cols-3 gap-5 my-5">
          {countriesInfoText.map((info, idx) => (
            <div className="inline-block" key={'support' + idx}>
              <img className="w-5 h-5 mb-2 ml-8" src={info.infoIcon.mediaItemUrl} alt="Join Us" />
              {info.customTextMn && (
                <div className="text-data-custom">
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
              <li className="" key={volunteerPos?.node?.databaseId}>
                <Link
                  className="hover:text-[#3174d0]"
                  href={volunteerPos?.node?.customFields?.link?.url}
                  target="_blank"
                >
                  {getTranslated(
                    volunteerPos?.node?.customFields?.position,
                    volunteerPos?.node?.customFields?.positionMn,
                    locale,
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex-start">
            <button className="bg-[#f4ac3d] rounded-md">
              <Link className="apply_now_button font-bold text-md text-white p-5" href={APPLY_URL} target="_blank">
                {t('joinBm.applyNow')}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolunteerCard
