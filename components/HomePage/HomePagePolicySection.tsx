import { HomePagePolicySection_Fields } from 'graphql/generated'

type Props = {
  policySection: HomePagePolicySection_Fields
}
const HomePagePolicySection = ({ policySection }: Props) => {
  console.log(policySection)

  return <div>PolicySection</div>
}

export { HomePagePolicySection }
