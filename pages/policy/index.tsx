import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getTranslated } from 'lib/utils/getTranslated'
import { getPolicies, getPolicyLandingPageSettings } from 'lib/graphql-api/queries/policy'


const PolicyPage = ({ policies }: { policies: any[] }) => {
    const { t } = useTranslation('news')
    return (
        <div>
            <Head>
                <title>Policy - Breathe Mongolia - Clean Air Coalition </title>
            </Head>
            <div className="lg:container px-4 w-full mx-auto flex flex-col gap-16 pt-5 md:pt-10 ">
                <h2>Policies</h2>
                {policies.map((policy, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        {policy.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PolicyPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    // fetch the data
    const policies = await getPolicies()
    const data = await getPolicyLandingPageSettings()

    return {
        props: {
            ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common', 'policy'])),
            policies: policies,
            locale,
            title: getTranslated(data.title, data.titleMn, locale),
            description: getTranslated(data.description, data.descriptionMn, locale),
            image: getTranslated(data.image.mediaItemUrl, data.imageMn.mediaItemUrl, locale),
        },
        revalidate: 60 * 5, // every 5 minutes
    }
}
