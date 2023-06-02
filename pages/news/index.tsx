import { NewsCard } from 'components/Cards'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { News } from 'graphql/generated'
import { getNewsPosts } from 'lib/graphql-api/queries/news'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NewsPage = ({ news }: { news: News[] }) => {
  return (
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
      <div className="container grid sm:grid-cols-4 gap-2 py-5">
        {news.map((x, idx) => {
          return <NewsCard key={idx} news={x} />
        })}
      </div>
    </div>
  )
}

export default NewsPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await getNewsPosts()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'map'])),
      news: data,
    },
    revalidate: 60,
  }
}
