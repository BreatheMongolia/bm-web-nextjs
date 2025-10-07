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
  console.log(policySection)

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          className="justify-center items-center relative overflow-hidden rounded-md"
          style={{
            backgroundImage: `url(${imageSourceUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="bg-white/70 rounded-md py-16 p-8 m-10 my-16 flex flex-col gap-10">
            <span className="text-bm-blue font-bold text-lg">{description}</span>

            <Link href="/policy" className="self-end">
              <button className="bg-bm-blue rounded-lg text-base py-3 px-5 font-bold uppercase text-white hover:bg-bm-blue/80">
                {t('policy.learnMore')}
              </button>
            </Link>
          </div>
        </div>
        <div className="py-5 ">
          <BorderlessPolicyTable policies={policySection.featuredPolicies.nodes as Policy[]} />
        </div>
      </div>
    </div>
  )
}

export { HomePagePolicySection }
