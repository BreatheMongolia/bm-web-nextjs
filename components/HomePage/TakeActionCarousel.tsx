import { H2 } from 'components/generic/Typography'
import { TakeAction } from 'graphql/generated'

export const TakeActionCarousel = ({ takeActionPosts }: { takeActionPosts: TakeAction[] }) => {
  return (
    <div>
      <H2
        title="Take Action"
        trailingLineColor="yellow"
        extraButton={{
          title: 'See more',
          url: '/take-actions',
        }}
      />
    </div>
  )
}
