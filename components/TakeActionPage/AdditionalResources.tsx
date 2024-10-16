import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'

type Props = {
  additionalResources: []
}

export const AdditionalResources: FC<Props> = ({ additionalResources }) => {
  const { t, i18n } = useTranslation('takeAction')

  return (
    <>
      <div className="additional-resources">
        <h2 className="heading">{t('additionalTitle')}</h2>
        <div className="resource-links">
          {additionalResources.map((resource: { title: string; titleMn: string; url: string; urlMn: string }) => (
            <a key={resource.title} href={resource.url} target="_blank">
              <span>{resource.title}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
