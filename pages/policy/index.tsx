import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getTranslated } from 'lib/utils/getTranslated'
import { getPolicies, getPolicyLandingPageSettings } from 'lib/graphql-api/queries/policy'
import { H2 } from '@/components/generic/Typography'
import { NewsCarousel, TakeActionCarousel } from '@/components/HomePage'


const PolicyPage = ({ policies, title, description, socialShare, featuredNews, featuredTakeActions, locale }) => {
    const { t } = useTranslation('news')
    return (
        <div>
            <Head>
                <title>{socialShare.title}</title>
                <meta name="description" content={socialShare.description} />
                <meta property="og:title" content={socialShare.title} />
                <meta property="og:image" content={socialShare.image} />
            </Head>
            <div className="lg:container px-4 w-full mx-auto flex flex-col gap-16 pt-5 md:pt-10 ">
                <div className="flex flex-col justify-center ta-actions pt-14">
                    <H2 title={title} className="ta-mobile-header" />
                    <h3 className="mb-5 font-semibold text-base sm:text-xl text-zinc-800 mx-3 sm:mx-0">
                        {description}
                    </h3>

                    {/* TODO : Policies  */}
                    {policies.map((policy, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            {policy.title}
                        </div>
                    ))}
                </div>

                <NewsCarousel featuredNews={featuredNews} />
                <TakeActionCarousel takeActionPosts={featuredTakeActions} locale={locale} />
            </div>
        </div>
    )
}

export default PolicyPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    // fetch the data
    const policies = await getPolicies()

    console.log(policies)
    const data = await getPolicyLandingPageSettings()

    return {
        props: {
            ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common', 'policy'])),
            policies: policies,
            locale,
            title: getTranslated(data.title, data.titleMn, locale),
            description: getTranslated(data.description, data.descriptionMn, locale),
            socialShare: data.policySocialMediaShare,
            featuredNews: data?.featuredNews?.nodes || [],
            featuredTakeActions: data?.featuredTakeActions?.nodes || [],
        },
        revalidate: 60 * 5, // every 5 minutes
    }
}
