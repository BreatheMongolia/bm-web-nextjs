import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index() {
  return (
    <div>
      <Head>
        <title>{`Breathe Mongolia - Clean Air Coalition`}</title>
      </Head>
      <div>Testing</div>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allPosts = await getAllPostsForHome(preview)

//   return {
//     props: { allPosts, preview },
//     revalidate: 10,
//   }
// }
