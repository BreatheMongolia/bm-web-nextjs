import { H2 } from 'components/generic/Typography'
import { HomePagePolicySection_Fields, Policy } from 'graphql/generated'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import BorderlessPolicyTable from './BorderlessPolicyTable'

type Props = {
  policySection: HomePagePolicySection_Fields
}
const HomePagePolicySection = ({ policySection }: Props) => {
  const { t, i18n } = useTranslation('home')

  const description = i18n.language === 'mn' ? policySection?.policyDescriptionMn : policySection?.policyDescriptionEn
  const image = i18n.language === 'mn' ? policySection?.policyImageMn : policySection?.policyImageEn
  const imageSourceUrl = image?.node?.mediaDetails.sizes !== null ? image?.node?.mediaDetails?.sizes[0].sourceUrl : ''

  return (
    <div>
      <H2
        title={t('policy.title')}
        trailingLineColor="blue"
        extraButton={{
          title: t('policy.seeMore'),
          url: '/policy#policy',
        }}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div
          className="relative items-center justify-center -mx-5 overflow-hidden md:mx-auto md:rounded-md"
          style={{
            backgroundImage: `url(${imageSourceUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex flex-col gap-10 p-4 py-8 md:rounded-md md:my-16 md:m-10 md:py-16 md:p-8 bg-white/70">
            <span className="text-sm font-bold md:text-lg text-bm-blue">{description}</span>
            <Link href="/policy" className="self-end">
              <button className="px-5 py-3 text-base font-bold text-white uppercase rounded-lg bg-bm-blue hover:bg-bm-blue/80">
                {t('policy.learnMore')}
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden px-5 md:block">
          <BorderlessPolicyTable policies={policySection.featuredPolicies.nodes as Policy[]} />
        </div>
      </div>
    </div>
  )
}

export { HomePagePolicySection }
