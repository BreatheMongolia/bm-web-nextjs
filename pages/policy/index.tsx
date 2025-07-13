import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getTranslated } from 'lib/utils/getTranslated'
import { getPolicies, getPolicyLandingPageSettings } from 'lib/graphql-api/queries/policy'
import { H2 } from '@/components/generic/Typography'
import { NewsCarousel, TakeActionCarousel } from '@/components/HomePage'
import Link from 'next/link'


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

                    {/* Policy Links */}
                    <div className="grid gap-4">
                        {policies.map((policy, index) => (
                            <Link 
                                key={index} 
                                href={`/policy/${policy.slug}`}
                                className="block p-6 border border-gray-200 rounded-lg hover:border-bm-blue hover:shadow-md transition-all duration-200"
                            >
                                <h3 className="text-lg font-semibold text-bm-blue mb-2">
                                    {policy.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
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
