import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  additionalResources: []
}

export const AdditionalResources: FC<Props> = ({ additionalResources }) => {
  const { t, i18n } = useTranslation()

  return (
    <>
      <div className="additional-resources">
        <h2 className="heading">{t('additionalResources.title')}</h2>
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
