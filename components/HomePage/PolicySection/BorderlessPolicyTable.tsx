import { DocumentType, Policy } from 'graphql/generated'
import { useTranslation } from 'next-i18next'

type Props = {
  policies: Policy[]
}

const BorderlessPolicyTable = ({ policies }: Props) => {
  const { t, i18n } = useTranslation('home')

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-cols-4 gap-2 px-2 py-0 font-bold text-white uppercase rounded-md bg-bm-blue">
        <div className="col-span-3">{t('policy.documentName')}</div>
        <div>{t('policy.documentType')}</div>
      </div>
      <div className="flex flex-col gap-5 py-5">
        {policies.map(policy => {
          return <PolicyRow key={policy.databaseId} policy={policy} isMn={i18n.language === 'mn'} />
        })}
      </div>
    </div>
  )
}

const PolicyRow = ({ policy, isMn }: { policy: Policy; isMn: boolean }) => {
  const getDocumentTypes = (nodes: DocumentType[]) => {
    const str = nodes
      .map(node => (isMn ? node.documentTypeCustomFields.nameMn : node.documentTypeCustomFields.name))
      .join(', ')

    return str
  }
  const name = isMn ? policy.policyPageCustomFields.nameMn : policy.policyPageCustomFields.name
  const type = getDocumentTypes(policy.documentTypes.nodes)
  return (
    <div className="grid grid-cols-4 gap-2 text-bm-blue">
      <div className="col-span-3 font-bold">{name}</div>
      <div>{type}</div>
    </div>
  )
}

export default BorderlessPolicyTable
