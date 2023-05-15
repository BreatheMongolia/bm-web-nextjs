import Head from 'next/head'
import { GetStaticProps } from 'next'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { useTranslation } from 'react-i18next'
import { MapComponent, TakeActionCarousel } from 'components/HomePage'
import { Page } from 'graphql/generated'

// TODO: Detect the current language and update fields based on the current language
// TODO: Add a util function to extract the correct image size for the imageUrl

export default function Index({ page }: { page: Page }) {
  const { t } = useTranslation()
  // You can get the inner objects from the page object - it has all the content needed for the Components needed for the page.
  return (
    <div>
      <Head>
        <title>{`Breathe Mongolia - Clean Air Coalition`}</title>
      </Head>
      <div>
        <PageImageBanner
          imageUrl={{
            en: 'https://breathemon2.wpengine.com/wp-content/uploads/2022/12/banner2.png',
            mn: 'https://breathemon2.wpengine.com/wp-content/uploads/2022/12/banner2.png',
          }}
          bottomText={{
            left: page.customFields.bannerTextLeft,
            right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
          }}
        />
        <div>
          <MapComponent />
          {/* Add other page level components here */}
          <TakeActionCarousel takeActionPosts={page.customFields.featuredTakeActions} />
        </div>
      </div>
    </div>
  )
}
// This calls the API first and then loads the page
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const page = await getHomePage('/')
  console.log(page)
  // this return passes it to the above component
  return {
    props: { page },
    // This tells the page how often to refetch from the API (in seconds)
    revalidate: 60,
  }
}
