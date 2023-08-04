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
        bottomText={{
          left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
          right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
        }}
      />
      <div className="container flex flex-row flex-wrap gap-5 py-5 justify-evenly">
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
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map'])),
      news: data,
    },
    revalidate: 60,
  }
}
