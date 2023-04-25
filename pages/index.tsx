import Head from 'next/head'
import { GetStaticProps } from 'next'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { MapComponent, TakeActionCarousel } from 'components/HomePage'

export default function Index() {
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
            left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
            right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
          }}
        />
        <div>
          <MapComponent />
          <TakeActionCarousel />
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const page = await getHomePage('/')
  // TODO: Utility function to break up page res to separate objects that we can pass down
  console.log(page)
  return {
    props: { page },
    revalidate: 60,
  }
}
