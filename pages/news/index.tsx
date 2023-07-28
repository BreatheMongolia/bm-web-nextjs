import { NewsCard } from 'components/Cards'
import { AgaarNegCard } from 'components/Cards/NewsCards/AgaarNegCard'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { H2 } from 'components/generic/Typography'
import dayjs from 'dayjs'
import { News } from 'graphql/generated'
import { getNewsPosts } from 'lib/graphql-api/queries/news'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NewsPage = ({ news }: { news: News[] }) => {
  const filteredNews = [...news]
  return (
    <div>
      <PageImageBanner
        bottomText={{
          left: 'АГААРЫН БОХИРДЛЫГ ХАМТДАА БУУРУУЛЦГААЯ!',
          right: 'БОЛОВСРОЛ ・ХАМТЫН АЖИЛЛАГАА ・ХАРИУЦЛАГА',
        }}
      />
      <div className="container mx-auto flex flex-col gap-20">
        <div>
          <H2 title={'featuredNews'} descriptionHtml={''} trailingLineColor="blue" />
        </div>
        <div>
          <H2 title={'latestNews'} descriptionHtml={''} trailingLineColor="blue" />
        </div>
        <div>
          <H2 title={'Agaar Neg News'} descriptionHtml={''} />
          <div className="flex gap-5">
            <AgaarNegCard />
            <AgaarNegCard />
            <AgaarNegCard />
            <AgaarNegCard />
          </div>
        </div>
        <div>
          <H2 title={'Breathe Mongolia News'} descriptionHtml={''} trailingLineColor="blue" />
        </div>
      </div>
      <div className="container grid sm:grid-cols-4 gap-2 py-5">
        {/* Sort by date desc, show only latest 8 */}
        {filteredNews
          .sort((a, b) => {
            return dayjs(b.dateGmt ?? '').unix() - dayjs(a.dateGmt ?? '').unix()
          })
          .filter((_, idx) => idx < 8) // Move 8 to const MAX_NEWS when in separate component
          .map((x, idx) => {
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
